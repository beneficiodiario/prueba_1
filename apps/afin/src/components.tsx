import {isNative,openExternal} from './platform';
import { createContext, useContext, type ReactNode } from "react";
import {
  Check,
  CircleHelp,
  ExternalLink,
  Fingerprint,
  Menu,
  X,
} from "lucide-react";
import { useState } from "react";
export const Navigation = createContext<(path: string) => void>(() => {});
export function Link({
  to,
  children,
  className = "",
  ...rest
}: {
  to: string;
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
}) {
  const navigate = useContext(Navigation);
  return (
    <a
      href={to}
      className={className}
      {...rest}
      onClick={(e) => {
        if (
          !e.metaKey &&
          !e.ctrlKey &&
          !e.shiftKey &&
          !e.altKey &&
          e.button === 0
        ) {
          e.preventDefault();
          navigate(to);
        }
      }}
    >
      {children}
    </a>
  );
}
export function External({
  href,
  children,
  className = "",
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <a
      href={href}
      onClick={event=>{if(isNative){event.preventDefault();void openExternal(href).catch(()=>window.alert('No se pudo abrir el navegador.'));}}}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
    >
      {children}
      <ExternalLink size={14} aria-hidden="true" />
      <span className="sr-only"> (nueva pestaña)</span>
    </a>
  );
}
export function Mark() {
  return (
    <svg viewBox="0 0 40 40" aria-hidden="true" className="brand-mark">
      <path
        d="M20 2C25 13 27 15 38 20C27 25 25 27 20 38C15 27 13 25 2 20C13 15 15 13 20 2Z"
        fill="currentColor"
      />
      <circle cx="20" cy="20" r="5" fill="var(--paper)" />
    </svg>
  );
}
export function Header({ path }: { path: string }) {
  const [open, setOpen] = useState(false);
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="brand" aria-label="Afín, inicio">
          <Mark />
          afín<span className="brand-dot">.</span>
        </Link>
        <button
          className="icon-button menu-toggle"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
        <nav
          aria-label="Navegación principal"
          className={open ? "nav open" : "nav"}
          onClick={() => setOpen(false)}
        >
          <Link
            to="/programas"
            aria-current={path === "/programas" ? "page" : undefined}
          >
            Los programas
          </Link>
          <Link
            to="/metodologia"
            aria-current={path === "/metodologia" ? "page" : undefined}
          >
            Cómo funciona
          </Link>
          <Link to="/test" className="button button-small button-lime">
            <Fingerprint size={17} /> Hacer el test
          </Link>
        </nav>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <Link to="/" className="brand">
            <Mark />
            afín.
          </Link>
          <p>
            Una excusa para pensar.
            <br />
            No una instrucción para votar.
          </p>
          <span className="tag">
            <Check size={14} /> Sin registro · Sin analítica
          </span>
        </div>
        <p className="footer-disclaimer">
          Web de broma y divulgación independiente. Compara ideas con documentos
          del 29N de 2026. No diagnostica tu ideología, no representa a ningún
          partido y no ofrece una recomendación de voto.
        </p>
        <div className="footer-bottom">
          <span>Hecho con preguntas, no con certezas.</span>
          <nav aria-label="Información del sitio">
            <Link to="/privacidad">Privacidad</Link>
            <Link to="/cookies">Cookies</Link>
            <Link to="/aviso-legal">Aviso legal</Link>
            <Link to="/accesibilidad">Accesibilidad</Link>
            <Link to="/creditos">Créditos</Link>
            {!isNative&&<a href="/llms.txt">LLMs</a>}
          </nav>
        </div>
      </div>
    </footer>
  );
}
export function Notice({ children }: { children: ReactNode }) {
  return (
    <div className="notice">
      <CircleHelp size={20} aria-hidden="true" />
      <div>{children}</div>
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="page-intro">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <div className="lead">{children}</div>
    </div>
  );
}
