---
{
  "title": "Abrir archivos de Photoshop en el navegador",
  "summary": "Cómo Photopea pasó de un editor web en solitario a 350 millones de usos en un año."
}
---

En 2012, Ivan Kutskir estudiaba informática en Praga cuando quiso abrir archivos PSD de Photoshop en la web. El punto de partida fue una herramienta que mostraba las capas de una imagen y permitía ocultarlas o mostrarlas. Ya ganaba 100–400 dólares al mes con anuncios de juegos web que había hecho, y disfrutaba crear programas nuevos. Empezó Photopea en su tiempo libre junto a los estudios.

La primera versión, publicada el 14 de septiembre de 2013, leía un PSD y lo mostraba. Incluía zoom, desplazamiento, movimientos de capas y máscaras, y deshacer. Los formatos de color eran limitados y no reproducía todos los efectos guardados en Photoshop. Kutskir publicó el programa con ese alcance estrecho.

Lo difícil llegó justo después de leer archivos. La documentación pública de PSD de Adobe explicaba cómo extraer números y textos, pero no cómo combinar esos datos en la misma imagen que dibuja Photoshop. Kutskir tuvo que implementar la mezcla de capas y efectos como sombras. Su anuncio incluso pedía ayuda, admitiendo que aún no entendía un efecto de bisel.

La velocidad también debía arreglarse. El primer Photopea estaba escrito en JavaScript, con el navegador calculando imágenes en la CPU del usuario. Archivos con muchas capas y efectos tardaban segundos en mostrarse, y pequeños cambios recomponían toda la imagen. Al publicarlo así, explicó la necesidad de reutilizar cálculos y usar procesadores gráficos.

En septiembre de 2016 introdujo una cuenta premium de 5 dólares al mes. No añadía funciones de edición y el botón de cuenta se volvía verde. El aviso decía que el dinero apoyaría el desarrollo futuro. Los usuarios gratuitos seguían con la edición completa, mientras los simpatizantes tenían una vía para pagar.

La convicción sobre el negocio vino de la publicidad. Kutskir recordó que solo cuando los anuncios dieron 400 dólares al mes en 2017 creyó en el potencial de Photopea, unos cinco años después de empezar. El editor gratuito reunía gente y ese uso se volvía ingreso real.

En abril de ese año añadió soporte de Sketch. Archivos de Sketch, entonces usados en Mac, podían traerse al navegador para ver y editar capas y texto. Cambiar colores y degradados o guardar como PSD también funcionaba. La cobertura de Photopea se amplió más allá de Photoshop a otros programas de diseño.

La compatibilidad con formatos existentes ocupó un lugar central en los principios que expuso. Dijo que la edición avanzada debía funcionar sin límites de costo o dispositivo, apoyar archivos de muchos programas y mantener el trabajo usable aunque un programa desapareciera. Los archivos de diseño guardan no solo imágenes terminadas sino capas y textos para editar. Mantener esa estructura usable en otros programas fijó la dirección de Photopea.

La promoción inicial no fue fácil. Kutskir comentó cada publicación sobre alternativas a Photoshop y promovió Photopea en Reddit y Hacker News, pero dijo que cerca del 90% de sus publicaciones y comentarios se borraron como autopromoción. Las peticiones de reseñas a youtubers casi no tuvieron respuesta, y quienes respondieron pidieron pagos inalcanzables. Con el tiempo, personas a las que nunca pidió nada empezaron a publicar reseñas y tutoriales, y esos textos y videos trajeron usuarios nuevos.

A fines de 2017, más de 2,5 millones de personas habían visitado Photopea, con 120.000 horas de uso. Además de escribir el programa, Kutskir hizo iconos, logo y blog oficial. También resolvió 400 errores y peticiones de funciones de usuarios. Al mejorar las reacciones, decidió seguir desarrollando cuanto pudiera.

En 2019, el tiempo anual de trabajo de usuarios en Photopea creció a 5 millones de horas. Sus ingresos declarados entonces eran unos 250.000 dólares, unas 5 centavos por hora de uso en promedio. Con más gente usando el editor gratuito y horas acumuladas, el proyecto de estudiante creció hasta sostener su vida.

La compatibilidad siguió ampliándose. En 2020 añadió archivos Figma, importando estructura y estilos y guardando como PSD. En 2021 el soporte de Illustrator trajo rutas de formas, grupos y texto editable. Las funciones para traer cada programa al navegador se apilaron una por una.

En abril de 2021, Kutskir dijo que los ingresos de los últimos doce meses rozaban 1 millón de dólares. Cerca del 90% venía de anuncios, el resto de suscripciones premium sin anuncios y licencias de versión autoalojada. En una entrevista de septiembre situó las visitas mensuales en 10 millones y el uso mensual en 1,5 millones de horas. Se consolidó una estructura donde el negocio crecía sin que los usuarios pagaran directamente.

Cómo corre el programa importó para esa escala. Photopea carga el código del editor desde la web y luego hace el proceso central de imagen en el dispositivo del usuario. La edición básica no necesita enviar cada archivo fuente al servidor del operador. Así más usuarios no exigían proporcionalmente más servidores para sus operaciones.

El alojamiento web que Kutskir declaró para 2021 costaba 50 dólares al año. Después, con más tráfico, pasó a un plan de 600 dólares al año, explicó en 2026, tras recibir aviso de que usaba más tráfico que todos los demás clientes juntos.

La distribución web también redujo la carga de mantenimiento. Un programa instalable separado exigiría desarrollar y gestionar su versión, además de usuarios sin actualizar que reportan errores ya corregidos. Kutskir explicó esa carga en concreto al pedirse versión independiente. El editor web mantuvo simple el camino del código corregido al usuario.

El soporte alimentó funciones directamente. En 2020 Kutskir dijo que los issues resueltos en GitHub llegaban a 2.300. En un hilo de Hacker News de 2021, la función ‘Color to Alpha’ de GIMP para volver un color transparente salió a tema. Respondió en el mismo hilo que la había añadido a Photopea.

También intentó formar equipo. En una entrevista de 2021 Kutskir dijo que trabajaba con varios programadores y quería un equipo que funcionara sin él. La función de guardado PeaDrive y algunos filtros los hicieron otros. Pero explicar trabajo, revisar resultados y pedir correcciones era difícil, y valorando su propia velocidad, siguió con la mayor parte del desarrollo.

El producto siguió creciendo técnicamente tras crecer los ingresos. En abril de 2024 añadió color de 16 y 32 bits más aceleración por GPU, abriendo y guardando PSD con más información de color. Siguieron funciones de edición precisa, como suavizar bandas duras al ajustar mucho el brillo. Fue el resultado de ampliar por más de una década el alcance que la primera versión cubría con límites.

Según su balance de 2026, Photopea se usó 350 millones de veces en 2025, con 1.000 millones de archivos abiertos por usuarios. Habían pasado catorce años desde el inicio. Dijo que desarrollar Photopea tras graduarse fue el único empleo que había tenido.

También hubo chances de vender. Kutskir recordó rechazar una oferta de 5 millones de dólares cuando ganaba 500.000 al año, dudando de que ese dinero mejorara mucho su vida. Construir y hacer crecer Photopea era divertido, y temía no hallar algo tan divertido tras vender. Eligió seguir siendo dueño y creador del producto.
