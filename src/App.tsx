import { Fragment, FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import {
  companyProfile,
  contact,
  copy,
  csForm,
  Game,
  GameCategory,
  gameFilters,
  games,
  Locale,
  nav,
  platformCategory,
  platformIcons,
  stats,
} from "./content";
// 법률 전문(4언어)은 무겁고 자주 안 열리므로 지연로딩한다. 타입만 정적 import(런타임 청크 미포함).
import type { LegalDoc } from "./legal";
import { CsImage, submitCsInquiry, submitInquiry } from "./config";
import { useReveal } from "./useReveal";
import { HeroGlobe } from "./HeroGlobe";

/** 지원 언어와 토글 버튼 라벨 — 한국어·영어·번체 중국어(대만)·러시아어 */
const LOCALES: Locale[] = ["ko", "en", "zh", "ru"];
const LOCALE_LABELS: Record<Locale, string> = { ko: "KO", en: "EN", zh: "繁中", ru: "RU" };
/** `<html lang>` 용 BCP-47 태그 (번체는 zh-Hant 로 명시) */
const HTML_LANG: Record<Locale, string> = { ko: "ko", en: "en", zh: "zh-Hant", ru: "ru" };
/** 법률 페이지 번역 고지 — 비한국어 버전 상단. 한국어 원문이 우선함을 명시. */
const LEGAL_DISCLAIMER: Record<Locale, string> = {
  ko: "",
  en: "This is a reference translation. In case of any discrepancy, the Korean original prevails.",
  zh: "本翻譯僅供參考。如與韓文原文有任何出入，概以韓文原文為準。",
  ru: "Это справочный перевод. При любых расхождениях приоритет имеет корейский оригинал.",
};

/** 스크롤 임계값(px) — 내비 배경 블러 전환 / '맨 위로' 버튼 표시 시점 */
const NAV_BLUR_SCROLL_PX = 40;
const BACK_TO_TOP_SCROLL_PX = 700;

/* ---------- 아이콘: 장식용 인라인 SVG (currentColor 상속, 보조기기엔 숨김) ---------- */
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

/** 브랜드 워드마크 — 클릭 시 최상단(#top)으로 이동 */
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
  onCsOpen: () => void;
};

/** 상단 고정 내비게이션 — 스크롤하면 배경을 블러 처리하고, 모바일(≤720px)에선 드로어 버튼만 노출 */
function Nav({ locale, setLocale, scrolled, onOpenMenu, onCsOpen }: NavProps) {
  const t = copy[locale];
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
          {/* 고객센터 — 앵커가 아니라 CS 폼 모달을 바로 연다 */}
          <button type="button" onClick={onCsOpen}>
            {csForm.nav[locale]}
          </button>
        </nav>
        <div className="nav__actions">
          <div className="lang" role="group" aria-label="Language">
            {LOCALES.map((l, i) => (
              <Fragment key={l}>
                {i > 0 && <span aria-hidden="true">/</span>}
                {/* 번체 버튼엔 lang 을 지정해 스크린리더가 한국어/영어로 오발음하지 않게 한다 */}
                <button lang={l === "zh" ? "zh-Hant" : undefined} aria-pressed={locale === l} onClick={() => setLocale(l)}>
                  {LOCALE_LABELS[l]}
                </button>
              </Fragment>
            ))}
          </div>
          <a className="nav__cta" href="#contact">
            {t.navCta}
          </a>
          <button className="nav__menuBtn" onClick={onOpenMenu} aria-label={t.menuToggle}>
            <IconMenu />
          </button>
        </div>
      </div>
    </header>
  );
}

/* ============================================================ DRAWER */
/**
 * 모바일 전체화면 메뉴 드로어.
 * - 열리면: 연 시점의 포커스 위치를 기억하고 닫기 버튼으로 포커스를 옮긴다.
 * - 열린 동안: Tab/Shift+Tab 을 패널 안에서 순환시키고(포커스 트랩), Esc 로 닫는다.
 * - 닫히면: 기억해 둔 트리거(햄버거 버튼)로 포커스를 복원한다.
 */
