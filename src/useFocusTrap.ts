import { RefObject, useEffect, useRef } from "react";

/**
 * 모달·드로어 공용 포커스 트랩 훅.
 *
 * 오버레이가 열린 동안:
 * - `initialFocusRef`(보통 닫기 버튼)로 첫 포커스를 옮긴다.
 * - `Esc` 로 `onClose`, `Tab`/`Shift+Tab` 을 `containerRef` 안에서 순환시킨다(트랩).
 *
 * 이 훅은 트랩만 담당한다. 조건부 마운트되는 모달(GameModal·CSModal)은
 * 여는 요소로의 포커스 복원을 App 이 처리하므로 `restoreFocus` 를 쓰지 않는다.
 * Drawer 처럼 항상 마운트된 채 `active` 로 토글되는 경우만 `restoreFocus: true` 로
 * 열 때의 포커스를 기억했다가 닫힐 때 복원한다.
 *
 * @param containerRef      포커스를 가둘 컨테이너
 * @param initialFocusRef   열릴 때 처음 포커스할 요소
 * @param onClose           Esc 로 닫을 때 호출
 * @param active            트랩 활성화 여부 (기본 true — 조건부 마운트 모달용)
 * @param focusableSelector 포커스 가능 요소 셀렉터 (CS 폼은 input/select/textarea 포함)
 * @param restoreFocus      비활성 전환 시 여는 요소로 포커스 복원 (드로어처럼 상시 마운트인 경우)
 * @param onExtraKey        Esc·Tab 외 키 처리(예: 갤러리 ←/→). 리스너 재설치를 막으려면 useCallback 로 넘긴다.
 */
export function useFocusTrap({
  containerRef,
  initialFocusRef,
  onClose,
  active = true,
  focusableSelector = "a[href], button:not([disabled])",
  restoreFocus = false,
  onExtraKey,
}: {
  containerRef: RefObject<HTMLElement | null>;
  initialFocusRef: RefObject<HTMLElement | null>;
  onClose: () => void;
  active?: boolean;
  focusableSelector?: string;
  restoreFocus?: boolean;
  onExtraKey?: (e: KeyboardEvent) => void;
}) {
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!active) {
      // 비활성: 열었던 요소로 포커스 복원 (restoreFocus 인 경우만)
      if (restoreFocus) triggerRef.current?.focus();
      return;
    }
    // 활성: 현재 포커스를 기억(복원용)하고 첫 요소로 포커스
    if (restoreFocus) {
      triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    }
    initialFocusRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      onExtraKey?.(e);
      if (e.key !== "Tab") return;
      // 포커스 트랩: 컨테이너 안 포커스 가능한 요소의 처음↔끝을 순환
      const el = containerRef.current;
      if (!el) return;
      const f = el.querySelectorAll<HTMLElement>(focusableSelector);
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
  }, [active, onClose, focusableSelector, restoreFocus, onExtraKey, containerRef, initialFocusRef]);
}
