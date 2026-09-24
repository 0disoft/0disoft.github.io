---
{
  "title": "Un pequeño negocio que convierte páginas web en imágenes",
  "summary": "Cómo Dmytro Krasun convirtió su experiencia con APIs en ScreenshotOne, un servicio de capturas web que alcanzó 35.000 dólares de MRR."
}
---

## Un pequeño negocio que convierte páginas web en imágenes

El 29 de mayo de 2022, Dmytro Krasun lanzó ScreenshotOne. El servicio abría una página web y devolvía una imagen cuando otro programa le enviaba su dirección. Los desarrolladores podían integrar esta API en sus propios productos para automatizar las capturas de páginas web. Krasun centró el negocio en hacerse cargo de las complicaciones que implica gestionar un navegador.

Llevaba unos diez años trabajando como desarrollador de backend y había adquirido experiencia creando y operando APIs. En distintas empresas se había ocupado de sistemas de gestión documental, colaboración entre equipos y servicios capaces de procesar grandes volúmenes de solicitudes, pero apenas tenía tiempo para lanzar un producto propio. Cuando se convirtió en padre, decidió compaginar la crianza con el emprendimiento. Tenía ahorros suficientes para cubrir aproximadamente dos años de gastos.

Su primer intento fue una herramienta de analítica para Twitter. Algunos usuarios la probaron, pero Krasun no sentía ganas de seguir desarrollándola. Volvió a lo que mejor conocía —el desarrollo de backend y las APIs— y revisó los problemas con los que se había encontrado. Eligió las capturas de páginas web. Además, encajaban con su experiencia porque exigían relativamente menos trabajo de interfaz que una aplicación con pantallas complejas.

Compró el dominio el 5 de enero de 2022, creó una página de presentación y empezó a desarrollar el producto. También programó el panel donde los usuarios podían probar las capturas, consultar su uso y pasar a un plan de pago. Mientras desarrollaba, publicó artículos sobre el tema y fue atrayendo algunas visitas desde los buscadores. La primera versión tardó unos cinco meses en llegar, contando un periodo en el que no pudo trabajar en ella.

Capturar una página web planteaba muchos problemas. Un aviso de cookies podía tapar el contenido; algunas imágenes no aparecían hasta que el usuario se desplazaba hacia abajo, y otras páginas se capturaban antes de terminar de cargar. ScreenshotOne ofrecía funciones como ocultar avisos y anuncios, capturar la página completa y ajustar el tamaño de la ventana para resolver esos inconvenientes. El cliente obtenía una imagen lista para usar en su propio servicio, y Krasun se centraba en generarla de forma fiable.

## El tiempo que tardó en encontrar a su primer cliente

Aunque ya recibía visitas desde los buscadores, al principio nadie pagaba. En junio de 2022, Krasun probó anuncios de búsqueda, Reddit, Indie Hackers y directorios de productos. Gastó 515 dólares en Google Ads y consiguió 2.144 clics, pero ese mes no obtuvo ningún cliente de pago gracias a la publicidad. Al revisar las búsquedas, vio que tenía que distinguir entre quienes buscaban capturar la pantalla de un ordenador y quienes necesitaban una API como la suya.

El primer pago llegó el 4 de julio. Jannis, a quien había conocido en Twitter, estaba creando un directorio de herramientas para creadores y necesitaba generar automáticamente una imagen del sitio web de cada herramienta. ScreenshotOne resolvía justo esa tarea. El segundo cliente llegó a través de los anuncios de Google, y Krasun empezó a dedicar más esfuerzo a aumentar el tráfico de búsqueda.

En Twitter compartía con regularidad el proceso de creación del producto, los ingresos, los gastos y los tropiezos. Respondía a las preguntas de otros fundadores, les ayudaba con sus lanzamientos y ponía en contacto a personas de su red. Esas relaciones le trajeron clientes iniciales y recomendaciones, y también le ayudaron a seguir adelante en los momentos difíciles. Más adelante explicó que las comunidades de desarrolladores y fundadores habían sido importantes para conseguir sus primeros clientes de pago.

Su contenido para buscadores partía de los problemas que encontraba al desarrollar el producto. Por ejemplo, explicaba cómo ocultar anuncios y avisos de cookies al capturar una página web, y también mostraba cómo hacer lo mismo con ScreenshotOne. Los lectores podían seguir los pasos para implementarlo por su cuenta o elegir un servicio que ya lo resolvía. El conocimiento adquirido durante el desarrollo se convirtió en una forma de llegar a clientes potenciales.

Después de publicar, mejoraba los artículos a partir de los datos reales de búsqueda. Publicó una guía extensa sobre cómo capturar páginas web con Puppeteer y, tres o cuatro semanas después, consultó en Google Search Console qué búsquedas llevaban visitantes al artículo. Descargaba los datos de consultas, impresiones y clics para actualizar el contenido existente o decidir el tema de una nueva publicación. Repetía el ciclo de publicar y revisar alrededor de problemas concretos que sabía resolver.

El lanzamiento en Product Hunt también le ayudó a encontrar clientes. ScreenshotOne quedó entre los productos destacados del día, lo que le dio más visibilidad. Krasun consideró que eso también había favorecido la confianza en el producto y el tráfico desde buscadores. Después convirtió el posicionamiento en buscadores en uno de sus principales canales de captación y siguió mejorando el producto.

