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
