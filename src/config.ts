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
export const FORM_ENDPOINT = "";

/** mailto 폴백 / 안내용 수신 주소 */
export const INQUIRY_EMAIL = "biz@gahee.net";

export type InquiryResult = "success" | "mailto" | "error";

/** 폼 데이터를 전송한다. 엔드포인트 미설정 시 메일 앱으로 폴백. */
export async function submitInquiry(data: Record<string, string>): Promise<InquiryResult> {
  if (!FORM_ENDPOINT) {
    openMailto(data);
    return "mailto";
  }

  try {
    const res = await fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return res.ok ? "success" : "error";
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
export const CS_ENDPOINT = "";

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

function openMailto(data: Record<string, string>) {
  const subject = `[GAHEE 문의] ${data.game || data.name || ""}`.trim();
  const body = Object.entries(data)
    .filter(([, value]) => value)
    .map(([key, value]) => `${key}: ${value}`)
    .join("\n");
  const href = `mailto:${INQUIRY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
    body,
  )}`;
  window.location.href = href;
}