function Drawer({ open, onClose, locale, setLocale, onCsOpen }: { open: boolean; onClose: () => void; locale: Locale; setLocale: (l: Locale) => void; onCsOpen: () => void }) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const t = copy[locale];

  useEffect(() => {
    if (!open) {
      // 닫힘: 드로어를 열었던 요소로 포커스 복원
      triggerRef.current?.focus();
      return;
    }
    // 열림: 현재 포커스를 기억해 두고 닫기 버튼부터 시작
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      // 포커스 트랩: 패널 안 포커스 가능한 요소의 처음↔끝을 순환
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
        {/* 고객센터 — 드로어 닫고 CS 폼 모달 열기 */}
        <button
          type="button"
          className="drawer__cs"
          onClick={() => {
            onClose();
            onCsOpen();
          }}
        >
          {csForm.nav[locale]}
        </button>
        <div className="drawer__lang" role="group" aria-label="Language">
          {LOCALES.map((l) => (
            <button key={l} lang={l === "zh" ? "zh-Hant" : undefined} aria-pressed={locale === l} onClick={() => setLocale(l)}>
              {LOCALE_LABELS[l]}
            </button>
          ))}
        </div>
        <a className="btn btn--primary" href="#contact" onClick={onClose} style={{ marginTop: 18, justifyContent: "center" }}>
          {t.drawerCta}
        </a>
      </div>
    </div>
  );
}

/* ============================================================ HERO */
/** 히어로 — 글로브 캔버스 배경 + 영문 디스플레이 슬로건(아트디렉션상 영어 고정) */
function Hero({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="hero" id="top">
      <HeroGlobe />
      <div className="hero__veil" />
      <div className="shell hero__inner">
        <span className="eyebrow hero__eyebrow">{t.heroEyebrow}</span>
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
      {/* 장식용 스크롤 힌트 — 보조기기에서 숨기므로 키보드 포커스에서도 함께 제외한다 */}
      <a className="hero__scroll" href="#games" aria-hidden="true" tabIndex={-1}>
        Scroll <i />
      </a>
    </section>
  );
}

/* ============================================================ STATS */
/** 스크롤 진입 시 0→타깃으로 카운트업. "8+" 같은 접미사는 보존.
 *  prefers-reduced-motion 또는 IO 미지원이면 즉시 최종값. (리서치 적용안 ③) */
function CountUp({ value }: { value: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const match = value.match(/^(\d+)(.*)$/);
  const target = match ? parseInt(match[1], 10) : 0;
  const suffix = match ? match[2] : "";
  const [display, setDisplay] = useState(match ? `0${suffix}` : value);

  useEffect(() => {
    const el = ref.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!el || !match || reduce || !("IntersectionObserver" in window)) {
      setDisplay(value);
      return;
    }
    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          const dur = 1400;
          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / dur);
            const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
            setDisplay(`${Math.round(eased * target)}${suffix}`);
            if (t < 1) raf = requestAnimationFrame(tick);
          };
          raf = requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <div className="stat__num" ref={ref}>
      {display}
    </div>
  );
}

