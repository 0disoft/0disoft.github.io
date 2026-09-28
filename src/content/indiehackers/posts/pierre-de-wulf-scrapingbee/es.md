---
{
  "title": "Pierre de Wulf creó ScrapingBee vendiendo como API la infraestructura del web scraping",
  "summary": "Cómo Pierre de Wulf y Kevin Sahin convirtieron la ejecución de navegadores y la gestión de proxies del web scraping en la API ScrapingBee, la hicieron crecer hasta superar el millón de dólares de ARR en noviembre de 2021 y los 5 millones en 2024, y vendieron la empresa a Oxylabs en una operación de ocho cifras y todo en efectivo."
}
---

## Convertir la carga operativa recurrente de un desarrollador en un negocio de API

Pierre de Wulf creó junto a Kevin Sahin ScrapingBee, un servicio de API para web scraping. El producto se encarga por cuenta del cliente de la ejecución del navegador y de la gestión de proxies que se necesitan para recolectar datos de páginas web. Una entrevista publicada en abril de 2022 lo presentó como un caso que había alcanzado 1 millón de dólares de ARR, y llamó la atención que los dos cofundadores lo hubieran hecho crecer tras el fracaso de un negocio anterior.

## El problema que descubrieron al crear un servicio de seguimiento de precios

Antes de ScrapingBee, los dos gestionaban ShopToList, una extensión de seguimiento de precios para consumidores. Permitía guardar productos de interés y consultar los cambios de precio, pero la escala de usuarios y la estructura de ingresos no encajaban. Al recordar el negocio más tarde, Pierre explicó que habría necesitado muchos más usuarios de los que había conseguido para alcanzar el punto de equilibrio.

Su siguiente producto, PricingBot, era una herramienta de seguimiento de precios de la competencia para operadores de comercio electrónico. Esperaban que vender a clientes empresariales facilitara la monetización, pero no logró crecer lo suficiente en unos nueve meses. Los dos no habían entendido bien la situación del sector del comercio electrónico, dónde se reunían sus clientes ni qué motivaba de verdad una compra. Vendieron PricingBot y decidieron que su siguiente producto se dirigiría a clientes que conocían bien.

Las herramientas externas de scraping que usaron mientras desarrollaban PricingBot se convirtieron en la pista del nuevo negocio. A Pierre le insatisfacían la velocidad y el rendimiento de las herramientas existentes, y juzgó que había margen de mejora en un mercado donde ya existían negocios de pago. Los dos eran desarrolladores, y Kevin había escrito incluso un libro sobre web scraping, así que esta vez podían entender directamente el trabajo y las dificultades del cliente.

## Convertir la operación de navegadores y proxies en un producto

El usuario de ScrapingBee envía a la API la dirección de la página que quiere recolectar y las opciones necesarias. El servicio procesa JavaScript con un navegador sin interfaz, gestiona los proxies y devuelve el contenido de la página o los datos extraídos. Puede usarse para trabajos que requieren reunir información de forma repetida en muchos sitios web, como precios de productos, resultados de búsqueda o ofertas de empleo. Los clientes reducen la carga de mantener ellos mismos la infraestructura de recolección y conectan los datos que obtienen a sus propios productos o tareas.

El modelo de ingresos combina créditos de API y un límite de peticiones simultáneas dentro de una cuota de suscripción mensual. El consumo de créditos varía según las funciones que necesita cada petición, de modo que el trabajo cuyo procesamiento cuesta más se cobra con más uso. Por ejemplo, en la documentación oficial consultada en septiembre de 2026, una petición básica con un proxy estándar cuesta 1 crédito, incluir el renderizado de JavaScript cuesta 5 créditos, y usar un proxy premium junto con el renderizado cuesta 25 créditos. En esta estructura, tanto el número de peticiones como la dificultad de procesamiento influyen en la elección de plan del cliente.

El producto inicial se entregó a unos 10 usuarios de prueba gratuita reclutados en foros de scraping y comunidades afines. En junio de 2019 pusieron fin a la prueba gratuita y avisaron de que haría falta una suscripción para seguir usándolo. El primer pago llegó 50 minutos después de enviar el primer correo de aviso, lo que les dio una señal de que existía una disposición real a pagar por una herramienta aún en desarrollo.

## Captar clientes con búsquedas y ganar margen con capital externo

El contenido técnico dio resultado pronto en la captación de clientes. Una guía publicada en agosto de 2019 sobre cómo resolver los bloqueos del web scraping se compartió en varios sitios y atrajo rápidamente unos 20.000 visitantes. Un artículo que explicaba en detalle un problema que los desarrolladores intentaban resolver en ese momento se convirtió en una vía para dar a conocer el producto.

También aprovecharon el volumen de uso del producto para las entrevistas con usuarios. Al ofrecer 10.000 llamadas a la API a quien dedicara 15 minutos a hablar de sus necesidades de scraping, pudieron conversar con unas 100 personas en menos de tres meses. Al dar a la gente un motivo para aceptar la entrevista, recogieron con rapidez los propósitos y las dificultades reales de los clientes.

En la primavera de 2020 se unieron al segundo programa de aceleración de TinySeed y recibieron capital externo. TinySeed es un programa que ofrece capital, mentoría y una comunidad de fundadores, y que da peso al control del fundador y a un crecimiento eficiente en capital. ScrapingBee tiene el carácter de un SaaS pequeño que creció combinando la cofundación con el apoyo de un inversor.

