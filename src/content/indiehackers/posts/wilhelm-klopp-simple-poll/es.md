---
{
  "title": "Wilhelm Klopp — Simple Poll: convertir una pequeña función dentro de Slack en un negocio",
  "summary": "El proceso de monetizar una aplicación gratuita de encuestas para Slack y hacerla crecer como negocio de un equipo pequeño, con soporte para la recopilación recurrente de opiniones de una organización y los requisitos de operación empresarial."
}
---

Simple Poll, creado por Wilhelm Klopp, es una aplicación que permite crear preguntas, recibir votos y consultar resultados dentro de Slack. La clave del producto es hacer que los empleados respondan directamente en el canal donde conversan habitualmente, sin tener que ir a un enlace externo de encuesta. Es un caso de cómo una recopilación sencilla de opiniones se convirtió en un servicio de pago que la empresa usa de forma recurrente.

## La pequeña incomodidad que descubrió un estudiante universitario

Klopp estudiaba Administración de Empresas en la universidad, pero también se relacionaba con estudiantes de Ingeniería Informática y creaba proyectos paralelos. Al decidir algo juntos en Slack, sintió la necesidad de una función de votación, y ese fue el punto de partida de Simple Poll. Según su propia retrospectiva de desarrollo, escribió el primer código a finales de diciembre de 2015.

Al principio también tenía la motivación de conseguir trabajo en Slack. Explicó que le atraía que Slack, aun siendo software empresarial, fuera tan fluido y fácil de usar como una app de consumo general. Simple Poll también aspiraba a ser un producto cómodo no solo para los responsables de compra, sino para los empleados que realmente lo usan a diario.

El modo de uso se puede explicar con un comando breve. Por ejemplo, al introducir `/poll "¿Cuándo hacemos la reunión?" "martes" "miércoles"` se crea una votación con pregunta y opciones. También se puede introducir solo `/poll` para abrir la ventana de configuración, de modo que incluso quienes no están familiarizados con los comandos puedan completarla viendo la pantalla.

Una entrevista publicada por Slack en 2021 presentó cómo el Simple Poll inicial se extendió a cientos de espacios de trabajo en unos días. Klopp también presentó después, en su charla de DjangoCon 2024, la importancia de crear productos sobre plataformas existentes y de los canales de distribución como lecciones principales. Es como haber entrado en un mercado donde ya estaban preparados el lugar para descubrir el producto y el lugar para usarlo.

## Monetizar un proyecto gratuito y dejar GitHub

Simple Poll fue al principio un proyecto gratuito. Mientras trabajaba en GitHub, Wilhelm Klopp reflexionó sobre sus opciones económicas a raíz de la adquisición de GitHub por Microsoft y decidió empezar a cobrar por una aplicación que ya contaba con usuarios. Según una retrospectiva de 2024, aproximadamente un año después de empezar a cobrar, los ingresos del negocio superaron el salario que recibía en GitHub.

Su salida de GitHub se produjo en septiembre de 2019. Mantuvo su empleo mientras operaba el producto y confirmaba la demanda de pago; después pasó a concentrarse a tiempo completo en Simple Poll.

La dificultad de compaginar ambas actividades era la falta de tiempo para desarrollar. Klopp recordó que, mientras tenía empleo, entre semana le faltaba energía para trabajar y que incluso los fines de semana dedicaba mucho tiempo al soporte al cliente. Después de empezar a cobrar, se sumaron tareas financieras y legales.

El desempeño justo después del cambio a tiempo completo también fue distinto de lo esperado. Pensaba que dedicar 40 horas a un negocio al que destinaba aproximadamente 10 horas o menos por semana aceleraría mucho su crecimiento, pero el mes siguiente a su salida de GitHub experimentó por primera vez una caída de ingresos. Más adelante, al explicar esa experiencia, insistió en que importa más en qué se concentra uno que el número de horas invertidas.

La introducción de la entrevista de Indie Bites del 24 de octubre de 2020 indicaba que Simple Poll sostenía el sustento a tiempo completo de Klopp y de un pequeño equipo. Un proyecto que había empezado como herramienta gratuita se había convertido en un negocio capaz de cubrir los gastos personales del fundador y la operación del equipo. En esa introducción no se revelaba ninguna cifra concreta de ingresos recurrentes mensuales (MRR) ni de beneficio neto.

## De la votación del menú del almuerzo a la retroalimentación periódica de la organización

El caso de uso representativo inicial eran decisiones ligeras de equipo, como “¿Dónde almorzamos hoy?”. A medida que se extendió el trabajo remoto, el uso se amplió a tareas recurrentes como confirmar quiénes piensan ir a la oficina o hacer un chequeo del estado del equipo. En una entrevista de 2021, Klopp presentó el caso de una encuesta que se publicaba automáticamente todos los días a las 7 de la mañana para preguntar si la gente iría a la oficina.

