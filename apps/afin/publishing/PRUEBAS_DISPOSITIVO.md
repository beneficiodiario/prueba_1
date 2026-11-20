# Comprobación real antes de enviar a revisión

Completado: recorrido instrumentado y capturas reales en un emulador aislado Android 16 API 36, Pixel 2, sin Wi-Fi ni datos. Se completan las 34 preguntas con respuestas ficticias y se comprueban Atrás, exportación privada, selector de compartir, privacidad, ausencia de historial web y contenido visual no vacío. Evidencia: https://github.com/beneficiodiario/prueba_1/actions/runs/44775062545. Las cuatro capturas revisadas están en screenshots/. También pasan las 17 pruebas de cálculo e interfaz.

El siguiente guion sirve para la revisión manual complementaria en un teléfono, API 24, paisaje, texto grande y accesibilidad. No se marca como realizado en su totalidad por haber pasado la instrumentación.

Instala el APK release en un teléfono de pruebas. Utiliza respuestas ficticias. Comprueba como mínimo Android 7 (API 24) y Android 16 (API 36), o el conjunto de dispositivos que ofrezca Play antes del lanzamiento.

1. Abrir: icono y splash de Afín, sin pantalla en blanco. Verificar barras del sistema, recortes y botones con navegación por gestos y tres botones.
2. Activar modo avión desde los controles del teléfono. Completar o saltar las 34 preguntas; ver resultados y razones sin conexión. Abrir una fuente requiere conexión y debe fallar de forma comprensible si no hay red.
3. Cambiar importancia antes de responder: no debe seleccionar una postura. Volver con Atrás debe conservar respuesta e importancia.
4. Completar con diferentes opiniones y luego con todas omitidas. No inventar un ganador cuando no hay base. Formaciones sin evidencia: «Sin porcentaje».
5. Comparar detalles con el documento original. Abrir fuentes en navegador; volver a Afín conserva la sesión mientras Android no cierre su proceso.
6. Exportar JSON mediante «Guardar mis datos». Leer aviso de opiniones políticas, elegir un destino propio, comprobar respuestas y cancelar otra exportación. No enviar los datos de prueba a terceros innecesariamente.
7. «Compartir el test»: inspeccionar que solo se ofrece texto y enlace genérico, sin resultado. Cancelar el selector.
8. Repetir: confirmar y cancelar. Salir: confirmar y cancelar. Cerrar el proceso completamente y reabrir: no debe aparecer un historial de respuestas.
9. Probar 320–412 dp, tablet, retrato y paisaje; letra grande, TalkBack, foco del teclado y contraste. Comprobar que no se ocultan opciones o controles por los insets.
10. Visitar políticas y créditos sin red. Política pública: comprobarla con red y sin login.
11. Capturar pantallas reales de inicio, pregunta, resultado de ejemplo y fuentes. Google Play: al menos dos imágenes de teléfono válidas; se recomiendan cuatro 1080 × 1920, PNG/JPEG y sin datos personales.
12. Subir el AAB a pruebas internas y revisar el informe automático previo al lanzamiento. Corregir bloqueos, fallos de accesibilidad o incompatibilidades antes de producción.

Registrar modelo, API, versión de Android System WebView, fecha y resultado. No marcar esta lista como completada hasta realizarla.
