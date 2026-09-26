---
{
  "title": "Jonathan Geiger construyó la base de su siguiente negocio vendiendo productos pequeños",
  "summary": "De LectureKit a CaptureKit, SocialKit y PostPeer: cómo Jonathan Geiger convirtió ventas, cierres y una liberación gratuita en código reutilizable y experiencia de captación de clientes para su siguiente producto."
}
---

## Lo que quedó aunque el primer producto no diera ingresos

Jonathan Geiger conservó recursos para su siguiente negocio incluso en productos con resultados flojos. A su primer producto, LectureKit, le dedicó unas 120 horas a lo largo de aproximadamente un año, pero ni uno solo de sus 190 registrados se convirtió en cliente de pago. Llegó a la etapa de terminar el producto y conseguir que la gente se registrara, pero no se transformó en un negocio que siguiera cobrando. Dejó el servicio tal cual durante un tiempo y después lo vendió por 6.750 dólares tras recibir una oferta de compra.

La entrega de LectureKit le enseñó a preparar un producto para que se pudiera vender. Su registro de traspaso, publicado en febrero de 2025, recoge cómo trasladó el código al repositorio del comprador, transfirió la base de datos y el dominio, y copió a una cuenta nueva el contenido guardado en AWS. Incluso en un servicio con ventas flojas, el software que funciona y el entorno de operación eran objeto de compraventa. Cerrar su primer negocio le permitió a Geiger recuperar parte del coste de desarrollo y adquirir la experiencia práctica que usaría en ventas posteriores.

Con WaitListKit se detuvo en una etapa más temprana. Recibió un pago de reserva, pero tras juzgar si era un producto que quería seguir desarrollando, devolvió el dinero al comprador y abandonó el proyecto. El motivo de esta parada hay que distinguirlo de una conclusión de que no hubiera demanda alguna. Aun habiendo confirmado la intención de compra, si al operador le falta la voluntad de mantenerlo y construirlo a largo plazo, podía cerrar el compromiso y pasar al siguiente intento.

## Un experimento con la venta de un kit de inicio barato

NextUpKit fue un experimento de venta de una herramienta de desarrollo barata. Presentado en enero de 2025, era un kit de inicio para Next.js que agrupaba las funciones que implementaba una y otra vez, como el inicio de sesión, los pagos y las conexiones a bases de datos. El precio que planteó entonces era una licencia de por vida de 20 dólares, dirigida a desarrolladores individuales y principiantes a quienes pesaban los productos de la competencia que costaban cientos de dólares. Intentó explicar qué obtendría el comprador y marcar la diferencia bajando el coste inicial.

El arranque no fue malo. Geiger afirmó que vendió tres en las 24 horas posteriores al lanzamiento, y que dos salieron de una lista de espera previa. Un aviso de NextUpKit colocado al pie de LectureKit contribuyó al tráfico de la lista de espera. El servicio anterior, que no había logrado clientes de pago, sirvió también como vía para dar a conocer el siguiente producto.

Unas pocas compras iniciales no hicieron desaparecer el problema con la descripción del producto, sin embargo. De la comunidad llegaron opiniones de que no se entendía exactamente qué se vendía, críticas de que la documentación técnica era escasa y respuestas de que no estaba claro por qué se pedía el nombre de usuario de GitHub durante la compra. Geiger también reconoció que si los visitantes no entendían para qué servía el producto, su explicación no había sido suficiente. Estas reacciones muestran que el trabajo de bajar el precio y el de lograr que el comprador se sienta seguro al elegir requieren esfuerzos separados.

NextUpKit registró después unos 400 dólares de ingresos acumulados, y Geiger lo pasó a código abierto y gratuito. Cada intento anterior recibió un cierre distinto: venta, devolución y abandono, publicación gratuita. No eligió retener todos los productos como negocio de pago.

## Elegir mercados donde los clientes ya pagan

Pasar por estas experiencias afinó su criterio para elegir la siguiente idea. Buscaba que hubiera dos o tres competidores con unos 20.000 a 80.000 dólares de facturación mensual en un campo que entendía. Usaba los ingresos de la competencia como prueba de que había clientes que pagaban por resolver ese problema. A eso sumaba si entendía a los clientes y si podía marcar una diferencia pequeña pero clara. Aun así, los resultados de la competencia no garantizan los ingresos de un producto nuevo, de modo que el paso de confirmar los pagos de sus propios clientes después del lanzamiento seguía siendo necesario.

El producto que encajó bien con ese criterio fue CaptureKit, una API para capturar pantallas y extraer datos web. Crear el producto mínimo viable le llevó unas tres semanas, y en los primeros dos meses consiguió más de 300 registrados y siete clientes de pago. Los ingresos recurrentes mensuales eran de 127 dólares, pero el producto se vendió por 15.000 dólares en unos dos meses y medio. Aunque los ingresos eran pequeños para cubrir un coste de vida continuo, pudo negociar con un comprador que necesitaba la tecnología ya terminada.

Lo que Geiger obtuvo de CaptureKit no se quedó en el importe de la venta. Contó que al desarrollar SocialKit reutilizó los patrones de autenticación, pagos, gestión de claves de API, estructura de documentación y página de presentación. El siguiente producto pudo reducir el trabajo dedicado a funciones comunes ya resueltas. El margen para centrarse en un problema nuevo de cliente salió de la experiencia de implementación del producto anterior.

## De la extracción de datos a una API de publicación

