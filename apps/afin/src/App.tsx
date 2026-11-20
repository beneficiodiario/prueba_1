import {
  isNative,
  exportJson,
  shareTest,
  registerNativeBack,
  exitNativeApp,
} from "./platform";
import { NativePrivacy } from "./NativePrivacy";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
} from "react";
import {
  Activity,
  BookOpen,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  CircleHelp,
  Clipboard,
  Clock3,
  Download,
  Earth,
  Fingerprint,
  Flag,
  Heart,
  Home as HomeIcon,
  Leaf,
  LockKeyhole,
  MapPin,
  RotateCcw,
  Scale,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Sparkles,
  Target,
  Users,
  Wallet,
  X,
} from "lucide-react";
import {
  Footer,
  Header,
  Link,
  Navigation,
  Notice,
  PageIntro,
  External,
  Mark,
} from "./components";
import {
  categories,
  questions,
  answerLabels,
  stanceLabels,
} from "./data/questions";
import partyData from "./data/parties.json";
import rawCatalog from "./data/catalog.json";
import { isComplete, rankParties } from "./scoring.mjs";
import type { Answer, Answers, Party } from "./types";
import { PolicyPage } from "./Policies";
const parties = partyData as unknown as Party[];
const catalog = rawCatalog as unknown as {
  parties: Array<
    Party & { provinces: string[]; notProclaimedProvinces?: string[] }
  >;
  sourceUrl: string;
};
const reviewed = parties.filter((p) => p.status === "reviewed");
const icons: Record<string, typeof Wallet> = {
  economia: Wallet,
  servicios: HomeIcon,
  clima: Leaf,
  derechos: Heart,
  territorio: MapPin,
  sociedad: Users,
  mundo: Earth,
};
const knownRoutes = [
  "/",
  "/test",
  "/resultados",
  "/programas",
  "/metodologia",
  "/privacidad",
  "/cookies",
  "/aviso-legal",
  "/accesibilidad",
  "/creditos",
];
const normalise = (path: string) =>
  path === "/" ? "/" : path.replace(/\/+$/, "");