En una entrevista posterior, Pierre destacó la tranquilidad psicológica que les dio la inversión. Aunque no gastaron directamente el dinero que levantaron, el hecho de disponer de efectivo suficiente les permitió salir de una situación en la que temían los gastos pequeños y aplazaban decisiones. Recordó que el asesoramiento experto, la mentoría y los contactos con otros fundadores que acompañaron a la inversión fueron también un apoyo importante.

A medida que crecían, Kevin se ocupó del marketing y Pierre del producto y la tecnología, repartiéndose los papeles. Para producir contenido incorporaron a desarrolladores que supieran escribir y montaron un sistema en el que un editor pulía las frases y la estructura. Pierre describió el ritmo de publicación de entonces como unas tres o cuatro piezas al mes, y acumularon tutoriales detallados por lenguaje, framework y librería. Al dejar atrás el modelo en que los dos fundadores escribían todos los artículos, pudieron ampliar su tráfico de búsqueda.

La mejora del producto se centró en reducir las dificultades del desarrollador que lo usaba por primera vez. En 2020 añadieron SDK de Python y JavaScript, ejemplos de código en siete idiomas y un generador de peticiones a la API. Era un trabajo para acortar el camino desde que un desarrollador llegaba por una búsqueda hasta que confirmaba un resultado de recolección real.

## De 1 millón a 5 millones de dólares de ARR

Tardaron unos 18 meses en alcanzar los 10.000 dólares de MRR, ingresos recurrentes mensuales, a finales de 2020. En ese nivel los dos fundadores podían cobrar una retribución parecida a la de sus empleos anteriores, y el negocio era rentable. Subir los ingresos a 20.000 dólares de MRR les llevó unos tres meses más, y alcanzaron realmente el millón de dólares de ARR en noviembre de 2021. El caso de crecimiento presentado en 2022 trata ese hito, logrado unos dos años y medio después del lanzamiento.

En un texto publicado en 2025, Pierre dijo que habían superado los 5 millones de dólares de ARR el año anterior, en 2024. En ese momento el equipo principal era de seis personas: dos cofundadores, un desarrollador, dos responsables de atención al cliente y una persona de posicionamiento en buscadores. También colaboraban con freelance externos para diseño, trabajo especializado de infraestructura y producción de contenido. Así pues, el resultado salió de una estructura operativa que combinaba una plantilla fija pequeña con especialistas externos.

Mantener el equipo pequeño también tenía un coste. En una entrevista de 2024, Pierre dijo que con poca gente la carga recae sobre el tiempo y la energía de los cofundadores, y que asumir varias tareas a la vez pone un límite también a la calidad. Explicó que necesitaban sumar personal y mejorar la operación aunque ello supusiera ceder parte de la rentabilidad. Era difícil juzgar la carga real de trabajo del fundador solo por unos ingresos altos y una plantilla reducida.

## La puesta a punto operativa que hizo posible la venta

Los preparativos de la venta también sacaron a la luz riesgos propios de un negocio de web scraping. Según Pierre, mientras se desarrollaba el primer proceso de venta recibieron un requerimiento de una gran tecnológica para que dejaran de hacer scraping y tuvieron que detener la operación. Antes de intentarlo de nuevo hicieron contrataciones adicionales, estandarizaron el trabajo, documentaron la operación y ordenaron la contabilidad. Más allá del rendimiento del producto y de los ingresos, el comprador necesitaba un sistema operativo y una respuesta al riesgo que pudiera revisar.

Detrás de la decisión de vender de los dos fundadores estaban el cansancio de trabajar mucho tiempo en el mismo campo y un cambio en las prioridades vitales. Añadieron que querían ejercer su opción mientras los ingresos y el crecimiento estaban en buena forma. Entre varias ofertas de adquisición eligieron Oxylabs porque era un negocio que entendía las características y los riesgos del sector del scraping y porque la operación era íntegramente en efectivo.

El 19 de junio de 2025, TinySeed anunció que ScrapingBee había sido adquirida por el grupo Oxylabs. La operación se dio a conocer como una venta íntegramente en efectivo de ocho cifras en dólares, lo que equivale a al menos 10 millones de dólares. El precio exacto de la adquisición y lo que recibió cada cofundador no se confirman en los materiales públicos.

En el anuncio de la venta indicaron que ScrapingBee seguiría operando como producto y sociedad independientes, y que Pierre y Kevin permanecerían en la empresa. La compañía describió una dirección de aprovechar la infraestructura y la experiencia del grupo para mejorar el rendimiento y aumentar el personal de atención al cliente. Fue una operación que expandió dentro de una organización operativa mayor un producto creado por un equipo pequeño.

ScrapingBee muestra que incluso una API de alcance estrecho puede crecer hasta ser un negocio de software considerable si reduce lo suficiente la carga operativa recurrente de un cliente. Durante el crecimiento importaron un producto fácil de usar y una captación constante de clientes, y en la fase de venta hizo falta la madurez del negocio, con documentación operativa, contabilidad y respuesta al riesgo. Los dos fundadores fueron construyendo esas condiciones sumando a su capacidad de desarrollo producción de contenido, personal especializado y apoyo de un inversor, uno tras otro.
