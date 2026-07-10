/**
 * 문의 폼 전송 설정.
 *
 * ▶ 실제 메일 전송을 켜는 방법
 *   1) https://formspree.io 가입 → 새 Form 생성 (수신 메일: biz@gahee.net)
 *   2) 발급된 엔드포인트(예: "https://formspree.io/f/abcdwxyz")를
 *      아래 FORM_ENDPOINT 값에 붙여넣기
 *
 *   엔드포인트가 비어 있으면(기본값) 자동으로 메일 앱(mailto)을 여는
 *   방식으로 폴백하므로, 키 없이도 폼 동작을 확인할 수 있습니다.
 */
export const FORM_ENDPOINT = "https://formspree.io/f/mpqgokgv";

/** mailto 폴백 / 안내용 수신 주소 */
export const INQUIRY_EMAIL = "biz@gahee.net";

export type InquiryResult = "success" | "mailto" | "error";

/** 접수 일시를 한국시간 "2026-07-03 14:30" 형식으로 만든다. (sv-SE 로케일이 ISO 형식으로 떨어져 그대로 사용) */
function nowKST(): string {
  return new Intl.DateTimeFormat("sv-SE", {
    timeZone: "Asia/Seoul",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date());
}

/** 문의 메일 제목 — 받은 쪽에서 한눈에 보이게 "[GAHEE 퍼블리싱 문의] 이름 / 게임 / 접수일시" 형태로 만든다. */
function inquirySubject(data: Record<string, string>): string {
  const parts = [data.name, data.game, nowKST()].filter(Boolean);
  return `[GAHEE 퍼블리싱 문의] ${parts.join(" / ")}`;
}

/** 폼 데이터를 전송한다. 엔드포인트 미설정 시 메일 앱으로 폴백. */
export async function submitInquiry(data: Record<string, string>): Promise<InquiryResult> {
  if (!FORM_ENDPOINT) {
    openMailto(data);
    return "mailto";
  }

  try {
    // Formspree 는 payload 의 특수 필드 `_subject` 를 메일 제목으로 사용한다.
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, _subject: inquirySubject(data) }),
    });
    return res.ok ? "success" : "error";
  } catch {
    return "error";
  }
}

/* ============================================================
   퍼블리싱 문의(Contact) — Apps Script(구글 시트 + 드라이브 PDF) 전송
   ▶ 켜는 방법: docs/contact-apps-script.gs 를 웹앱으로 배포("모든 사용자") →
      웹앱 URL 을 아래 CONTACT_ENDPOINT 에 입력.
   비어 있으면(기본) 프런트가 기존 Formspree/mailto 폴백을 쓰고 PDF 첨부 UI 를 숨긴다.
   설정되면 텍스트 + 선택 PDF 를 이 엔드포인트로 보낸다.
   ============================================================ */
export const CONTACT_ENDPOINT = "";

/** 첨부 PDF 1개 — base64 데이터(data: 접두사 제외)와 메타. Apps Script 가 디코드해 드라이브에 저장. */
export type ContactPdf = { name: string; mimeType: string; dataBase64: string };

/**
 * 퍼블리싱 문의 전송(Apps Script). 텍스트 + 선택 PDF JSON 을 no-cors 로 POST.
 * CS 전송과 동일하게 Content-Type=text/plain 으로 CORS 프리플라이트를 회피하고,
 * 불투명 응답이라 네트워크 실패가 아니면 낙관적 성공 처리(실접수 확인은 Apps Script 접수확인 메일).
 */
export async function submitContactInquiry(payload: Record<string, unknown>): Promise<InquiryResult> {
  if (!CONTACT_ENDPOINT) return "error"; // 프런트는 엔드포인트 없으면 이 경로를 타지 않음(안전장치)
  try {
    await fetch(CONTACT_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return "success";
  } catch {
    return "error";
  }
}

/* ============================================================
   불칸 CS 고객 문의 — Apps Script(구글 시트 + 드라이브) 전송
   ▶ 켜는 방법
     1) Apps Script 웹앱 배포(액세스: "모든 사용자") → 웹앱 URL 복사
     2) 아래 CS_ENDPOINT 에 붙여넣기
   엔드포인트가 비어 있으면 "notready" 를 반환해 안내 문구를 보여준다.
   ============================================================ */
export const CS_ENDPOINT = "https://script.google.com/macros/s/AKfycbwFAASaFpm0BhIkfywgiEiuC5ncUPEqxLkaav07xbqEHCbh-bfhSOHSWu5_HKt7tN2u/exec";

export type CsResult = "success" | "error" | "notready";

/** 첨부 이미지 1장 — base64 데이터(접두사 제외)와 메타. Apps Script 가 디코드해 드라이브에 저장. */
export type CsImage = { name: string; mimeType: string; dataBase64: string };

/**
 * CS 문의 전송. 이미지(base64 포함) JSON 을 Apps Script 로 POST.
 * Content-Type 을 text/plain 으로 보내 CORS 프리플라이트(OPTIONS)를 회피한다
 * (Apps Script doPost 는 본문을 JSON.parse 한다).
 */
export async function submitCsInquiry(payload: Record<string, unknown>): Promise<CsResult> {
  if (!CS_ENDPOINT) return "notready";
  try {
    // Apps Script 웹앱은 CORS 응답 헤더가 없어 응답을 읽으면 막힌다.
    // → no-cors 로 "전송 보장"하고(불투명 응답), 네트워크 실패가 아니면 낙관적 성공 처리.
    // ⚠️ 서버측 4xx/5xx 도 여기선 구분 불가 → 실제 접수 확인은 Apps Script 의 접수확인 메일이 담당.
    await fetch(CS_ENDPOINT, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
    });
    return "success";
  } catch {
    return "error";
  }
}

/** mailto 폴백 — 제목(inquirySubject: 이름/게임+접수일시)과 본문(빈 값 제외, "key: value" 줄바꿈)을
 *  만들어 OS 기본 메일 앱을 연다. FORM_ENDPOINT 미설정 시 submitInquiry 가 이 함수를 호출한다. */
function openMailto(data: Record<string, string>) {
  const subject = inquirySubject(data);
  const body = Object.entries(data)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  const href = `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    body,
  )}`;
  window.location.href = href;
}
