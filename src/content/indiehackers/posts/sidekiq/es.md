---
{
  "title": "De una licencia de 50 dólares a un negocio de suscripciones: Sidekiq",
  "summary": "Cómo Mike Perham mantuvo Sidekiq con la versión gratuita, vendió funciones para empresas con Pro y Enterprise y llegó a 1.850 clientes y 13,5 millones de dólares facturados en diez años, como único empleado."
}
---

## Construir una herramienta de trabajos en segundo plano

En 2012, Mike Perham publicó Sidekiq, una herramienta que procesa los trabajos en segundo plano de las aplicaciones Ruby. Distribuía la versión básica gratis y vendía una licencia comercial de 50 dólares a las empresas que querían otras condiciones de uso. La primera tanda de licencias vendidas fue de 33 unidades, por un total de 1.650 dólares. Para mantener una herramienta en la que había invertido cientos de horas de desarrollo, necesitaba un producto por el que los clientes pagaran con un motivo más claro.

El trabajo que asumía Sidekiq era el de las tareas repetitivas que quedan detrás de la pantalla de un servicio web. Cuando el envío de correos de confirmación de pedidos o la sincronización de datos con servicios externos se procesa por separado, el usuario no tiene que esperar frente a la pantalla a que termine. El equipo de desarrollo gana una base común para encolar trabajos, reintentarlos si fallan y consultar su estado de procesamiento.

Perham era un desarrollador que había construido este tipo de sistemas en varios empleos. En 2008 creó una cola de trabajos en FiveRuns y después desarrolló varias herramientas de procesamiento en segundo plano, cambiando de enfoque el almacenamiento y la estructura de ejecución. Sidekiq incorporó la experiencia acumulada en ese proceso y un diseño pensado para reducir las molestias de las herramientas existentes.

La decisión central fue una estructura que procesa trabajos con varios hilos dentro de un mismo proceso. El foco estaba en reducir la carga de recursos que genera añadir procesos sin parar cuando se quiere aumentar el trabajo simultáneo. En la adopción se dio importancia a la integración estrecha con Rails y a una compatibilidad que facilitara la migración a los usuarios existentes de Resque.

The Clymb, la empresa de comercio electrónico donde trabajaba, usó el producto inicial en su servicio real. En octubre de 2012 Perham señaló que la empresa llevaba seis meses aplicando Sidekiq en producción y que funcionaba de forma más rápida y estable que la configuración anterior con Delayed Job. La experiencia en un servicio que él mismo operaba fue la base para mejorar el producto y diseñar las funciones de pago.

## Sidekiq Pro empieza a generar ingresos

En octubre de 2012 lanzó Sidekiq Pro a un precio de 500 dólares por empresa. Incluía funciones para agrupar varios trabajos y seguir su avance, notificaciones al terminar un grupo de trabajos y recolección de métricas de operación. El desarrollador podía montar flujos como procesar cientos de imágenes y después ejecutar el paso siguiente. Sobre la herramienta básica de procesamiento añadió como extensión de pago funciones que a las empresas les resultaba engorroso construir y mantener por su cuenta.

Pro vendió unas 140 unidades en su primer año y los ingresos llegaron a 70.000 dólares. Hacia octubre de 2013 el ritmo de ventas equivalía a unos 100.000 dólares al año, así que se abría la posibilidad de convertir el trabajo secundario en la ocupación principal. En esa misma retrospectiva Perham registró 34 lanzamientos de Sidekiq durante el último año. Con los ingresos apareció un motivo claro para seguir dedicando tiempo a mejorar funciones y corregir errores.

Las ventas iniciales circularon sobre la confianza que había construido entre los desarrolladores de Ruby. Perham mantenía un blog técnico desde 2007 y respondía preguntas con desarrolladores en RubyConf y RailsConf. Los desarrolladores que probaban el producto lo recomendaban a sus compañeros o lo volvían a introducir en la empresa a la que se cambiaban. Él señaló como casos importantes de crecimiento a desarrolladores que compraron Pro en dos o tres empresas distintas.