Los usuarios también pedían preguntas más largas y comentarios privados, y en respuesta se desarrolló Simple Surveys. Según la descripción de entonces, permitía enviar encuestas a empleados designados y que solo quien las creaba viera los resultados, además de admitir respuestas anónimas y texto libre. El producto se amplió de encuestas puntuales a la recopilación de opiniones dentro de la organización.

## Una estructura que separó el uso gratuito del pago de las organizaciones

El sistema de precios también se reorganizó para adaptarse a la expansión del producto. La empresa introdujo el plan Premium en 2021 y, desde enero de 2024, convirtió los planes anteriores —Manager, Director, Small Business, etc.— a Premium al momento de la renovación. La comunicación oficial señaló como motivo del cambio la creciente dificultad de seguir dando soporte a las nuevas funciones en cada uno de los planes anteriores.

En la lista oficial de precios consultada el 4 de octubre de 2026, el plan gratuito ofrece 100 respuestas al mes. Se pueden crear votaciones sin límite de cantidad, pero cada votación admite como máximo 5 opciones, y también incluye funciones básicas como la votación anónima y la selección múltiple. El criterio importante que separa lo gratuito de lo pago es el volumen de respuestas realmente recogidas, más que el número de votaciones creadas.

Premium se aplica a todo el espacio de trabajo y su precio varía según el tramo de número de miembros. En el tramo de 1 a 24 miembros, se muestra un equivalente mensual de 49 USD con facturación anual y un importe facturado anual de 588 USD. Este plan incluye respuestas ilimitadas, votaciones recurrentes y programadas, encuestas de hasta 20 preguntas, exportación de resultados y uso de API, entre otras funciones.

Con esta estructura de cobro, cuanto más a menudo recopila opiniones un equipo, mayor es la necesidad de actualizar. Por ejemplo, si 20 personas responden cada una a 5 preguntas, se consumen las 100 respuestas incluidas en el plan gratuito. Un solo pago permite que todos los miembros del espacio de trabajo usen las funciones de pago, de modo que la unidad de facturación se adaptó a la organización.

## Las operaciones empresariales necesarias detrás de una pantalla pequeña

La configuración técnica que Wilhelm Klopp reveló en 2020 estaba formada por Django y PostgreSQL. Explicó que tenía que distinguir usuarios, información de instalación de la aplicación, tokens de acceso y datos de votaciones de múltiples espacios de trabajo, y también gestionar Slack Enterprise Grid, que agrupa varios espacios de trabajo de grandes empresas. Se necesitaba una base para manejar con precisión los datos y permisos de cada organización.

En la adopción empresarial, los administradores y la seguridad también eran importantes. Klopp señaló como factor de éxito que al principio se necesitaban pocos datos, y aconsejó colaborar para que los administradores de Slack pudieran ayudar a los empleados a utilizarlo. Era un enfoque orientado a ofrecer tanto una experiencia de uso cómoda para los empleados como un alcance de acceso a los datos explicable para los administradores.

La página oficial de seguridad actual declara una certificación ISO 27001, pruebas de penetración externas, cifrado en reposo y en tránsito, e inicio de sesión mediante la cuenta de Slack, entre otras medidas. El plan Enterprise añade a esto la aplicación a toda la organización, la revisión de seguridad, el soporte al cliente dedicado y procedimientos de compra empresariales como el pago mediante orden de compra y factura. Así, el producto incorpora los requisitos operativos que permiten a una empresa seguir adoptándolo y manteniéndolo.

La dependencia de la plataforma es una de las principales limitaciones de este negocio. Por la estructura del negocio, hay que responder a los cambios en las funciones, los permisos y las políticas de distribución de Slack, y la vía para entregar el producto a los clientes también está atada a Slack. En la entrevista de Indie Bites de 2020, el riesgo de construir un negocio sobre otra plataforma también se trató como tema aparte.

## Formar un equipo y pasar al siguiente producto

En la introducción de la presentación de DjangoCon Europe 2024, Simple Poll se describió como una empresa SaaS operada por un equipo de siete personas. Lo que en sus inicios era un proyecto personal se convirtió, durante su crecimiento, en un negocio de equipo en el que varias personas asumen el desarrollo y las operaciones.

En una entrevista publicada en mayo de 2024, Wilhelm Klopp reveló que había delegado las operaciones diarias de Simple Poll en un nuevo CEO y que se estaba concentrando a tiempo completo en Kolo. Kolo era una herramienta que había empezado a crear mientras desarrollaba Simple Poll, con el fin de mejorar su propia experiencia de desarrollo. Las incomodidades que descubrió al operar el primer producto se convirtieron en el punto de partida del siguiente producto.

La estrategia que puede leerse en Simple Poll consiste en entrar con una función pequeña en entornos de trabajo donde ya hay usuarios reunidos y cobrar por aquellos aspectos necesarios para el uso recurrente y la operación de la organización. De este modo, Klopp convirtió un proyecto personal en su profesión y, más adelante, formó un equipo al que delegar las operaciones para asegurarse el tiempo necesario con el que crear el siguiente producto.
