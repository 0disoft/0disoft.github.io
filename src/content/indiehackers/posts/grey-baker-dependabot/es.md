---
{
  "title": "Grey Baker convirtió las actualizaciones recurrentes de dependencias en Dependabot, llegó a 14.000 dólares al mes y lo vendió a GitHub",
  "summary": "Cómo Grey Baker y Harry Marr crearon Dependabot a partir del trabajo de actualización de dependencias que Baker repetía en GoCardless y en su predecesor Bump, consiguieron sus primeros usuarios con contacto directo, se toparon con objeciones sobre los permisos del repositorio en un proyecto objetivo, llegaron a unos 14.000 dólares de ingresos recurrentes mensuales sin inversión externa y acabaron como una parte gratuita de GitHub tras la adquisición de 2019."
}
---

## Convertir las actualizaciones recurrentes de dependencias en un negocio

Grey Baker creó Dependabot junto a Harry Marr, un servicio que automatiza la actualización de las dependencias de software. El negocio que ambos hicieron crecer sin inversión externa llegó a unos 14.000 dólares de ingresos recurrentes mensuales y fue adquirido por GitHub en 2019. Es un caso de cofundación que convirtió en servicio de pago el trabajo de mantenimiento que los desarrolladores hacían a diario.

## El trabajo repetitivo que el fundador hacía en persona

Baker trabajó como consultor de estrategia en McKinsey antes de aprender a programar por su cuenta. Después asumió tareas de producto e ingeniería en la empresa de pagos GoCardless, donde vivió el paso de seis empleados a más de cien. Tras dejar la empresa para recorrer el mundo en bicicleta, impulsó una iniciativa en el sector sanitario y, en ese proceso, empezó Dependabot como proyecto paralelo dentro del campo que ya conocía.

El producto nació del trabajo de actualización de dependencias que Baker repetía en GoCardless. Su predecesor, Bump, era una herramienta que GoCardless creó en 2015: comprobaba las versiones nuevas de las librerías, editaba los archivos de dependencias y generaba una pull request (PR) que proponía el cambio de código. El repositorio público de GoCardless recoge que desde 2017 Dependabot cubría esa misma necesidad con un conjunto de funciones más amplio.

Dependabot conectó ese trabajo con el flujo de GitHub que el equipo de desarrollo ya usaba. Cuando encontraba una librería que actualizar, abría una PR y presentaba juntos el historial de cambios, las notas de la versión y la información de seguridad relacionada para facilitar la revisión. El desarrollador podía revisar y aplicar el cambio con su procedimiento habitual de revisión de código. Reducir el trabajo que se repetía desde la detección de una actualización hasta la preparación de la corrección era el valor central del producto.

Baker y Marr vivieron de sus ahorros y recibieron de GoCardless la propiedad intelectual de Bump. Crearon una primera versión de prueba en unas cuatro semanas y dedicaron aproximadamente otro mes a pulirla. También tuvieron que resolver el aluvión de peticiones de cambio de repositorios antiguos, los conflictos de fusión y las actualizaciones que volvían a generarse después de rechazarlas.

## Los primeros usuarios llegaron de la mano del propio fundador

Entrar al principio en el GitHub Marketplace exigía al menos 250 usuarios, pero Dependabot solo tenía 22. Una publicación promocional preparada en dos días y subida a Hacker News y Reddit consiguió un único suscriptor.

Baker buscaba en GitHub PR con la palabra "update" en el título y proponía el producto a sus autores. Dedicaba una hora al día y conseguía dos o tres suscriptores, y alrededor de la mitad de las personas a las que escribió se registró. Era una forma de usar el trabajo que la otra persona ya había hecho a mano como base para presentar el producto.

Tras la entrada en el Marketplace, el ritmo de registros pasó a ser unas diez veces el anterior. GitHub cobraba la tarifa de Dependabot sumándola a la factura existente, y la comisión de entonces era el 25% de los ingresos. La entrada cambió a la vez la captación de clientes y el proceso de cobro.

Los precios de 2017 eran 15 dólares al mes por cinco repositorios privados y 50 dólares al mes por uso ilimitado. Era gratis para particulares y proyectos de código abierto, y también aparecieron casos de desarrolladores satisfechos en un proyecto personal que lo recomendaban en su trabajo.

