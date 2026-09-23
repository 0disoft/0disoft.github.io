---
{
  "title": "El fundador que convirtió documentos de Notion en un sitio de soporte: HelpKit",
  "summary": "Cómo Dominik Sobe creó HelpKit a partir de su propio problema de soporte y creció desde dos preventas hasta 10.000 dólares de ingresos recurrentes mensuales."
}
---

## El problema descubierto en su propio soporte

Dominik Sobe quería dedicar menos tiempo a la atención al cliente mientras gestionaba sus propios productos. Cada vez que lanzaba una aplicación móvil o un SaaS tenía que explicar cómo usarlo y cómo resolver problemas, y atender él solo todas las consultas le consumía muchísimo tiempo. Los clientes querían respuestas inmediatas cuando algo fallaba. Quería un sitio de ayuda donde reunir las respuestas a las preguntas frecuentes para que los clientes pudieran encontrarlas por sí mismos.

Sobe, originario de Austria, estudió economía y gestión estratégica, y más tarde sistemas de información en la Universidade Nova de Lisboa, donde empezó a crear productos. Aprendió desarrollo y diseño trabajando directamente en sus proyectos. Como ya organizaba la documentación de su negocio en Notion, quería usar la misma herramienta para redactar la ayuda. Pensó que si podía escribir en un editor familiar y publicar directamente a los clientes, gestionar la documentación sería mucho más fácil.

En aquel momento, las páginas públicas de Notion se quedaban cortas como sitio de ayuda empresarial. Mostraban la dirección y la marca de Notion, y ofrecían pocas opciones para adaptar el diseño a cada empresa. HelpKit, el servicio que decidió crear, convertía los documentos escritos en Notion en un sitio de soporte con la marca y el dominio propios de la empresa. La redacción y la colaboración seguían en Notion, mientras HelpKit se encargaba de la presentación y la navegación de cara al cliente.

## Dos preventas y un correo electrónico

Sobe no empezó a programar en cuanto se le ocurrió la idea. Sus proyectos anteriores le habían enseñado que el entusiasmo inicial no garantiza una demanda real, así que esperó unos dos meses para comprobar si seguía queriendo resolver ese problema. Como el interés no se apagó, diseñó las pantallas en Figma y creó una página de presentación. Añadió un botón de pago de Gumroad para ofrecer la suscripción anual de 39 dólares en preventa.

En julio de 2021, presentó la página ante sus unos 300 seguidores de Twitter. El interés de la comunidad de Notion le hizo ganar unos 100 seguidores en un día, pero durante la primera semana no llegó ninguna preventa. Sobe se había fijado como condición para empezar a desarrollar conseguir diez preventas. La semana siguiente llegaron dos, y la posterior, ninguna más.

Por entonces, alguien que había descubierto HelpKit le envió un correo largo. Contenía tantos consejos y sugerencias que leerlo llevaba más de diez minutos, y venía de una persona sin ninguna relación personal con él. En ese mensaje vio un interés concreto por el producto. Aunque no alcanzó su objetivo de preventas, decidió construir la primera versión apoyándose en esos dos pagos y en los comentarios detallados.

Crear la primera versión funcional le llevó alrededor de un mes. Mientras programaba, compartió su avance en público, conversó con usuarios de Notion y siguió con interés lo que otros estaban construyendo. Cuando lanzó el producto en agosto de 2021, ya había gente que conocía su nombre y su proceso. Esa cercanía se tradujo en los primeros registros y recomendaciones.

## Conectar la escritura con la experiencia del cliente

Usar HelpKit empieza por duplicar una plantilla de Notion en el propio espacio de trabajo. El usuario redacta la ayuda en la plantilla y conecta a HelpKit la dirección de la página de Notion que quiere publicar. Después configura elementos de marca como el logotipo y los colores, y queda creado el sitio visible para los clientes. Como el contenido original se sigue gestionando en Notion, el equipo puede continuar trabajando en un entorno de escritura familiar.

La documentación puede mostrarse como un sitio de ayuda independiente o como un widget integrado en la web. Con el widget, el cliente busca y lee la ayuda sin salir de la pantalla del servicio que está usando. También ofrece una vista de centro de ayuda, pensada para el soporte general, y una vista documental, adecuada para manuales de producto y API. La idea es colocar la misma base documental en varios puntos de contacto para acortar el camino del cliente hasta la respuesta.

Crear un flujo tan sencillo exigió un trabajo de desarrollo considerable. Sobe implementó el primer HelpKit directamente con Nuxt y Node, y cuidó especialmente que los distintos bloques de Notion se mostraran con naturalidad en un sitio externo. También revisó varias veces la pantalla de configuración inicial para conectar páginas de Notion. Con los comentarios de los primeros clientes, fue corrigiendo uno por uno los puntos donde la conexión y la visualización se atascaban.

El caso de Email Love, una herramienta de diseño de correos, muestra cómo se usa en la práctica. La empresa organizó su ayuda en torno a las tareas que los clientes realizan con más frecuencia, como añadir imágenes, personalizar componentes e insertar enlaces. Después mejoró los documentos a partir de las analíticas de HelpKit y de las reacciones de los clientes. Su fundador, Andy King, explicó en una entrevista publicada en 2024 que, al reducirse las solicitudes de soporte, pudo dedicar más tiempo a desarrollar funciones nuevas y a mejorar el producto.

## De once clientes a 10.000 dólares de ingresos recurrentes mensuales

Una herramienta gratuita para usuarios de Notion también ayudó a atraer a los primeros clientes. Sobe creó «Notion Simple Table» para resolver lo incómodo que resultaba entonces crear tablas sencillas en Notion. La herramienta generaba un código que el usuario podía pegar en Notion según la tabla que hubiera configurado, y en su sitio colocó un enlace hacia HelpKit. Quienes llegaban por la herramienta gratuita descubrían así el producto de pago pensado para el mismo entorno de Notion.

