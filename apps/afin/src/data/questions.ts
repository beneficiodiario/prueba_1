import type { Question } from "../types";
export const categories = [
  { id: "economia", name: "Economía y trabajo", color: "#e6f4b5" },
  { id: "servicios", name: "Vivienda y servicios", color: "#e3ddfa" },
  { id: "clima", name: "Energía y movilidad", color: "#ccebe3" },
  { id: "derechos", name: "Derechos e igualdad", color: "#f9d5df" },
  { id: "territorio", name: "Modelo territorial", color: "#d4e6fc" },
  { id: "sociedad", name: "Sociedad y entorno", color: "#f6e3ba" },
  { id: "mundo", name: "Democracia y exterior", color: "#dedff6" },
];
export const questions: Question[] = [
  {
    id: "incomeTax",
    category: "economia",
    title: "Bajar o deflactar el IRPF de las rentas bajas y medias.",
    context:
      "Deflactar adapta los tramos del impuesto a la inflación. Se pregunta por aliviar la tributación de las rentas bajas y medias, no por bajar todos los impuestos.",
  },
  {
    id: "bureaucracy",
    category: "economia",
    title:
      "Simplificar los trámites y licencias para crear o ampliar una empresa.",
    context:
      "Se pregunta por reducir cargas administrativas. No implica eliminar controles sanitarios, ambientales o laborales.",
  },
  {
    id: "firstHomeTax",
    category: "servicios",
    title:
      "Reducir los impuestos por la compra de la primera vivienda habitual.",
    context:
      "Se refiere a rebajas o deducciones por comprar la primera vivienda para vivir, no a subvencionar compras de inversión.",
  },
  {
    id: "squatting",
    category: "servicios",
    title: "Agilizar el desalojo de viviendas ocupadas sin título legal.",
    context:
      "Se pregunta por acelerar el procedimiento ante una ocupación sin título. No se equipara a cualquier impago del alquiler ni a cualquier desahucio.",
  },
  {
    id: "nationalPriority",
    category: "sociedad",
    title:
      "Dar prioridad a la nacionalidad española en el acceso a ayudas públicas.",
    context:
      "Se pregunta si la nacionalidad debe ser un criterio preferente, frente a aplicar otros requisitos como ingresos, residencia o necesidad.",
  },
  {
    id: "repeatCrime",
    category: "sociedad",
    title: "Endurecer las penas para los delitos cometidos de forma reiterada.",
    context:
      "Se pregunta por elevar la respuesta penal ante reincidencia. No se refiere solo a agilizar juzgados ni a aumentar efectivos policiales.",
  },
  {
    id: "wealthTax",
    category: "economia",
    title: "Mantener impuestos específicos sobre los grandes patrimonios.",
    context:
      "Se plantea si deben existir tributos dirigidos específicamente a las grandes fortunas, además de los impuestos generales.",
  },
  {
    id: "workWeek",
    category: "economia",
    title: "Reducir la jornada laboral legal sin reducir el salario.",
    context:
      "La propuesta modifica el máximo legal de horas. No se pregunta por una reducción individual de jornada con reducción de sueldo.",
  },
  {
    id: "minimumWage",
    category: "economia",
    title: "Seguir elevando el salario mínimo interprofesional.",
    context:
      "El salario mínimo fija el suelo salarial legal. Las propuestas pueden diferir en el ritmo y en la cuantía de las subidas.",
  },
  {
    id: "pensions",
    category: "economia",
    title: "Revalorizar las pensiones con el IPC.",
    context:
      "Vincular su actualización al índice de precios busca mantener su poder adquisitivo y supone un compromiso de gasto público.",
  },
  {
    id: "rentCap",
    category: "servicios",
    title: "Limitar por ley el precio del alquiler en zonas tensionadas.",
    context:
      "La pregunta se refiere a topes de precios en zonas declaradas tensionadas, no a ayudas al alquiler ni a límites turísticos.",
  },
  {
    id: "publicHousing",
    category: "servicios",
    title: "Ampliar el parque de vivienda pública de alquiler.",
    context:
      "Se plantea incrementar las viviendas públicas destinadas al alquiler. No presupone un mecanismo concreto de construcción o adquisición.",
  },
  {
    id: "publicHealth",
    category: "servicios",
    title: "Aumentar la financiación de la sanidad pública.",
    context:
      "La propuesta se refiere al presupuesto del sistema público. No permite deducir por sí sola la postura sobre la sanidad privada.",
  },
  {
    id: "schoolChoice",
    category: "servicios",
    title: "Mantener la financiación pública de los centros concertados.",
    context:
      "Los centros concertados son de titularidad privada y reciben financiación pública. Se pregunta por la continuidad de este modelo.",
  },
  {
    id: "tuition",
    category: "servicios",
    title: "Avanzar hacia la gratuidad de la universidad pública.",
    context:
      "Se refiere a reducir o eliminar los precios de matrícula, no solo a aumentar las becas para determinados estudiantes.",
  },
  {
    id: "nuclear",
    category: "clima",
    title:
      "Mantener las centrales nucleares más allá del calendario de cierre.",
    context:
      "La pregunta contrapone prolongar la actividad de las centrales existentes a mantener su calendario de cierre.",
  },
  {
    id: "renewables",
    category: "clima",
    title: "Acelerar la implantación de energías renovables.",
    context:
      "Se pregunta por aumentar el despliegue. Las condiciones territoriales, ambientales y de participación local pueden variar entre programas.",
  },
  {
    id: "transport",
    category: "clima",
    title: "Mantener ayudas públicas para abaratar el transporte colectivo.",
    context:
      "Se incluyen abonos, descuentos o gratuidad financiados con fondos públicos, sin exigir un mismo modelo para todos los transportes.",
  },
  {
    id: "water",
    category: "clima",
    title:
      "Impulsar los trasvases entre cuencas para afrontar la falta de agua.",
    context:
      "Los trasvases trasladan agua entre cuencas. Se pregunta por promover esta solución, no por toda la política de gestión del agua.",
  },
  {
    id: "gender",
    category: "derechos",
    title: "Mantener una legislación específica contra la violencia de género.",
    context:
      "Se pregunta por un marco específico para esta violencia, frente a sustituirlo por uno general de violencia intrafamiliar.",
  },
  {
    id: "lgbt",
    category: "derechos",
    title:
      "Mantener la autodeterminación de género en el cambio registral de sexo.",
    context:
      "Se refiere al procedimiento registral sin exigir un diagnóstico médico. No resume el conjunto de derechos de las personas LGTBI.",
  },
  {
    id: "abortion",
    category: "derechos",
    title: "Garantizar el acceso al aborto en la sanidad pública.",
    context:
      "Se pregunta por garantizar la prestación en el sistema público, dentro del marco legal, no por la decisión personal de abortar.",
  },
  {
    id: "euthanasia",
    category: "derechos",
    title: "Mantener el derecho a la eutanasia en los supuestos legales.",
    context:
      "La pregunta se limita a la prestación regulada legalmente, con sus requisitos y garantías.",
  },
  {
    id: "decentralisation",
    category: "territorio",
    title: "Transferir más competencias a las comunidades autónomas.",
    context:
      "Se pregunta por ampliar las competencias autonómicas. Conservar las ya existentes no equivale necesariamente a ampliarlas.",
  },
  {
    id: "referendum",
    category: "territorio",
    title:
      "Permitir un referéndum acordado sobre la independencia de una comunidad.",
    context:
      "Se pregunta por permitir una consulta pactada. Estar de acuerdo no implica votar a favor de la independencia.",
  },
  {
    id: "language",
    category: "territorio",
    title: "Reforzar las lenguas cooficiales en las instituciones estatales.",
    context:
      "Se refiere a su uso y reconocimiento en las instituciones del Estado, no a imponer una lengua concreta en la vida privada.",
  },
  {
    id: "republic",
    category: "territorio",
    title: "Sustituir la monarquía por una república.",
    context:
      "La pregunta se refiere a cambiar la forma de la jefatura del Estado, no a valorar personalmente al actual monarca.",
  },
  {
    id: "migration",
    category: "sociedad",
    title:
      "Regularizar a las personas migrantes que ya viven y trabajan en España.",
    context:
      "Se pregunta por facilitar su situación administrativa. Los requisitos y la amplitud de la regularización pueden variar.",
  },
  {
    id: "border",
    category: "sociedad",
    title:
      "Endurecer los controles fronterizos y las expulsiones por estancia irregular.",
    context:
      "Se pregunta por reforzar estas medidas. La atención humanitaria y el derecho de asilo son cuestiones distintas.",
  },
  {
    id: "animals",
    category: "sociedad",
    title: "Eliminar las subvenciones públicas a la tauromaquia.",
    context:
      "La pregunta se limita al uso de dinero público, sin equipararlo automáticamente a prohibir todos los festejos.",
  },
  {
    id: "rural",
    category: "sociedad",
    title:
      "Garantizar servicios públicos básicos en zonas rurales poco pobladas.",
    context:
      "Se plantea mantener una cobertura mínima de servicios aunque el coste por habitante sea mayor.",
  },
  {
    id: "security",
    category: "mundo",
    title: "Derogar o reformar en profundidad la llamada «ley mordaza».",
    context:
      "Se refiere a la ley de seguridad ciudadana y a una reforma sustancial de sus sanciones y garantías, no a eliminar las normas de seguridad.",
  },
  {
    id: "defence",
    category: "mundo",
    title: "Aumentar el gasto militar hasta el 2 % del PIB.",
    context:
      "Se pregunta por ese umbral concreto de gasto. Apoyar la defensa común no basta para suponer una posición sobre esta cifra.",
  },
  {
    id: "europe",
    category: "mundo",
    title: "Avanzar hacia una mayor integración política de la Unión Europea.",
    context:
      "Se pregunta por profundizar en las instituciones y decisiones compartidas, no solo por mantener la pertenencia a la Unión.",
  },
].sort(
  (a, b) =>
    categories.findIndex((c) => c.id === a.category) -
    categories.findIndex((c) => c.id === b.category),
);
export const answerLabels = [
  "Totalmente en desacuerdo",
  "En desacuerdo",
  "Ni de acuerdo ni en desacuerdo",
  "De acuerdo",
  "Totalmente de acuerdo",
];
export const stanceLabels: Record<number, string> = {
  "-2": "Oposición explícita",
  "-1": "Oposición parcial",
  "0": "Posición intermedia",
  "1": "Apoyo parcial",
  "2": "Apoyo explícito",
};
