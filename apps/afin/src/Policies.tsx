import { External, Link, PageIntro } from "./components";
const date = "20 de noviembre de 2026";
const policies: Record<
  string,
  { title: string; intro: string; body: React.ReactNode }
> = {
  "/privacidad": {
    title: "Tus ideas son tuyas.",
    intro: "Este test está diseñado para funcionar sin recoger tus respuestas.",
    body: (
      <>
        <h2>Qué ocurre con las respuestas</h2>
        <p>
          Las respuestas y los resultados se procesan exclusivamente en la
          memoria de esta pestaña. La aplicación no los envía a un servidor ni
          los escribe en cookies, localStorage, sessionStorage o la URL.
          Recargar, cerrar la pestaña o repetir el test elimina ese estado. No
          se piden nombre, correo, fecha de nacimiento ni ubicación.
        </p>
        <h2>Opiniones políticas</h2>
        <p>
          Tus respuestas pueden revelar opiniones políticas. No creamos perfiles
          personales persistentes ni utilizamos tus respuestas para publicidad,
          campañas o decisiones sobre ti. El resultado expresa cercanía entre
          propuestas y respuestas, no identifica tu afiliación ni tu intención
          de voto.
        </p>
        <h2>Descargas y compartir</h2>
        <p>
          «Descargar mis datos» crea un archivo JSON en tu dispositivo que sí
          contiene tus opiniones y resultados. Solo se genera cuando lo
          solicitas; tú decides cómo guardarlo o compartirlo. «Compartir el
          test» copia un enlace genérico al sitio y no incorpora tus datos. Los
          resultados no se pueden recuperar al abrir ese enlace.
        </p>
        <h2>Datos técnicos del alojamiento</h2>
        <p>
          El proveedor de alojamiento puede recibir la dirección IP, el agente
          de usuario y registros técnicos necesarios para servir las páginas y
          proteger la infraestructura. La ausencia de envío de respuestas no
          implica ausencia de estos registros. Esta aplicación no incorpora
          herramientas de analítica ni píxeles de seguimiento.
        </p>
        <p>
          Si el sitio se aloja en Vercel, consulta su política para conocer su
          tratamiento de datos técnicos:{" "}
          <External href="https://vercel.com/legal/privacy-policy">
            Política de Vercel
          </External>
          .
        </p>
        <h2>Enlaces externos</h2>
        <p>
          Los programas se abren en una nueva pestaña. Al visitar otro sitio se
          aplica su política de privacidad. Las fuentes, iconos y la imagen
          utilizada por la aplicación se sirven desde este mismo alojamiento; no
          cargamos contenido incrustado de redes sociales.
        </p>
        <h2>Responsable y contacto</h2>
        <p>
          El responsable del tratamiento del sitio publicado es su titular u
          operador. El proyecto no proporciona una identidad ni un contacto
          ficticios: esos datos y la información sobre registros técnicos del
          despliegue deben completarse por el titular antes de una publicación
          pública. La configuración está documentada en el README.
        </p>
        <p>
          Para borrar las respuestas de esta aplicación basta con recargar o
          cerrar la pestaña. Para cuestiones relacionadas con registros de
          infraestructura, usa el contacto que publique el titular del
          despliegue.
        </p>
      </>
    ),
  },
  "/cookies": {
    title: "Aquí no hay galletitas.",
    intro:
      "La aplicación no utiliza cookies ni almacenamiento persistente para el test.",
    body: (
      <>
        <h2>Sin cookies propias ni analítica</h2>
        <p>
          La versión entregada no establece cookies, no guarda el progreso en
          almacenamiento del navegador y no integra publicidad, rastreadores,
          Google Analytics ni Vercel Analytics. Las respuestas se mantienen en
          memoria hasta recargar o cerrar la pestaña.
        </p>
        <h2>Por qué no aparece un banner</h2>
        <p>
          No se incorpora un panel de consentimiento porque la aplicación no
          instala tecnologías opcionales de seguimiento. Si el titular añade
          analítica, publicidad, vídeos incrustados, autenticación u otros
          servicios, deberá revisar esta política y su configuración de
          consentimiento antes de activarlos.
        </p>
        <h2>Infraestructura y sitios enlazados</h2>
        <p>
          El alojamiento puede usar medidas técnicas propias para seguridad o
          protección frente a abusos según la configuración del despliegue.
          Visitar un programa electoral en un sitio externo puede implicar
          cookies de ese sitio; Afín no controla esas páginas.
        </p>
        <Link to="/privacidad">Consultar la política de privacidad</Link>
      </>
    ),
  },
  "/aviso-legal": {
    title: "Una broma con fuentes.",
    intro:
      "Afín es una experiencia lúdica y divulgativa para explorar tus propias ideas.",
    body: (
      <>
        <h2>Finalidad y alcance</h2>
        <p>
          Esta es una web de «broma» y autoconocimiento político: un juego que
          compara respuestas con propuestas documentadas. No constituye
          asesoramiento electoral, una encuesta, una investigación científica ni
          una recomendación de voto. No pretende identificar de forma cierta a
          una persona con un partido.
        </p>
        <p>
          El carácter lúdico no elimina la necesidad de indicar fuentes, límites
          y posibles errores. No utilices el porcentaje como una descripción
          concluyente de ti o de otra persona.
        </p>
        <h2>Independencia</h2>
        <p>
          El sitio no es una web oficial de ningún partido, administración o
          autoridad electoral. Las denominaciones, siglas y colores se emplean
          para identificar fuentes y formaciones. Su presencia no implica apoyo,
          colaboración, patrocinio ni validación por esas entidades.
        </p>
        <h2>Programas y resultados</h2>
        <p>
          El catálogo se limita a las candidaturas al Congreso de las generales
          del 29 de noviembre de 2026 que figuran en el BOE citado. Puede haber
          documentos no localizados, publicaciones posteriores, rectificaciones
          de candidaturas, enlaces rotos o interpretaciones discutibles. La
          fecha de revisión no garantiza actualización permanente.
        </p>
        <p>
          Las propuestas se resumen de forma editorial. La fuente original
          prevalece frente a la paráfrasis. Los programas no equivalen a
          compromisos cumplidos. La <Link to="/metodologia">metodología</Link>{" "}
          explica los umbrales y la fórmula.
        </p>
        <h2>Uso de los resultados</h2>
        <p>
          El test es voluntario. No se debe presentar su resultado como prueba
          de afiliación ni utilizarlo para discriminar, seleccionar o evaluar a
          personas. No se solicita ni necesita información identificativa.
        </p>
        <h2>Propiedad intelectual</h2>
        <p>
          Los documentos enlazados pertenecen a sus autores. Se ofrecen enlaces
          y paráfrasis breves, no copias completas de sus programas. La
          fotografía y los iconos conservan las licencias indicadas en{" "}
          <Link to="/creditos">créditos</Link>.
        </p>
        <h2>Titular del despliegue</h2>
        <p>
          La identidad y el contacto del titular deben incorporarse antes de
          abrir el sitio al público. Esta entrega no inventa datos personales,
          una dirección ni una razón social. El README detalla qué información
          debe completar el operador.
        </p>
      </>
    ),
  },
  "/accesibilidad": {
    title: "Un test para poder usarlo.",
    intro:
      "La interfaz está pensada para teclado, pantallas pequeñas y lectores de pantalla.",
    body: (
      <>
        <h2>Funciones disponibles</h2>
        <p>
          El sitio incluye enlace para saltar al contenido, navegación
          semántica, opciones de respuesta con controles de radio nativos, foco
          visible, etiquetas accesibles, progreso del cuestionario y
          alternativas textuales. El color se acompaña de texto: no es la única
          forma de identificar respuestas o estados.
        </p>
        <p>
          Los cambios de pregunta llevan el foco al título. La interfaz respeta
          la preferencia del sistema de reducir movimiento. Los controles
          mantienen una zona táctil amplia y la página adapta su distribución a
          pantallas pequeñas.
        </p>
        <h2>Teclado</h2>
        <p>
          Usa Tab y Mayús + Tab para moverte. En las opciones de respuesta, las
          flechas cambian la selección y la barra espaciadora permite marcarla.
          Enter activa los botones. Puedes volver a preguntas anteriores sin
          perder sus respuestas mientras mantengas la pestaña abierta.
        </p>
        <h2>Límites</h2>
        <p>
          No declaramos una certificación formal de accesibilidad. Los PDF
          externos pueden no ser accesibles y están fuera del control de este
          proyecto. El titular del despliegue puede habilitar un canal de
          contacto para comunicar barreras.
        </p>
      </>
    ),
  },
  "/creditos": {
    title: "Las cosas, por su nombre.",
    intro: "De dónde salen los documentos y los recursos de esta web.",
    body: (
      <>
        <h2>Fuentes documentales</h2>
        <p>
          El catálogo usa el BOE de candidaturas proclamadas. Las propuestas se
          basan en los documentos enlazados en cada ficha. Los programas no se
          redistribuyen dentro de este proyecto.
        </p>
        <p>
          <External href="https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-23103">
            BOE: candidaturas del 29N de 2026
          </External>
        </p>
        <p>
          <External href="https://www.boe.es/diario_boe/txt.php?id=BOE-A-2026-20742">
            BOE: convocatoria de elecciones
          </External>
        </p>
        <h2>Fotografía</h2>
        <p>
          «Congreso de los Diputados, Madrid», de AMPERIO. Wikimedia Commons.
          Licencia Creative Commons Atribución-CompartirIgual 4.0. La interfaz
          muestra la fotografía recortada, en escala de grises y con
          superposiciones de diseño; la imagen original se conserva en el
          archivo del proyecto. La adaptación visual de la imagen se ofrece bajo
          la misma licencia. El autor no patrocina este sitio.
        </p>
        <p>
          <External href="https://commons.wikimedia.org/wiki/File:Congreso_de_los_Diputados,_Madrid.jpg">
            Fuente y autor de la fotografía
          </External>
        </p>
        <p>
          <External href="https://creativecommons.org/licenses/by-sa/4.0/">
            Licencia CC BY-SA 4.0
          </External>
        </p>
        <h2>Iconos y tipografía</h2>
        <p>
          Iconos de Lucide, licencia ISC. Se incluyen localmente en la
          aplicación. La tipografía usa familias del sistema y no realiza
          llamadas a Google Fonts ni a otros proveedores.
        </p>
        <p>
          <External href="https://lucide.dev/license">
            Licencia de Lucide
          </External>
        </p>
        <h2>Proyecto</h2>
        <p>
          React + TypeScript + Vite. Cálculo determinista en el navegador, sin
          motor remoto de inteligencia artificial. Consulta las fichas para
          revisar cada postura y sus límites.
        </p>
      </>
    ),
  },
};
export function PolicyPage({ path }: { path: string }) {
  const p = policies[path];
  const operator = import.meta.env.VITE_SITE_OPERATOR?.trim();
  const contact = import.meta.env.VITE_SITE_CONTACT?.trim();
  return (
    <main id="main" className="container policy-page">
      <PageIntro eyebrow="LAS COSAS CLARAS" title={p.title}>
        <p>{p.intro}</p>
      </PageIntro>
      <div className="prose">
        <p className="updated">Última revisión: {date}.</p>
        {operator && (
          <div className="operator-info">
            <p>
              <strong>Titular del sitio:</strong> {operator}
              {contact && (
                <>
                  <br />
                  <strong>Contacto:</strong> {contact}
                </>
              )}
            </p>
          </div>
        )}
        {p.body}
      </div>
    </main>
  );
}
