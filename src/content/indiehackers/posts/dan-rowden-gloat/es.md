---
{
  "title": "El Gloat de Dan Rowden, que se encargaba de la gestión de los servidores en nombre de los autores",
  "summary": "El caso de Dan Rowden, que convirtió la instalación de Ghost por encargo en una suscripción de alojamiento gestionado. Se examina cómo creó ingresos recurrentes con una pequeña base de clientes y, cuando aumentó la carga operativa, traspasó los clientes y el servicio a otro operador independiente."
}
---

Dan Rowden, originario del Reino Unido, es un desarrollador y diseñador web que ha creado pequeños servicios de internet para editores independientes. Operó Magpile, un servicio relacionado con revistas, y Subsail, una herramienta de gestión de suscripciones, y después amplió su ámbito a productos para autores y editores que usan Ghost. Gloat es el negocio de instalación y alojamiento de Ghost que inició en ese proceso.

Ghost es un software de código abierto para publicar blogs y boletines y gestionar suscriptores de pago. Gloat no era un programa que sustituyera a Ghost, sino un servicio que lo instalaba y administraba el servidor en nombre del cliente. La razón por la que los clientes pagaban residía en la comodidad de operar una publicación en su propio dominio sin encargarse del servidor, más que en la propia función de escritura.

## Un servicio que vendía instalaciones individuales se convirtió en un negocio de suscripción

El primer producto, iniciado en junio de 2020, era un servicio por encargo que instalaba Ghost en el servidor DigitalOcean del cliente. La tarifa de instalación fue de 59 dólares al principio y después subió a 99 dólares, y el cliente utilizaba por separado un servidor de unos 5 dólares al mes. Vendió primero la tarea de instalación que conocía bien, en lugar de software creado por él mismo.

Aunque se encargara de la instalación, quedaban tareas que el cliente debía preparar. El cliente tenía que registrarse en DigitalOcean y en el servicio de envío de correo Mailgun, y también proporcionar a Dan los permisos de gestión del dominio. Para una persona no desarrolladora, ese proceso de preparación ya era una carga, y Dan también tenía que comprobar las cuentas y los permisos de acceso de cada cliente.

Por eso, en noviembre de 2020 añadió el alojamiento gestionado, que alojaba los sitios de los clientes en su propio servidor. El precio de lanzamiento era de 149 dólares al año, y destacaba que no limitaba las páginas vistas ni el número de suscriptores. La instalación de los sitios seguía siendo manual, pero el proceso de preparación del cliente se redujo mucho y para el proveedor surgieron ingresos recurrentes en lugar de una tarifa de instalación única.

El crecimiento inicial fue lento. En diciembre de 2020, unas seis semanas después del lanzamiento del alojamiento, superó los 100 dólares de ingresos recurrentes mensuales, y en enero de 2021 publicó 227 dólares. Los más de 6.000 dólares de ingresos acumulados que anunció en ese momento incluían también los ingresos de las instalaciones por encargo, por lo que no deben interpretarse como ingresos de la suscripción de alojamiento ni como ingresos mensuales.

## Precios bajos y alcance operativo limitado

En el sitio web de Gloat, donde todavía queda el aviso de venta, se muestran tarifas de 189 dólares al año o 19 dólares al mes. El alcance incluía páginas vistas y suscriptores ilimitados, y el envío de 20.000 correos de boletín al mes. Por lo tanto, 'ilimitado' no significaba que todos los recursos fueran ilimitados, sino que el precio no subía según determinadas métricas. Actualmente Gloat no acepta nuevas suscripciones y remite a Magic Pages.

El servicio operativo incluía copias de seguridad diarias y actualizaciones de software semanales. En cambio, no incluía de forma predeterminada una CDN que distribuyera el contenido rápidamente en varias regiones, y se indicaba a los clientes que la necesitaran que podían configurarla por separado. Era una configuración que ofrecía a un precio fijo las funciones necesarias para blogs y boletines pequeños, más que un alojamiento con todas las funciones adicionales.

La forma de describir el producto también se fue perfeccionando. Al principio se lanzó con un simple sitio web de una página, pero en julio de 2020 se ampliaron las descripciones por servicio y se creó una página de comparación con Ghost(Pro), el alojamiento oficial. El enfoque no era hacer entender a los clientes una herramienta completamente nueva, sino ayudarles a elegir cómo operar Ghost, por el que ya se interesaban.

Alrededor de Gloat también había otros productos dirigidos al mismo público de clientes. Dan operaba conjuntamente Cove, una herramienta de comentarios para Ghost, la venta de temas, consultoría y desarrollo a medida, entre otros. Esa configuración dejaba margen para vincular a otros productos las tareas complementarias que necesitaban los clientes de alojamiento, pero los ingresos de cada producto no deben sumarse a los resultados individuales de Gloat.