function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <span className="eyebrow">
            <span className="live-dot" /> TUS IDEAS. TUS MATICES. TU TEST.
          </span>
          <h1>
            Menos etiquetas.
            <br />
            Más <em>afinidad.</em>
          </h1>
          <p className="hero-description">
            ¿Y si descubres con quién coincides
            <br className="desktop-break" /> antes de mirar las siglas?
          </p>
          <p className="hero-secondary">
            Responde sobre lo que te importa y explora qué propuestas se parecen
            a tus ideas. Con fuentes, con matices y sin decirte a quién votar.
          </p>
          <div className="hero-action">
            <Link to="/test" className="button button-dark">
              <Fingerprint size={21} /> Descubrir mi afinidad
            </Link>
            <span className="time">
              <Clock3 size={16} /> 8–10 minutos
            </span>
          </div>
          <p className="privacy-note">
            <LockKeyhole size={15} /> Sin registro. Tus respuestas se quedan en
            esta sesión.
          </p>
        </div>
        <div className="hero-art">
          <div className="photo-frame">
            <img
              src="/congreso.jpg"
              alt="Columnas y frontón del Congreso de los Diputados en Madrid"
              width="960"
              height="1286"
              fetchPriority="high"
            />
            <div className="photo-shade" />
            <div className="photo-caption">
              LA POLÍTICA TAMBIÉN
              <br />
              VA CONTIGO.
            </div>
          </div>
          <div className="art-bubble bubble-one">
            <HomeIcon size={18} /> Vivienda
          </div>
          <div className="art-bubble bubble-two">
            <Leaf size={18} /> El planeta
          </div>
          <div className="art-sticker">
            <Sparkles size={25} />
            <span>
              Tu opinión tiene
              <br />
              <strong>más de un color.</strong>
            </span>
          </div>
          <div className="art-note">
            No hace falta
            <br />
            coincidir en todo.
            <svg viewBox="0 0 96 38" aria-hidden="true">
              <path
                d="M3 7Q35 35 88 17M75 5L91 16L77 28"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>
        </div>
      </section>
      <div className="container">
        <div className="playful-note">
          <span>
            UN POCO DE BROMA.
            <br />
            <strong>BASTANTE DE AUTOCONOCIMIENTO.</strong>
          </span>
          <p>
            Esto es un juego de afinidades, no un oráculo electoral. Puedes
            coincidir con varias formaciones y seguir sin encajar en ninguna
            etiqueta.
          </p>
          <Sparkles aria-hidden="true" />
        </div>
      </div>
      <section
        className="facts-strip container"
        aria-label="Cobertura del test"
      >
        <div>
          <strong>{questions.length}</strong>
          <span>preguntas para pensar</span>
        </div>
        <div>
          <strong>{reviewed.length}</strong>
          <span>documentos con posturas revisadas</span>
        </div>
        <div>
          <strong>
            {catalog.parties.filter((p) => p.provinces?.length).length}
          </strong>
          <span>candidaturas en el catálogo</span>
        </div>
        <Link to="/programas">
          Ver cobertura y pendientes <BookOpen size={18} />
        </Link>
      </section>
      <section className="section container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CERO MÍTINES. TRES PASOS.</span>
            <h2>
              Primero tus ideas.
              <br />
              Después, las siglas.
            </h2>
          </div>
          <p>
            No tienes que ser experto en política.
            <br />
            Solo saber qué piensas. Y también vale dudar.
          </p>
        </div>
        <div className="steps-grid">
          <article className="step-card">
            <span className="step-icon lime">
              <SlidersHorizontal />
            </span>
            <span className="step-number">01</span>
            <h3>Di lo que piensas</h3>
            <p>
              Vivienda, trabajo, derechos, energía… Responde de menos a más
              acuerdo. Si no lo tienes claro, puedes saltar.
            </p>
          </article>
          <article className="step-card">
            <span className="step-icon lilac">
              <Target />
            </span>
            <span className="step-number">02</span>
            <h3>Dale tu importancia</h3>
            <p>
              No todo te preocupa igual. Marca qué temas pesan más para ti y el
              cálculo tendrá en cuenta tus prioridades.
            </p>
          </article>
          <article className="step-card">
            <span className="step-icon mint">
              <BookOpen />
            </span>
            <span className="step-number">03</span>
            <h3>Explora tus coincidencias</h3>
            <p>
              Consulta porcentajes, desacuerdos y las propuestas originales.
              Cada resultado muestra su cobertura documental.
            </p>
          </article>
        </div>
      </section>
      <section className="topics-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <span className="eyebrow">LO QUE HAY DETRÁS DE TU PAPELETA</span>
              <h2>No eres un solo tema.</h2>
            </div>
            <p>
              Exploramos siete áreas de los programas.
              <br />
              Tus contradicciones también tienen sitio.
            </p>
          </div>
          <div className="topic-grid">
            {categories.map((c) => {
              const Icon = icons[c.id];
              return (
                <div className="topic-pill" key={c.id}>
                  <span style={{ background: c.color }}>
                    <Icon size={21} />
                  </span>
                  {c.name}
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <section className="container section">
        <div className="source-banner">
          <div>
            <span className="eyebrow">UNA AFINIDAD QUE PUEDES COMPROBAR</span>
            <h2>
              Las fuentes,
              <br />
              <em>sobre la mesa.</em>
            </h2>
            <p>
              Programas y documentos oficiales del 29N de 2026. Si una postura
              no está documentada, no la inventamos. Si falta un programa, lo
              decimos.
            </p>
            <Link to="/programas" className="button button-lime">
              <BookOpen size={18} /> Explorar los programas
            </Link>
          </div>
          <div className="source-stack" aria-hidden="true">
            <div className="stack-sheet back">
              <span>PROPUESTAS</span>
              <i />
              <i />
              <i />
            </div>
            <div className="stack-sheet front">
              <Mark />
              <span>
                MENOS
                <br />
                SUPOSICIONES.
                <br />
                <b>MÁS FUENTES.</b>
              </span>
              <i />
              <i />
              <div className="sheet-seal">
                <CheckCheck />
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="container faq-section">
        <div>
          <span className="eyebrow">ANTES DE EMPEZAR</span>
          <h2>
            Las dudas
            <br />
            son bienvenidas.
          </h2>
        </div>
        <div className="faq-list">
          <details>
            <summary>¿Me vais a decir a quién tengo que votar?</summary>
            <p>
              No. Mostramos coincidencias entre tus respuestas y propuestas
              documentadas. No conocemos tu identidad, no diagnosticamos tu
              ideología y no emitimos recomendaciones de voto.
            </p>
          </details>
          <details>
            <summary>¿Están todos los partidos de España?</summary>
            <p>
              El catálogo recoge las denominaciones del Congreso en el BOE del 3
              de noviembre de 2026. Eso no equivale a todos los partidos
              registrados ni a todas las elecciones. Solo calculamos afinidad
              cuando hay suficientes posturas verificadas. Consulta los
              pendientes en la página de programas.
            </p>
          </details>
          <details>
            <summary>¿Qué significa el porcentaje?</summary>
            <p>
              Es una medida de proximidad entre posiciones sobre temas
              comparables, ponderada por la importancia que les das. No es una
              probabilidad, una encuesta ni una nota científica. Los porcentajes
              de distintos partidos no suman 100.
            </p>
          </details>
          <details>
            <summary>¿Qué pasa con mis respuestas?</summary>
            <p>
              Se procesan en la memoria de tu navegador y se pierden al recargar
              o cerrar la sesión. No se envían a un servidor, no se añaden a la
              URL y no hay cookies ni analítica de esta aplicación.
            </p>
          </details>
        </div>
      </section>
    </>
  );
}
function Quiz({
  answers,
  setAnswers,
  index,
  setIndex,
  finish,
}: {
  answers: Answers;
  setAnswers: (a: Answers) => void;
  index: number;
  setIndex: (i: number) => void;
  finish: () => void;
}) {
  const q = questions[index];
  const answer = answers[q.id];
  const category = categories.find((c) => c.id === q.category)!;
  const Icon = icons[q.category];
  const heading = useRef<HTMLHeadingElement>(null);
  const [draftWeights, setDraftWeights] = useState<Record<string, number>>({});
  const choose = (value: number | null) =>
    setAnswers({
      ...answers,
      [q.id]: { value, weight: answer?.weight ?? draftWeights[q.id] ?? 1 },
    });
  useEffect(() => {
    heading.current?.focus({ preventScroll: true });
  }, [index]);
  const next = () => {
    if (answer === undefined) return;
    if (index === questions.length - 1) {
      if (isComplete(answers, questions)) finish();
      else
        setIndex(
          questions.findIndex((item) => !Object.hasOwn(answers, item.id)),
        );
    } else setIndex(index + 1);
  };
  return (
    <main id="main" className="quiz-page container">
      <div className="quiz-top">
        <Link to="/" className="text-link">
          <X size={17} /> Salir del test
        </Link>
        <span>
          <LockKeyhole size={15} /> Solo en esta sesión
        </span>
      </div>
      <div className="quiz-layout">
        <aside className="quiz-sidebar">
          <span className="eyebrow">UN RATITO CONTIGO</span>
          <h2>Vamos por partes.</h2>
          <p>
            Puedes cambiar de opinión.
            <br />Y volver atrás cuando quieras.
          </p>
          <nav aria-label="Temas del cuestionario">
            {categories.map((c) => {
              const CIcon = icons[c.id];
              const qs = questions.filter((item) => item.category === c.id);
              const filled = qs.filter((item) =>
                Object.hasOwn(answers, item.id),
              ).length;
              return (
                <button
                  key={c.id}
                  className={
                    q.category === c.id
                      ? "quiz-category current"
                      : "quiz-category"
                  }
                  onClick={() =>
                    setIndex(
                      questions.findIndex((item) => item.category === c.id),
                    )
                  }
                >
                  <span
                    className="category-symbol"
                    style={{ background: c.color }}
                  >
                    <CIcon size={18} />
                  </span>
                  <span>{c.name}</span>
                  <small>
                    {filled}/{qs.length}
                  </small>
                  {filled === qs.length && <Check size={14} />}
                </button>
              );
            })}
          </nav>
          <div className="sidebar-foot">
            <CircleHelp size={19} />
            <p>
              «Sin opinión» no cuenta como una postura neutral. Se excluye del
              cálculo.
            </p>
          </div>
        </aside>
        <section className="quiz-content">
          <div className="progress-caption">
            <span>
              Pregunta <b>{index + 1}</b> de {questions.length}
            </span>
            <span>{Object.keys(answers).length} completadas</span>
          </div>
          <progress
            value={Object.keys(answers).length}
            max={questions.length}
            aria-label="Preguntas completadas"
          />
          <div className="question-card">
            <span
              className="tag category-tag"
              style={{ background: category.color }}
            >
              <Icon size={16} />
              {category.name}
            </span>
            <h1 ref={heading} tabIndex={-1}>
              {q.title}
            </h1>
            <details className="question-context">
              <summary>
                <CircleHelp size={16} /> Un poco de contexto
              </summary>
              <p>{q.context}</p>
            </details>
            <fieldset className="answer-fieldset">
              <legend>¿Hasta qué punto estás de acuerdo?</legend>
              <div className="answer-options">
                {answerLabels.map((label, i) => (
                  <label
                    className={`answer-option option-${i}${answer?.value === i - 2 ? " selected" : ""}`}
                    key={label}
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={i - 2}
                      checked={answer?.value === i - 2}
                      onChange={() => choose(i - 2)}
                    />
                    <span className="radio-indicator">
                      {answer?.value === i - 2 && <Check size={17} />}
                    </span>
                    <span>{label}</span>
                  </label>
                ))}
              </div>
              <label
                className={`skip-option${answer?.value === null ? " selected" : ""}`}
              >
                <input
                  type="radio"
                  name={q.id}
                  checked={answer?.value === null}
                  onChange={() => choose(null)}
                />
                <CircleHelp size={16} /> No tengo una opinión / prefiero saltar
              </label>
            </fieldset>
            <div className="importance">
              <div>
                <SlidersHorizontal size={18} />
                <span>
                  ¿Cuánto te importa?
                  <small>Este tema tendrá más o menos peso.</small>
                </span>
              </div>
              <div
                className="importance-options"
                role="group"
                aria-label="Importancia del tema"
              >
                {["Normal", "Bastante", "Mucho"].map((label, i) => (
                  <button
                    key={label}
                    className={
                      (answer?.weight ?? draftWeights[q.id] ?? 1) === i + 1
                        ? "active"
                        : ""
                    }
                    aria-pressed={
                      (answer?.weight ?? draftWeights[q.id] ?? 1) === i + 1
                    }
                    onClick={() => {
                      setDraftWeights({ ...draftWeights, [q.id]: i + 1 });
                      if (answer !== undefined)
                        setAnswers({
                          ...answers,
                          [q.id]: { ...answer, weight: i + 1 },
                        });
                    }}
                  >
                    {label}
                    <span>{i + 1}×</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="quiz-actions">
              <button
                className="button button-ghost"
                onClick={() => setIndex(index - 1)}
                disabled={index === 0}
              >
                <ChevronLeft size={17} /> Anterior
              </button>
              <button
                className="button button-dark"
                onClick={next}
                disabled={answer === undefined}
              >
                {index === questions.length - 1
                  ? "Ver mis coincidencias"
                  : "Siguiente pregunta"}
              </button>
            </div>
            <p className="quiz-reassurance">
              No hay respuestas correctas. Solo las tuyas.
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}
function Evidence({
  detail,
}: {
  detail: ReturnType<typeof rankParties>[number]["details"][number];
}) {
  return (
    <div className="evidence-item">
      <h4>{detail.title}</h4>
      <p>{detail.evidence}</p>
      <div className="evidence-positions">
        <span>
          Tú: <b>{answerLabels[detail.answer + 2]}</b>
        </span>
        <span>
          Documento: <b>{stanceLabels[detail.position]}</b>
        </span>
        <span>Peso: {detail.weight}×</span>
      </div>
      {detail.sourceUrl && (
        <External href={detail.sourceUrl}>{detail.locator}</External>
      )}
    </div>
  );
}
function Results({
  answers,
  restart,
  edit,
}: {
  answers: Answers;
  restart: () => void;
  edit: (id?: string) => void;
}) {
  const complete = isComplete(answers, questions);
  const ranked = useMemo(
    () => rankParties(parties, answers, questions),
    [answers],
  );
  const [selected, setSelected] = useState<string>("");
  const [tab, setTab] = useState("afinidad");
  const [copied, setCopied] = useState(false);
  const eligible = ranked.filter((r) => r.eligible);
  const best = eligible[0];
  const tied = best ? eligible.filter((r) => r.score === best.score) : [];
  const active = ranked.find((r) => r.party.id === selected) || best;
  const [filter, setFilter] = useState("");
  const visible = ranked.filter(
    (r) =>
      r.party.name
        .toLocaleLowerCase("es")
        .includes(filter.toLocaleLowerCase("es")) ||
      r.party.shortName
        .toLocaleLowerCase("es")
        .includes(filter.toLocaleLowerCase("es")),
  );
  const [nativeMessage, setNativeMessage] = useState("");
  const [busy, setBusy] = useState(false);
  const exportData = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await exportJson({
        app: "Afín",
        dataset: "29N2026",
        version: 1,
        createdAt: new Date().toISOString(),
        answers,
        results: ranked.map((r) => ({
          party: r.party.name,
          affinity: r.score,
          coverage: r.coverage,
          compared: r.compared,
        })),
        notice:
          "Juego orientativo. Contiene opiniones políticas. No es una recomendación de voto.",
      });
      setNativeMessage(
        isNative
          ? "Selector de Android cerrado. Comprueba el destino que hayas elegido."
          : "Archivo generado en tu dispositivo.",
      );
    } catch {
      setNativeMessage(
        "No se pudo completar la exportación. Puedes intentarlo de nuevo.",
      );
    } finally {
      setBusy(false);
    }
  };
  const copy = async () => {
    if (busy) return;
    setBusy(true);
    try {
      await shareTest();
      setCopied(true);
      setNativeMessage(
        "Herramienta de compartir preparada. Tus respuestas no se incluyen.",
      );
    } catch {
      setCopied(false);
      setNativeMessage("No se ha compartido el test.");
    } finally {
      setBusy(false);
    }
  };
  if (!complete)
    return (
      <main id="main" className="container empty-state">
        <Fingerprint size={50} />
        <h1>Aquí faltan tus ideas.</h1>
        <p>
          Completa o salta las {questions.length} preguntas antes de consultar
          tu afinidad. Tus respuestas no se guardan al recargar la página.
        </p>
        <Link to="/test" className="button button-dark">
          Ir al test
        </Link>
      </main>
    );
  return (
    <main id="main" className="container results-page">
      <PageIntro
        eyebrow="TUS IDEAS, CON TODOS SUS MATICES"
        title="Hay cosas que os unen."
      >
        <p>
          Este es tu mapa de coincidencias con los documentos revisados. Una
          conversación para empezar, no una etiqueta para llevar puesta.
        </p>
      </PageIntro>
      <Notice>
        <strong>Un juego de broma, no una recomendación de voto.</strong> Los
        porcentajes no suman 100 y pueden basarse en preguntas diferentes.
        Compara siempre la cobertura y las fuentes. La presencia electoral varía
        por provincia; consulta la ficha de cada formación.
      </Notice>
      {best ? (
        <section
          className="result-hero"
          style={{ "--party-color": best.party.color } as CSSProperties}
        >
          <div className="result-emblem">
            <Sparkles size={30} />
          </div>
          <div className="result-main">
            <span className="eyebrow">
              {tied.length > 1
                ? "MAYOR AFINIDAD · HAY EMPATE"
                : "MAYOR AFINIDAD ENTRE LOS RESULTADOS COMPARABLES"}
            </span>
            <h2>
              {tied.length > 1
                ? tied.map((r) => r.party.shortName).join(" · ")
                : best.party.name}
            </h2>
            <p>
              Coincidencia en {best.compared} de tus {best.answered} respuestas
              con opinión. Cobertura ponderada: {best.coverage} %.
            </p>
            {tied.length > 1 && (
              <p>
                El empate usa porcentajes redondeados. El orden no expresa
                preferencia.
              </p>
            )}
            <span className="tag">
              {best.coverage < 70
                ? "Cobertura limitada · resultado provisional"
                : "Afinidad orientativa"}
            </span>
          </div>
          <div className="hero-score">
            <strong>
              {best.score}
              <span>%</span>
            </strong>
            <span>de afinidad</span>
          </div>
        </section>
      ) : (
        <div className="insufficient">
          <CircleHelp size={34} />
          <h2>Aún no hay base suficiente para compararte.</h2>
          <p>
            Se necesitan al menos 8 respuestas con opinión y evidencia que cubra
            el 40 % de su peso para cada formación. Saltar preguntas está bien:
            no vamos a inventar un resultado.
          </p>
          <button onClick={() => edit()} className="button button-dark">
            Revisar mis respuestas
          </button>
        </div>
      )}
      {nativeMessage && (
        <p role="status" className="native-status">
          {nativeMessage}
        </p>
      )}
      <div className="result-toolbar">
        <div>
          <button className="button button-ghost" onClick={() => edit()}>
            <SlidersHorizontal size={17} /> Revisar respuestas
          </button>
          <button className="button button-ghost" onClick={restart}>
            <RotateCcw size={16} /> Repetir test
          </button>
        </div>
        <div>
          <button
            className="button button-ghost"
            onClick={copy}
            disabled={busy}
          >
            <Clipboard size={16} />
            {copied ? "Listo" : "Compartir el test"}
          </button>
          <button
            className="button button-ghost"
            onClick={exportData}
            disabled={busy}
            aria-describedby="export-disclosure"
          >
            <Download size={16} /> Guardar mis datos
          </button>
        </div>
      </div>
      <p id="export-disclosure" className="result-note">
        Guardar mis datos genera un archivo con tus opiniones políticas.{" "}
        {isNative
          ? "Android te permite elegir dónde guardarlo o con quién compartirlo. Se conserva una copia temporal en la caché privada."
          : "El archivo se descarga en tu dispositivo."}
      </p>
      <div className="results-layout">
        <section className="ranking-panel">
          <h2>Todas las formaciones</h2>
          <p>
            «Sin porcentaje» significa evidencia insuficiente, no una afinidad
            del 0 %.
          </p>
          <label className="search-field">
            <Search size={17} />
            <input
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              placeholder="Buscar formación"
              aria-label="Buscar formación en resultados"
            />
          </label>
          <div className="ranking-list">
            {visible.map((r) => (
              <button
                className={
                  active?.party.id === r.party.id
                    ? "ranking-row selected"
                    : "ranking-row"
                }
                key={r.party.id}
                onClick={() => {
                  setSelected(r.party.id);
                  setTab("afinidad");
                }}
                aria-pressed={active?.party.id === r.party.id}
              >
                <span
                  className="party-badge"
                  style={{ background: r.party.color }}
                >
                  {r.party.shortName.slice(0, 4)}
                </span>
                <span className="ranking-party">
                  <b>{r.party.shortName}</b>
                  <small>
                    {r.compared} temas · {r.coverage} % de cobertura
                  </small>
                  <span className="score-track">
                    <span
                      style={{
                        width: `${r.score ?? 0}%`,
                        background: r.party.color,
                      }}
                    />
                  </span>
                </span>
                <span
                  className={r.score === null ? "unscored" : "score-number"}
                >
                  {r.score === null ? "Sin %" : `${r.score}%`}
                </span>
              </button>
            ))}
          </div>
          {!visible.length && <p>No hay coincidencias con esa búsqueda.</p>}
        </section>
        <section className="result-detail" aria-live="polite">
          {active ? (
            <>
              <div className="detail-heading">
                <span
                  className="party-badge large"
                  style={{ background: active.party.color }}
                >
                  {active.party.shortName.slice(0, 4)}
                </span>
                <div>
                  <span className="eyebrow">
                    POR QUÉ APARECE ESTE RESULTADO
                  </span>
                  <h2>{active.party.name}</h2>
                </div>
              </div>
              <p className="detail-coverage">
                {active.eligible
                  ? `${active.score} % de afinidad orientativa`
                  : "Sin porcentaje: base documental insuficiente"}{" "}
                · {active.compared}/{active.answered} respuestas comparadas ·{" "}
                {active.coverage} % de cobertura ponderada.
              </p>
              {active.party.note && (
                <p className="source-note">{active.party.note}</p>
              )}
              {active.party.programUrl && (
                <External
                  href={active.party.programUrl}
                  className="program-link"
                >
                  Abrir documento original
                </External>
              )}
              <div
                className="tabs"
                role="tablist"
                aria-label="Explicación del resultado"
              >
                {[
                  ["afinidad", "Coincidencias"],
                  ["diferencias", "Diferencias"],
                  ["todo", "Tema a tema"],
                ].map(([id, label]) => (
                  <button
                    role="tab"
                    key={id}
                    id={`tab-${id}`}
                    aria-selected={tab === id}
                    aria-controls="evidence-panel"
                    onClick={() => setTab(id)}
                  >
                    {label}
                  </button>
                ))}
              </div>
              <div
                id="evidence-panel"
                role="tabpanel"
                aria-labelledby={`tab-${tab}`}
                tabIndex={0}
              >
                {(tab === "afinidad"
                  ? active.agreements
                  : tab === "diferencias"
                    ? active.differences
                    : active.details
                ).map((d) => (
                  <Evidence key={d.questionId} detail={d} />
                ))}
                {tab === "afinidad" && !active.agreements.length && (
                  <p className="no-evidence">
                    No hay coincidencias claras en los temas comparables.
                  </p>
                )}
                {tab === "diferencias" && !active.differences.length && (
                  <p className="no-evidence">
                    No hay desacuerdos fuertes documentados. Esto no implica
                    coincidir en todos los temas.
                  </p>
                )}
                {tab === "todo" && (
                  <div className="missing-topics">
                    <h4>Sin comparación en estos temas</h4>
                    {questions
                      .filter(
                        (q) =>
                          !active.details.some((d) => d.questionId === q.id),
                      )
                      .map((q) => (
                        <p key={q.id}>
                          {q.title}
                          <small>
                            {answers[q.id]?.value === null
                              ? "No has expresado una opinión."
                              : "No hay postura documentada comparable."}
                          </small>
                        </p>
                      ))}
                  </div>
                )}
              </div>
            </>
          ) : (
            <p>Selecciona una formación para consultar su evidencia.</p>
          )}
        </section>
      </div>
      <p className="result-note">
        <ShieldCheck size={18} /> «Compartir el test» comparte un enlace
        genérico, sin tus opiniones ni tus resultados. «Guardar mis datos»
        incluye tus respuestas.
      </p>
    </main>
  );
}
function Programs() {
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");
  const [expanded, setExpanded] = useState("");
  const entries = catalog.parties.map((entry) => ({
    ...entry,
    ...parties.find((p) => p.id === entry.id),
  }));
  const filtered = entries.filter(
    (p) =>
      (p.name + " " + p.shortName + " " + (p.aliases || []).join(" "))
        .toLocaleLowerCase("es")
        .includes(search.toLocaleLowerCase("es")) &&
      (status === "all" ||
        (status === "reviewed"
          ? p.status === "reviewed"
          : p.status !== "reviewed")),
  );
  return (
    <main id="main" className="container programs-page">
      <PageIntro
        eyebrow="BIBLIOTECA DE PROPUESTAS · 29N 2026"
        title="Aquí están las fuentes."
      >
        <p>
          Un catálogo completo de las denominaciones del Congreso recogidas en
          el BOE del 3 de noviembre de 2026. Cada formación muestra lo que hemos
          podido comprobar y lo que queda pendiente.
        </p>
      </PageIntro>
      <Notice>
        <strong>Catálogo completo no significa programas completos.</strong> No
        todos los documentos se han localizado ni todas las propuestas encajan
        en estas preguntas. Una candidatura sin programa verificado aparece sin
        posturas y sin porcentaje. No usamos programas de otras convocatorias
        como si fueran actuales.
      </Notice>
      <div className="coverage-summary">
        <div>
          <strong>{entries.filter((p) => p.provinces?.length).length}</strong>
          <span>grupos con candidaturas proclamadas</span>
        </div>
        <div>
          <strong>{reviewed.length}</strong>
          <span>documentos con evidencia revisada</span>
        </div>
        <div>
          <strong>
            {entries.filter((p) => p.status !== "reviewed").length}
          </strong>
          <span>sin evidencia suficiente o pendientes</span>
        </div>
        <External href={catalog.sourceUrl}>Consultar el BOE</External>
      </div>
      <div className="program-filters">
        <label className="search-field">
          <Search size={19} />
          <input
            placeholder="Busca un partido, coalición o sigla…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label="Buscar en los programas"
          />
        </label>
        <div
          className="filter-buttons"
          role="group"
          aria-label="Estado del documento"
        >
          {[
            ["all", "Todos"],
            ["reviewed", "Con evidencia"],
            ["pending", "Pendientes"],
          ].map(([id, label]) => (
            <button
              key={id}
              onClick={() => setStatus(id)}
              aria-pressed={status === id}
              className={status === id ? "active" : ""}
            >
              {label}
            </button>
          ))}
        </div>
      </div>
      <p className="count-label">
        {filtered.length} formaciones · Revisión documental: 20 de noviembre de
        2026
      </p>
      <div className="program-grid">
        {filtered.map((p) => (
          <article className="program-card" key={p.id}>
            <div className="program-card-top">
              <span
                className="party-badge"
                style={{ background: p.color || "#697572" }}
              >
                {p.shortName?.slice(0, 4) || "·"}
              </span>
              <span
                className={
                  p.status === "reviewed"
                    ? "document-status reviewed"
                    : "document-status"
                }
              >
                {p.status === "reviewed" ? (
                  <>
                    <Check size={13} /> Evidencia revisada
                  </>
                ) : (
                  "Pendiente / sin base"
                )}
              </span>
            </div>
            <h2>{p.name}</h2>
            <p className="program-territory">
              {p.provinces?.length
                ? `${p.provinces.length} circunscripción${p.provinces.length > 1 ? "es" : ""}`
                : "No proclamada en el BOE consultado"}
            </p>
            <p>
              {p.note ||
                "Consulta el documento original y las posturas codificadas para este cuestionario."}
            </p>
            {p.sourceTitle && <p className="source-title">{p.sourceTitle}</p>}
            <div className="program-meta">
              <span>
                {Object.keys(p.positions || {}).length}/{questions.length} temas
                documentados
              </span>
              {p.documentKind && (
                <span>
                  {p.documentKind === "full"
                    ? "Programa"
                    : "Documento / avance"}
                </span>
              )}
            </div>
            <div className="program-links">
              {p.programUrl ? (
                <External href={p.programUrl}>Leer documento</External>
              ) : (
                <span className="muted">Sin enlace de programa verificado</span>
              )}
              <button
                className="text-link"
                onClick={() => setExpanded(expanded === p.id ? "" : p.id)}
                aria-expanded={expanded === p.id}
              >
                Ver ficha <ChevronRight size={15} />
              </button>
            </div>
            {expanded === p.id && (
              <div className="program-expanded">
                <p>
                  <b>Ámbito:</b> {p.provinces?.join(", ") || "Sin proclamación"}
                </p>
                {p.aliases && (
                  <p>
                    <b>Denominaciones del BOE:</b> {p.aliases.join("; ")}
                  </p>
                )}
                <External href={catalog.sourceUrl}>
                  Fuente del catálogo
                </External>
                {Object.entries(p.positions || {}).map(([qid, pos]) => (
                  <div className="source-position" key={qid}>
                    <b>{questions.find((q) => q.id === qid)?.title}</b>
                    <span>
                      {stanceLabels[pos.value]} · {pos.evidence}
                    </span>
                    <External href={pos.sourceUrl || p.programUrl!}>
                      {pos.locator}
                    </External>
                  </div>
                ))}
              </div>
            )}
          </article>
        ))}
      </div>
      {!filtered.length && (
        <div className="empty-state">
          <Search />
          <h2>No hay resultados.</h2>
          <p>Prueba con otras siglas o cambia el filtro.</p>
        </div>
      )}
      <div className="catalog-footnote">
        <h2>Qué incluye este catálogo</h2>
        <p>
          El universo es el Congreso de los Diputados para el 29N de 2026, no el
          registro de todos los partidos españoles. Se agrupan variantes
          territoriales evidentes de una misma candidatura y se conservan sus
          denominaciones originales. Las candidaturas del Senado no se mezclan.
          Las coaliciones territoriales con identidad propia se conservan por
          separado.
        </p>
        <p>
          Se incluyen también las denominaciones que constan únicamente como no
          proclamadas, identificadas en su ficha. La presencia corresponde al
          BOE citado y puede cambiar por rectificaciones o resoluciones
          posteriores. La revisión de fuentes no es una auditoría de todos los
          párrafos de cada programa.
        </p>
        <p>
          Un documento con menos de 8 posturas verificadas puede consultarse
          pero no obtiene porcentaje. No vinculamos automáticamente programas de
          partidos que forman una coalición sin una fuente que lo acredite.
        </p>
      </div>
    </main>
  );
}
function Method() {
  return (
    <main id="main" className="container methodology-page">
      <PageIntro eyebrow="SIN CAJA NEGRA" title="Así hacemos las cuentas.">
        <p>
          Un cálculo sencillo y visible. El dato difícil no es la fórmula: es
          interpretar con cuidado lo que dice cada documento.
        </p>
      </PageIntro>
      <div className="method-grid">
        <article>
          <span className="step-icon lime">
            <SlidersHorizontal />
          </span>
          <h2>Tus respuestas</h2>
          <p>
            Usamos cinco posiciones, de −2 (totalmente en desacuerdo) a +2
            (totalmente de acuerdo). El 0 expresa una posición intermedia. «No
            tengo una opinión» no es 0: se excluye del cálculo.
          </p>
          <p>
            El peso es 1, 2 o 3 según la importancia que elijas. Elegir la
            importancia no contesta por ti: debes seleccionar una postura o
            saltar la pregunta.
          </p>
        </article>
        <article>
          <span className="step-icon lilac">
            <BookOpen />
          </span>
          <h2>La lectura del programa</h2>
          <p>
            Codificamos solamente posiciones respaldadas por documentos de esta
            convocatoria: −2 oposición explícita, −1 oposición parcial, 0
            posición intermedia explícita, +1 apoyo parcial y +2 apoyo
            explícito.
          </p>
          <p>
            El silencio no cuenta como neutralidad ni como oposición. No
            inferimos posturas a partir de una etiqueta ideológica. Cada
            posición tiene una paráfrasis y un localizador en su fuente. La
            codificación editorial puede contener errores y no ha sido validada
            por los partidos.
          </p>
        </article>
      </div>
      <section className="formula-card">
        <span className="eyebrow">LA FÓRMULA</span>
        <h2>Cercanía, tema a tema.</h2>
        <code>
          Afinidad = 100 × Σ [peso × (1 − |tu respuesta − postura| / 4)] / Σ
          pesos comparables
        </code>
        <p>
          Solo entran en las sumas las preguntas donde has expresado una opinión
          y existe una postura documentada. La distancia máxima entre −2 y +2 es
          4. El resultado final se redondea al entero más próximo.
        </p>
        <div className="formula-example">
          <div>
            <b>Tú +2 · Programa +2</b>
            <span>100 % de coincidencia en ese tema</span>
          </div>
          <div>
            <b>Tú +2 · Programa 0</b>
            <span>50 % de coincidencia en ese tema</span>
          </div>
          <div>
            <b>Tú +2 · Programa −2</b>
            <span>0 % de coincidencia en ese tema</span>
          </div>
        </div>
      </section>
      <div className="prose method-prose">
        <h2>¿Cuándo mostramos un porcentaje?</h2>
        <p>
          Una formación necesita al menos 8 preguntas comparables y evidencia
          que cubra como mínimo el 40 % del peso de tus respuestas con opinión.
          Por debajo de ese umbral aparece «Sin %». Una cobertura menor del 70 %
          se destaca como limitada. Estos umbrales son decisiones editoriales,
          no criterios de validez científica.
        </p>
        <p>
          La cobertura es el peso de las preguntas comparadas dividido entre el
          peso de todas tus respuestas con opinión. No es la proporción de
          páginas leídas ni una estimación de fiabilidad estadística.
        </p>
        <h2>Los resultados tienen límites</h2>
        <p>
          Dos partidos pueden tener porcentajes calculados sobre preguntas
          diferentes. Un documento breve puede omitir temas decisivos para ti.
          Consulta siempre el número de temas, la cobertura y la explicación
          antes de comparar. Las preguntas no agotan un programa, no evalúan su
          viabilidad y no contrastan su cumplimiento.
        </p>
        <p>
          Los porcentajes no suman 100. No son probabilidades, intención de voto
          ni una medida científica de tu identidad política. Si dos porcentajes
          redondeados empatan, lo indicamos; el orden posterior usa la cobertura
          y el nombre para mantener una presentación estable.
        </p>
        <h2>Una fotografía de una convocatoria</h2>
        <p>
          La base documental corresponde a las generales del 29 de noviembre de
          2026 y se revisó el 20 de noviembre de 2026. No se actualiza
          automáticamente. Los programas de 2023 y los programas europeos,
          autonómicos o municipales no se utilizan para rellenar huecos.
        </p>
        <h2>Independencia y correcciones</h2>
        <p>
          Afín es un proyecto lúdico sin vinculación declarada con las
          formaciones citadas. La selección de preguntas y su interpretación no
          son neutrales por definición: por eso se hacen visibles y se pueden
          revisar en las fichas. Si detectas una discrepancia, contrasta la
          pregunta con el pasaje original y consulta el código y los datos del
          proyecto.
        </p>
        <Link to="/programas" className="button button-dark">
          <BookOpen size={18} /> Revisar las fuentes
        </Link>
      </div>
    </main>
  );
}
function NotFound() {
  return (
    <main id="main" className="container empty-state not-found">
      <span className="error-code">404</span>
      <span className="tag">ESTA PÁGINA SE HA ABSTENIDO</span>
      <h1>
        Por aquí no hay consenso.
        <br />
        Ni página.
      </h1>
      <p>
        Puede que el enlace haya cambiado o que esta dirección nunca se
        presentara a las elecciones.
      </p>
      <Link to="/" className="button button-dark">
        Volver al inicio
      </Link>
    </main>
  );
}
export default function App() {
  const [path, setPath] = useState(normalise(window.location.pathname));
  const [answers, setAnswers] = useState<Answers>({});
  const [index, setIndex] = useState(0);
  const [resetting, setResetting] = useState(false);
  const [exiting, setExiting] = useState(false);
  const navigate = (to: string) => {
    if (normalise(window.location.pathname) !== to)
      window.history.pushState({}, "", to);
    setPath(normalise(to));
    window.scrollTo({ top: 0, behavior: "instant" });
    setTimeout(
      () => document.getElementById("main")?.focus({ preventScroll: true }),
      0,
    );
  };
  useEffect(() => {
    const listener = () => {
      setPath(normalise(window.location.pathname));
      window.scrollTo(0, 0);
    };
    window.addEventListener("popstate", listener);
    return () => window.removeEventListener("popstate", listener);
  }, []);
  useEffect(() => {
    document.getElementById("main")?.setAttribute("tabindex", "-1");
    const titles: Record<string, string> = {
      "/": "Tus ideas tienen más de un color",
      "/test": "Tu test de afinidad",
      "/resultados": "Tus coincidencias",
      "/programas": "Programas y fuentes 29N 2026",
      "/metodologia": "Cómo calculamos la afinidad",
      "/privacidad": "Privacidad",
      "/cookies": "Cookies",
      "/aviso-legal": "Aviso legal",
      "/accesibilidad": "Accesibilidad",
      "/creditos": "Créditos",
    };
    document.title = `${titles[path] || "404 · Página no encontrada"} · Afín`;
    let robots = document.querySelector('meta[name="robots"]');
    robots?.setAttribute(
      "content",
      path === "/resultados" || !knownRoutes.includes(path)
        ? "noindex, nofollow"
        : "index, follow",
    );
  }, [path]);
  useEffect(() => {
    let disposed = false;
    let cleanup: undefined | (() => void);
    registerNativeBack(() => {
      if (resetting) {
        setResetting(false);
        return;
      }
      if (exiting) {
        setExiting(false);
        return;
      }
      if (path === "/test" && index > 0) {
        setIndex(index - 1);
        return;
      }
      if (path !== "/") {
        navigate("/");
        return;
      }
      if (Object.keys(answers).length) setExiting(true);
      else void exitNativeApp();
    }).then((remove) => {
      if (disposed) remove();
      else cleanup = remove;
    });
    return () => {
      disposed = true;
      cleanup?.();
    };
  }, [path, index, resetting, exiting, answers]);
  const restart = () => setResetting(true);
  return (
    <Navigation.Provider value={navigate}>
      <a className="skip-link" href="#main">
        Saltar al contenido
      </a>
      <Header path={path} />
      {path === "/" ? (
        <main id="main" tabIndex={-1}>
          <Home />
        </main>
      ) : path === "/test" ? (
        <Quiz
          answers={answers}
          setAnswers={setAnswers}
          index={index}
          setIndex={setIndex}
          finish={() => navigate("/resultados")}
        />
      ) : path === "/resultados" ? (
        <Results
          answers={answers}
          restart={restart}
          edit={(id) => {
            setIndex(id ? questions.findIndex((q) => q.id === id) : 0);
            navigate("/test");
          }}
        />
      ) : path === "/programas" ? (
        <Programs />
      ) : path === "/metodologia" ? (
        <Method />
      ) : [
          "/privacidad",
          "/cookies",
          "/aviso-legal",
          "/accesibilidad",
          "/creditos",
        ].includes(path) ? (
        isNative &&
        ["/privacidad", "/cookies", "/aviso-legal"].includes(path) ? (
          <NativePrivacy legal={path === "/aviso-legal"} />
        ) : (
          <PolicyPage path={path} />
        )
      ) : (
        <NotFound />
      )}
      <Footer />
      {exiting && (
        <ExitDialog
          cancel={() => setExiting(false)}
          confirm={() => {
            void exitNativeApp();
          }}
        />
      )}
      {resetting && (
        <ResetDialog
          cancel={() => setResetting(false)}
          confirm={() => {
            setAnswers({});
            setIndex(0);
            setResetting(false);
            navigate("/test");
          }}
        />
      )}
    </Navigation.Provider>
  );
}
function ResetDialog({
  cancel,
  confirm,
}: {
  cancel: () => void;
  confirm: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    return () => ref.current?.close();
  }, []);
  return (
    <dialog ref={ref} className="reset-dialog" onCancel={cancel}>
      <h2>¿Empezamos de cero?</h2>
      <p>Se borrarán las respuestas de este test en esta sesión.</p>
      <div>
        <button className="button button-ghost" onClick={cancel}>
          Conservar respuestas
        </button>
        <button className="button button-dark" onClick={confirm}>
          Repetir test
        </button>
      </div>
    </dialog>
  );
}

function ExitDialog({
  cancel,
  confirm,
}: {
  cancel: () => void;
  confirm: () => void;
}) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    ref.current?.showModal();
    return () => ref.current?.close();
  }, []);
  return (
    <dialog ref={ref} className="reset-dialog" onCancel={cancel}>
      <h2>¿Salir de Afín?</h2>
      <p>
        Las respuestas solo se conservan mientras Android mantenga esta sesión.
        Puedes guardarlas antes de salir.
      </p>
      <div>
        <button className="button button-ghost" onClick={cancel}>
          Seguir en Afín
        </button>
        <button className="button button-dark" onClick={confirm}>
          Salir
        </button>
      </div>
    </dialog>
  );
}
