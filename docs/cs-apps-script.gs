/**
 * 불칸 CS 고객 문의 — 접수 백엔드 (Google Apps Script)
 * 사이트의 네이티브 CS 폼이 이 웹앱으로 전송 → 구글 시트 기록 + 드라이브 사진 저장 + 메일.
 *
 * ■ 배포 방법 (GAHEE 가 1회만)
 *   1) 구글 시트 새로 만들기 (예: "불칸 CS 접수")
 *   2) 시트 메뉴: 확장 프로그램 → Apps Script
 *   3) 기본 코드 전체 지우고, 이 파일 전체를 붙여넣기 → 저장(💾)
 *   4) 우측 상단 "배포 → 새 배포" → 톱니바퀴(유형) → "웹 앱"
 *        · 실행 계정: 나(본인)
 *        · 액세스 권한: 모든 사용자
 *      → 배포 → 권한 검토/승인(최초 1회) → "웹 앱 URL" 복사
 *   5) 그 URL 을 개발자에게 전달 → 사이트 src/config.ts 의 CS_ENDPOINT 에 입력
 *
 * 동작: 문의 1건 = 시트 1행. 사진은 드라이브 폴더에 저장하고 행에 링크.
 *      제출자에게 접수확인 메일, 내부(NOTIFY_EMAIL)로 새 접수 알림.
 */

const FOLDER_NAME = "불칸 CS 첨부"; // 사진 저장 드라이브 폴더명 (없으면 자동 생성)
const NOTIFY_EMAIL = "cs@gahee.net"; // 새 접수 알림 받을 내부 주소 (비우면 알림 생략)
const SHEET_NAME = "접수"; // 기록할 시트 탭 이름 (없으면 첫 번째 탭 사용)

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActive();
    const sheet = ss.getSheetByName(SHEET_NAME) || ss.getSheets()[0];

    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "접수시각", "게임", "문의항목", "게임내 ID", "이메일", "연락처",
        "세부내용", "영상링크", "첨부사진", "개인정보동의", "유의사항동의", "언어",
      ]);
    }

    // 사진(base64) → 드라이브 저장 → 공개 링크
    const folder = getOrCreateFolder_(FOLDER_NAME);
    const stamp = Utilities.formatDate(new Date(), "GMT+9", "yyyyMMdd_HHmmss");
    const links = (data.images || [])
      .map(function (img, i) {
        const blob = Utilities.newBlob(
          Utilities.base64Decode(img.dataBase64),
          img.mimeType || "image/png",
          (data.gameId || "user") + "_" + stamp + "_" + (i + 1),
        );
        const file = folder.createFile(blob);
        file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
        return file.getUrl();
      })
      .join("\n");

    sheet.appendRow([
      Utilities.formatDate(new Date(), "GMT+9", "yyyy-MM-dd HH:mm:ss"),
      data.game || "Vulcan",
      data.category || "",
      data.gameId || "",
      data.email || "",
      data.contact || "",
      data.detail || "",
      data.videoUrl || "",
      links,
      data.consentPrivacy ? "Y" : "",
      data.consentNotice ? "Y" : "",
      data.locale || "",
    ]);

    // 제출자 접수확인 메일
    if (data.email) {
      MailApp.sendEmail(
        data.email,
        "[불칸 고객센터] 문의가 접수되었습니다",
        "안녕하세요, 불칸 고객센터입니다.\n\n" +
          "문의가 정상적으로 접수되었습니다. 확인 후 이 이메일로 답변드리겠습니다.\n\n" +
          "· 문의 항목: " + (data.category || "") + "\n" +
          "· 게임 내 아이디: " + (data.gameId || "") + "\n\n" +
          "감사합니다.\nGAHEE",
      );
    }
    // 내부 알림
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        "[불칸CS] 새 문의: " + (data.category || ""),
        "게임내 ID: " + (data.gameId || "") + "\n" +
          "이메일: " + (data.email || "") + "\n" +
          "연락처: " + (data.contact || "") + "\n\n" +
          (data.detail || ""),
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
