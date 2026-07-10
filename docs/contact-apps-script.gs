/**
 * GAHEE 퍼블리싱 문의(Contact) — 접수 백엔드 (Google Apps Script)
 * 사이트의 Contact 폼이 이 웹앱으로 전송 → 구글 시트 기록 + (선택)PDF 드라이브 저장 + 메일.
 * ※ 불칸 CS 폼(docs/cs-apps-script.gs)과 같은 방식. 이건 "게임 퍼블리싱 문의"용으로 분리된 별도 웹앱.
 *
 * ■ 배포 방법 (GAHEE 가 1회만) — 회사계정(gaheegame22)으로 진행 권장
 *   1) 구글 시트 새로 만들기 (예: "퍼블리싱 문의 접수")
 *   2) 시트 메뉴: 확장 프로그램 → Apps Script
 *   3) 기본 코드 전체 지우고, 이 파일 전체를 붙여넣기 → 저장(💾)
 *   4) 우측 상단 "배포 → 새 배포" → 톱니바퀴(유형) → "웹 앱"
 *        · 실행 계정: 나(본인)
 *        · 액세스 권한: 모든 사용자   ← ⚠️ "나만"으로 하면 401. 반드시 "모든 사용자".
 *      → 배포 → 권한 검토/승인(최초 1회) → "웹 앱 URL" 복사
 *   5) 그 URL 을 개발자에게 전달 → 사이트 src/config.ts 의 CONTACT_ENDPOINT 에 입력
 *
 * 동작: 문의 1건 = 시트 1행. PDF 는 드라이브 폴더에 저장하고 행에 링크.
 *      제출자에게 접수확인 메일, 내부(NOTIFY_EMAIL)로 새 접수 알림.
 */

const FOLDER_NAME = "퍼블리싱 문의 첨부"; // PDF 저장 드라이브 폴더명 (없으면 자동 생성)
const NOTIFY_EMAIL = "biz@gahee.net";     // 새 접수 알림 받을 내부 주소 (비우면 알림 생략)
const SHEET_NAME = "접수";                 // 기록할 시트 탭 이름 (없으면 첫 번째 탭 사용)
const MAX_PDF_BYTES = 12 * 1024 * 1024;   // 서버측 안전장치 — 12MB 초과 PDF 는 거절(프런트는 10MB 제한)

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActive();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "접수시각", "이름", "회사", "이메일", "게임", "장르", "플랫폼", "개발상태",
        "영상링크", "스토어링크", "문의내용", "첨부PDF", "언어",
      ]);
    }

    // PDF(base64, 선택) → 드라이브 저장 → 공개 링크
    let pdfLink = "";
    if (data.pdf && data.pdf.dataBase64) {
      const bytes = Utilities.base64Decode(data.pdf.dataBase64);
      if (bytes.length > MAX_PDF_BYTES) {
        return json_({ ok: false, error: "pdf too large" });
      }
      const folder = getOrCreateFolder_(FOLDER_NAME);
      const stamp = Utilities.formatDate(new Date(), "GMT+9", "yyyyMMdd_HHmmss");
      const safeName = (data.name || "inquiry").replace(/[^\w가-힣.-]/g, "_");
      const blob = Utilities.newBlob(bytes, data.pdf.mimeType || "application/pdf", safeName + "_" + stamp + ".pdf");
      const file = folder.createFile(blob);
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
      pdfLink = file.getUrl();
    }

    sheet.appendRow([
      Utilities.formatDate(new Date(), "GMT+9", "yyyy-MM-dd HH:mm:ss"),
      data.name || "",
      data.company || "",
      data.email || "",
      data.game || "",
      data.genre || "",
      data.platform || "",
      data.status || "",
      data.video || "",
      data.store || "",
      data.message || "",
      pdfLink,
      data.locale || "",
    ]);

    // 제출자 접수확인 메일
    if (data.email) {
      MailApp.sendEmail(
        data.email,
        "[GAHEE] 퍼블리싱 문의가 접수되었습니다",
        "안녕하세요, GAHEE 퍼블리싱팀입니다.\n\n" +
          "문의가 정상적으로 접수되었습니다. 담당자가 검토 후 이 이메일로 연락드리겠습니다.\n\n" +
          "· 게임: " + (data.game || "") + "\n" +
          "· 회사: " + (data.company || "") + "\n\n" +
          "감사합니다.\nGAHEE",
      );
    }
    // 내부 알림
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        "[GAHEE 퍼블리싱 문의] " + (data.name || "") + " / " + (data.game || ""),
        "이름: " + (data.name || "") + "\n" +
          "회사: " + (data.company || "") + "\n" +
          "이메일: " + (data.email || "") + "\n" +
          "게임: " + (data.game || "") + " (" + (data.genre || "") + " / " + (data.platform || "") + " / " + (data.status || "") + ")\n" +
          "영상: " + (data.video || "") + "\n" +
          "스토어: " + (data.store || "") + "\n" +
          "PDF: " + (pdfLink || "(없음)") + "\n\n" +
          (data.message || ""),
      );
    }

    return json_({ ok: true });
  } catch (err) {
    return json_({ ok: false, error: String(err) });
  }
}

function getOrCreateFolder_(name) {
  const it = DriveApp.getFoldersByName(name);
  return it.hasNext() ? it.next() : DriveApp.createFolder(name);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
