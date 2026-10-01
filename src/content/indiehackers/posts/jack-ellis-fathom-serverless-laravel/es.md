---
{
  "title": "Jack Ellis convirtió un servicio de analítica web y un curso para desarrolladores en un negocio",
  "summary": "Cómo Jack Ellis se unió a Fathom Analytics como cofundador técnico y convirtió su experiencia operativa en el curso Serverless Laravel. Separa los ingresos por suscripción del servicio de analítica de las ventas acumuladas del curso y repasa la compra de la participación del cofundador y la reconstrucción técnica."
}
---

Jack Ellis es cofundador de Fathom Analytics, un servicio de analítica web centrado en la privacidad, y creador de Serverless Laravel, un curso para desarrolladores. En Fathom ofrece analítica a los operadores de sitios web, y en el curso enseñaba a los desarrolladores cómo desplegar y escalar una aplicación. Los dos negocios están conectados por la misma experiencia técnica, pero hay que leer por separado sus clientes, su forma de cobro y sus cifras de ingresos.

## De un producto propio fallido a la cofundación

Ellis, de origen británico, aprendió desarrollo web empezando por PHP a los trece años. Quería crear su propio negocio incluso después de empezar a trabajar, y en 2013, a los veinte años, dejó su empleo y empezó a desarrollar Raw Gains, una aplicación de musculación y entrenamiento. Creó el servicio él solo, con gestión de los nutrientes de la dieta y los planes de ejercicio y con la posibilidad de compartir información con un entrenador, y pensaba ganar dinero con cuotas de uso y ventas de afiliados.

El problema estaba en el orden con el que llevó el negocio, no en su capacidad de desarrollo. Se quedó atascado en el diseño detallado y tardó más de un año en mostrar el producto. Esperaba que llegara gente al lanzarlo, pero no tenía una estrategia real para captar clientes, y después reconoció que debería haber publicado la función principal en pequeño y haber comprobado la reacción.

El punto de partida de Fathom no fue Ellis, sino una idea de Paul Jarvis. En abril de 2018 Jarvis mostró las pantallas de una herramienta de analítica web sencilla y fiable, y después creó una versión de código abierto y una versión de pago alojada junto con Danny van Kooten. Cuando Danny se retiró para centrarse en otros proyectos, la continuidad del servicio quedó en duda, y Ellis se unió como cofundador técnico a principios de 2019.

Ellis y Jarvis también desarrollaban entonces Pico, una plataforma de publicación. Pero decidieron centrarse en Fathom, que ya tenía clientes que pagaban, en lugar de un proyecto nuevo con lista de espera y sin ingresos.

La colaboración fue la ocasión que cubrió lo que a Ellis le faltaba por su cuenta. Jarvis destacaba en diseño y marketing, y Ellis destacaba en desarrollo de software y operación de infraestructura. Ellis, que había visto la cofundación como una pérdida de control y de ingresos, admitió que, al mirar atrás al fracaso de Raw Gains, esa idea lo había retenido durante mucho tiempo.

## Software que vende privacidad y comodidad de operación

Fathom es un producto que muestra de forma concisa las estadísticas que necesita un operador de sitios web, como las visitas, las páginas vistas y las fuentes de tráfico. En lugar de añadir funciones sin fin, tomó como diferencial una pantalla fácil de entender y la protección de la privacidad. Incluso al revisar las peticiones de funciones de los clientes, la empresa usaba como criterio importante la coherencia con la sencillez del producto y con sus principios de privacidad.

Que no use cookies no significa, sin embargo, que no procese ninguna información. Fathom explica que calcula con la dirección IP y la información del navegador un identificador de visitante por sitio que cambia cada día, y que no guarda la IP original en un campo aparte en los registros de analítica habituales. Es un diseño que limita el seguimiento de los visitantes a largo plazo y, a la vez, ofrece las estadísticas que necesita la operación de un sitio web.

El modelo de ingresos no consiste en vender los datos de los usuarios, sino en cobrar a los operadores de sitios web una cuota por el software. En la página de precios consultada el 1 de octubre de 2026, el tramo de 100.000 páginas vistas al mes cuesta 15 dólares al mes, incluye 50 sitios de forma predeterminada y permite comprar sitios adicionales por separado. La empresa insiste en que es un negocio independiente que se financia con lo que pagan los clientes, sin inversión externa.

El valor del producto de pago no se explica solo con la pantalla de estadísticas. Si los clientes operan ellos mismos una herramienta de analítica de código abierto, tienen que asumir la instalación del servidor, la gestión de la base de datos, las revisiones de seguridad y la respuesta ante fallos. Fathom se encarga de ese trabajo en su lugar, así que podía ser un servicio de pago que ahorra tiempo incluso a los desarrolladores capaces de instalarlo por su cuenta.

## Reconstruir la tecnología y captar clientes

Lo primero que Ellis tocó tras incorporarse fue la estructura técnica existente. El Fathom inicial estaba escrito en Go, pero él rehízo el producto de pago, Fathom Pro, con Laravel, un framework de PHP que conocía bien. Fue la decisión de elegir una tecnología con la que pudiera mejorar rápido y operar con responsabilidad, en lugar de tratar un lenguaje nuevo como una ventaja competitiva en sí mismo.