La función de SocialKit era convertir contenido de redes sociales en datos fáciles de usar desde otros programas. Cuando un desarrollador o un experto en marketing enviaba la dirección de un vídeo, obtenía transcripciones, resúmenes, métricas de reacción y similares para conectarlos a su propio servicio o a su trabajo de análisis. Era una estructura que reducía la carga para el cliente de combinar por su cuenta el modo de acceso de cada plataforma y las herramientas de procesamiento de vídeo. Aplicar la experiencia de extracción de datos web a un uso más concreto también dejó más claro el trabajo que asumía el comprador.

La tarea de reunir clientes también empezó junto al desarrollo. Geiger contó que preparó unos 20 temas de artículos al principio de SocialKit y montó páginas de presentación por función concreta y herramientas gratuitas. También trazó planes para dar a los primeros usuarios una ocasión de usarlo y recoger comentarios, y para compartir contenido en varias comunidades de desarrolladores y canales sociales. Mientras construía el producto, construía a la vez las vías por las que llegaría la gente y los puntos de contacto para recibir su opinión después del uso.

Las herramientas gratuitas y la API de pago estaban conectadas para atender el mismo problema a escalas distintas. Por ejemplo, SocialKit ofrecía un extractor de subtítulos de YouTube y un resumidor de vídeo, y a la vez indicaba la API que realiza esa tarea desde un programa. El visitante podía resolver una tarea pequeña por su cuenta y ver los resultados, y cuando necesitaba ejecuciones repetidas o integrarlo en un servicio, podía plantearse usar la API. Esta configuración era una forma de mostrar el valor del producto con resultados reales en lugar de depender solo del texto explicativo.

PostPeer abordó el problema de publicar contenido en redes sociales. Según la explicación de los fundadores, una función que parece sencilla exigía mucho tiempo de desarrollo porque cada plataforma tiene API distintas, procedimientos de conexión de cuentas y gestión de credenciales. PostPeer agrupó ese trabajo en una sola API para publicar en varias plataformas. Los dos productos se diferenciaban en función, uno extraía datos y el otro los publicaba, pero la dirección del negocio continuó: asumir el trabajo que los clientes implementan y mantienen una y otra vez.

## Una tercera venta y la siguiente decisión

PostPeer lo creó junto a Yoav Mendelson. Mendelson también tenía experiencia en desarrollo de software y SaaS, y en su presentación oficial describió su papel como construir una API rápida, predecible y fácil de integrar. Geiger eligió la colaboración al ampliar el alcance de los productos. Mantuvo la experiencia de crear productos en solitario, pero no dejó fijada de antemano la forma de operar del producto nuevo.

En la estructura de venta separó la etapa en que el cliente prueba el producto de la etapa en que lo usa de verdad. Las páginas públicas de precios de ambos productos incluyen opciones de suscripción y de compra por uso, y PostPeer ofrece 20 créditos gratuitos para probar. La configuración permite que un cliente que ha comprobado los resultados a pequeña escala elija el modo de pago que encaja con la frecuencia con que lo usa. También abre una vía hacia el uso de pago para clientes a quienes cuesta decidirse por una suscripción larga desde el principio.

La carga de adopción que siente el comprador también se trató en las páginas de venta. Las páginas de precios de SocialKit y PostPeer incluyen testimonios de clientes que destacan una conexión sencilla y un soporte rápido. En PostPeer en particular figuran un testimonio sobre haber conectado varias plataformas en poco tiempo y otro sobre haber recibido apoyo hasta resolver el problema. Más allá de las funciones y el precio, los dos productos ofrecían información que reducía la preocupación del cliente sobre si podría usarlo de verdad tras comprarlo.

La facturación mensual conjunta de SocialKit y PostPeer que se publicó en una entrevista de julio de 2026 era de unos 6.400 dólares. El desglose era de unos 5.200 dólares de ingresos recurrentes mensuales y unos 1.200 dólares de compras puntuales, y la suma de las dos cifras no es toda ella ingreso recurrente. Fue el momento en que la experiencia de crear y cerrar productos pequeños condujo a ventas sostenidas de los dos productos de API.

Después Geiger anunció también la venta de SocialKit. Las cifras que publicó entonces eran 23.150 dólares de ingresos acumulados, 3.317 dólares de ingresos recurrentes mensuales, 117 suscripciones activas y más de 21.300 registrados. En X explicó que el tamaño de la operación era de 85.000 dólares, sumando 75.000 dólares de venta y 10.000 dólares de consultoría. Era la tercera venta después de LectureKit y CaptureKit, y esta vez entregó un negocio que ya había asegurado ingresos recurrentes.

En el anuncio de la adquisición expuso un plan para centrarse en PostPeer junto con Mendelson. No fijó ni un producto ya crecido como algo que tuviera que conservar, y lo juzgó junto al negocio en el que se centraría después. La experiencia de venta que aprendió al cerrar sus primeros productos se prolongó en la decisión sobre un negocio mayor.

Lo que hizo más favorable el siguiente intento en la trayectoria de Geiger fue convertir los resultados anteriores en cambios concretos. Completó explicaciones que los clientes no entendían, reutilizó trabajo de desarrollo repetido y redujo el rango de elección a campos donde había clientes que pagaban. Cerró productos que no tenía voluntad de seguir operando, y para los que pensaba hacer crecer preparó a la vez las vías de captación de clientes y de pago. Aunque el resultado del primer producto sea pequeño, las condiciones de partida del siguiente pueden mejorarse, y cuando esas mejoras continúan, los intentos repetidos se acumulan en una sola capacidad de negocio.
