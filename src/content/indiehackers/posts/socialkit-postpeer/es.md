---
{
  "title": "De la recolección de datos a la publicación: cómo Jonathan Geiger hizo crecer dos API",
  "summary": "Cómo Jonathan Geiger convirtió SocialKit y PostPeer en negocios mediante el tráfico de búsqueda, el cobro por uso y el soporte al cliente, y después vendió uno de ellos."
}
---

## Volver a empezar con tecnología conocida

Jonathan Geiger trabajaba como desarrollador en una startup pequeña y creaba sus propios productos por la noche y los fines de semana. En un proyecto paralelo que duró tres años, se afianzó en las API para la recolección de datos y la automatización de tareas, es decir, las funciones que otros programas usan. SocialKit creció como un negocio que extrae datos de las redes sociales y PostPeer como uno que publica contenido en varias redes sociales.

Antes había creado y vendido LectureKit, una herramienta de gestión del aprendizaje, y CaptureKit, una API de captura y recolección de páginas web. Para SocialKit reutilizó el inicio de sesión y el pago de CaptureKit, la gestión de claves de API, la estructura de la documentación y el marco de la página de presentación. Gracias a eso pudo concentrarse en la función propia del nuevo producto: tratar datos de redes sociales.

Su criterio para elegir un producto también cambió. Geiger buscaba productos competidores que ya generaran ingresos en áreas que entendía y atacaba las partes que podía mejorar él mismo, como una atención rápida. Su experiencia conociendo qué tareas de integración resultan engorrosas a los desarrolladores respaldaba esa decisión.

## Ofrecer datos de redes sociales con una API común

El problema que aborda SocialKit surge cuando el contenido de las redes sociales debe usarse dentro de otro programa. Analizar un video exige obtener la información del video y su transcripción, recolectar comentarios o métricas de reacción según haga falta y conectar un modelo de resumen. SocialKit agrupa estas tareas de modo que basta enviar la dirección del video y una solicitud para recibir el resultado necesario. Los clientes podían reducir el trabajo de conectar por separado una herramienta de recolección por plataforma, un servicio de transcripción y un modelo de inteligencia artificial.

También fue importante entregar los resultados en formato JSON, fácil de leer para los programas. Los clientes pueden introducir transcripciones y comentarios en un servicio de análisis, o llevar las vistas y la información del canal a informes y paneles, integrándolo con sus propios productos. Por ejemplo, para crear un servicio que compare la reacción de varios canales, pueden dejar la recolección de datos en manos de SocialKit y dedicar tiempo de desarrollo a los criterios de comparación y al diseño de la pantalla. Así vendía una función común que entra en un producto terminado distinto para cada cliente.

Antes de pagar, se podía probar el trabajo real. Tanto SocialKit como PostPeer ofrecen 20 créditos de prueba, y el uso de pago se divide en suscripciones según el consumo y compras puntuales de créditos. Es una estructura que atiende a la vez a los clientes que ejecutan tareas con regularidad y a los que solo obtienen datos cuando los necesitan. La prueba gratuita tenía un papel claro: comprobar si la API encaja con sus propios datos y tareas.

## Encontrar clientes reales en la búsqueda

La búsqueda de clientes avanzó junto con el desarrollo. Geiger escribía uno o dos artículos relacionados por semana y creaba páginas de presentación por función de la API, casos de uso y páginas de comparación para quienes buscaban alternativas a servicios competidores. Buscaba con las expresiones que usarían sus clientes y luego completaba documentación e instrucciones de uso que respondían a esas preguntas. En el repaso de crecimiento que publicó, el tráfico orgánico de búsqueda fue el canal de captación más importante.

Un extractor gratuito de transcripciones de YouTube se convirtió en la entrada a la API de pago. Parte de quienes descubrían la herramienta por búsqueda pasaban a ser clientes de pago, y el contenido de uso se producía como artículos y videos a la vez. Reutilizaba el mismo material como videos cortos y publicaciones en redes sociales para que un solo trabajo se encontrara en varios lugares. Algunos clientes conocieron una página de comparación con productos competidores a través de un servicio de búsqueda y recomendación con inteligencia artificial y después pagaron.

Quienes realmente pagaban eran más amplios que el grupo de desarrolladores que Geiger había supuesto al principio. Buena parte de los clientes de pago eran personas que conectaban su trabajo con herramientas sin código. Como SocialKit también podía usarse desde herramientas de automatización como Zapier o Make, podía llegar a personas con tareas repetitivas de recolección de contenido más allá de los desarrolladores que sabían usar una API. Esta experiencia muestra que conviene entender al cliente por la tarea que quiere realizar y no por el nombre de su profesión.

## Unir la publicación con los costos de las plataformas

PostPeer, lanzado en abril de 2026, asumió el trabajo de enviar contenido a las redes sociales. Ofrecía en una sola API la publicación y la programación en varias plataformas, para que los clientes pudieran añadir la publicación en redes sociales a sus propios servicios. Si SocialKit aportaba el material necesario para el análisis y la reelaboración, PostPeer se situó en la etapa de distribuir el contenido ya creado.