En una entrevista de 2022, explicó que llevaba varios productos en solitario y que, aparte de responder a los correos de los clientes, la mayoría no tenía muchas tareas que debiera hacer obligatoriamente cada semana. La excepción era el alojamiento de Ghost, que obligaba a actualizar los sitios de los clientes cuando salía una nueva versión. Aunque normalmente podía mantenerse con poca intervención, no era un negocio en el que desapareciera la responsabilidad de responder a los cambios del software subyacente.

El MRR (ingresos recurrentes mensuales) máximo que reveló en una retrospectiva de la venta de 2025 era de aproximadamente 1.700 dólares, y los costos mensuales eran de aproximadamente 400 dólares. La simple diferencia entre ambas cifras es de 1.300 dólares, pero no puede afirmarse que sea la ganancia neta, que también debe reflejar los costos laborales y los impuestos. Los 1.700 dólares también se presentaron como el máximo del negocio, no como los ingresos en el momento de la venta.

Aunque los clientes concurrentes no superaron los 100, más de 300 usuarios acumulados eligieron Gloat durante cinco años. Los usuarios acumulados y los suscriptores en un momento determinado son métricas distintas, y es significativo que este negocio se mantuviera incluso con una base de clientes de decenas de personas.

## La carga operativa se convierte en un criterio de decisión más importante que los ingresos

La posibilidad de vender no se consideró por primera vez en 2025. En 2020 ya había recibido una oferta de 75.000 dólares para transferir conjuntamente el servicio de instalación y el alojamiento de Gloat, Cove y el tema Substation. Sin embargo, la operación de entonces se vino abajo cuando el posible comprador decidió no seguir adelante, y esa cantidad no es ni el valor de Gloat por sí solo ni el importe real de la venta de 2025.

El detonante que cambió la dirección operativa fue Ghost 6.0, aparecido en agosto de 2025. La nueva versión amplió las funciones de análisis web y de integración con la web social, y para darle soporte había que considerar servicios y configuraciones adicionales además del método de instalación existente. Sin embargo, no era que Ghost ya no pudiera operarse con el método existente, de modo que el problema no era la imposibilidad del alojamiento, sino la complejidad operativa añadida para ofrecer también las nuevas funciones.

Dan trabajaba entonces en Loops y estaba tomando distancia de sus proyectos personales. Consideró que le faltaban tiempo y ganas para dar soporte a la nueva infraestructura, así que decidió darle un cierre ordenado al negocio en lugar de seguir expandiéndolo. Incluso si generaba ingresos, si valía la pena asumir el tiempo que habría que invertir en el futuro era una decisión aparte.

## Vender el negocio mediante el traslado de clientes

El 22 de agosto de 2025, Dan propuso a Magic Pages un plan para transferirle los sitios de los clientes. La contraparte era Jannis Fedoruk-Betschki, otro operador independiente de alojamiento de Ghost, y ambos firmaron un contrato el 4 de septiembre y completaron la operación. No fue una adquisición en la que se vendiera tecnología a una gran empresa, sino una operación para transferir clientes y operaciones a un pequeño operador que hacía lo mismo.

No reveló el importe exacto de la venta. La estructura era recibir primero aproximadamente la mitad del pago y el resto en cuotas mensuales durante un año, y explicó que el monto total era casi igual a las ganancias del año anterior de Gloat. Él lo entendió como una elección que le aseguraba alrededor de un año de ingresos sin tener que operar el negocio directamente.

La transferencia de clientes era la condición central de la operación. En el anuncio de la adquisición se planeó que, desde septiembre de 2025 hasta mediados de octubre, los dos operadores trasladaran los sitios y que los clientes solo cambiaran la configuración de DNS de sus dominios siguiendo las instrucciones. La política era migrar a la infraestructura de Magic Pages, compatible con las nuevas funciones de Ghost 6.0, evitando interrupciones de los sitios y contratiempos en las tareas de publicación.

En esta operación, el activo importante puede verse no tanto en una tecnología de blogs exclusiva, sino en la relación con clientes que ya pagaban y en una base operativa capaz de asumirla. Para el adquirente, que se concentraba en la misma tarea de alojamiento, fue una oportunidad de aumentar clientes, y para Dan fue una opción para dejar la responsabilidad operativa mientras mantenía el servicio a los clientes. Gloat es un caso que mostró no solo cómo crear pequeños ingresos recurrentes, sino también cómo dar cierre a un negocio traspasándolo a otro operador.
