---
{
  "title": "De la automatización de actualizaciones de Laravel al mantenimiento continuo",
  "summary": "Cómo Jason McCreary pasó de lanzar Laravel Shift como herramienta de actualización de versiones a ampliarlo con mantenimiento por suscripción y revisión de código con IA."
}
---

En noviembre de 2015, Jason McCreary preparaba una charla en un evento de desarrolladores PHP cuando encontró una oportunidad de negocio. El tema eran las nuevas versiones del framework Laravel, usado para desarrollar servicios web, y cómo actualizarlas. Había guías oficiales y algunos artículos explicativos, pero no era fácil encontrar una herramienta que cambiara el código automáticamente siguiendo esas guías. Se fijó en que buena parte de los cambios entre versiones se podía resolver con reglas fijas.

McCreary le preguntó a Taylor Otwell, creador de Laravel y presente en el evento, si conocía una herramienta así. Otwell tampoco conocía ningún producto y mostró interés en probarlo por su cuenta. McCreary construyó en el hackatón del evento su primera herramienta, que convertía proyectos de Laravel 5.0 a 5.1, y consiguió primeros usuarios de prueba gracias a una mención de Otwell en Twitter.

El 23 de diciembre de 2015, Shift salió al público como servicio de pago. El precio era de 3, 5 o 7 dólares según el tramo de actualización. Durante las vacaciones de Navidad consiguió 80 dólares con unas veinte ejecuciones.

La forma de uso se ajustó al proceso de trabajo que ya tenía el desarrollador. El cliente iniciaba sesión con su cuenta de GitHub o Bitbucket, indicaba el repositorio de código y, una vez hecho el pago, Shift ejecutaba la actualización. El resultado se guardaba en una rama, un espacio de trabajo separado del original, y se entregaba como pull request para revisar y aplicar los cambios. El cliente podía ver qué había cambiado en la pantalla de revisión de código que ya conocía.

En las partes que la automatización no podía resolver con seguridad, dejaba explicaciones. El desarrollador podía leerlas, terminar las correcciones necesarias y fusionar el resultado, y el diseño también obligaba a revisar paso a paso cuando se subían varias versiones. Este método dejaba las modificaciones en manos de una herramienta externa, pero la decisión final de aplicarlas quedaba en el equipo de desarrollo.

El producto inicial tenía errores. Jeffrey Way, de Laracasts, el servicio de formación sobre Laravel, hizo llegar el comentario de que la idea era buena pero que fallaba. McCreary tomó las 100, 250, 500 y 1.000 ejecuciones como criterio para aumentar la inversión en desarrollo, y en cada etapa corregía errores y ampliaba funciones. En septiembre de 2016 anunció que había alcanzado las 1.000 actualizaciones.

Preguntaba a los clientes que ya lo habían usado qué tal había ido el resultado, qué habían corregido por su cuenta y dónde habían conocido Shift. Las respuestas mostraban a la vez los huecos de la automatización y las vías por las que llegaban los clientes. La atención al cliente cumplía la doble función de mejorar el producto y hacer investigación de mercado.

Los primeros clientes llegaron sobre todo desde Twitter. La mención de Otwell fue el punto de partida, y con su charla en Laracon 2016 se encontró con unos 400 clientes potenciales. Los ingresos dieron un salto tras el evento y los lanzamientos de nuevas versiones, y diez meses después del lanzamiento llegó a unos 3.000 dólares al mes.

Aun así, no se dedicó de inmediato a tiempo completo. En 2017 eligió un contrato de consultoría mejor pagado con Papa John’s. Cuando el contrato terminó en octubre de 2018, decidió consagrarse a Shift y se dio un año, con la condición de mantener intactos sus ahorros.

Su experiencia previa vendiendo apps influyó en cómo fijaba los precios. McCreary estaba acostumbrado a conseguir muchos usuarios con precios bajos, y mantuvo esa idea en Shift. Que el desarrollador pudiera hacer la actualización por su cuenta dedicándole tiempo también lo hacía dudar a la hora de subir el precio. Sin embargo, en abril de 2019, cuando las actualizaciones acumuladas llegaron a 15.000, consideró que el servicio había demostrado su valor y anunció una subida adicional.

En 2019, con el consejo de Adam Wathan, ordenó los precios en tres tramos. Dividió las actualizaciones en 9 dólares para la última versión, 19 dólares para las versiones con soporte y 29 dólares para las que ya no lo tenían. Los clientes entendían mejor el coste previsto y también aumentaron los ingresos por atender proyectos antiguos.

Después de pasar a tiempo completo, introdujo también un producto de suscripción. Esperaba que así fuera más fácil prever el coste de actualización del cliente y sus propios ingresos. La acogida inicial fue débil, y él explicó después que se debía a que muchos clientes no tenían necesidad de apresurarse a pasar a la nueva versión y se quedaban en versiones con soporte a largo plazo.

Los intentos de ampliar el mercado continuaron. Creó herramientas de actualización de versiones para PHP, el lenguaje en el que se basa Laravel, pero se usaban poco y retiró esos productos. También consideró JavaScript, pero juzgó difícil elegir por dónde entrar, con muchos frameworks y herramientas públicas dispersas. Apoyar tecnologías conocidas no bastó para que llegara un público nuevo.

La reforma de precios y la suscripción dieron resultados más adelante. En septiembre de 2019, con el lanzamiento de Laravel 6, los ingresos mensuales llegaron a 20.312 dólares. En ese momento los pagos de suscripción representaban casi la mitad de los ingresos.

