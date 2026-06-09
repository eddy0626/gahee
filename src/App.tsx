import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  capabilities,
  companyProfile,
  contact,
  copy,
  Game,
  games,
  legacyCompanyIntro,
  Locale,
  nav,
  partners,
  platformIcons,
  process,
  roadmap,
  stats,
} from "./content";
import { submitInquiry } from "./config";
import { useReveal } from "./useReveal";
import { HeroGlobe } from "./HeroGlobe";

/* ---------- icons ---------- */
const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
  </svg>
);
const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
  </svg>
);
const IconArrow = () => (
  <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconChevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
const IconUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M6 15l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const Brand = ({ className = "brand" }: { className?: string }) => (
  <a className={className} href="#top" aria-label="GAHEE home">
    GAHEE<b>.</b>
  </a>
);

/* ============================================================ NAV */
type NavProps = {
  locale: Locale;
  setLocale: (l: Locale) => void;
  scrolled: boolean;
  onOpenMenu: () => void;
};

function Nav({ locale, setLocale, scrolled, onOpenMenu }: NavProps) {
  return (
    <header className={`nav ${scrolled ? "scrolled" : ""}`}>
      <div className="shell nav__inner">
        <Brand />
        <nav className="nav__links" aria-label="Main">
          {nav[locale].map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="nav__actions">
          <div className="lang" aria-label="Language">
            <button aria-pressed={locale === "ko"} onClick={() => setLocale("ko")}>
              KO
            </button>
            <span>/</span>
            <button aria-pressed={locale === "en"} onClick={() => setLocale("en")}>
              EN
            </button>
          </div>
          <a className="nav__cta" href="#contact">
            {locale === "ko" ? "문의하기" : "Contact"}
          </a>
          <button className="nav__menuBtn" onClick={onOpenMenu} aria-label={copy[locale].menuToggle}>
            <IconMenu />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ============================================================ DRAWER */
function Drawer({ open, onClose, locale, setLocale }: { open: boolean; onClose: () => void; locale: Locale; setLocale: (l: Locale) => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const t = copy[locale];

  useEffect(() => {
    if (!open) {
      triggerRef.current?.focus();
      return;
    }
    triggerRef.current = document.activeElement as HTMLElement;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const panel = panelRef.current;
      if (!panel) return;
      const f = panel.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
      if (!f.length) return;
      const first = f[0];
      const last = f[f.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  return (
    <div className={`drawer ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="drawer__scrim" onClick={onClose} />
      <div className="drawer__panel" ref={panelRef} role="dialog" aria-modal="true" aria-label="Menu">
        <button ref={closeRef} className="drawer__close" onClick={onClose} aria-label={t.closeLabel}>
          <IconClose />
        </button>
        {nav[locale].map((item) => (
          <a key={item.href} href={item.href} onClick={onClose}>
            {item.label}
          </a>
        ))}
        <div className="drawer__lang">
          <button aria-pressed={locale === "ko"} onClick={() => setLocale("ko")}>
            KO
          </button>
          <button aria-pressed={locale === "en"} onClick={() => setLocale("en")}>
            EN
          </button>
        </div>
        <a className="btn btn--primary" href="#contact" onClick={onClose} style={{ marginTop: 18, justifyContent: "center" }}>
          {locale === "ko" ? "파트너십 문의" : "Partnership Inquiry"}
        </a>
      </div>
    </div>
  );
}

/* ============================================================ HERO */
function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="hero" id="top">
      <HeroGlobe />
      <div className="hero__veil" />
      <div className="shell hero__inner">
        <span className="eyebrow hero__eyebrow">Global Game Publisher — Since 2022</span>
        <h1 className="hero__title">
          <span className="line">WE FIND GAMES.</span>
          <span className="line">
            THE WORLD <span className="accent">PLAYS.</span>
          </span>
        </h1>
        <p className="hero__sub">{t.heroText}</p>
        <div className="hero__actions">
          <a className="btn btn--primary" href="#contact">
            {t.primaryCta} <IconArrow />
          </a>
          <a className="btn btn--ghost" href="#games">
            {t.secondaryCta}
          </a>
        </div>
      </div>
      <a className="hero__scroll" href="#games" aria-hidden="true">
        Scroll <i />
      </a>
    </section>
  );
}

/* ============================================================ STATS */
function Stats({ locale }: { locale: Locale }) {
  return (
    <section className="stats grain">
      <div className="shell stats__grid reveal">
        {stats.map((s) => (
          <div key={s.label.en}>
            <div className="stat__num">{s.value}</div>
            <div className="stat__cap">{s.label[locale]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ GAMES */
function Games({ locale, onSelect }: { locale: Locale; onSelect: (g: Game) => void }) {
  const t = copy[locale];
  const featured = games.find((g) => g.featured) ?? games[0];
  const rest = games.filter((g) => g !== featured);

  const card = (game: Game, variant: "feature" | "wide" | "default") => {
    const clickable = !game.placeholder;
    const title = locale === "ko" ? game.titleKo : game.title;
    const cls = `gcard gcard--${variant} ${clickable ? "is-clickable" : "gcard--soon"} reveal`;
    return (
      <article
        className={cls}
        key={game.slug}
        role={clickable ? "button" : undefined}
        tabIndex={clickable ? 0 : undefined}
        aria-label={clickable ? `${title} — ${t.detailCta}` : undefined}
        onClick={clickable ? () => onSelect(game) : undefined}
        onKeyDown={
          clickable
            ? (e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(game);
                }
              }
            : undefined
        }
      >
        {game.placeholder ? (
          <span className="soon">{t.comingSoon}</span>
        ) : (
          <>
            <div className="gcard__art">
              <img src={game.image} alt={`${title}`} loading="lazy" decoding="async" />
            </div>
            <div className="gcard__veil" />
            <div className="gcard__meta">
              <div className="gcard__genre">{game.genre}</div>
              <h3 className="gcard__title">{title}</h3>
              <div className="gcard__sub">{game.title}</div>
              <span className="gcard__cta">
                {t.detailCta} <IconArrow />
              </span>
            </div>
          </>
        )}
      </article>
    );
  };

  return (
    <section className="section section--dark grain" id="games">
      <div className="shell">
        <div className="games__head reveal">
          <div>
            <span className="eyebrow">Games — 게임 라인업</span>
            <h2 className="section-title">{t.gamesTitle}</h2>
          </div>
          <p className="section-lead" style={{ marginTop: 0 }}>
            {t.gamesText}
          </p>
        </div>
        <div className="games__grid">
          {card(featured, "feature")}
          {rest.map((g, i) => card(g, i < 2 && !g.placeholder ? "wide" : "default"))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ PUBLISHING */
function Publishing({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="section section--light" id="publishing">
      <div className="shell">
        <div className="publish__head reveal">
          <span className="eyebrow">Publishing — 퍼블리싱</span>
          <h2 className="section-title">{t.publishingTitle}</h2>
          <p className="section-lead">{t.publishingText}</p>
        </div>
        <div className="process reveal">
          {process.map((step, i) => (
            <div className="process__step" key={step.en}>
              <div className="process__num">{String(i + 1).padStart(2, "0")}</div>
              <div className="process__name">{step[locale]}</div>
            </div>
          ))}
        </div>
        <div className="caps">
          {capabilities.map((c, i) => (
            <div className="cap reveal" key={c.title} style={{ transitionDelay: `${(i % 3) * 70}ms` }}>
              <div className="cap__num">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="cap__title">{c.title}</h3>
              <p className="cap__body">{c.body[locale]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ COMPANY */
function Company({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="section section--light" id="company" style={{ background: "var(--paper-2)" }}>
      <div className="shell">
        <div className="company__top">
          <div className="company__lead reveal">
            <span className="eyebrow">Company — 회사 소개</span>
            <h2 className="section-title">{t.aboutTitle}</h2>
            <p>{t.aboutBody}</p>
            <p className="legacy">{t.legacyAbout}</p>
          </div>
          <dl className="profile reveal">
            {companyProfile.map((item) => (
              <div className="profile__row" key={item.value}>
                <dt>{item.label[locale]}</dt>
                <dd>{item.value}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="company__bottom">
          <div className="reveal">
            <h3 className="subhead">{t.partnershipTitle}</h3>
            <p className="section-lead" style={{ marginTop: 0, marginBottom: 22 }}>
              {t.partnershipBody}
            </p>
            <div className="partners">
              {partners.map((p) => (
                <span className="partner" key={p}>
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="reveal">
            <h3 className="subhead">{locale === "ko" ? "다음에 갈 곳" : "Where we go next"}</h3>
            {roadmap.map((r) => (
              <div className="road" key={r.label}>
                <div className="road__label">{r.label}</div>
                <div className="road__text">{r.text[locale]}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="reveal" style={{ marginTop: "clamp(40px, 5vw, 72px)" }}>
          <h3 className="subhead">{t.legacyIntroTitle}</h3>
          {legacyCompanyIntro.map((para) => (
            <p key={para} className="section-lead" style={{ maxWidth: "70ch", marginTop: 0, marginBottom: 14 }}>
              {para}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ CONTACT */
function Contact({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "mailto" | "error">("idle");
  const fl = t.fieldLabels;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("sending");
    const result = await submitInquiry(data);
    setStatus(result);
    if (result === "success") form.reset();
  }

  const fields = [
    { name: "name", label: fl.name, type: "text" },
    { name: "company", label: fl.company, type: "text" },
    { name: "email", label: fl.email, type: "email" },
    { name: "game", label: fl.game, type: "text" },
    { name: "genre", label: fl.genre, type: "text" },
    { name: "platform", label: fl.platform, type: "text" },
    { name: "status", label: fl.status, type: "text" },
    { name: "video", label: fl.video, type: "url" },
    { name: "store", label: fl.store, type: "url" },
  ];

  const msg =
    status === "success" ? t.submitSuccess : status === "mailto" ? t.submitMailto : status === "error" ? t.submitError : "";

  return (
    <section className="section section--dark grain" id="contact">
      <div className="shell contact__grid">
        <div className="reveal">
          <span className="eyebrow">Contact — 문의</span>
          <h2 className="section-title">{t.contactTitle}</h2>
          <p className="section-lead">{t.contactText}</p>
          <div className="contact__lines">
            <a href={`mailto:${contact.business}`}>{contact.business}</a>
            <a href={`mailto:${contact.support}`}>{contact.support}</a>
            <span>{contact.address}</span>
          </div>
        </div>

        <form className="reveal" onSubmit={onSubmit}>
          <div className="form__grid">
            {fields.map((f) => (
              <label className="field" key={f.name}>
                <span>{f.label}</span>
                <input name={f.name} type={f.type} required={["name", "email", "game"].includes(f.name)} />
              </label>
            ))}
            <label className="field field--full">
              <span>{fl.message}</span>
              <textarea name="message" rows={5} required />
            </label>
          </div>
          <button className="btn btn--primary form__submit" type="submit" disabled={status === "sending"}>
            {status === "sending" ? t.sending : t.submit} <IconArrow />
          </button>
          <p
            className={`form__status ${status === "error" ? "err" : "ok"}`}
            role={status === "error" ? "alert" : "status"}
            aria-live={status === "error" ? "assertive" : "polite"}
          >
            {msg}
          </p>
        </form>
      </div>
    </section>
  );
}

/* ============================================================ FOOTER */
function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot__top">
          <Brand className="foot__brand" />
          <div className="foot__links">
            <a href={contact.terms} target="_blank" rel="noreferrer noopener">
              Terms
            </a>
            <a href={contact.privacy} target="_blank" rel="noreferrer noopener">
              Privacy
            </a>
            <a href={contact.facebook} target="_blank" rel="noreferrer noopener">
              Facebook
            </a>
            <a href={contact.play} target="_blank" rel="noreferrer noopener">
              {locale === "ko" ? "게임 스토어" : "Game Store"}
            </a>
          </div>
        </div>
        <div className="foot__bottom">
          <div className="foot__legal">
            GAHEE., LTD &nbsp;·&nbsp; CRN 508-86-02578 &nbsp;·&nbsp; {contact.address}
            <br />© {2022} GAHEE Corp. All rights reserved.
          </div>
          <a className="foot__legal" href={`mailto:${contact.business}`} style={{ color: "var(--red-bright)" }}>
            {contact.business}
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================ GAME MODAL */
function GameModal({ game, locale, onClose }: { game: Game; locale: Locale; onClose: () => void }) {
  const t = copy[locale];
  const shots = game.screenshots && game.screenshots.length > 0 ? game.screenshots : game.image ? [game.image] : [];
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const title = locale === "ko" ? game.titleKo : game.title;
  const body = game.detail ? game.detail[locale] : game.description[locale];

  useEffect(() => {
    closeRef.current?.focus();
    const total = shots.length;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowLeft" && total > 1) setIndex((i) => (i - 1 + total) % total);
      else if (e.key === "ArrowRight" && total > 1) setIndex((i) => (i + 1) % total);
      else if (e.key === "Tab") {
        const card = cardRef.current;
        if (!card) return;
        const f = card.querySelectorAll<HTMLElement>('a[href], button:not([disabled])');
        if (!f.length) return;
        const first = f[0];
        const last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [shots.length, onClose]);

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal__scrim" onClick={onClose} />
      <div className="modal__card" ref={cardRef}>
        <button ref={closeRef} className="modal__close" onClick={onClose} aria-label={t.closeLabel}>
          <IconClose />
        </button>
        {shots.length > 0 && (
          <div className="gallery">
            <img src={shots[index]} alt={`${title} ${index + 1}`} />
            {shots.length > 1 && (
              <>
                <button className="gallery__arrow prev" onClick={() => setIndex((i) => (i - 1 + shots.length) % shots.length)} aria-label={t.prevLabel}>
                  <IconChevron dir="left" />
                </button>
                <button className="gallery__arrow next" onClick={() => setIndex((i) => (i + 1) % shots.length)} aria-label={t.nextLabel}>
                  <IconChevron dir="right" />
                </button>
              </>
            )}
          </div>
        )}
        {shots.length > 1 && (
          <div className="thumbs">
            {shots.map((shot, i) => (
              <button
                key={`${shot}-${i}`}
                onClick={() => setIndex(i)}
                aria-label={`${t.imageLabel} ${i + 1}`}
                aria-current={i === index ? "true" : undefined}
              >
                <img src={shot} alt="" />
              </button>
            ))}
          </div>
        )}
        <div className="modal__body">
          <h3>{title}</h3>
          <span className="modal__genre">{game.genre}</span>
          <p>{body}</p>
          <div className="platforms">
            {game.platforms.map((platform) => (
              <a key={platform} href={game.link ?? contact.play} target="_blank" rel="noreferrer noopener" aria-label={`${game.title} ${platform}`}>
                {platformIcons[platform] && <img src={platformIcons[platform]} alt="" />}
                <span>{platform}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ BACK TO TOP */
function BackToTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 700);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <button
      className={`toTop ${show ? "show" : ""}`}
      aria-label={label}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })
      }
    >
      <IconUp />
    </button>
  );
}

/* ============================================================ APP */
export default function App() {
  const [locale, setLocale] = useState<Locale>("ko");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Game | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);

  useReveal([locale]);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    document.body.classList.toggle("is-locked", menuOpen || selected !== null);
  }, [menuOpen, selected]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const openGame = (game: Game) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setSelected(game);
  };
  const closeGame = useCallback(() => {
    setSelected(null);
    lastFocus.current?.focus();
  }, []);

  return (
    <>
      <Nav locale={locale} setLocale={setLocale} scrolled={scrolled} onOpenMenu={() => setMenuOpen(true)} />
      <Drawer open={menuOpen} onClose={() => setMenuOpen(false)} locale={locale} setLocale={setLocale} />
      <main>
        <Hero locale={locale} />
        <Stats locale={locale} />
        <Games locale={locale} onSelect={openGame} />
        <Publishing locale={locale} />
        <Company locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
      <BackToTop label={copy[locale].topLabel} />
      {selected && <GameModal game={selected} locale={locale} onClose={closeGame} />}
    </>
  );
}