Los ingresos mensuales que publicó en una entrevista de diciembre de 2017 eran 740 dólares. El coste operativo del servicio del mes anterior era de 50 dólares, en su mayor parte alojamiento y correo electrónico. Hay que leer esa cifra junto al hecho de que ambos fundadores vivían de sus ahorros en esa etapa.

## El problema de confianza al vender herramientas para desarrolladores

La venta directa de Baker continuó después de que el producto creciera. En octubre de 2018 se acercó a la comunidad del software de foro de código abierto Discourse para proponer la adopción de Dependabot. Mostrando una PR de Dependabot que había preparado él mismo, explicó tanto un modo que recibe una corrección solo cuando aparece una vulnerabilidad de seguridad como un modo que también recibe las actualizaciones de versión habituales. También expuso con franqueza su expectativa de que la adopción por un proyecto conocido elevaría la visibilidad de Dependabot.

Sin embargo, lo que preocupaba a la otra parte era el permiso de acceso al repositorio. Discourse preguntó si era posible enviar PR desde un repositorio bifurcado en lugar de conceder permiso de escritura sobre el original. Baker respondió que era difícil de soportar con facilidad por la estructura de permisos de la GitHub App de entonces, y la conversación sobre la adopción quedó en pausa. El intercambio muestra que, en los productos de automatización para desarrolladores, el alcance de los permisos influye en la decisión de compra y de adopción junto con la comodidad de la función.

Dependabot pasó por este proceso y creció hasta unos 14.000 dólares de ingresos recurrentes mensuales. La presentación de la entrevista del pódcast "Marketing Mashup", publicada el 1 de julio de 2019, explica que Baker hizo crecer el negocio hasta esa escala y después lo vendió a GitHub. Aquí los ingresos recurrentes mensuales son los que se repiten de forma periódica, y no una cifra que represente los ingresos personales ni el beneficio neto del fundador.

## La expansión hacia las funciones de seguridad de GitHub

GitHub anunció la adquisición de Dependabot en mayo de 2019. El anuncio oficial de entonces explicaba que adquiría e integraba Dependabot para facilitar la tarea de resolver las vulnerabilidades de seguridad de las dependencias. Ese anuncio no reveló el importe de la adquisición.

La conexión funcional con GitHub era clara. Cuando se encontraba una librería vulnerable en un repositorio, Dependabot podía preparar una PR de actualización que la resolvía. En las correcciones de seguridad usaba el criterio de subir a la versión mínima necesaria para eliminar la vulnerabilidad, reduciendo el alcance del cambio que el desarrollador debía revisar. Dependabot añadió el papel de aportar una corrección real a la detección de vulnerabilidades de GitHub.

Tras la adquisición, Dependabot se ofreció gratis en el GitHub Marketplace. El cofundador Harry Marr dijo en el blog oficial de GitHub el 25 de julio de 2019 que el número acumulado de PR de Dependabot fusionadas había llegado a un millón. Desde abril de 2017, cuando se fusionó la primera PR, y a lo largo de unos dos años, era un registro que mostraba la escala de actualizaciones preparadas de forma automática y aplicadas de verdad en proyectos reales.

En junio de 2020 la función general de actualización de versiones también se publicó integrada de forma nativa en GitHub. El usuario podía indicar en el archivo de configuración del repositorio el gestor de paquetes objetivo y el ciclo de ejecución para recibir PR de actualización. GitHub indicó en ese anuncio que ofrecía todas las funciones de Dependabot gratis a todos los repositorios. Un servicio que cobraba de forma independiente se había convertido en una función común de desarrollo de GitHub.

## Cuando el trabajo repetitivo se convirtió en una función básica de la plataforma

La fortaleza de negocio de Dependabot estaba en resolver, dentro del procedimiento de revisión que el desarrollador ya usaba, un trabajo que se repite cada vez que aparece una actualización. La automatización que pagaban equipos de desarrollo concretos amplió su alcance de distribución a toda la plataforma al combinarse con las funciones de seguridad de GitHub. Es un caso de una pequeña herramienta de mantenimiento creada por dos cofundadores que se convirtió en parte de un entorno de desarrollo más grande.
