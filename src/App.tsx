import { FormEvent, useEffect, useRef, useState } from "react";
import {
  capabilities,
  companyProfile,
  contact,
  copy,
  Game,
  games,
  legacyCompanyIntro,
  Locale,
  markets,
  nav,
  partners,
  platformIcons,
  process,
  roadmap,
  stats,
} from "./content";
import { submitInquiry } from "./config";
import { useReveal } from "./useReveal";

type Theme = "light" | "dark";

function getInitialTheme(): Theme {
  if (typeof document !== "undefined" && document.documentElement.dataset.theme === "dark") {
    return "dark";
  }
  return "light";
}

/* ---------- Icons ---------- */
function SunIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" strokeLinecap="round" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" strokeLinejoin="round" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
    </svg>
  );
}

function ChevronUp() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M6 15l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronLeft() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M15 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ChevronRight() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Logo() {
  return (
    <a className="logoMark" href="#top" aria-label="GAHEE home">
      gahee
    </a>
  );
}

type HeaderProps = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  theme: Theme;
  toggleTheme: () => void;
  onOpenMenu: () => void;
};

function Header({ locale, setLocale, theme, toggleTheme, onOpenMenu }: HeaderProps) {
  const t = copy[locale];
  return (
    <header className="siteHeader">
      <Logo />
      <nav className="siteNav" aria-label="Main navigation">
        {nav[locale].map((item) => (
          <a key={item.href} href={item.href}>
            {item.label}
          </a>
        ))}
      </nav>
      <div className="headerActions">
        <div className="langToggle" aria-label="Language toggle">
          <button className={locale === "ko" ? "active" : ""} onClick={() => setLocale("ko")}>
            KO
          </button>
          <button className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")}>
            EN
          </button>
        </div>
        <button className="iconButton" onClick={toggleTheme} aria-label={t.themeToggle}>
          {theme === "dark" ? <SunIcon /> : <MoonIcon />}
        </button>
        <a className="headerCta" href="#contact">
          {locale === "ko" ? "문의" : "Inquiry"}
        </a>
        <button className="iconButton navToggle" onClick={onOpenMenu} aria-label={t.menuToggle}>
          <MenuIcon />
        </button>
      </div>
    </header>
  );
}

