import { External, Link, PageIntro } from "./components";
import { publicPrivacyUrl } from "./platform";
import policy from "./data/android-privacy.json";

export function NativePrivacy({ legal = false }: { legal?: boolean }) {
  return (
    <main id="main" className="container policy-page">
      <PageIntro
        eyebrow="AFÍN · ANDROID"
        title={
          legal ? "Una broma con fuentes." : "Tus opiniones se quedan contigo."
        }
      >
        <p>
          {legal
            ? "Una aplicación lúdica independiente para explorar ideas."
            : "Política de privacidad de Afín para Android. Última revisión: 20 de noviembre de 2026."}
        </p>
      </PageIntro>
      <div className="prose">
        {policy.sections.map((section) => (
          <section key={section.h}>
            <h2>{section.h}</h2>
            {section.p.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </section>
        ))}
        <p>
          <External href={publicPrivacyUrl}>Política pública de Afín</External>
        </p>
        <p>
          <a href={"mailto:" + policy.email}>Contactar con soporte</a> ·{" "}
          <External href="https://www.aepd.es/">
            Agencia Española de Protección de Datos
          </External>
        </p>
        <p>
          <Link to="/creditos">Fuentes, fotografía y licencias</Link> ·{" "}
          <Link to="/metodologia">Metodología y límites</Link>
        </p>
      </div>
    </main>
  );
}
