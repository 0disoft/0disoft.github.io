---
{
  "title": "Andy Cloke creó Data Fetcher vendiendo como suscripción las conexiones de datos de Airtable",
  "summary": "Cómo Andy Cloke convirtió la tarea recurrente de llevar datos de API externas a Airtable en la extensión Data Fetcher, la financió con la venta por 55.000 dólares de su anterior directorio de TikTok Influence Grid, la hizo crecer hasta 20.000 dólares de ingresos recurrentes mensuales en septiembre de 2023 y 23.000 dólares en 2024, y la mantuvo como un negocio de una sola persona atado al marketplace de Airtable."
}
---

## Convertir un problema de conexión de datos en Airtable en un negocio de suscripción

Data Fetcher, el producto de Andy Cloke, es una extensión que lleva a Airtable los datos de API de servicios externos. Una entrevista de Indie Bites publicada el 28 de septiembre de 2023 lo presentó como un negocio que había alcanzado 20.000 dólares de ingresos recurrentes mensuales (MRR). Resolvía la incomodidad que sentían los usuarios de Airtable al recopilar y actualizar datos, y creció hasta convertirse en un negocio de suscripción que un desarrollador independiente podía operar.

## De los primeros proyectos a la idea de Airtable

Cloke estudió ingeniería en Oxford y después aprendió programación por su cuenta, trabajando como desarrollador en startups de Londres. Al principio creó un sitio para aprender español y una aplicación de preguntas de fútbol, pero la experiencia de conseguir usuarios gratuitos no se tradujo en ingresos estables. Pasar por varios proyectos le enseñó tanto la dificultad del desarrollo como la de retener usuarios y monetizar.

El primer producto que generó ingresos significativos fue Influence Grid, un servicio de directorio para encontrar influencers de TikTok. Lo hizo crecer hasta unos 3.000 dólares de MRR y luego lo vendió por 55.000 dólares a mediados de 2020. El dinero de la venta se convirtió en los fondos que cubrieron los gastos de vida y los costes de servidor mientras desarrollaba su siguiente producto.

Mientras buscaba la siguiente idea, concibió un boletín que cubría el calendario de salidas a bolsa. Intentó gestionar el contenido en Airtable, pero le resultaba difícil importar fácilmente datos financieros como los precios de las acciones. La incomodidad que sufrió él mismo se convirtió en el punto de partida de Data Fetcher.

La forma del producto se concretó a partir del API Connector para Google Sheets que encontró en Product Hunt. Cloke aplicó el enfoque de tomar una herramienta cuya demanda estaba probada en una plataforma madura y ofrecerla en otra plataforma de rápido crecimiento. Con Influence Grid trasladó a TikTok la oportunidad de negocio que rodeaba a Instagram, y con Data Fetcher implementó para Airtable una herramienta de conexión de API de Google Sheets.

Ya entonces era posible conectar datos externos con Zapier o Integromat. La diferencia en la que se fijó Cloke era la comodidad de configurar y ejecutar solicitudes de API sin salir de Airtable. Incorporó una función que hacía corresponder cada elemento de la respuesta de la API con los formatos de registro y campo de Airtable, de modo que los datos importados entraran directamente en la tabla con la que se estaba trabajando.

## Crear, poner precio y lanzar en el marketplace de Airtable

La demanda real no se limitó a un solo sector. Los clientes importaban precios de acciones, tipos de cambio, precios de criptomonedas y métricas de marketing, y hubo un caso que conectó el sistema de gestión de clientes de un viñedo. En el momento de una entrevista de 2022, las aplicaciones que los usuarios habían conectado superaban las 1.000. Era una estructura en la que una única herramienta de conexión de uso general absorbía a la vez muchas necesidades pequeñas de negocio.

Para el desarrollo inicial aprovechó su experiencia previa con React. La primera versión implementó primero la función central de conexión con la API, y la revisión del marketplace llevó más tiempo que el desarrollo. Como las actualizaciones también requerían aprobación, cuidó las pruebas y la documentación de ayuda antes del lanzamiento. Para un negocio que entra en una plataforma, incluso el ritmo de despliegue dependía de trámites externos.

El plan gratuito inicial ofrecía 100 ejecuciones al mes, y los planes de pago empezaban en 12 dólares al mes. Agrupó el aumento del volumen de ejecuciones y las ejecuciones programadas como funciones de pago, cobrando por la actualización recurrente de datos. En ese momento el marketplace de Airtable no tenía función de pago, así que las suscripciones se gestionaban con un sitio web aparte y Stripe.

El 12 de noviembre de 2020 anunció el lanzamiento en el marketplace de Airtable, y el 15 de noviembre compartió la noticia de la primera conversión de pago. Cuando lanzó en Product Hunt el 15 de diciembre del mismo año, ya había registrado más de 300 usuarios, 10 clientes de pago y más de 5.000 solicitudes de API acumuladas. Confirmó el uso real en el marketplace, mejoró el producto y después amplió su exposición a una comunidad de desarrolladores más amplia.