En 2020 amplió el alcance del producto al trabajo de mantenimiento de esos mismos desarrolladores de Laravel. Añadió Shift Workbench, que permite seleccionar y ejecutar las tareas de limpieza de código necesarias, y presentó la herramienta «Can I Upgrade Laravel?», que comprueba qué versiones de Laravel admite cada paquete que se usa. Jess Archer participó en el desarrollo con un contrato y ayudó en esta ampliación. El producto empezó a cubrir también el trabajo que aparece antes y después de actualizar una versión.

Los productos de formación también se conectaron con problemas detectados en la atención al cliente. La cantidad de consultas sobre Git llevó al curso Getting Git, y Confident Laravel, una formación sobre cómo escribir pruebas, se creó para ayudar a los desarrolladores a verificar el resultado de una actualización. En 2020 distribuyó gratis la versión básica de BaseLaravel, sobre cómo aprovechar Laravel, y registró más de 10.000 descargas. Con el contenido educativo daba a los clientes el conocimiento necesario para sacar partido a las herramientas y, a la vez, ampliaba su propio público.

Los ingresos y el uso se acumularon a la vez. Según los registros que McCreary publicó, los ingresos de 2020 crecieron un 112 % respecto al año anterior, y en septiembre de 2021 las ejecuciones acumuladas superaron las 50.000. En noviembre de ese mismo año, los ingresos acumulados desde el inicio del negocio sobrepasaron el millón de dólares.

A medida que crecían los productos, definir el alcance de la operación también se volvió importante. En 2021 amplió la colaboración con desarrolladores externos, pero en 2022, después de que Jess Archer se uniera al equipo de Laravel, decidió volver a operar Shift solo. McCreary quiso reducir los productos y las tecnologías que mantenía para bajar la carga de alternar entre varias tareas. Fue la decisión de ordenar un negocio ya crecido a un tamaño que pudiera seguir atendiendo él mismo.

También preparó una forma de ejecución para clientes que no podían enviar su código a un servicio externo. El Shift habitual solo mantiene el código del cliente en el servidor durante el procesamiento y lo borra al terminar, pero había casos en los que la política de la organización impedía incluso subirlo. A esos clientes les ofreció Shift for Docker, que ejecuta la actualización en su propio entorno. Era una manera de comprar la misma función de automatización adaptada a las condiciones de gestión del código de cada cliente.

En 2025 el crecimiento anual de ingresos se detuvo por primera vez desde el lanzamiento. McCreary señaló como causa principal que, con versiones como Laravel 12 que exigen pocas correcciones obligatorias, la necesidad de actualizaciones de pago se debilitó. También mencionó la posibilidad de que los desarrolladores empezaran a resolver el trabajo directamente con IA. Era el momento de revisar un modelo de negocio en el que los clientes volvían con cada nueva versión.

Empezó ajustando la gestión de precios. Movió los productos de versiones con el soporte terminado al tramo de precio alto y limitó la oferta del precio de entrada barato de la última versión a un periodo determinado. En junio de 2025 amplió los precios regionales y el pago en moneda local para ajustar las condiciones de pago de cada mercado. McCreary estimó que, sin estos ajustes, los ingresos de ese año habrían caído alrededor de un 10 %.

También repasó intentos anteriores de aumentar la frecuencia de uso. La app de escritorio y la herramienta de línea de comandos de Workbench se usaron menos de lo esperado y las retiró; él se fijó en que el cliente tenía que recordar la tarea que necesitaba, abrir la herramienta y ejecutarla por su cuenta. Hacer más cómodo el entorno de ejecución no bastaba para dar al cliente motivos suficientes para volver al producto.

En enero de 2026 puso en marcha Monthly Shifts. Consistía en enviar cada mes a los clientes de suscripción mejoras de código preparadas como pull requests. El cliente solo tenía que revisar los cambios recibidos y aplicarlos o cerrarlos, y al mes siguiente recibía nuevas mejoras. El modo de uso cambió de un producto en el que el cliente buscaba las tareas y las ejecutaba a otro que le entrega primero el trabajo que hay que hacer.

La unidad de compra de la suscripción también se ajustó a lo que gestionan los equipos de desarrollo. Puso un producto para un solo repositorio y otro ilimitado que cubre varios, y distinguió el alcance de actualizaciones incluidas según la antigüedad del proyecto. Los equipos que operan varios servicios pueden pagar juntos el coste de mantenimiento que se repite y recibir actualizaciones semanales de dependencias y mejoras de código mensuales.

En junio de 2026 añadió la versión de prueba de AI Review. La estructura era que el Shift existente ejecutara la actualización según reglas y después la IA leyera el contexto del código y las explicaciones que Shift había dejado para hacer correcciones adicionales. Combinaba las reglas de corrección automática acumuladas durante mucho tiempo con la capacidad de interpretar el contexto. Era un intento de llevar dentro del producto parte del trabajo que antes hacía el desarrollador al leer las explicaciones y rematar por su cuenta.

Shift reunió en una sola tarea comprable la decisión de actualizar y las correcciones repetitivas que el desarrollador tenía que hacer cada vez. McCreary mantuvo la entrega del resultado directamente en el repositorio del cliente y fue ampliando los momentos de uso, de la actualización puntual al mantenimiento continuo.