type MobileNavProps = {
  open: boolean;
  onClose: () => void;
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

function MobileNav({ open, onClose, locale, setLocale }: MobileNavProps) {
  const t = copy[locale];
  return (
    <div className={`mobileNav ${open ? "open" : ""}`} aria-hidden={!open}>
      <div className="backdrop" onClick={onClose} />
      <div className="panel" role="dialog" aria-modal="true" aria-label="Menu">
        <button className="iconButton mobileClose" onClick={onClose} aria-label={t.closeLabel}>
          <CloseIcon />
        </button>
        {nav[locale].map((item) => (
          <a key={item.href} href={item.href} onClick={onClose}>
            {item.label}
          </a>
        ))}
        <div className="mobileLang">
          <button className={locale === "ko" ? "active" : ""} onClick={() => setLocale("ko")}>
            KO
          </button>
          <button className={locale === "en" ? "active" : ""} onClick={() => setLocale("en")}>
            EN
          </button>
        </div>
        <a className="headerCta" href="#contact" onClick={onClose}>
          {locale === "ko" ? "문의하기" : "Inquiry"}
        </a>
      </div>
    </div>
  );
}

function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const heroGames = games.filter((game) => !game.placeholder).slice(0, 5);

  return (
    <section className="hero sectionPad" id="top">
      <div className="heroCopy">
        <h1>{t.heroTitle}</h1>
        <p className="heroLead">{t.heroText}</p>
        <p className="legacyLine">{t.oldHero}</p>
        <div className="heroButtons">
          <a className="button primary" href="#contact">
            {t.primaryCta}
          </a>
          <a className="button secondary" href="#games">
            {t.secondaryCta}
          </a>
        </div>
      </div>

      <div className="heroShowcase" aria-label="GAHEE game image showcase">
        <div className="showcaseFeature">
          <img src={heroGames[0].image} alt={heroGames[0].title} />
          <div>
            <strong>{heroGames[0].title}</strong>
            <span>{heroGames[0].genre}</span>
          </div>
        </div>
        <div className="showcaseRail">
          {heroGames.slice(1).map((game, index) => (
            <article className="miniGame" key={game.slug}>
              <img src={game.image} alt={game.title} />
              <span>{String(index + 2).padStart(2, "0")}</span>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function StatStrip({ locale }: { locale: Locale }) {
  return (
    <section className="statStrip" aria-label="GAHEE profile numbers">
      {stats.map((item) => (
        <div className="statItem" key={item.value}>
          <strong>{item.value}</strong>
          <span>{item.label[locale]}</span>
        </div>
      ))}
    </section>
  );
}

function Publishing({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className="publishing sectionPad" id="publishing">
      <div className="sectionIntro reveal">
        <h2>{t.publishingTitle}</h2>
        <p>{t.publishingText}</p>
      </div>

      <div className="processTrack reveal">
        {process.map((step, index) => (
          <div className="processStep" key={step.en}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{step[locale]}</strong>
          </div>
        ))}
      </div>

      <div className="capabilityLayout">
        <div className="capabilityGrid">
          {capabilities.map((capability, index) => (
            <article
              className="capabilityCard reveal"
              key={capability.title}
              style={{ transitionDelay: `${index * 55}ms` }}
            >
              <span className="index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{capability.title}</h3>
              <p>{capability.body[locale]}</p>
            </article>
          ))}
        </div>

        <aside className="marketPanel reveal">
          <h3>{locale === "ko" ? "아시아 출시 권역" : "Asia Launch Reach"}</h3>
          <p>
            {locale === "ko"
              ? "타이틀별 전략에 맞춰 북아시아, 동남아, 인도차이나 권역을 구성합니다."
              : "Market groups are configured by title across North Asia, Southeast Asia, and Indochina."}
          </p>
          <div className="marketTags">
            {markets.map((market) => (
              <span key={market}>{market}</span>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

function Games({ locale, onSelect }: { locale: Locale; onSelect: (game: Game) => void }) {
  const t = copy[locale];

  return (
    <section className="gamesSection sectionPad" id="games">
      <div className="sectionIntro gamesIntro reveal">
        <div>
          <h2>{t.gamesTitle}</h2>
          <p>{t.gamesText}</p>
          <p className="legacyLine">{t.gamesLegacy}</p>
        </div>
        <a className="textLink" href={contact.play} target="_blank" rel="noreferrer">
          Google Play
        </a>
      </div>

      <div className="gameGrid">
        {games.map((game, index) => {
          const clickable = !game.placeholder;
          const title = locale === "ko" ? game.titleKo : game.title;
          return (
            <article
              className={`gameCard reveal ${game.featured ? "featured" : ""} ${clickable ? "clickable" : "placeholderCard"}`}
              key={game.slug}
              style={{ transitionDelay: `${(index % 4) * 55}ms` }}
              role={clickable ? "button" : undefined}
              tabIndex={clickable ? 0 : undefined}
              aria-label={clickable ? `${title} — ${t.detailCta}` : undefined}
              onClick={clickable ? () => onSelect(game) : undefined}
              onKeyDown={
                clickable
                  ? (event) => {
                      if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        onSelect(game);
                      }
                    }
                  : undefined
              }
            >
              <div className={game.placeholder ? "placeholderArt" : "gameArt"}>
                {game.placeholder ? (
                  <span>Coming Soon</span>
                ) : (
                  <img src={game.image} alt={`${game.title} game image`} loading="lazy" />
                )}
              </div>
              <div className="gameMeta">
                <div>
                  <span className="redRule" />
                  <h3>{title}</h3>
                  <p className="gameSub">{game.title}</p>
                </div>
                <strong>{game.genre}</strong>
                <p>{game.description[locale]}</p>
                <div className="platforms">
                  {game.platforms.map((platform) => (
                    <a
                      key={platform}
                      href={game.link ?? contact.play}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${game.title} ${platform}`}
                      onClick={(event) => event.stopPropagation()}
                    >
                      <img src={platformIcons[platform]} alt="" />
                      <span>{platform}</span>
                    </a>
                  ))}
                </div>
                {clickable && (
                  <span className="cardCta">
                    {t.detailCta} <ChevronRight />
                  </span>
                )}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

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
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onClose();
      } else if (event.key === "ArrowLeft") {
        setIndex((i) => (i - 1 + total) % total);
      } else if (event.key === "ArrowRight") {
        setIndex((i) => (i + 1) % total);
      } else if (event.key === "Tab") {
        const card = cardRef.current;
        if (!card) return;
        const focusables = card.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, textarea, [tabindex]:not([tabindex="-1"])',
        );
        if (focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shots.length, onClose]);

  return (
    <div className="modalRoot" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modalBackdrop" onClick={onClose} />
      <div className="modalCard" ref={cardRef}>
        <button ref={closeRef} className="iconButton modalClose" onClick={onClose} aria-label={t.closeLabel}>
          <CloseIcon />
        </button>

        {shots.length > 0 && (
          <div className="gallery">
            <img className="galleryMain" src={shots[index]} alt={`${game.title} screenshot ${index + 1}`} />
            {shots.length > 1 && (
              <>
                <button
                  className="iconButton galleryArrow prev"
                  onClick={() => setIndex((i) => (i - 1 + shots.length) % shots.length)}
                  aria-label={t.prevLabel}
                >
                  <ChevronLeft />
                </button>
                <button
                  className="iconButton galleryArrow next"
                  onClick={() => setIndex((i) => (i + 1) % shots.length)}
                  aria-label={t.nextLabel}
                >
                  <ChevronRight />
                </button>
              </>
            )}
          </div>
        )}

        {shots.length > 1 && (
          <div className="galleryThumbs">
            {shots.map((shot, i) => (
              <button
                key={`${shot}-${i}`}
                className={i === index ? "active" : ""}
                onClick={() => setIndex(i)}
                aria-label={`${t.nextLabel} ${i + 1}`}
              >
                <img src={shot} alt="" />
              </button>
            ))}
          </div>
        )}

        <div className="modalBody">
          <span className="redRule" />
          <h3>{title}</h3>
          <p className="gameSub">{game.title}</p>
          <span className="genreTag">{game.genre}</span>
          <p>{body}</p>
          <div className="platforms">
            {game.platforms.map((platform) => (
              <a
                key={platform}
                href={game.link ?? contact.play}
                target="_blank"
                rel="noreferrer"
                aria-label={`${game.title} ${platform}`}
              >
                <img src={platformIcons[platform]} alt="" />
                <span>{platform}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Company({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className="company sectionPad" id="company">
      <div className="companyMain">
        <div className="sectionIntro reveal">
          <h2>{t.aboutTitle}</h2>
          <p>{t.aboutBody}</p>
          <p className="legacyLine">{t.legacyAbout}</p>
          <div className="legacyIntroBlock">
            <h3>{t.legacyIntroTitle}</h3>
            {legacyCompanyIntro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </div>

        <div className="profileTable reveal">
          {companyProfile.map((item) => (
            <div key={item.value}>
              <span>{item.label[locale]}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="companySecondary">
        <article className="partnerBlock reveal">
          <h3>{t.partnershipTitle}</h3>
          <p>{t.partnershipBody}</p>
          <div className="partnerList">
            {partners.map((partner) => (
              <span key={partner}>{partner}</span>
            ))}
          </div>
        </article>

        <article className="roadmapBlock reveal">
          <h3>{locale === "ko" ? "다음에 갈 곳" : "Where we go next"}</h3>
          <div className="roadmap">
            {roadmap.map((item) => (
              <div key={item.label}>
                <span>{item.label}</span>
                <p>{item.text[locale]}</p>
              </div>
            ))}
          </div>
        </article>
      </div>
    </section>
  );
}

function Contact({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "mailto" | "error">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
    setStatus("sending");
    const result = await submitInquiry(data);
    setStatus(result);
    if (result === "success") {
      form.reset();
    }
  }

  const fields = [
    { name: "name", label: locale === "ko" ? "이름" : "Name", type: "text" },
    { name: "company", label: locale === "ko" ? "회사명" : "Company", type: "text" },
    { name: "email", label: locale === "ko" ? "이메일" : "Email", type: "email" },
    { name: "game", label: locale === "ko" ? "게임명" : "Game Title", type: "text" },
    { name: "genre", label: locale === "ko" ? "장르" : "Genre", type: "text" },
    { name: "platform", label: locale === "ko" ? "플랫폼" : "Platform", type: "text" },
    { name: "status", label: locale === "ko" ? "출시 상태" : "Release Status", type: "text" },
    { name: "video", label: locale === "ko" ? "게임 영상 링크" : "Gameplay Video Link", type: "url" },
    { name: "store", label: locale === "ko" ? "스토어 링크" : "Store Link", type: "url" },
  ];

  const statusMessage =
    status === "success"
      ? t.submitSuccess
      : status === "mailto"
        ? t.submitMailto
        : status === "error"
          ? t.submitError
          : "";

  return (
    <section className="contact sectionPad" id="contact">
      <div className="contactCopy reveal">
        <h2>{t.contactTitle}</h2>
        <p>{t.contactText}</p>
        <div className="contactLines">
          <a href={`mailto:${contact.business}`}>{contact.business}</a>
          <a href={`mailto:${contact.support}`}>{contact.support}</a>
          <span>{contact.address}</span>
        </div>
      </div>

      <form className="inquiryForm reveal" onSubmit={onSubmit}>
        <div className="fieldGrid">
          {fields.map((field) => (
            <label key={field.name}>
              <span>{field.label}</span>
              <input name={field.name} type={field.type} required={["name", "email", "game"].includes(field.name)} />
            </label>
          ))}
        </div>
        <label>
          <span>{locale === "ko" ? "소개 내용" : "Introduction"}</span>
          <textarea name="message" rows={5} required />
        </label>
        <button className="button primary fullButton" type="submit" disabled={status === "sending"}>
          {status === "sending" ? t.sending : t.submit}
        </button>
        {statusMessage && (
          <p className={`formStatus ${status === "error" ? "err" : "ok"}`}>{statusMessage}</p>
        )}
      </form>
    </section>
  );
}

function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="siteFooter">
      <Logo />
      <div>
        <strong>GAHEE., LTD</strong>
        <p>CRN : 508-86-02578</p>
        <p>Gingorang-ro 14-gil, Gwangjin-gu, Seoul, Republic of Korea</p>
        <p>Copyright (C) by GAHEE. Ltd. All right reserved</p>
      </div>
      <div className="footerLinks">
        <a href={contact.terms} target="_blank" rel="noreferrer">
          Terms of Service
        </a>
        <a href={contact.privacy} target="_blank" rel="noreferrer">
          Privacy Policy
        </a>
        <a href={contact.facebook} target="_blank" rel="noreferrer">
          Facebook
        </a>
        <a href={contact.play} target="_blank" rel="noreferrer">
          {locale === "ko" ? "게임 스토어" : "Game Store"}
        </a>
      </div>
    </footer>
  );
}

function BackToTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      className={`toTop ${show ? "show" : ""}`}
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={label}
    >
      <ChevronUp />
    </button>
  );
}

export default function App() {
  const [locale, setLocale] = useState<Locale>("ko");
  const [theme, setTheme] = useState<Theme>(getInitialTheme);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedGame, setSelectedGame] = useState<Game | null>(null);
  const lastFocus = useRef<HTMLElement | null>(null);

  useReveal([locale]);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    try {
      localStorage.setItem("gahee-theme", theme);
    } catch {
      /* ignore */
    }
  }, [theme]);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    document.body.classList.toggle("modal-open", selectedGame !== null);
  }, [selectedGame]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const toggleTheme = () => setTheme((current) => (current === "dark" ? "light" : "dark"));

  const openGame = (game: Game) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setSelectedGame(game);
  };

  const closeGame = () => {
    setSelectedGame(null);
    lastFocus.current?.focus();
  };

  return (
    <>
      <Header
        locale={locale}
        setLocale={setLocale}
        theme={theme}
        toggleTheme={toggleTheme}
        onOpenMenu={() => setMenuOpen(true)}
      />
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} locale={locale} setLocale={setLocale} />
      <main>
        <Hero locale={locale} />
        <StatStrip locale={locale} />
        <Publishing locale={locale} />
        <Games locale={locale} onSelect={openGame} />
        <Company locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
      <BackToTop label={copy[locale].topLabel} />
      {selectedGame && <GameModal game={selectedGame} locale={locale} onClose={closeGame} />}
    </>
  );
}
