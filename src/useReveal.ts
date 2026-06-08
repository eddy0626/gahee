import { useEffect } from "react";

/**
 * 스크롤 등장 애니메이션 훅.
 *
 * `.reveal` 클래스를 가진 요소를 IntersectionObserver 로 관찰하다가,
 * 화면에 들어오면 `.in` 클래스를 붙여 CSS 전환을 트리거한다.
 * `prefers-reduced-motion` 사용자나 미지원 브라우저에서는 즉시 모두 표시한다.
 *
 * @param deps 재스캔 트리거 (예: [locale]) — 새로 렌더된 .reveal 요소도 관찰
 */
export function useReveal(deps: unknown[] = []) {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal:not(.in)"));
    if (els.length === 0) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced || !("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("in"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