## Entender por qué los clientes pagaban

Una de las cosas que Krasun consideró decisivas para hacer crecer el negocio fue entender con más claridad a quién se lo vendía. Según contó, tardó unos dos años en identificar bien a sus clientes. A partir de entonces, empezó a adaptar a ellos las funciones, el contenido, el diseño y los precios. También observaba el recorrido desde la visita hasta el registro y el pago, y corregía lo que no funcionaba en cada etapa.

Typeshare, una plataforma de escritura, fue un ejemplo claro del valor del servicio. La empresa usaba ScreenshotOne para generar imágenes de los textos de sus usuarios y exportarlas a redes sociales y otros canales. Su cofundador, Sam Shore, contó que había gastado miles de dólares desarrollando por su cuenta la generación de imágenes, pero no había conseguido un resultado satisfactorio. Dijo que, al pagar la cuota mensual de ScreenshotOne, obtenía un valor parecido al de tener un desarrollador dedicado a generar imágenes.

La empresa de alojamiento web WordPress Kinsta utilizaba las capturas para verificar actualizaciones. Antes y después de actualizar un plugin o un tema, capturaba las pantallas y comparaba ambas imágenes para detectar cambios visuales inesperados. ScreenshotOne proporcionaba las imágenes necesarias para ese proceso. Así, Kinsta podía revisar el resultado de la actualización y decidir si debía volver a la versión anterior.

Krasun también se ganó la confianza de Kinsta por la rapidez con la que respondía. Si había que ajustar los límites de solicitudes o mejorar una integración, se ponía manos a la obra enseguida. Según contó Kinsta, solicitaron una función que ya estaba disponible en la API, pero que faltaba en la librería para Node.js, y Krasun la corrigió y publicó en cuestión de minutos. Resolver pequeños defectos descubiertos durante la integración ayudó a generar confianza en el servicio.

## Convertir tareas repetitivas en ingresos recurrentes

El modelo de cobro combinaba una suscripción mensual con el uso. Cada plan incluía una cantidad de capturas y, si el cliente necesitaba más, podía pagar por las solicitudes adicionales. Los planes superiores ofrecían más capturas, límites de procesamiento más altos y funciones extra. Así, cuando aumentaba el volumen de trabajo del cliente, también podía crecer lo que pagaba a ScreenshotOne.

El aumento del uso también planteó el reto de controlar los costes de los servidores. Krasun empezó con un servidor de cinco dólares al mes, pero trasladó varias veces el entorno de producción a medida que aumentaba el número de clientes. Primero usó Google Cloud para aprovechar créditos gratuitos y su capacidad de escalar; cuando los costes se hicieron demasiado altos, migró a DigitalOcean. También llegó a subir los precios para cubrir los gastos de infraestructura.

Mientras los ingresos crecían, Krasun también necesitaba cubrir los gastos de su familia. Le preocupaba que sus ahorros iniciales se estuvieran agotando, así que aceptó trabajos de desarrollo para pagar los gastos cotidianos. Más adelante dijo que habría preferido empezar con esos trabajos antes y reducirlos poco a poco a medida que crecieran los ingresos de su propio producto.

En septiembre de 2024, ScreenshotOne alcanzó los 10.000 dólares de ingresos recurrentes mensuales (MRR), el primer objetivo que Krasun se había marcado para el negocio. En junio de 2025, el MRR llegó a 20.000 dólares. En una publicación de julio de ese año, contó que ya superaba el sueldo que cobraba en su antiguo trabajo y que la familia tenía más margen para viajar y cubrir sus gastos.

El 29 de mayo de 2026, al cumplirse cuatro años del lanzamiento, ScreenshotOne registró 33.000 dólares de MRR y más de 1.000 clientes de pago. La API ya había procesado más de 100 millones de solicitudes. En su publicación del 31 de agosto de ese año, Krasun situó el MRR en torno a los 35.000 dólares. El servicio que obtuvo su primer cliente cuando este necesitó imágenes para un directorio web se había convertido en un negocio que gestionaba tareas recurrentes para muchas empresas.

Los usos también llegaron al ámbito de la inteligencia artificial. En un caso publicado en julio de 2026, Toolhouse permitió a sus usuarios conectar su propia clave de la API de ScreenshotOne para que un agente de IA pudiera capturar y analizar páginas web. El cofundador de Toolhouse explicó que llevaba tiempo siguiendo el proceso de desarrollo de Krasun y que por eso pensó primero en ScreenshotOne cuando necesitó esa función. Los avances que Krasun compartía públicamente y las relaciones que había creado le ayudaron a encontrar clientes para nuevos usos.

En la retrospectiva del cuarto aniversario, Krasun destacó que el negocio le permitía pasar tiempo con su familia y estar presente en momentos importantes de la vida de sus hijos. El producto que sostenía esa vida se centraba en convertir páginas web en imágenes de forma fiable. Typeshare generaba imágenes de textos; Kinsta verificaba actualizaciones, y Toolhouse analizaba páginas web, pero las tres empresas necesitaban la misma función de captura. ScreenshotOne se ocupaba de esa tarea común, resolvía los problemas que aparecían en el uso real y daba a sus clientes motivos para seguir pagando.