/** 핵심 수치 스트립 — 데이터는 content.ts 의 stats. 숫자는 스크롤 카운트업(CountUp). */
function Stats({ locale }: { locale: Locale }) {
  return (
    <section className="stats grain">
      <div className="shell stats__grid reveal">
        {stats.map((s) => (
          <div key={s.label.en}>
            <CountUp value={s.value} />
            <div className="stat__cap">{s.label[locale]}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================ GAMES */
/** 게임 쇼케이스 — featured 1종은 큰 카드(feature), 나머지는 wide/default 카드.
 *  placeholder 게임은 "준비 중" 카드로만 표시하고 클릭(모달 열기)을 막는다. */
function Games({ locale, onSelect }: { locale: Locale; onSelect: (g: Game) => void }) {
  const t = copy[locale];
  // placeholder("준비 중") 카드는 렌더링에서 제외(숨김). 데이터는 content.ts에 보존.
  const visible = games.filter((g) => !g.placeholder);
  const featured = visible.find((g) => g.featured) ?? visible[0];
  const rest = visible.filter((g) => g !== featured);

  // 플랫폼 필터 — 실제 게임이 있는 카테고리만 칩으로 노출(빈 Console 등은 자동 생략).
  const [active, setActive] = useState<"all" | GameCategory>("all");
  const cats = (["Mobile", "PC", "Console"] as GameCategory[]).filter((c) =>
    visible.some((g) => g.platforms.some((p) => platformCategory[p] === c)),
  );
  const tabs: ("all" | GameCategory)[] = ["all", ...cats];
  const matches = (g: Game) =>
    active === "all" || g.platforms.some((p) => platformCategory[p] === active);
  // 필터 변경 시에도 새로 나타나는 카드가 등장 애니메이션을 타도록 active 를 deps 에 포함.
  useReveal([locale, active]);

  // 카드 한 장 — 클릭 가능 카드는 role="button" + Enter/Space 키 지원
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
            {/* 플랫폼 아이콘 핀 — 장식용(모달에 라벨 배지 있음)이라 보조기기엔 숨김 */}
            <div className="gcard__plats" aria-hidden="true">
              {game.platforms.map((p) =>
                platformIcons[p] ? (
                  <img key={p} src={platformIcons[p]} alt="" title={p} loading="lazy" decoding="async" />
                ) : null,
              )}
            </div>
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
            <span className="eyebrow">{t.eyebrow.games}</span>
            <h2 className="section-title">{t.gamesTitle}</h2>
          </div>
          <p className="section-lead" style={{ marginTop: 0 }}>
            {t.gamesText}
          </p>
        </div>
        {visible.length > 1 && tabs.length > 1 && (
          <div className="games__filter reveal" role="group" aria-label={t.gamesTitle}>
            {tabs.map((tab) => (
              <button
                key={tab}
                type="button"
                className={`chip ${active === tab ? "is-active" : ""}`}
                aria-pressed={active === tab}
                onClick={() => setActive(tab)}
              >
                {gameFilters[locale][tab]}
              </button>
            ))}
          </div>
        )}
        <div className="games__grid">
          {/* featured 는 visible[0] 폴백이라 게임이 하나도 없으면 undefined → 가드로 크래시 방지 */}
          {featured && matches(featured) && card(featured, "feature")}
          {rest.filter(matches).map((g) => card(g, "wide"))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ COMPANY */
/** 회사 소개 — 좌측 정체성 카피(aboutTitle/aboutBody) + 우측 회사 프로필 표(companyProfile).
 *  과거의 퍼블리싱·프로세스·역량·파트너·로드맵 블록과 #publishing 앵커는 제거됨(다크 시네마틱 축소). */
function Company({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="section section--dark grain company" id="company">
      <div className="shell">
        {/* 상단: 정체성 + 회사 프로필 */}
        <div className="company__top">
          <div className="company__lead reveal">
            <span className="eyebrow">{t.eyebrow.company}</span>
            <h2 className="section-title company__title">{t.aboutTitle}</h2>
            <p>{t.aboutBody}</p>
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
      </div>
    </section>
  );
}

/* ============================================================ CONTACT */
/** 문의 — 왼쪽 연락처 + 오른쪽 문의 폼.
 *  전송 결과는 aria-live 영역으로 보조기기에 알린다 (문구는 content.ts). */
function Contact({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "mailto" | "error">("idle");
  const fl = t.fieldLabels;

  // FormData → 평면 객체로 변환해 전송. Formspree 미설정이면 mailto 폴백(config.ts)
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // FormData 값은 string | File 이지만 이 폼엔 파일 입력이 없으므로 문자열 항목만 취한다(캐스트 없이 안전).
    const entries = [...new FormData(form).entries()].filter((e): e is [string, string] => typeof e[1] === "string");
    const data = Object.fromEntries(entries);
    setStatus("sending");
    const result = await submitInquiry(data);
    setStatus(result);
    if (result === "success") form.reset();
  }

  // 폼 필드 정의 — required 는 브라우저 기본 검증과 라벨의 * 표시에 함께 쓰인다
  const fields = [
    { name: "name", label: fl.name, type: "text", required: true },
    { name: "company", label: fl.company, type: "text", required: false },
    { name: "email", label: fl.email, type: "email", required: true },
    { name: "game", label: fl.game, type: "text", required: true },
    { name: "genre", label: fl.genre, type: "text", required: false },
    { name: "platform", label: fl.platform, type: "text", required: false },
    { name: "status", label: fl.status, type: "text", required: false },
    { name: "video", label: fl.video, type: "url", required: false },
    { name: "store", label: fl.store, type: "url", required: false },
  ];

  const msg =
    status === "success" ? t.submitSuccess : status === "mailto" ? t.submitMailto : status === "error" ? t.submitError : "";

  return (
    <section className="section section--dark grain" id="contact">
      <div className="shell contact__grid">
        <div className="reveal">
          <span className="eyebrow">{t.eyebrow.contact}</span>
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
                <span>
                  {f.label}
                  {/* 필수 표시 별표 — 스크린리더엔 input 의 required 속성이 전달되므로 숨긴다 */}
                  {f.required && (
                    <em className="field__req" aria-hidden="true">
                      *
                    </em>
                  )}
                </span>
                <input name={f.name} type={f.type} required={f.required} />
              </label>
            ))}
            <label className="field field--full">
              <span>
                {fl.message}
                <em className="field__req" aria-hidden="true">
                  *
                </em>
              </span>
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

/* ============================================================ LEGAL PAGE */
/** 법률 문서 본문(문자열)을 줄 단위로 훑어 위계별 요소로 렌더한다.
 *  4개 언어(ko/en/zh/ru) 각각의 장·조 접두어를 정규식으로 분류하므로, 번역 시 접두어 형식
 *  (제N장/Chapter/第N章/Глава, 제N조/Article/第N條/Статья)을 유지해야 소제목이 문단으로 떨어지지 않는다. */
function renderLegalBody(body: string) {
  const nodes: ReactNode[] = [];
  let bullets: string[] = [];
  const flush = () => {
    if (bullets.length) {
      const items = bullets;
      nodes.push(
        <ul className="legal__ul" key={`ul-${nodes.length}`}>
          {items.map((b, i) => (
            <li key={i}>{b}</li>
          ))}
        </ul>,
      );
      bullets = [];
    }
  };
  body.split("\n").forEach((line) => {
    const text = line.trim();
    if (!text) {
      flush();
      return;
    }
    if (text.startsWith("●")) {
      bullets.push(text.replace(/^●\s*/, ""));
      return;
    }
    flush();
    // 장(제N장/Chapter/第N章/Глава) → 큰 제목(레드)
    if (/^(제\d+장|Chapter \d+|第\d+章|Глава \d+)/.test(text)) nodes.push(<h2 className="legal__chapter" key={`c-${nodes.length}`}>{text}</h2>);
    // 조·부칙(제N조/Article/第N條/Статья, 부칙/Addendum/附則/Дополнение) → 조 제목
    else if (/^(제\d+조|Article \d+|第\d+條|Статья \d+|부칙|Addendum|附則|Дополнение)/.test(text)) nodes.push(<h2 className="legal__h" key={`a-${nodes.length}`}>{text}</h2>);
    // '1. ' 번호 소제목(개인정보처리방침의 절) → 조 제목과 동급
    else if (/^\d+\.\s/.test(text)) nodes.push(<h2 className="legal__h" key={`h-${nodes.length}`}>{text}</h2>);
    // '1) ' 하위 항목 → 소제목
    else if (/^\d+\)\s/.test(text)) nodes.push(<h3 className="legal__sub" key={`s-${nodes.length}`}>{text}</h3>);
    // 그 외 → 일반 문단
    else nodes.push(<p className="legal__p" key={`p-${nodes.length}`}>{text}</p>);
  });
  flush();
  return nodes;
}

/** 개인정보처리방침·이용약관 전용 풀스크린 페이지. 푸터 링크(#privacy/#terms)로 열린다.
 *  본문은 한국어 원문(법적 문구). 배경 스크롤 잠금 + Esc 로 닫기. */
function LegalPage({ doc, locale, onClose }: { doc: LegalDoc; locale: Locale; onClose: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);
  return (
    <div className="legal" role="dialog" aria-modal="true" aria-label={doc.title[locale]}>
      <div className="legal__bar">
        <div className="shell legal__barInner">
          <Brand />
          <button ref={closeRef} className="legal__close" onClick={onClose} aria-label={copy[locale].closeLabel}>
            <IconClose />
          </button>
        </div>
      </div>
      <div className="legal__scroll">
        <article className="shell legal__doc">
          <h1 className="legal__title">{doc.title[locale]}</h1>
          {locale !== "ko" && <p className="legal__disclaimer">{LEGAL_DISCLAIMER[locale]}</p>}
          {renderLegalBody(doc.body[locale])}
        </article>
      </div>
    </div>
  );
}

/* ============================================================ FOOTER */
/** 푸터 — 법적 고지와 외부 링크. 저작권 연도는 렌더 시점 기준으로 자동 갱신된다. */
function Footer({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <footer className="foot">
      <div className="shell">
        <div className="foot__top">
          <Brand className="foot__brand" />
          <div className="foot__links">
            <a href="#terms">Terms</a>
            <a href="#privacy">Privacy</a>
            <a href={contact.play} target="_blank" rel="noreferrer noopener">
              {t.storeLabel}
            </a>
          </div>
        </div>
        <div className="foot__bottom">
          <div className="foot__legal">
            GAHEE., LTD &nbsp;·&nbsp; CRN 508-86-02578 &nbsp;·&nbsp; {contact.address}
            <br />© {new Date().getFullYear()} GAHEE Corp. All rights reserved.
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
/**
 * 게임 상세 모달.
 * - 갤러리: screenshots 가 없으면 대표 이미지 1장으로 폴백.
 * - 키보드: Esc 닫기, ←/→ 갤러리 이동, Tab 은 카드 안에서 순환(포커스 트랩).
 * - 플랫폼 배지: links 에 URL 이 있는 플랫폼만 링크가 된다.
 */
function GameModal({ game, locale, onClose, onCsOpen }: { game: Game; locale: Locale; onClose: () => void; onCsOpen: () => void }) {
  const t = copy[locale];
  // 갤러리 폴백: 스크린샷 없음 → 대표 이미지 1장
  const shots = game.screenshots && game.screenshots.length > 0 ? game.screenshots : game.image ? [game.image] : [];
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const title = locale === "ko" ? game.titleKo : game.title;
  const body = game.detail ? game.detail[locale] : game.description[locale];

  useEffect(() => {
    closeRef.current?.focus();
    const total = shots.length;
    // 키보드: Esc 닫기 / ←·→ 갤러리 이동 / Tab 포커스 트랩
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
            {/* 스토어 URL 이 있는 플랫폼만 링크 — 다른 스토어로 잘못 보내지 않는다 */}
            {game.platforms.map((platform) => {
              const href = game.links?.[platform];
              const badge = (
                <>
                  {platformIcons[platform] && <img src={platformIcons[platform]} alt="" />}
                  <span>{platform}</span>
                </>
              );
              return href ? (
                <a key={platform} className="platform" href={href} target="_blank" rel="noreferrer noopener" aria-label={`${game.title} ${platform}`}>
                  {badge}
                </a>
              ) : (
                <span key={platform} className="platform">
                  {badge}
                </span>
              );
            })}
          </div>
          {/* 불칸: 고객센터(CS) 문의 진입 — 클릭 시 CS 폼 모달로 전환 */}
          {game.slug === "vulcan" && (
            <button className="btn btn--ghost modal__cs" type="button" onClick={onCsOpen}>
              {csForm.button[locale]} <IconArrow />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ============================================================ CS MODAL (불칸 고객 문의) */
const CS_MAX_FILES = 5;
const CS_MAX_BYTES = 10 * 1024 * 1024; // 장당 10MB

/**
 * 불칸 CS 문의 폼 모달 — 사진 다중 업로드(미리보기) + 영상 링크.
 * 제출 시 이미지를 base64 로 바꿔 Apps Script(config.ts)로 전송 → 구글 시트 + 드라이브.
 * 키보드: Esc 닫기, Tab 포커스 트랩. 카테고리는 ko 라벨로 전송(시트 관리 일관성).
 */
function CSModal({ locale, onClose }: { locale: Locale; onClose: () => void }) {
  const c = csForm;
  const L = (o: Record<Locale, string>) => o[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "notready">("idle");
  const [err, setErr] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      else if (e.key === "Tab") {
        const card = cardRef.current;
        if (!card) return;
        const f = card.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])',
        );
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
  }, [onClose]);

  // 미리보기 objectURL 누수 방지 — previews 변경/언마운트 시 이전 URL 해제
  useEffect(() => () => previews.forEach((u) => URL.revokeObjectURL(u)), [previews]);

  function setFiles(next: File[]) {
    const overCount = next.length > CS_MAX_FILES;
    const overSize = next.some((f) => f.size > CS_MAX_BYTES);
    const capped = next.filter((f) => f.size <= CS_MAX_BYTES).slice(0, CS_MAX_FILES);
    setErr(overCount || overSize ? L(c.errFiles) : "");
    setImages(capped);
    setPreviews(capped.map((f) => URL.createObjectURL(f)));
  }
  const addFiles = (list: FileList | null) =>
    list && setFiles([...images, ...Array.from(list).filter((f) => f.type.startsWith("image/"))]);
  const removeFile = (i: number) => setFiles(images.filter((_, idx) => idx !== i));

  function toBase64(file: File): Promise<CsImage> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const r = String(reader.result);
        resolve({ name: file.name, mimeType: file.type, dataBase64: r.slice(r.indexOf(",") + 1) });
      };
      reader.onerror = () => reject(new Error("read failed"));
      reader.readAsDataURL(file);
    });
  }

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    if (!fd.get("consentPrivacy") || !fd.get("consentNotice")) {
      setErr(L(c.errConsent));
      return;
    }
    setErr("");
    setStatus("sending");
    try {
      const imgs = await Promise.all(images.map(toBase64));
      const result = await submitCsInquiry({
        game: "Vulcan",
        category: String(fd.get("category") || ""),
        email: String(fd.get("email") || ""),
        gameId: String(fd.get("gameId") || ""),
        contact: String(fd.get("contact") || ""),
        detail: String(fd.get("detail") || ""),
        videoUrl: String(fd.get("videoUrl") || ""),
        consentPrivacy: true,
        consentNotice: true,
        locale,
        images: imgs,
      });
      setStatus(result);
      if (result === "success") {
        form.reset();
        setImages([]);
        setPreviews([]);
      }
    } catch {
      setStatus("error");
    }
  }

  const msg =
    status === "success" ? L(c.success) : status === "error" ? L(c.error) : status === "notready" ? L(c.notReady) : "";
  const isErr = status === "error" || status === "notready" || !!err;

  return (
    <div className="modal" role="dialog" aria-modal="true" aria-label={L(c.title)}>
      <div className="modal__scrim" onClick={onClose} />
      <div className="modal__card cs" ref={cardRef}>
        <button ref={closeRef} className="modal__close" onClick={onClose} aria-label={copy[locale].closeLabel}>
          <IconClose />
        </button>
        <div className="cs__body">
          <span className="eyebrow">{L(c.button)}</span>
          <h3 className="cs__title">{L(c.title)}</h3>
          <p className="cs__intro">{L(c.intro)}</p>
          <form className="cs__form" onSubmit={onSubmit}>
            <label className="field">
              <span>
                {L(c.labels.email)} <em className="field__req" aria-hidden="true">*</em>
              </span>
              <input name="email" type="email" required />
            </label>
            <label className="field">
              <span>
                {L(c.labels.gameId)} <em className="field__req" aria-hidden="true">*</em>
              </span>
              <input name="gameId" type="text" required />
              <small className="field__help">{L(c.labels.gameIdHelp)}</small>
            </label>
            <label className="field">
              <span>{L(c.labels.contact)}</span>
              <input name="contact" type="text" inputMode="tel" />
            </label>
            <label className="field">
              <span>
                {L(c.labels.category)} <em className="field__req" aria-hidden="true">*</em>
              </span>
              <select name="category" required defaultValue="">
                <option value="" disabled>
                  {L(c.labels.categoryPlaceholder)}
                </option>
                {c.categories.map((cat) => (
                  <option key={cat.en} value={cat.ko}>
                    {L(cat)}
                  </option>
                ))}
              </select>
            </label>
            <label className="field field--full">
              <span>
                {L(c.labels.detail)} <em className="field__req" aria-hidden="true">*</em>
              </span>
              <textarea name="detail" rows={5} required placeholder={L(c.labels.detailPlaceholder)} />
            </label>

            <div className="field field--full">
              <span>{L(c.labels.files)}</span>
              <label className="cs__drop">
                <input type="file" accept="image/*" multiple onChange={(e) => addFiles(e.target.files)} />
                <span className="cs__dropCta">+ {L(c.labels.files)}</span>
                <small className="field__help">{L(c.labels.filesHelp)}</small>
              </label>
              {previews.length > 0 && (
                <ul className="cs__thumbs">
                  {previews.map((src, i) => (
                    <li className="cs__thumb" key={src}>
                      <img src={src} alt="" />
                      <button type="button" onClick={() => removeFile(i)} aria-label={copy[locale].closeLabel}>
                        <IconClose />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label className="field field--full">
              <span>{L(c.labels.videoUrl)}</span>
              <input name="videoUrl" type="url" placeholder="https://youtu.be/…" />
              <small className="field__help">{L(c.labels.videoUrlHelp)}</small>
            </label>

            <label className="cs__check field--full">
              <input type="checkbox" name="consentPrivacy" aria-required="true" />
              <span>
                {L(c.consents.privacy)}{" "}
                <a href={c.privacyUrl} target="_blank" rel="noreferrer noopener">
                  {L(c.privacyLabel)}
                </a>
              </span>
            </label>
            <label className="cs__check field--full">
              <input type="checkbox" name="consentNotice" aria-required="true" />
              <span>{L(c.consents.notice)}</span>
            </label>

            <button className="btn btn--primary cs__submit field--full" type="submit" disabled={status === "sending"}>
              {status === "sending" ? L(c.sending) : L(c.submit)} <IconArrow />
            </button>
            {(err || msg) && (
              <p className={`form__status field--full ${isErr ? "err" : "ok"}`} role={isErr ? "alert" : "status"} aria-live={isErr ? "assertive" : "polite"}>
                {err || msg}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

/* ============================================================ BACK TO TOP */
/** 맨 위로 버튼 — 700px 이상 스크롤하면 표시, reduced-motion 사용자는 즉시 점프 */
function BackToTop({ label }: { label: string }) {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > BACK_TO_TOP_SCROLL_PX);
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
/**
 * 루트 컴포넌트 — 전역 상태(언어/드로어/선택 게임/스크롤 여부)를 들고 섹션을 조립한다.
 * 드로어·모달이 열리면 배경 스크롤을 잠그고, 닫히면 열었던 요소로 포커스를 복원한다.
 */
export default function App() {
  const [locale, setLocale] = useState<Locale>("ko");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Game | null>(null);
  const [csOpen, setCsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [legalKey, setLegalKey] = useState<"privacy" | "terms" | null>(null);
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null); // 동적 import 로 로드된 법률 문서
  const lastFocus = useRef<HTMLElement | null>(null);
  const legalTrigger = useRef<HTMLElement | null>(null); // 법률 페이지를 연 요소(닫을 때 포커스 복원용)

  // locale 변경으로 새로 렌더된 .reveal 요소도 다시 관찰
  useReveal([locale]);

  // <html lang> 을 현재 언어와 동기화 (스크린리더 발음·검색엔진 언어 판별)
  useEffect(() => {
    document.documentElement.lang = HTML_LANG[locale];
  }, [locale]);

  // 오버레이(드로어·게임/CS 모달·법률페이지) 중 하나라도 열렸는지 — 배경 스크롤잠금 + inert 공유
  const overlayOpen = menuOpen || selected !== null || csOpen || legalKey !== null;

  // 오버레이가 열린 동안 배경 스크롤 잠금
  useEffect(() => {
    document.body.classList.toggle("is-locked", overlayOpen);
  }, [overlayOpen]);

  // 법률 페이지(#privacy/#terms) — 해시로 열고 닫아 딥링크·뒤로가기 지원.
  useEffect(() => {
    const sync = () => {
      const h = window.location.hash.replace("#", "");
      setLegalKey(h === "privacy" || h === "terms" ? h : null);
    };
    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, []);

  // legalKey 가 정해지면 법률 전문 모듈(무거움)을 동적 import 해 로드(코드스플릿) + 포커스 저장/복원.
  useEffect(() => {
    if (!legalKey) {
      setLegalDoc(null);
      legalTrigger.current?.focus(); // 닫을 때 열었던 요소(푸터 링크 등)로 포커스 복원
      return;
    }
    legalTrigger.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    let cancelled = false;
    import("./legal").then((m) => {
      if (!cancelled) setLegalDoc(m.legalDocs[legalKey] ?? null);
    });
    return () => {
      cancelled = true;
    };
  }, [legalKey]);

  // 헤더 배경(블러) 전환용 스크롤 감지
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > NAV_BLUR_SCROLL_PX);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 모달: 연 요소를 기억해 두고 닫힐 때 그 자리로 포커스 복원
  const openGame = (game: Game) => {
    lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelected(game);
  };
  const closeGame = useCallback(() => {
    setSelected(null);
    lastFocus.current?.focus();
  }, []);

  // CS 문의 모달: nav '고객센터' 또는 게임 모달의 "고객센터 문의" 에서 열림.
  // 연 요소를 기억(닫을 때 포커스 복원), 게임 모달이 열려 있으면 닫고 CS 로 전환.
  const openCs = useCallback(() => {
    // 게임 모달에서 CS 로 전환할 때는 게임 모달을 연 요소를 복원 대상으로 그대로 둔다(모달 버튼은 곧 사라짐).
    if (selected === null) {
      lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    setSelected(null);
    setCsOpen(true);
  }, [selected]);
  const closeCs = useCallback(() => {
    setCsOpen(false);
    // 복원 대상이 DOM 에서 사라졌으면(예: 전환 중 언마운트) 건너뛴다
    if (lastFocus.current?.isConnected) lastFocus.current.focus();
  }, []);

  // Drawer 가 effect 의존성으로 쓰므로 참조를 고정한다 — 리렌더(예: 드로어 안 언어 전환)마다
  // 포커스 트랩이 재설치되어 포커스 복원 대상이 드로어 내부 요소로 덮이는 문제 방지
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      {/* 배경(내비·본문·푸터) — 오버레이가 열리면 inert 처리해 포커스가 밖으로 새지 않고
          스크린리더도 배경을 건너뛴다. 오버레이(드로어·모달·법률)는 이 래퍼 밖에 두어 조작 가능. */}
      <div inert={overlayOpen ? true : undefined}>
        <Nav locale={locale} setLocale={setLocale} scrolled={scrolled} onOpenMenu={() => setMenuOpen(true)} onCsOpen={openCs} />
        <main>
          <Hero locale={locale} />
          <Stats locale={locale} />
          <Games locale={locale} onSelect={openGame} />
          <Company locale={locale} />
          <Contact locale={locale} />
        </main>
        <Footer locale={locale} />
        <BackToTop label={copy[locale].topLabel} />
      </div>
      <Drawer open={menuOpen} onClose={closeMenu} locale={locale} setLocale={setLocale} onCsOpen={openCs} />
      {selected && <GameModal game={selected} locale={locale} onClose={closeGame} onCsOpen={openCs} />}
      {csOpen && <CSModal locale={locale} onClose={closeCs} />}
      {legalKey && legalDoc && <LegalPage doc={legalDoc} locale={locale} onClose={() => (window.location.hash = "")} />}
    </>
  );
}
