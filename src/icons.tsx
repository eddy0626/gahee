
/* ---------- 아이콘: 장식용 인라인 SVG (currentColor 상속, 보조기기엔 숨김) ---------- */
export const IconMenu = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
  </svg>
);
export const IconClose = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
  </svg>
);
export const IconArrow = () => (
  <svg className="arrow" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconChevron = ({ dir }: { dir: "left" | "right" }) => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
    <path d={dir === "left" ? "M15 6l-6 6 6 6" : "M9 6l6 6-6 6"} strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
export const IconUp = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" aria-hidden="true">
    <path d="M6 15l6-6 6 6" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/** 브랜드 워드마크 — 클릭 시 최상단(#top)으로 이동 */
export const Brand = ({ className = "brand" }: { className?: string }) => (
  <a className={className} href="#top" aria-label="GAHEE home">
    GAHEE<b>.</b>
  </a>
);
