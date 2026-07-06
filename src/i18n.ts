import { Locale } from "./content";

/** 지원 언어와 토글 버튼 라벨 — 한국어·영어·번체 중국어(대만)·러시아어 */
export const LOCALES: Locale[] = ["ko", "en", "zh", "ru"];
export const LOCALE_LABELS: Record<Locale, string> = { ko: "KO", en: "EN", zh: "繁中", ru: "RU" };
/** `<html lang>` 용 BCP-47 태그 (번체는 zh-Hant 로 명시) */
export const HTML_LANG: Record<Locale, string> = { ko: "ko", en: "en", zh: "zh-Hant", ru: "ru" };
/** 법률 페이지 번역 고지 — 비한국어 버전 상단. 한국어 원문이 우선함을 명시. */
export const LEGAL_DISCLAIMER: Record<Locale, string> = {
  ko: "",
  en: "This is a reference translation. In case of any discrepancy, the Korean original prevails.",
  zh: "本翻譯僅供參考。如與韓文原文有任何出入，概以韓文原文為準。",
  ru: "Это справочный перевод. При любых расхождениях приоритет имеет корейский оригинал.",
};
