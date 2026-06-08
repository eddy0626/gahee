import { FormEvent, useState } from "react";
import {
  capabilities,
  companyProfile,
  contact,
  copy,
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

function Logo() {
  return (
    <a className="logoMark" href="#top" aria-label="GAHEE home">
      gahee
    </a>
  );
}

type LocaleProps = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

function Header({ locale, setLocale }: LocaleProps) {
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
        <a className="headerCta" href="#contact">
          {locale === "ko" ? "문의" : "Inquiry"}
        </a>
      </div>
    </header>
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
            <article className="miniGame" key={game.title}>
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
      <div className="sectionIntro">
        <h2>{t.publishingTitle}</h2>
        <p>{t.publishingText}</p>
      </div>

      <div className="processTrack">
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
            <article className="capabilityCard" key={capability.title}>
              <span className="index">{String(index + 1).padStart(2, "0")}</span>
              <h3>{capability.title}</h3>
              <p>{capability.body[locale]}</p>
            </article>
          ))}
        </div>

        <aside className="marketPanel">
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

function Games({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className="gamesSection sectionPad" id="games">
      <div className="sectionIntro gamesIntro">
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
        {games.map((game) => (
          <article className={`gameCard ${game.featured ? "featured" : ""}`} key={`${game.title}-${game.genre}`}>
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
                <h3>{locale === "ko" ? game.titleKo : game.title}</h3>
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
                  >
                    <img src={platformIcons[platform]} alt="" />
                    <span>{platform}</span>
                  </a>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Company({ locale }: { locale: Locale }) {
  const t = copy[locale];

  return (
    <section className="company sectionPad" id="company">
      <div className="companyMain">
        <div className="sectionIntro">
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

        <div className="profileTable">
          {companyProfile.map((item) => (
            <div key={item.value}>
              <span>{item.label[locale]}</span>
              <strong>{item.value}</strong>
            </div>
          ))}
        </div>
      </div>

      <div className="companySecondary">
        <article className="partnerBlock">
          <h3>{t.partnershipTitle}</h3>
          <p>{t.partnershipBody}</p>
          <div className="partnerList">
            {partners.map((partner) => (
              <span key={partner}>{partner}</span>
            ))}
          </div>
        </article>

        <article className="roadmapBlock">
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
  const [submitted, setSubmitted] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitted(true);
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

  return (
    <section className="contact sectionPad" id="contact">
      <div className="contactCopy">
        <h2>{t.contactTitle}</h2>
        <p>{t.contactText}</p>
        <div className="contactLines">
          <a href={`mailto:${contact.business}`}>{contact.business}</a>
          <a href={`mailto:${contact.support}`}>{contact.support}</a>
          <span>{contact.address}</span>
        </div>
      </div>

      <form className="inquiryForm" onSubmit={onSubmit}>
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
        <button className="button primary fullButton" type="submit">
          {t.submit}
        </button>
        {submitted && <p className="formStatus">{t.submitted}</p>}
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

export default function App() {
  const [locale, setLocale] = useState<Locale>("ko");

  return (
    <>
      <Header locale={locale} setLocale={setLocale} />
      <main>
        <Hero locale={locale} />
        <StatStrip locale={locale} />
        <Publishing locale={locale} />
        <Games locale={locale} />
        <Company locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
    </>
  );
}