El crecimiento inicial fue lento. Cuando el MRR se estancó en unos 600 dólares, Cloke volvió al trabajo como freelance y desarrolló el producto por la noche y los fines de semana. En junio de 2021, al alcanzar unos 2.500 dólares, ajustó con flexibilidad su agenda de freelance, y a finales de año terminó los encargos que le quedaban y pasó a dedicarse a tiempo completo.

## Crecer a través del marketplace y el contenido

El centro de la captación de clientes era el marketplace de Airtable. En una entrevista de 2022 Cloke explicó que entre el 70 y el 80% de los clientes descubría el producto allí. Reforzó la descripción de funciones y las reseñas de clientes en la página de la ficha y añadió el inicio de sesión con Google para reducir la incomodidad del registro. También dijo que la tasa de conversión de prueba gratuita a cliente de pago era entonces de alrededor del 10%.

Fuera del marketplace creó contenido de blog y de YouTube que explicaba tareas concretas de los clientes. Eligió temas con un problema claro, como importar precios de acciones o datos de Google Maps a Airtable. Cloke dio a conocer un caso en el que un vídeo con unas 1.000 reproducciones consiguió más de 30 clientes de pago, lo que muestra que incluso un número pequeño de visualizaciones puede llegar a usuarios con alta intención de compra.

El producto también amplió su uso desde el público inicial que entendía las API hacia personas no desarrolladoras. Ofreció conexiones preconfiguradas para los servicios más usados, mientras que los usuarios con conocimientos técnicos podían trabajar directamente con API REST y GraphQL mediante Custom requests. Las conexiones básicas eran fáciles de empezar y, aun así, se mantenía la flexibilidad de conectar servicios que no estaban en la lista preparada.

En una entrevista de marzo de 2022 dio a conocer 190 clientes de pago y 6.500 dólares de MRR, y en septiembre del mismo año anunció que había alcanzado 10.000 dólares de MRR. En marzo, los costes de servidor y herramientas de trabajo eran de unos 500 dólares al mes, y Cloke describió el margen de beneficio sin contar su propio salario como de alrededor del 90%. Esta cifra todavía no descontaba el trabajo del fundador, y ese punto debe incluirse para entender con precisión la rentabilidad del negocio.

A medida que se acumulaba la operación, tratar datos excepcionales también se volvió un activo importante. Tenía que arreglar problemas que los clientes reales traían, como archivos de respuesta grandes o formatos CSV irregulares, y las ejecuciones programadas fallidas a veces llevaban a cancelaciones. Cloke consideraba esta experiencia acumulada de manejo de errores como una parte que la competencia difícilmente podía copiar.

## Estancamientos, un segundo producto fallido y la dependencia de la plataforma

Incluso después de alcanzar 20.000 dólares de MRR llegaron los estancamientos. Cloke dijo que desde agosto de 2023 las nuevas suscripciones y las cancelaciones se compensaron durante unos cinco meses y la tasa de bajas se mantuvo entre el 10 y el 11%. En diciembre aplicó un descuento del 50% a los planes anuales y cambió la opción predeterminada de la página de precios al pago anual. Informó de que después la tasa de bajas bajó al 7% y el MRR volvió a crecer.

En una entrevista de seguimiento en 2024 dio a conocer 23.000 dólares de MRR. El único operador a tiempo completo era Cloke, pero usaba colaboradores a tiempo parcial para la producción de vídeo y el desarrollo. Mantuvo la operación pequeña mientras encargaba fuera el trabajo especializado que necesitaba.

Los intentos de vender otros productos a los clientes existentes tuvieron poco éxito. Charts & Reports, una extensión de visualización para Airtable lanzada bajo la misma marca, se quedó en 300 dólares de MRR durante aproximadamente un año. Cloke lo juzgó un segundo producto lanzado demasiado pronto y una distracción de la atención.

La dependencia de la plataforma también apareció como un riesgo real. Cloke explicó que después de que Airtable excluyera las extensiones de su plan gratuito y cambiara su política de precios, los nuevos registros de Data Fetcher cayeron. También tuvo que responder a cambios en los límites de la API de Airtable. La plataforma que proporcionaba clientes determinaba a la vez el acceso a esos clientes y las condiciones de operación del producto.

El significado empresarial de Data Fetcher está en haberse centrado en una pequeña incomodidad que las personas que ya habían elegido una herramienta de trabajo sufrían una y otra vez. Construyó un flujo de encontrar clientes en el marketplace, generar tráfico adicional con contenido concreto sobre cómo hacer las cosas y cobrar de forma continua por la actualización de datos. Este caso muestra que una función estrecha dentro de una plataforma puede convertirse en un negocio independiente, y también revela la importancia de la capacidad operativa para mantener conexiones estables y un uso recurrente.
