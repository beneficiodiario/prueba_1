# Capturas para Google Play

Las imágenes se obtienen de la app instalada en un emulador Android 16 (API 36), perfil Pixel 2, en un runner aislado de GitHub. El cuestionario se completa con respuestas ficticias alternadas y sin Wi-Fi ni datos móviles. No contienen opiniones de una persona real. El binario de pruebas utiliza los mismos archivos web de producción que la versión release; el código Java se ejecuta en modo debug durante la instrumentación.

| Archivo | Texto alternativo propuesto |
|---|---|
| 01-inicio.png | Inicio de Afín, un juego independiente para explorar ideas políticas. |
| 02-pregunta.png | Pregunta del test con una respuesta ficticia de ejemplo y opciones de importancia. |
| 03-resultados-ejemplo.png | Coincidencias calculadas a partir de respuestas ficticias, con porcentaje y cobertura documental. |
| 04-fuentes.png | Catálogo de formaciones, estado de revisión y enlaces a sus documentos originales. |

La prueba que las genera está en `android/app/src/androidTest/java/com/beneficiodiario/afin/OfflineJourneyTest.java`. El workflow adjunta las imágenes y el informe instrumentado en el artifact `afin-android-capturas`. No se deben sustituir por diseños que simulen pantallas o resultados.

Para la ficha, conservar la imagen sin deformar, sin marco de dispositivo y sin añadir afirmaciones de disponibilidad, premios o recomendaciones de voto. Se puede eliminar un canal alfa completamente opaco para guardar PNG RGB de 24 bits sin alterar los píxeles visibles. Comprobar las cuatro imágenes antes de subirlas.
