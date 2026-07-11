---
{
  "title": "Cómo diseñar el orden de consumo de créditos",
  "summary": "Un único saldo visible puede ocultar muchos lotes de crédito. Este artículo utiliza código Rust de producción para explicar el orden de consumo, el tratamiento de los vencimientos y por qué los lotes vencidos que conservan un estado obsoleto deben provocar un fallo explícito.",
  "searchTags": ["créditos", "pagos", "libro mayor", "vencimiento", "reembolsos", "Rust", "lote de crédito"]
}
---
El usuario ve el saldo de créditos como una sola cifra, por ejemplo 10.000 créditos. Sin embargo, si el sistema también lo gestiona como un único balance, resulta muy difícil aplicar correctamente las políticas reales de reembolso, vencimiento y restricciones por producto.

ZDP Money Platform gestiona los créditos por lotes. La cifra que ve el usuario es la suma de varios lotes, pero cada consumo comprueba el origen, la fecha de vencimiento, la posibilidad de reembolso y el ámbito de productos de cada uno.

En este artículo explicamos cómo decidimos el orden de consumo de los lotes y por qué nunca se debe omitir silenciosamente un lote vencido, utilizando código Rust de producción.

## Por qué el saldo debe dividirse en lotes de crédito

Si los créditos se gestionan como una sola cifra, consumirlos es sencillo. Basta con restar el importe del saldo. Los problemas aparecen después.

Ante una solicitud de reembolso, es difícil determinar cuánto corresponde a fondos realmente comprados. Cuando vence una promoción, también es difícil saber qué importe debe eliminarse. Además, no es posible distinguir los créditos promocionales limitados a ciertos productos de los créditos comprados de uso general.

Por eso ZDP conserva los mismos 10.000 créditos como varios lotes con orígenes y propiedades diferentes.

## Ejemplo de lotes de crédito

| ID del lote | Finalidad | Saldo | Vencimiento | Reembolsable |
| --- | --- | --- | --- | --- |
| signup_free | Recompensa de registro | 3.000 | 2026-07-31 | No |
| paid_bonus | Bonificación de compra | 2.000 | 2026-08-31 | No |
| paid_base | Fondos comprados | 5.000 | - | Sí |

En este modelo, el orden de consumo se convierte en una política de producto. Por lo general, conviene consumir primero el valor que desaparecerá antes, como los créditos próximos a vencer o no reembolsables, y conservar el principal reembolsable durante el mayor tiempo posible.

La implementación actual ordena los lotes candidatos de la siguiente manera.

Prioridad de la política → vencimiento más próximo → fecha de creación más antigua → ID del lote

## Por qué es peligroso omitir un lote vencido

Muchas personas se hacen al principio la misma pregunta.

“¿Por qué no eliminamos el lote vencido de los candidatos y utilizamos el siguiente?”

Este patrón es peligroso porque traslada silenciosamente al usuario el coste de un problema de datos.

Si un lote gratuito continúa en estado Active después de su vencimiento, el proceso de expiración llega tarde o el libro mayor no se ha corregido correctamente. Omitirlo hace que el sistema consuma en su lugar los créditos comprados que aparecen detrás.

El pago se completa, pero el usuario pierde valor adquirido directamente en vez de utilizar los créditos gratuitos cuyo estado ya debería haberse resuelto.

Por eso, la implementación actual devuelve un fallo explícito.

```rust
if lot.lot_status == CreditLotStatus::Active
    && lot.remaining_amount_credit_unit > 0
    && lot_allows_product_group(lot, &request.product_group)
    && lot.expires_at.as_deref().is_some_and(|expires_at| {
        credit_lot_expires_at_or_before(expires_at, &request.occurred_at)
    })
{
    return Err(CreditLotSpendError::ExpiredLot {
        credit_lot_id: lot.credit_lot_id.clone(),
    });
}
```

ExpiredLot no es un error ordinario del usuario. Es una protección que conserva la señal de que el procesamiento del vencimiento y el estado real del libro mayor se han desalineado. La capa superior puede usar este error para iniciar una corrección o elegir una estrategia de reintento deliberada.

## Por qué la planificación y el almacenamiento validan por separado

El consumo de créditos tiene dos etapas principales.

La etapa de planificación decide qué lotes aportarán el importe solicitado. La etapa de almacenamiento registra esa decisión en la base de datos.

Un plan válido no garantiza que los datos sigan siendo idénticos cuando comience la persistencia. Otra solicitud puede haber consumido primero el mismo lote, o la instantánea de vencimiento del plan puede haber quedado obsoleta.

Por eso, el límite de persistencia vuelve a validar la instantánea justo antes de guardar.

```rust
if consumption
    .expires_at_at_consumption
    .as_deref()
    .is_some_and(|expires_at| expires_at <= input.plan.occurred_at.as_str())
{
    return Err(CreditLotSpendStorageError::PlanMismatch(
        "expires_at_at_consumption",
    ));
}
```

Las dos comprobaciones tienen finalidades distintas. La primera es una regla de dominio que pregunta: “¿Puede este lote ser candidato al consumo?”. La segunda es una regla del límite de almacenamiento que pregunta: “¿El plan que vamos a registrar se contradice a sí mismo?”.

Una evita una decisión incorrecta. La otra evita un registro incorrecto.

## El vencimiento comienza en la marca temporal límite

Si un lote vence el 2026-07-31 a las 00:00:00, cualquier consumo que ocurra exactamente en ese instante debe rechazarse. La implementación considera vencido el lote cuando expires_at es menor o igual que occurred_at.

La prueba fija este límite de forma explícita.

```rust
assert_eq!(
    plan_credit_lot_spend(sample_credit_spend_request(1), &[expires_at_usage]),
    Err(CreditLotSpendError::ExpiredLot {
        credit_lot_id: "lot_expires_at_usage".to_owned()
    })
);
```

La comparación actual depende del orden lexicográfico de las cadenas. Solo es segura mientras todas las marcas temporales utilicen la misma representación UTC canónica. Los desplazamientos diferentes o las fracciones de segundo sin normalizar pueden producir una comparación incorrecta.

## Lo que este cambio no resuelve

La validación del vencimiento no resuelve todos los problemas.

Concurrencia: dos solicitudes pueden leer la misma instantánea e intentar consumir el mismo lote al mismo tiempo. La base de datos debe impedirlo mediante una actualización condicional atómica, bloqueo optimista o una estrategia de bloqueo adecuada.

Recuperación operativa: un aumento de errores ExpiredLot no debe descartarse como si fueran fallos ordinarios del usuario. El sistema debe permitir determinar si la causa es un proceso de vencimiento retrasado, un evento perdido o una transición de estado no válida.

El objetivo final del fallo explícito es hacer que el problema sea observable y reparable.

## Conclusión

El consumo de créditos parece una simple resta, pero en realidad es una política que decide qué valor debe utilizarse primero y cuál debe permanecer protegido.

Una sola línea de código que omita silenciosamente un lote gratuito vencido puede consumir el saldo comprado del usuario. Por eso preferimos detenernos con precisión cuando el estado no es válido, en lugar de forzar el éxito del pago.

Confiamos en que esta decisión nos protegerá cuando ocurra un incidente real en producción.
