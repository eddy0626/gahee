import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import {
  companyProfile,
  contact,
  copy,
  Game,
  GameCategory,
  gameFilters,
  games,
  Locale,
  nav,
  partners,
  platformCategory,
  platformIcons,
  roadmap,
  stats,
} from "./content";
import { submitInquiry } from "./config";
import { useReveal } from "./useReveal";
import { HeroGlobe } from "./HeroGlobe";

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
};

/** 상단 고정 내비게이션 — 스크롤하면 배경을 블러 처리하고, 모바일(≤720px)에선 드로어 버튼만 노출 */
function Nav({ locale, setLocale, scrolled, onOpenMenu }: NavProps) {
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
function Drawer({ open, onClose, locale, setLocale }: { open: boolean; onClose: () => void; locale: Locale; setLocale: (l: Locale) => void }) {
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
    triggerRef.current = document.activeElement as HTMLElement;
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
        <div className="drawer__lang">
          <button aria-pressed={locale === "ko"} onClick={() => setLocale("ko")}>
            KO
          </button>
          <button aria-pressed={locale === "en"} onClick={() => setLocale("en")}>
            EN
          </button>
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
        {tabs.length > 1 && (
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
          {matches(featured) && card(featured, "feature")}
          {rest.filter(matches).map((g) => card(g, "wide"))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================ COMPANY + PUBLISHING (병합) */
/** 회사 소개 + 퍼블리싱 — 정체성·프로필 → 일하는 방식(프로세스·역량) → 파트너·로드맵.
 *  '전 과정 직접' 서사를 도입부 한 번으로 줄이고, 아래 프로세스·역량 카드가 그것을 증명한다.
 *  nav '퍼블리싱'(#publishing) 앵커는 가운데 퍼블리싱 블록으로 유지. */
function Company({ locale }: { locale: Locale }) {
  const t = copy[locale];
  return (
    <section className="section section--light" id="company">
      <div className="shell">
        {/* 상단: 정체성 + 회사 프로필 */}
        <div className="company__top">
          <div className="company__lead reveal">
            <span className="eyebrow">{t.eyebrow.company}</span>
            <h2 className="section-title">{t.aboutTitle}</h2>
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

        {/* 하단: 파트너 + 로드맵 */}
        <div className="company__bottom">
          <div className="reveal">
            <h3 className="subhead">{t.partnershipTitle}</h3>
            <div className="partners">
              {partners.map((p) => (
                <span className="partner" key={p}>
                  {p}
                </span>
              ))}
            </div>
          </div>
          <div className="reveal">
            <h3 className="subhead">{t.roadmapTitle}</h3>
            {roadmap.map((r) => (
              <div className="road" key={r.label}>
                <div className="road__label">{r.label}</div>
                <div className="road__text">{r.text[locale]}</div>
              </div>
            ))}
          </div>
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
    const data = Object.fromEntries(new FormData(form).entries()) as Record<string, string>;
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
function GameModal({ game, locale, onClose }: { game: Game; locale: Locale; onClose: () => void }) {
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
/**
 * 루트 컴포넌트 — 전역 상태(언어/드로어/선택 게임/스크롤 여부)를 들고 섹션을 조립한다.
 * 드로어·모달이 열리면 배경 스크롤을 잠그고, 닫히면 열었던 요소로 포커스를 복원한다.
 */
export default function App() {
  const [locale, setLocale] = useState<Locale>("ko");
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState<Game | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const lastFocus = useRef<HTMLElement | null>(null);

  // locale 변경으로 새로 렌더된 .reveal 요소도 다시 관찰
  useReveal([locale]);

  // <html lang> 을 현재 언어와 동기화 (스크린리더 발음·검색엔진 언어 판별)
  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  // 드로어/모달이 열린 동안 배경 스크롤 잠금
  useEffect(() => {
    document.body.classList.toggle("is-locked", menuOpen || selected !== null);
  }, [menuOpen, selected]);

  // 헤더 배경(블러) 전환용 스크롤 감지
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // 모달: 연 요소를 기억해 두고 닫힐 때 그 자리로 포커스 복원
  const openGame = (game: Game) => {
    lastFocus.current = document.activeElement as HTMLElement;
    setSelected(game);
  };
  const closeGame = useCallback(() => {
    setSelected(null);
    lastFocus.current?.focus();
  }, []);

  // Drawer 가 effect 의존성으로 쓰므로 참조를 고정한다 — 리렌더(예: 드로어 안 언어 전환)마다
  // 포커스 트랩이 재설치되어 포커스 복원 대상이 드로어 내부 요소로 덮이는 문제 방지
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <>
      <Nav locale={locale} setLocale={setLocale} scrolled={scrolled} onOpenMenu={() => setMenuOpen(true)} />
      <Drawer open={menuOpen} onClose={closeMenu} locale={locale} setLocale={setLocale} />
      <main>
        <Hero locale={locale} />
        <Stats locale={locale} />
        <Games locale={locale} onSelect={openGame} />
        <Company locale={locale} />
        <Contact locale={locale} />
      </main>
      <Footer locale={locale} />
      <BackToTop label={copy[locale].topLabel} />
      {selected && <GameModal game={selected} locale={locale} onClose={closeGame} />}
    </>
  );
}
