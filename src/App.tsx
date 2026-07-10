import { Fragment, FormEvent, useCallback, useEffect, useRef, useState } from "react";
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
import type { LegalDoc } from "./legal";
import { submitInquiry, submitContactInquiry, CONTACT_ENDPOINT, type ContactPdf } from "./config";
import { LOCALES, LOCALE_LABELS, HTML_LANG } from "./i18n";
import { Brand, IconArrow, IconClose, IconMenu, IconUp } from "./icons";
import { CSModal, GameModal, LegalPage } from "./modals";
import { useReveal } from "./useReveal";
import { useFocusTrap } from "./useFocusTrap";
import { HeroGlobe } from "./HeroGlobe";

/** 스크롤 임계값(px) — 내비 배경 블러 전환 / '맨 위로' 버튼 표시 시점 */
const NAV_BLUR_SCROLL_PX = 40;
const BACK_TO_TOP_SCROLL_PX = 700;

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
  const t = copy[locale];

  // 드로어는 항상 마운트된 채 open 으로 토글되므로 restoreFocus 로 트리거(햄버거) 포커스를 자체 복원한다.
  useFocusTrap({ active: open, containerRef: panelRef, initialFocusRef: closeRef, onClose, restoreFocus: true });

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
        {cats.length > 1 && (
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
const CONTACT_PDF_MAX = 10 * 1024 * 1024; // 첨부 PDF 상한 10MB

/** 파일 → base64(data: 접두사 제외) + 메타. Contact PDF 전송용(CS 폼 toBase64 와 동일 방식). */
function fileToBase64(file: File): Promise<ContactPdf> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const r = String(reader.result);
      resolve({ name: file.name, mimeType: file.type || "application/pdf", dataBase64: r.slice(r.indexOf(",") + 1) });
    };
    reader.onerror = () => reject(new Error("read failed"));
    reader.readAsDataURL(file);
  });
}

