---
{
  "title": "Empezó como un script que actualizaba versiones por ti",
  "summary": "Cómo Laravel Shift pasó de un script de actualización de un hackatón a un negocio independiente que ayuda a los desarrolladores con el mantenimiento."
}
---

En noviembre de 2015, Jason McCreary preparaba una charla en un evento de desarrolladores PHP sobre cómo actualizar versiones de Laravel. Al reunir material descubrió que para pasar un proyecto de Laravel 4.2 a 5.0 había guías oficiales, pero ninguna herramienta que hiciera el trabajo por él. Muchos de los cambios se podían resolver con reglas fijas. Como desarrollador web por contrato, le pareció una idea que también le ahorraría trabajo propio.

Le preguntó al creador de Laravel, Taylor Otwell, que estaba en el evento, si existía una herramienta de actualización automática. Otwell respondió que no conocía ninguna, pero que usaría un producto así si existiera. En el hackatón del evento, McCreary acotó el alcance y creó scripts en PHP y shell que convertían Laravel 5.0 a 5.1. Como le faltaban proyectos para probar, Otwell buscó primeros usuarios en Twitter y el prototipo pudo probarse con código de otros desarrolladores.

Laravel Shift se lanzó el 23 de diciembre de 2015. En un sitio de una sola página con inicio de sesión de GitHub y pagos con Stripe, cobraba 3, 5 o 7 dólares según el tramo de actualización. Durante las vacaciones de Navidad se ejecutaron unas 20 actualizaciones, con 80 dólares de ingresos. Un script nacido en un evento unas semanas antes ya tenía clientes que pagaban por él.

El flujo se adaptaba a la forma de trabajar de los desarrolladores. Cuando el cliente conectaba su repositorio y compraba una actualización, Shift creaba una rama aparte, modificaba el código y enviaba un pull request. El pull request incluía el código cambiado y los puntos por revisar. El cliente lo revisaba y luego lo fusionaba y desplegaba según su propio proceso.

Lo que no se podía automatizar también aportaba valor. Ante código personalizado distinto en cada proyecto o cambios inciertos, Shift dejaba explicaciones detalladas sobre qué debía revisar el desarrollador y cómo corregirlo. McCreary pensaba que hasta eso había que automatizarlo, pero los clientes valoraban las explicaciones en sí. Les ahorraban leer toda la guía de actualización para elegir lo aplicable a su proyecto.

El producto inicial era basto. Jeffrey Way, que dirigía el servicio educativo de Laravel Laracasts, dijo que la idea le gustaba pero que tenía muchos errores. McCreary lo fue corrigiendo con resultados reales de uso, y tomó los 100, 250, 500 y 1.000 usos como umbrales para seguir invirtiendo en el producto. Mientras llegaba a las 1.000 actualizaciones en el primer año tras el lanzamiento, el prototipo se pulió hasta ser una herramienta comercial capaz de tratar proyectos variados.

La promoción también ocurrió dentro de la comunidad Laravel. En Laracon 2016 habló ante unos 400 desarrolladores, y con los siguientes lanzamientos de Laravel los ingresos mensuales saltaron de cientos a miles de dólares. Unos diez meses después del lanzamiento registraba 3.000 dólares al mes. Mostrarlo en persona a quienes lo necesitaban fue clave en el crecimiento inicial.

En abril de 2017 firmó un contrato de consultoría de un año con Papa John's y lo compaginaba con Shift. Tras una prórroga, en octubre de 2018 decidió dedicarse a Shift. Hacia el cambio a 2019, los ingresos mensuales se mantenían por encima de los 6.000 dólares, y además tenía ahorros del trabajo por contrato. Se puso la regla de dar más tiempo al negocio, pero volver a buscar empleo si llegaba a tener que gastar los ahorros.

Pasar a tiempo completo obligó a repensar los precios. Por su experiencia vendiendo apps baratas en la App Store, había puesto precios bajos a Shift y le incomodaba cobrar por un trabajo que el cliente podía hacer. Pero cuando el cliente actualizaba por su cuenta también gastaba tiempo caro de desarrollo. Haber procesado unas 15.000 actualizaciones hasta abril de 2019 le dio confianza para subir precios.

La tarifa reflejaba la política de soporte de Laravel. La versión más reciente tenía un precio bajo de entrada de 9 dólares, las versiones con soporte costaban 19 dólares y las sin soporte 29 dólares. Quienes mantenían proyectos viejos y quienes seguían la última versión pagaban precios distintos. El criterio de precio quedó más claro que cobrar unos dólares más por versión.

Junto al pago por uso añadió una suscripción llamada Shifty Plans. Atendía a la vez al cliente que compraba una vez al necesitar una actualización y al que quería mantener sus proyectos siempre al día. La suscripción combinaba actualizaciones con tareas periódicas de mantenimiento, dividida según los repositorios gestionados. El cliente podía fijar su presupuesto de mantenimiento por adelantado, y Shift reducía la carga de convencerlo de comprar con cada versión nueva.

