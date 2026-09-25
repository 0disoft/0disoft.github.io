---
{
  "title": "Crear un servicio para quienes buscan empleo sin dejar el trabajo: Erik Chavez y Jobric",
  "summary": "Cómo Jobric, creado mientras Erik Chavez trabajaba en Microsoft, pasó de ser un servicio de recomendaciones que ahorra tiempo a quien busca empleo a un negocio de pago con clientes."
}
---

## Empezar un servicio de empleo sin dejar el trabajo

En junio de 2026, Erik Chavez trabajaba como arquitecto de soluciones sénior en Microsoft mientras operaba Jobric, un servicio para quienes buscan empleo. Puso su propio tiempo y su propio dinero en el desarrollo, y los días de compaginar el empleo con su negocio solían ir de las 5 de la mañana a las 10 de la noche. Sin dejar antes la empresa, construyó un negocio que ayuda a cambiar de trabajo a quienes ya están empleados.

El punto de partida fue una persona cercana agotada por el trabajo. Quería salir de su empleo actual, pero le faltaban tiempo y energía para buscar otro, y las herramientas existentes tampoco ayudaban lo suficiente. Chavez empezó a crear una herramienta que encontrara oportunidades adecuadas para esa persona. El problema que Jobric quería resolver era que informarse sobre un trabajo mejor se convierte en una carga más.

El usuario sube su currículum y define sus preferencias. Jobric revisa ofertas de varias plataformas de empleo, recomienda puestos que encajan con la experiencia, las habilidades y las preferencias, y explica el grado de afinidad. Después de ver qué requisitos cumple y cuáles le faltan, el usuario decide si presenta su candidatura. No ofrece una función que envíe candidaturas de forma masiva y automática.

## Precisión de las recomendaciones y costos de operación

Cuando lo probó con su propio currículum, a Chavez le recomendaron puestos con títulos que no solía buscar. Las ganas de presentarse él mismo le dieron una razón para mostrar la herramienta a otras personas.

El problema apareció al probar el currículum de un amigo. El sistema interpretó como guardia de seguridad el título "Security Officer" de un amigo que trabaja en ciberseguridad. Chavez dedicó tiempo y dinero al principio a investigar datos y a validar con currículums variados para separar los títulos de las funciones reales.

Su experiencia de más de 15 años en la nube y las plataformas sirvió para bajar los costos de operación. Para el trabajo de clasificación en gran volumen usaba modelos de lenguaje pequeños que él mismo operaba, y asignaba a la razón compleja modelos de alto rendimiento. El costo fijo de operar sus modelos pequeños, según lo que él mismo publicó, era de unos 20 dólares al mes.

La recomendación de ofertas y el análisis de afinidad se separaron en servicios independientes que se ejecutan cuando hace falta. Se conectan mediante una cola de tareas y dejan de ejecutarse cuando termina el procesamiento. El diseño reduce el costo de mantener recursos de cómputo sin usar.

Para los juicios ajenos a la tecnología sumó asesores a tiempo parcial en seguridad, derecho y finanzas. Hanim Dogan, miembro del consejo y asesor, también apoyó el negocio. Mientras desarrollaba él mismo el producto, preparó relaciones para tomar prestada experiencia de otros campos.

## Del ensayo gratuito a la suscripción de pago

Los primeros usuarios de prueba se reclutaron públicamente en LinkedIn. Tras una beta gratuita entre marzo y abril de 2026, el servicio de pago arrancó el 1 de mayo. Antes de cobrar, verificó que las recomendaciones funcionaran bien con muchos currículums distintos.

En una entrevista publicada el 26 de junio, Chavez informó un ingreso recurrente mensual de 3.300 dólares. El ingreso vino de personas que buscaban empleo y se suscribieron con su propio dinero tras la beta pública.

A septiembre de 2026, los planes se componen de Seeker, gratuito; Candidate, a 29 dólares al mes; y Contender, a 49 dólares al mes. Los planes de pago permiten ver todos los resultados de recomendación, y la diferencia principal es la actualización semanal frente a la diaria. El criterio de calidad de las recomendaciones es el mismo en todos los planes. La estructura lleva a quienes necesitan revisar nuevas oportunidades con más frecuencia a elegir un plan superior.

Quien se registra por primera vez recibe una prueba gratuita de 7 días del plan más alto. La prueba empieza a contar desde que llega el primer resultado de recomendación, y no se pide registrar tarjeta. El tiempo de espera tras el registro no consume la prueba, de modo que la persona ve resultados reales antes de decidir si paga.

La decisión de tener a quienes buscan empleo como clientes también se reflejó en los principios para tratar datos personales. Jobric usa currículums y perfiles para recomendar empleos, y declara que no vende datos personales ni los entrega a terceros para marketing. Para seguir cobrando suscripciones con esta estructura, debe ofrecer recomendaciones útiles y mantener la confianza.

## Explicar los datos y ampliar las recomendaciones

La información que maneja el producto también alimentó los textos que publicaba en LinkedIn. Trataba cuántas veces se revela el salario en las ofertas y qué habilidades se pueden aprovechar al pasar a otro sector. Es una forma de explicar la información de mercado que necesitan quienes buscan empleo mientras muestra qué analiza Jobric. Desde el marketing, los datos que usa el servicio también sirvieron como material de contenido para llegar a clientes potenciales.

La calidad de las recomendaciones también incluyó la fiabilidad de las propias ofertas. Al observar patrones de ofertas que permanecen mucho tiempo o se publican repetidamente, avisó a los usuarios del riesgo de dedicar tiempo a ofertas con intención de contratación poco clara. Jobric no promete determinar si una oferta es auténtica, y explica que entrega señales para decidir si presentar la candidatura.

A las vías de captación se sumaron las alianzas de referidos. El programa Advocates, en marcha a septiembre de 2026, paga al referidor el 25% de lo que realmente paga el cliente referido, desde el primer pago y durante 12 meses. Está dirigido a personas con contacto con quienes buscan empleo, como coaches de carrera, autores de boletines y responsables de comunidades. Como la comisión surge cuando el cliente paga, el costo de captación puede vincularse al ingreso.

## El valor que queda cuando termina la búsqueda

Un negocio de suscripción conserva el problema de que encontrar empleo lleva a la baja de clientes. Chavez también se preguntó qué valor ofrecer en el periodo hasta la siguiente búsqueda. Jobric propone un servicio que sigue mirando el mercado incluso a quienes ya tienen empleo. Aunque no piensen cambiar de inmediato, pueden recibir avisos cuando aparezca una oportunidad que cumpla sus condiciones. Es un intento de tomar como clientes no solo a quienes buscan empleo con urgencia sino también a quienes quieren explorar opciones sin dejar su trabajo.

También preparó asesoría de carrera guiada por personas. A septiembre de 2026 estaba reclutando a los primeros coaches de Career Guides, y la reserva de sesiones por parte de los usuarios aún no había empezado. La idea es que quien busca empleo elija un coach adecuado a su situación y consulte con él, ampliando desde la recomendación de ofertas hacia un servicio que ayude en las decisiones de carrera de cada persona.

Chavez y la persona que quiso ayudar al principio tenían algo en común: poco tiempo fuera del trabajo. Chavez creó un producto en ese tiempo limitado y ofreció a sus clientes una forma de reducir el tiempo que dedican a buscar empleo. Al usar su experiencia para disminuir una carga que otros viven una y otra vez, encontró la posibilidad de un negocio que se puede operar mientras se mantiene un empleo.