Según los datos que Sobe publicó en noviembre de 2021, HelpKit tenía once clientes de pago y unos ingresos recurrentes mensuales (MRR) de 241 dólares. La mayoría utilizaba el plan superior. Entre los clientes más recientes, algunos habían pagado la tarifa anual de una sola vez. Sobe interpretó ese pago como una señal de confianza en el producto.

También ajustó el proceso para convertir registros en usuarios activos. Al principio contactaba directamente con quienes se apuntaban a la prueba gratuita de siete días para pedirles su opinión, pero recibía pocas respuestas para el tiempo invertido. Después dedicó un día a preparar una secuencia de cinco correos de orientación enviados durante el periodo de prueba. Invitar a escribir si surgía alguna dificultad le permitió obtener respuesta de más clientes.

Cuando una empresa grande pedía una función que aún no existía, proponía una llamada breve. Escuchaba para qué trabajo necesitaban esa función y explicaba lo que ya podía ofrecer y sus planes futuros. Según Sobe, muchas peticiones que al principio parecían una condición indispensable dejaban de ser un obstáculo para contratarse después de conversar. Con ese contacto directo identificaba lo que el cliente valoraba de verdad.

El 28 de febrero de 2022, anunció 51 clientes de pago y 1.020 dólares de ingresos recurrentes mensuales. Los planes eran entonces Essential, de 19 dólares al mes, y Premium, de 29 dólares al mes. El 65 % de los clientes de pago usaba Premium, lo que confirmaba que había un número considerable de clientes dispuestos a pagar por funciones adicionales.

En abril del mismo año, los ingresos recurrentes mensuales llegaron a 2.000 dólares, con más de 90 clientes que gestionaban más de 3.000 artículos de ayuda. Según explicó Sobe, tardó unos cinco meses en alcanzar los primeros 1.000 dólares, y alrededor de un mes y medio en sumar los siguientes 1.000. En junio superó los 130 clientes de pago y los 3.000 dólares recurrentes mensuales. Dijo que, gracias a ese nivel de ingresos, pudo terminar sus estudios y dedicarse por completo al desarrollo independiente de productos.

El lanzamiento en Product Hunt llegó el 25 de agosto de 2022, casi un año después de la salida del producto. Sobe eligió ese momento porque quería ver qué reacción obtenía cuando ya contaba con clientes reales. Sus clientes dejaron en los comentarios su experiencia y sus recomendaciones, de modo que junto a la descripción del producto aparecieron valoraciones de usuarios auténticos.

En mayo de 2023 alcanzó los 10.000 dólares de ingresos recurrentes mensuales. Sobe anunció que un negocio iniciado en solitario y sin inversión externa había llegado a esa cifra, y contó que cientos de empresas estaban convirtiendo sus documentos de Notion en sitios de soporte y manuales con HelpKit. En una entrevista de julio de 2025, indicó que superaba los 400 clientes, incluidas universidades y grandes empresas.

## Resolver el mismo problema con mayor profundidad

En septiembre de 2023 lanzó HelpKit AI. Cuando el cliente escribe una pregunta, la función busca información relevante en la ayuda existente, compone una respuesta y permite ir al documento de referencia. Así, los textos ya redactados también sirven para la atención conversacional. Al ofrecerla como complemento de pago sobre la suscripción básica, amplió lo que podía vender a sus clientes actuales.

En 2025 dedicó varias semanas a reorganizar el código para añadir el soporte multilingüe. Sobe explicó que era la función más solicitada por los clientes. Después lanzó un SDK de React Native para usar HelpKit dentro de aplicaciones móviles. Con ello amplió el producto para mantener el mismo sistema de soporte aunque crecieran los idiomas y las pantallas donde se necesita la documentación.

También publicó cifras de retención. Según explicó en agosto de 2025, la tasa de cancelación de clientes se había situado por debajo del 2 % en algunos meses recientes, con un promedio mensual de alrededor del 2,5 % en los doce meses anteriores. Varios de los primeros clientes seguían usando el servicio casi cuatro años después de haberse registrado.

Sobe contó que, aun en su cuarto año como fundador, respondía personalmente las consultas de soporte que llegaban. Las preguntas repetidas las resolvían la ayuda, la búsqueda y el chatbot, mientras él se ocupaba directamente de los problemas que no se solucionaban por esa vía. Consideraba parte esencial de la retención explicar la situación a los clientes que sufrían un error y comprobar que quedara resuelto. Mientras reducía el trabajo de soporte de las empresas que usan HelpKit, mantenía una relación directa con sus propios clientes.

La propia naturaleza del sitio de ayuda también influía en la retención. Sobe explicó que, una vez que una empresa redacta sus documentos, los conecta al servicio y consolida la forma de gestionarlos entre sus responsables, cambiar a otra herramienta exige de nuevo un trabajo considerable. Por eso era importante que la publicación, la búsqueda y la configuración de marca funcionaran con estabilidad, tal como esperaban los clientes. Corregir las molestias detectadas en el uso real ocupaba el centro de la operación del producto.

Lo que HelpKit reunía en un solo producto era el recorrido que va desde redactar la documentación hasta resolver el problema del cliente. Las empresas escribían sus explicaciones en el familiar Notion, las publicaban con HelpKit, observaban la respuesta de uso y completaban lo necesario. Sobe cobraba una suscripción por mantener ese ciclo en funcionamiento. Aliviar la carga repetitiva del soporte de otros negocios se convirtió en sus ingresos recurrentes.
