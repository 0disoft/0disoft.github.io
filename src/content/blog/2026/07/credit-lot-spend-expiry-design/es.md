---
{
  "title": "Cómo diseñar el orden de consumo de créditos",
  "summary": "Un único saldo visible puede ocultar muchos lotes de crédito. Este artículo utiliza código Rust de producción para explicar el orden de consumo, el tratamiento de los vencimientos y por qué los lotes vencidos que conservan un estado obsoleto deben provocar un fallo explícito.",
  "searchTags": ["créditos", "pagos", "libro mayor", "vencimiento", "reembolsos", "Rust", "lote de crédito"]
}
---
Un usuario ve un solo saldo: 10.000 créditos. Sin embargo, dentro de un sistema de pagos, tratar esa cifra como un saldo indiferenciado pronto causa problemas. Una recompensa de registro de 3.000 créditos puede vencer este mes, 5.000 créditos comprados pueden ser reembolsables y otros 2.000 créditos promocionales quizá solo puedan usarse en determinados productos.

Por eso, ZDP Money Platform conserva el saldo en lotes de crédito. La cifra que ve el usuario es la suma de esos lotes, pero al gastar se siguen teniendo en cuenta el origen, el vencimiento, la posibilidad de reembolso y el ámbito de productos de cada lote.

## Por qué un saldo necesita varios lotes

Una sola fila de saldo facilita la resta: se descuenta el importe y se continúa. El problema aparece después. Una solicitud de reembolso no puede distinguir con fiabilidad los fondos comprados de las promociones, y un proceso de vencimiento no puede saber qué parte del saldo debe desaparecer.

Con lotes, los mismos 10.000 créditos pueden representarse así.

| lote | finalidad | saldo | vencimiento | reembolsable |
| --- | --- | --- | --- | --- |
| signup_free | recompensa de registro | 3.000 | 31 de julio | no |
| paid_bonus | bonificación de compra | 2.000 | 31 de agosto | no |
| paid_base | fondos comprados | 5.000 | nunca | sí |

El orden de consumo se convierte entonces en una política de producto. Por lo general, resulta más favorable para el usuario consumir primero el valor que desaparecerá antes y conservar hasta el final el principal reembolsable. Nuestra implementación ordena los candidatos por prioridad, vencimiento, fecha de creación e ID del lote.

## Por qué es peligroso omitir silenciosamente un lote vencido

La implementación más evidente consiste en eliminar los lotes vencidos de la lista de candidatos y continuar con el siguiente.

Eso puede ocultar un problema de datos haciendo que el usuario lo pague. Si un lote gratuito sigue en estado Active, conserva saldo positivo y ya ha vencido, significa que el proceso de vencimiento o la corrección del libro mayor llega tarde. Omitirlo silenciosamente permite que el sistema consuma los créditos comprados que aparecen detrás. El pago se completa, pero el usuario gasta dinero real mientras el valor promocional obsoleto sigue sin explicación.

La implementación actual falla explícitamente cuando un lote Active, con saldo positivo, aplicable al producto y vencido aparece en la selección.

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

Este fallo no es una fricción defensiva añadida porque sí. Expone una discrepancia entre el procesamiento del vencimiento y el estado del libro mayor, en lugar de pasar automáticamente al valor pagado. La capa superior puede entonces corregir el estado de vencimiento o reintentar la operación de forma deliberada.

## Por qué se vuelve a validar en el límite de almacenamiento

El dominio de consumo crea primero un plan que describe qué lotes deben consumirse. Que el plan sea válido no garantiza que sus datos sigan siéndolo cuando comienza la persistencia. Otra solicitud puede haber consumido el lote, o la instantánea de vencimiento adjunta al plan puede ser incoherente.

Por eso, el planificador de persistencia vuelve a comprobar la instantánea de vencimiento.

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

Estas comprobaciones cumplen funciones distintas. La primera es una regla de dominio que decide qué lotes pueden ser candidatos al consumo. La segunda es una invariante del límite de almacenamiento que rechaza un plan que contradice su propia instantánea. Una evita una mala decisión; la otra, un registro incorrecto.

## El vencimiento comienza en la marca temporal límite

Si un lote vence a las 00:00:00, un consumo que ocurre exactamente a las 00:00:00 debe rechazarse. La implementación considera vencido el lote cuando `expires_at` es menor o igual que `occurred_at`, y la prueba fija este límite.

```rust
assert_eq!(
    plan_credit_lot_spend(sample_credit_spend_request(1), &[expires_at_usage]),
    Err(CreditLotSpendError::ExpiredLot {
        credit_lot_id: "lot_expires_at_usage".to_owned()
    })
);
```

La comparación actual depende del orden lexicográfico de las cadenas. Esto solo es seguro mientras todas las marcas temporales utilicen la misma representación UTC canónica. Si se permiten desplazamientos arbitrarios o fracciones de segundo normalizadas de forma distinta, comparar cadenas no basta. El contrato de entrada debe seguir siendo estricto o el límite debe convertir los valores a un tipo temporal real antes de compararlos.

## Lo que este cambio no resuelve

La validación del vencimiento no resuelve el consumo concurrente. Dos solicitudes pueden leer la misma instantánea e intentar consumir el mismo lote. La base de datos sigue necesitando una actualización condicional atómica o una estrategia de bloqueo. La validación entre la planificación y la persistencia reduce las contradicciones, pero no puede eliminar por sí sola las condiciones de carrera.

La recuperación operativa también importa. Un aumento de errores ExpiredLot no debe ocultarse como si fueran fallos ordinarios del usuario. Debe señalar un proceso de vencimiento retrasado, un evento perdido o una transición de estado no válida. El fallo explícito existe para que la discrepancia pueda observarse y repararse.

Consumir créditos parece una simple resta, pero en realidad es una política que decide qué valor desaparece primero y cuál debe protegerse. Una sola línea que omita crédito gratuito obsoleto puede quemar el saldo comprado del usuario. En esa situación, detenerse con precisión es mejor que forzar el éxito del pago.
