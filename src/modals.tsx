import { FormEvent, ReactNode, useCallback, useEffect, useRef, useState } from "react";
import { copy, csForm, Game, games, Locale, platformIcons } from "./content";
import type { LegalDoc } from "./legal";
import { CsImage, submitCsInquiry } from "./config";
import { LEGAL_DISCLAIMER } from "./i18n";
import { Brand, IconArrow, IconChevron, IconClose } from "./icons";
import { useFocusTrap } from "./useFocusTrap";

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
export function LegalPage({ doc, locale, onClose }: { doc: LegalDoc; locale: Locale; onClose: () => void }) {
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

/* ============================================================ GAME MODAL */
/**
 * 게임 상세 모달.
 * - 갤러리: screenshots 가 없으면 대표 이미지 1장으로 폴백.
 * - 키보드: Esc 닫기, ←/→ 갤러리 이동, Tab 은 카드 안에서 순환(포커스 트랩).
 * - 플랫폼 배지: links 에 URL 이 있는 플랫폼만 링크가 된다.
 */
export function GameModal({ game, locale, onClose, onCsOpen }: { game: Game; locale: Locale; onClose: () => void; onCsOpen: (game?: Game) => void }) {
  const t = copy[locale];
  // 갤러리 폴백: 스크린샷 없음 → 대표 이미지 1장
  const shots = game.screenshots && game.screenshots.length > 0 ? game.screenshots : game.image ? [game.image] : [];
  const [index, setIndex] = useState(0);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const title = locale === "ko" ? game.titleKo : game.title;
  const body = game.detail ? game.detail[locale] : game.description[locale];

  // 갤러리 ←·→ 이동 (Esc·Tab 트랩은 useFocusTrap 이 담당). shots.length 만 바뀔 때 갱신.
  const onArrows = useCallback(
    (e: KeyboardEvent) => {
      const total = shots.length;
      if (e.key === "ArrowLeft" && total > 1) setIndex((i) => (i - 1 + total) % total);
      else if (e.key === "ArrowRight" && total > 1) setIndex((i) => (i + 1) % total);
    },
    [shots.length],
  );
  useFocusTrap({ containerRef: cardRef, initialFocusRef: closeRef, onClose, onExtraKey: onArrows });

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
            <button className="btn btn--ghost modal__cs" type="button" onClick={() => onCsOpen(game)}>
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
export function CSModal({ locale, defaultGame, onClose }: { locale: Locale; defaultGame: string | null; onClose: () => void }) {
  const c = csForm;
  // 문의 게임 선택지 — content.ts 의 서비스 중(placeholder 아님) 게임에서 자동 생성.
  // 게임을 content.ts 에 추가하면 여기에도 자동으로 나타난다. 값·표시는 한글명(없으면 영문명).
  const liveGames = games.filter((g) => !g.placeholder);
  const gameName = (g: Game) => g.titleKo || g.title;
  const defaultGameValue = defaultGame ?? (liveGames.length === 1 ? gameName(liveGames[0]) : "");
  const L = (o: Record<Locale, string>) => o[locale];
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error" | "notready">("idle");
  const [err, setErr] = useState("");
  const [images, setImages] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const closeRef = useRef<HTMLButtonElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  // CS 폼은 입력 요소가 많아 셀렉터에 input/select/textarea 를 포함한다.
  useFocusTrap({
    containerRef: cardRef,
    initialFocusRef: closeRef,
    onClose,
    focusableSelector: "a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled])",
  });

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
        game: String(fd.get("game") || ""),
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
            <label className="field field--full">
              <span>
                {L(c.labels.game)} <em className="field__req" aria-hidden="true">*</em>
              </span>
              <select name="game" required defaultValue={defaultGameValue} aria-required="true">
                {!defaultGameValue && (
                  <option value="" disabled>
                    {L(c.labels.gamePlaceholder)}
                  </option>
                )}
                {liveGames.map((g) => (
                  <option key={g.slug} value={gameName(g)}>
                    {gameName(g)}
                  </option>
                ))}
              </select>
            </label>
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