function Contact({ locale }: { locale: Locale }) {
  const t = copy[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "mailto" | "error">("idle");
  const [pdf, setPdf] = useState<File | null>(null);
  const [pdfErr, setPdfErr] = useState("");
  const fl = t.fieldLabels;
  // PDF 첨부는 Apps Script 엔드포인트가 있을 때만 노출·전송(없으면 기존 Formspree 텍스트 폼 그대로).
  const pdfEnabled = !!CONTACT_ENDPOINT;

  // PDF 선택 검증 — PDF 타입 + 10MB 이하만 통과. 실패 시 에러 문구, 성공 시 상태에 보관.
  function onPickPdf(list: FileList | null) {
    const file = list?.[0] ?? null;
    if (!file) return;
    const isPdf = file.type === "application/pdf" || /\.pdf$/i.test(file.name);
    if (!isPdf) {
      setPdf(null);
      setPdfErr(t.pdf.errType);
      return;
    }
    if (file.size > CONTACT_PDF_MAX) {
      setPdf(null);
      setPdfErr(t.pdf.errSize);
      return;
    }
    setPdf(file);
    setPdfErr("");
  }
  function clearPdf() {
    setPdf(null);
    setPdfErr("");
  }

  // 텍스트 항목은 FormData 로, PDF 는 상태(pdf)로 관리. 엔드포인트 유무로 전송 경로 분기.
  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    // 파일 input 은 name 이 없어 FormData 엔 문자열 항목만 담긴다(File 방어 필터 유지).
    const entries = [...new FormData(form).entries()].filter((e): e is [string, string] => typeof e[1] === "string");
    const data = Object.fromEntries(entries);
    setStatus("sending");
    let result;
    if (pdfEnabled) {
      const pdfPayload = pdf ? await fileToBase64(pdf) : null;
      result = await submitContactInquiry({ ...data, locale, pdf: pdfPayload });
    } else {
      result = await submitInquiry(data);
    }
    setStatus(result);
    if (result === "success") {
      form.reset();
      clearPdf();
    }
  }

  // 폼 필드 정의 — required 는 브라우저 기본 검증과 라벨의 * 표시에 함께 쓰인다
  const fields = [
    { name: "name", label: fl.name, type: "text", required: true },
    { name: "company", label: fl.company, type: "text", required: false },
    { name: "email", label: fl.email, type: "email", required: true },
    { name: "game", label: fl.game, type: "text", required: true },
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
            {/* PDF 첨부 — 선택. Apps Script 엔드포인트가 설정된 경우에만 노출된다. */}
            {pdfEnabled && (
              <label className="field field--full field--file">
                <span>{t.pdf.label}</span>
                <input
                  type="file"
                  accept="application/pdf,.pdf"
                  onChange={(e) => onPickPdf(e.target.files)}
                  aria-describedby="contact-pdf-hint"
                />
                {pdf && (
                  <span className="field__file">
                    <span className="field__file-name">{pdf.name}</span>
                    <button type="button" className="field__file-x" onClick={clearPdf}>
                      {t.pdf.remove}
                    </button>
                  </span>
                )}
                <small id="contact-pdf-hint" className={`field__hint${pdfErr ? " err" : ""}`} role={pdfErr ? "alert" : undefined}>
                  {pdfErr || t.pdf.hint}
                </small>
              </label>
            )}
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
  const [csGame, setCsGame] = useState<string | null>(null); // CS 폼에 미리 선택될 게임(게임 모달에서 열면 그 게임)
  const [scrolled, setScrolled] = useState(false);
  const [legalKey, setLegalKey] = useState<"privacy" | "terms" | null>(null);
  const [legalDoc, setLegalDoc] = useState<LegalDoc | null>(null); // 동적 import 로 로드된 법률 문서
  const lastFocus = useRef<HTMLElement | null>(null);
  const prevModalOpen = useRef(false); // 게임/CS 모달 열림 상태의 직전 값(닫힘 전이 감지용)
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

  // 모달: 연 요소를 기억해 두고 닫힐 때 그 자리로 포커스 복원(복원은 아래 effect 에서).
  const openGame = (game: Game) => {
    lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelected(game);
  };
  const closeGame = useCallback(() => setSelected(null), []);

  // CS 문의 모달: nav '고객센터' 또는 게임 모달의 "고객센터 문의" 에서 열림.
  // 연 요소를 기억(닫을 때 포커스 복원), 게임 모달이 열려 있으면 닫고 CS 로 전환.
  const openCs = useCallback((game?: Game) => {
    // 게임 모달에서 CS 로 전환할 때는 게임 모달을 연 요소를 복원 대상으로 그대로 둔다(모달 버튼은 곧 사라짐).
    if (selected === null) {
      lastFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    setCsGame(game ? game.titleKo || game.title : null); // 게임 지정 시 CS 폼에 그 게임을 기본 선택
    setSelected(null);
    setCsOpen(true);
  }, [selected]);
  const closeCs = useCallback(() => setCsOpen(false), []);

  // 게임/CS 모달이 완전히 닫히면(게임→CS 전환 중엔 modalOpen 이 계속 true 라 제외) 연 요소로 포커스 복원.
  // 복원을 동기 호출이 아닌 effect(커밋 이후)에서 하는 이유: 그 시점엔 배경 inert 가 이미 걷혀
  // inert 하위로의 focus() 무시 문제를 피한다. (전환 중 언마운트된 대상은 isConnected 로 건너뜀.)
  const modalOpen = selected !== null || csOpen;
  useEffect(() => {
    if (prevModalOpen.current && !modalOpen && lastFocus.current?.isConnected) {
      lastFocus.current.focus();
    }
    prevModalOpen.current = modalOpen;
  }, [modalOpen]);

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
      {csOpen && <CSModal locale={locale} defaultGame={csGame} onClose={closeCs} />}
      {legalKey && legalDoc && <LegalPage doc={legalDoc} locale={locale} onClose={() => (window.location.hash = "")} />}
    </>
  );
}