Un servicio que usa PostPeer conecta primero una cuenta social con el consentimiento del titular. Después envía el contenido que se publicará y la cuenta de destino, y puede publicar de inmediato o programar por zona horaria y hora. También ofrece la posibilidad de agrupar las cuentas conectadas por cliente, lo que encaja en agencias que gestionan cuentas de varias empresas o en servicios con muchos usuarios. Organizar la conexión de cuentas y el procedimiento de publicación de cada plataforma en una forma de uso común fue el núcleo del producto.

PostPeer se desarrolló con un socio desde el principio. Los dos se repartieron las integraciones de plataformas, de modo que el desarrollo podía continuar mientras Geiger se centraba en SocialKit. En particular, el proceso de aprobación de TikTok exigió más esfuerzo del esperado.

La forma de convertir el uso en créditos también reflejó los costos distintos de cada plataforma. En la tarifa de PostPeer de septiembre de 2026, la mayoría de las plataformas descuenta 1 crédito por publicación, pero X descuenta 5 créditos cuando el texto no lleva enlace y 50 cuando lo lleva. La empresa explica que esa diferencia proviene del costo de solicitud que paga a X. Al cliente se le ofrece una sola API y, a la vez, las diferencias de costo que se producen dentro quedan reflejadas en la unidad de cobro.

El soporte al cliente también fue un factor que marca la diferencia que percibe el comprador. La página de precios de PostPeer incluye testimonios que mencionan la rapidez de respuesta y de corrección, y el fundador de Kalizzle AI Studio valoró que Geiger aplicó una corrección en pocas horas. Cuando surge un problema en una conexión con una API externa, el desarrollo del cliente también puede detenerse, así que la velocidad para resolverlo entra en la decisión de compra junto con la función de integración.

Geiger también prestó atención al caso en que los agentes de inteligencia artificial usan la API directamente. Presentó la conexión de los dos productos con agentes como un experimento de crecimiento, y SocialKit admite MCP, el estándar de conexión con el que los agentes llaman a herramientas externas, además de skills que ofrecen instrucciones de uso. Amplió la vía de acceso para que la misma función de recolección pudiera usarla tanto un programa escrito por una persona como un agente.

Probó esta forma de uso con su propia cuenta de X. Configuró un agente para que escribiera cinco publicaciones al día con Claude y repartiera el calendario según los husos horarios de Estados Unidos, dejando a PostPeer la programación y la publicación. Tras la ejecución recibía por correo el contenido previsto y podía editarlo o cancelarlo desde el panel antes de publicarse. En este experimento, escribir los textos y publicarlos de verdad en la cuenta eran funciones separadas, y PostPeer se encargaba de la segunda.

## Hacer crecer el producto que quedó tras la venta

Las cifras publicadas en julio de 2026 muestran el papel de los dos productos. El ingreso recurrente mensual de SocialKit era de unos 2.800 dólares y el de PostPeer de unos 2.400, y los pagos puntuales sumaban unos 700 y 500 dólares al mes respectivamente. El total era de unos 5.200 dólares de ingreso recurrente más unos 1.200 de ingreso puntual, es decir, unos 6.400 dólares al mes. Ese mes dejó su empleo para dedicarse al desarrollo de productos.

El siguiente punto de inflexión fue la venta de SocialKit en agosto de 2026. En el momento de la venta, el ingreso recurrente mensual que publicó Geiger era de 3.290 dólares y la venta de paquetes de créditos añadía unos 700 dólares al mes de media. El tamaño de la operación que dio a conocer Tiny Startups era de 85.000 dólares, sumando 75.000 de precio de venta y 10.000 de honorarios de asesoría. Una API que generaba ingresos mientras operaba se convirtió en un activo transferible a otro empresario.

Después de la venta de SocialKit, el negocio de suscripción de PostPeer continuó. A 24 de septiembre de 2026, el panel de ingresos público mostraba un ingreso recurrente mensual de 4.403 dólares y 122 suscripciones activas. Desde los ingresos de operar dos productos a la vez, pasó a una etapa en la que vendió uno y hace crecer el ingreso recurrente del que quedó.

PostPeer también puso un precio aparte a la experiencia acumulada en la integración de plataformas. Un ejemplo es el servicio de agencia que configura en nombre del cliente la aplicación de conexión de cuentas, donde aparecen el nombre y el logotipo de la empresa, y realiza el trámite de revisión de la plataforma. La oferta de septiembre de 2026 era una cuota de configuración única de 100 a 600 dólares por plataforma más una cuota mensual de mantenimiento de 99 dólares, con un mínimo de tres meses. Además del cobro por las llamadas a la API, amplió las fuentes de ingreso a la implantación inicial, la revisión y el apoyo operativo posterior.

En el caso de Geiger, el límite del producto se definió siguiendo el trabajo que los clientes soportan de forma repetida. Ofrecía la recolección y la publicación de datos mediante una API común y vendía como servicio aparte la configuración por cliente y la respuesta a las revisiones. Distinguir las funciones reutilizables entre varios clientes del esfuerzo que crece con cada uno y ponerles precio fue la clave para convertir un pequeño negocio de desarrollo en una estructura de ingresos sostenible.