La transición de infraestructura tampoco se resolvió de una vez. Primero pasó de una estructura centrada en servidores dedicados a Heroku, que permitía escalar de forma automática, y separó la API, la recogida de datos y el cobro para que cada parte escalara por su cuenta. Después adoptó Laravel Vapor y pasó a una operación sin servidor sobre AWS, y la experiencia acumulada en ese proceso se convirtió más tarde en el material del curso.

Para captar los primeros clientes, los lectores del boletín y los seguidores de Twitter que Jarvis ya tenía tuvieron un papel importante. Publicar el código y lanzar en Product Hunt también atrajo atención, pero los fundadores explicaron que el reconocimiento y el número de clientes se acumularon de forma constante, más que dispararse por un suceso concreto. Por eso, leer Fathom como un caso de éxito por crear solo el producto, sin un público ni un canal de distribución previos, deja fuera las condiciones de partida.

A medida que el servicio crecía, cobró importancia el contenido que mostraba la experiencia real de operación. Textos técnicos como la historia de un ataque DDoS y el pódcast Above Board, sobre la gestión del negocio, ponían por delante lo que un lector podía aprender antes que la publicidad del producto. Sumando otros canales como un programa de afiliados, intentaban construir una marca de producto que no dependiera solo de la fama personal de los fundadores.

## Convertir la experiencia de operación en un curso para desarrolladores

La demanda de Serverless Laravel apareció mientras Ellis publicaba los problemas técnicos de Fathom y cómo los resolvía. Cuando empezaron a llegar preguntas y correos de desarrolladores, decidió convertir su experiencia operativa en un producto educativo estructurado.

El público del curso se parecía más a desarrolladores que querían operar una aplicación Laravel como servicio real que a alguien que aprendía sintaxis de PHP por primera vez. La plataforma que utiliza, Laravel Vapor, es un servicio de despliegue sin servidor sobre AWS, y el producto que creó Ellis es un curso que enseña a usar esa plataforma. El contenido incluía no solo el despliegue, sino también la latencia de la primera respuesta, el escalado de la base de datos, la prevención de ejecuciones duplicadas de tareas, la respuesta ante fallos y la gestión de costes.

El material promocional publicado en Laravel News en mayo de 2021 presentaba 49 lecciones a un precio de 249 dólares. Los compradores también recibían una comunidad privada de Slack, materiales adicionales futuros y actualizaciones de por vida. A diferencia de Fathom, que presta un servicio de analítica cada mes, era un producto educativo que empaquetaba conocimiento especializado y lo vendía.

Mientras preparaba la venta, creó una lista de espera y publicó consejos técnicos breves y el proceso de producción. Siguió promocionando después del lanzamiento y no dio por terminadas las ventas tras un solo anuncio. El orden era distinto del de Raw Gains, cuando buscó usuarios solo después de terminar el producto.

En una entrevista de Indie Bites publicada el 28 de octubre de 2021, Ellis dijo que el curso había generado 150.000 dólares de ingresos acumulados desde su lanzamiento en marzo de 2020. Esa cifra no son los ingresos recurrentes mensuales ni anuales de Fathom, ni tampoco los ingresos mensuales del curso. No se presentó como beneficio neto tras restar costes e impuestos, y es un dato que el propio fundador dio a conocer en la entrevista.

Ellis explicó que los ingresos del curso le ayudaron a reducir el trabajo de consultoría y a centrarse en Fathom. Mientras Fathom no podía sustituir de inmediato sus ingresos de consultoría, los ingresos de un producto aparte amortiguaron el hueco de ingresos durante la transición.

## Propiedad y crecimiento después de la cofundación

En 2024 hubo un cambio importante en la estructura de propiedad de Fathom. Ellis compró la participación de Jarvis, que quería jubilarse, y desde el 1 de diciembre de 2024 pasó a ser dueño y a controlar la empresa por completo. El título de la publicación aparecida al día siguiente anunciaba una adquisición de empresa, pero no fue una venta a una compañía externa, sino una operación que ordenó la propiedad entre los cofundadores, y el precio no se hizo público. Jarvis acordó seguir ayudando con el diseño como freelancer a tiempo parcial.

En 2026 Fathom se movió en la dirección contraria y adquirió otro servicio de analítica. El 15 de abril adquirió Gauges, un servicio de analítica web en tiempo real, y las consultas de migración de clientes que se enfrentaban al cierre del servicio fueron el detonante de la operación. Una actualización del 21 de agosto indicó que los clientes y los datos históricos se habían migrado a Fathom, así que a la captación de nuevos registros se ha sumado una forma de crecer que consiste en asumir una base de clientes existente.

La estructura técnica tampoco se quedó donde la dejó el curso anterior. En un texto publicado en julio de 2026, Ellis explicó cómo migró más de 65.000 millones de registros de datos y separó los datos de analítica en ClickHouse y los de transacciones y operación en PlanetScale. Es más un caso de haber cambiado la estructura que él mismo creó cuando cambiaron la escala y las necesidades del negocio que un caso de haber mantenido una tecnología concreta.

La clave del caso de Ellis no es la fórmula de que añadir un curso al software aumente los ingresos de forma automática. Fathom vendía la comodidad de operar un sistema de analítica en nombre del cliente, y Serverless Laravel vendía el conocimiento que ayuda a los desarrolladores a resolver problemas de operación parecidos. La razón para mirar los dos negocios juntos es que el mismo conocimiento puede convertirse en productos distintos según a quién le quite qué carga.