Durante unos 18 meses después del lanzamiento de Pro, las ventas mensuales subieron hasta unos 10.000 dólares. Cuando los ingresos del trabajo secundario superaron su salario principal, Perham se preparó para independizarse y en julio de 2014 dejó The Clymb. Ese mismo mes fundó Contributed Systems y tomó el desarrollo y el soporte de Sidekiq como ocupación principal. El orden fue cambiar su forma de trabajar después de que el producto alcanzara el punto de cubrir sus gastos de vida.

## La suscripción y Sidekiq Enterprise

La versión de pago avanzó hacia un apoyo más profundo de los flujos de trabajo empresariales. En febrero de 2015, Pro 2.0 modificó la estructura para permitir anidar lotes dentro de otros lotes y gestionar trabajos encadenados en varias etapas. También corrigió con un nuevo planificador el tramo en el que podían perderse trabajos al mover tareas programadas a la cola. El valor que compraban los clientes acumulaba control de trabajos complejos y estabilidad operativa.

La forma de venta también cambió a suscripción para adecuarse al mantenimiento continuo. En una entrevista de 2016 Perham señaló como su mayor error haber ofrecido soporte de por vida con un pago único. Si Ruby y Rails cambian, el producto también debe corregirse, y cuantos más usuarios hay, más trabajo de soporte sigue apareciendo. En ese momento vendía suscripciones anuales, acordes con la naturaleza de un producto que acompaña a la aplicación durante años.

En agosto de 2015 lanzó Sidekiq Enterprise, orientado a empresas más grandes. Añadió funciones para limitar las peticiones a APIs externas y evitar sobrecargas, ejecutar trabajos según un calendario definido y suprimir trabajos registrados por duplicado. Estas funciones apuntaban a los problemas operativos que surgen al crecer el volumen de procesamiento y al conectar varios sistemas. Quedó definido así un grupo de clientes y un uso con los que podía cobrar más que con Pro.

En Enterprise también adaptó el proceso de compra a lo que piden las empresas. Pro mantuvo el pago con tarjeta de crédito, y Enterprise abrió la vía de la cotización, la orden de compra y la factura. En el lanzamiento incluía la negociación de condiciones del contrato y una consulta de incorporación de una hora que daba Perham en persona. A un producto que los desarrolladores querían usar le sumó el procedimiento con el que una empresa puede comprarlo.

El criterio de precio se dividió según la escala de operación. Entonces Pro costaba 950 dólares al año sin límite en el volumen de trabajos ejecutados, mientras que el precio de Enterprise subía según el número de hilos de trabajo usados en producción. La estructura ofrecía una tarifa plana sencilla a las empresas pequeñas y cobraba a las que usaban el producto a gran escala un costo acorde con ese tamaño.

Los ingresos de 2015, el año del lanzamiento de Enterprise, crecieron 2,6 veces respecto al año anterior y el precio medio de venta se duplicó. Perham contó que al principio se fijó el objetivo de vender 2.000 unidades de un producto de 500 dólares para ganar un millón de dólares en total. Al operar el negocio juzgó más realista conseguir 500 clientes que pagaran 2.000 dólares. Fue la experiencia de que en un producto de nicho para empresas hay que resolver el límite del número de clientes con una utilidad alta y un precio adecuado.

## Definir el alcance de una operación en solitario

El segundo producto no alcanzó ingresos suficientes con el mismo método. Inspeqtor, una herramienta de vigilancia de procesos presentada a finales de 2014, y su versión de pago no cumplieron las expectativas de uso ni de venta. En la retrospectiva de 2015 en la que cerró el negocio, Perham anunció que dejaba el producto existente disponible pero sin añadir nuevas funciones. Detuvo la asignación de tiempo de desarrollo a un producto con poca respuesta de venta.