También amplió el producto a tareas vecinas de los mismos clientes. Workbench permitía ejecutar por separado pasos de automatización usados en la actualización para limpieza de código y refactorización. McCreary colaboró por contrato con Jess Archer y juntos lanzaron la app de escritorio Workbench en 2021. Con un acuerdo separado de reparto de ingresos aseguró la capacidad de desarrollo necesaria.

También operaba Human Shifts, donde una persona trataba el proyecto directamente. McCreary revisaba el código del cliente y hacía la actualización, encargándose de lo que la herramienta automática no podía terminar. El proceso sirvió para usar su propia herramienta en entornos reales de clientes y descubrir mejoras. Pero incluso dos o tres casos por semana exigían mucho tiempo, así que había un límite claro para ampliar el trabajo directo.

Para empresas que no podían entregar su código a un servicio externo ofrecía una vía local con Docker. La actualización podía ejecutarse en el entorno interno del cliente, lo que reducía compras perdidas por políticas de acceso a repositorios. Mantuvo la misma función de actualización y cambió la entrega según las condiciones que el cliente encontraba al adoptarlo.

El negocio creció poco a poco. Según registros publicados por McCreary, los ingresos de 2020 crecieron un 112 % frente al año anterior. En septiembre de 2021 las actualizaciones acumuladas superaron las 50.000, y en noviembre de ese año los ingresos acumulados desde el lanzamiento superaron el millón de dólares. Habían pasado unos seis años desde que empezó a vender actualizaciones de unos pocos dólares.

Las oportunidades de venta estaban ligadas al calendario de Laravel. En 2021 Laravel cambió el ritmo de versiones mayores de dos al año a una, y retrasó Laravel 9 a 2022. Fue un cambio importante para Shift, donde cada versión nueva generaba demanda. McCreary ajustó la operación de precios a ese ritmo, por ejemplo limitando el precio de 9 dólares de la última actualización a un beneficio de lanzamiento.

Reforzó la automatización operativa solo cuando el volumen creció bastante. En 2022 configuró los servidores de proceso para ampliarse solos cuando había mucho trabajo en espera y recogerse cuando bajaba. Así, los trabajos semanales para clientes de suscripción pasaron de unas cuatro horas a 32 minutos. No era una instalación desde el inicio; McCreary la retrasó unos dos años y la puso en marcha cuando la demanda real creció.

Al crecer los productos también hubo que recortar. Cuando Jess Archer se unió al equipo de Laravel en 2022, McCreary volvió a desarrollar Shift solo. En 2023 retiró la app de escritorio Workbench y la comunidad Shifty Coders, que aportaban solo unos pocos puntos porcentuales de los ingresos. Ese año los ingresos totales de Shift aún crecieron cerca de un 25 %.

En 2025 el crecimiento de ingresos se detuvo por primera vez desde el lanzamiento. McCreary señaló como causa principal que los últimos cambios de Laravel traían menos trabajo obligatorio: si el servicio seguía funcionando sin adoptar cada novedad o estilo recomendado, el cliente tenía menos motivos para comprar una actualización de pago. También supuso que influyó el cambio hacia desarrolladores que encargan la actualización a la IA.

Gestionó la aplicación de precios con más rigor. Cuando terminaba el soporte de una versión de Laravel, pasaba ese producto al tramo alto y limitaba el período de descuento de la última versión. En junio de 2025 ajustó precios regionales e introdujo pagos en moneda local. Eran precios y condiciones de pago fáciles de descuidar mientras se esperaba que las ventas crecieran solas.

Aplicó el mismo criterio a los productos ampliados. Los productos extendidos a PHP, Tailwind y Pest no aumentaron los ingresos como esperaba, y también retiró un CLI pensado para herramientas de uso frecuente. Mantuvo el Workbench web porque conservaba usuarios y reutilizaba la automatización existente. Así redujo la carga de gestionar muchos productos y reservó capacidad para centrarse en las actualizaciones de Laravel.

En enero de 2026 empezó a enviar Monthly Shifts a los clientes de suscripción. Cada mes realizaba automáticamente mejoras de código seleccionadas y las entregaba como pull requests; el cliente fusionaba los cambios necesarios o cerraba las peticiones no deseadas. Con el Workbench y el CLI anteriores, el cliente tenía que averiguar qué ejecutar y abrir la herramienta. Monthly Shifts redujo el esfuerzo de uso al enviar primero los resultados de mantenimiento al repositorio del cliente.

En la beta de AI Review publicada en junio de 2026 añadió trabajo de IA tras la automatización existente. Después de que Shift hiciera la actualización con reglas fijas, la IA leía el código y los comentarios detallados y trataba los cambios restantes. En el lanzamiento se ofrecía como complemento opcional de 9 dólares, y los cambios de la IA también quedaban como commits y resúmenes revisables. Las reglas de cambio y explicaciones acumuladas por McCreary durante años se convirtieron en el material que guiaba a la IA. Mantuvo la revisión humana del resultado final y amplió lo terminado antes de entregarlo al cliente.