En Faktory, publicado en octubre de 2017, amplió el campo del procesamiento de trabajos en segundo plano que conocía bien. Para que el diseño acumulado en Sidekiq pudiera usarse desde otros lenguajes de programación, separó el servidor de trabajos de los programas de ejecución. En el lanzamiento ofrecía herramientas de ejecución para Ruby y Go, y permitía intercambiar trabajos del mismo modo en sistemas compuestos por varios lenguajes.

La forma de entrega del producto también influyó en mantener una escala que pudiera gestionar solo. Como Sidekiq se ejecuta en los servidores del cliente, la infraestructura que Perham operaba para vender podía concentrarse en distribuir el software de pago y gestionar los accesos. La configuración de despliegue que publicó en 2016 usaba una instancia de servidor de 5 dólares al mes y Apache, con dos unidades por si fallaba una. Los servidores que procesaban el trabajo real del cliente y el servidor que vendía el software tenían funciones separadas.

Las tareas repetitivas posteriores al pago se automatizaron cuando crecieron las ventas. En los dos primeros años recibía el aviso de venta y añadía a mano el acceso del cliente. Después conectó el aviso de pago de Stripe para crear la cuenta, enviar por correo las instrucciones de instalación y retirar el permiso de descarga al terminar la suscripción. Durante el trayecto del cliente desde la compra hasta la instalación, el fundador ya no tenía que intervenir cada vez.

Quedaba trabajo de soporte que una persona debía hacer directamente. Perham contó que incluso de vacaciones llevaba el portátil y dedicaba una hora por la mañana a responder correos antes de pasar el resto del día. Al considerar que sumar empleados aumentaría las tareas de gestión y los costos de operación, diseñó el negocio dentro del alcance que él podía realizar de forma eficiente o automatizar.

## El desarrollo después de diez años

En enero de 2022, al cumplirse diez años del desarrollo de Sidekiq, publicó que Contributed Systems tenía 1.850 clientes. Los ingresos acumulados de la empresa eran de 13.500.000 dólares y su único empleado era Perham. Señaló que atender a los usuarios de Sidekiq y Faktory ocupaba la mayor parte de su jornada. El ingreso generado por las extensiones comerciales sostenía la gestión del producto a largo plazo.

La mejora del producto continuó después. Sidekiq 8.0, publicado en marzo de 2025, incorporó una función para analizar el rendimiento de los trabajos en ejecución y un panel de administración renovado, y afinó la función que divide trabajos largos en unidades más pequeñas. También dio soporte oficial a Valkey y DragonflyDB además de Redis, con lo que amplió los almacenes entre los que puede elegir el cliente. A la eficiencia de procesamiento inicial sumó mejoras para que las empresas que ya lo adoptaron sigan operándolo con comodidad.

Después de crecer, volvió a delimitar el alcance con el que aceptaba las peticiones individuales de las empresas. En las preguntas frecuentes comerciales de 2026 indicó que dejaba de negociar condiciones de contrato por separado y que la elaboración de documentos de seguridad y cumplimiento solo se ofrece a clientes Enterprise de cierto tamaño o más. Si el Enterprise inicial abrió la puerta de la compra corporativa, las condiciones operativas posteriores limitaron el alcance de las negociaciones y el papeleo repetidos. Esa estandarización funciona como un mecanismo para controlar el trabajo no relacionado con el desarrollo cuando crecen los clientes.

El negocio de Sidekiq creció al hacerse cargo de funciones de procesamiento de trabajos que las empresas tendrían que implementar y mantener por su cuenta. Los clientes tenían motivos para calcular juntos el tiempo de desarrollo, la carga de responder a fallos y el costo de la mejora continua, y Perham obtuvo ingresos para mantener esas funciones durante mucho tiempo. Combinó la difusión de una herramienta gratuita, la venta de funciones para empresas, el precio según la escala de uso y un alcance operativo limitado para convertir una herramienta para desarrolladores en su medio de vida a largo plazo.
