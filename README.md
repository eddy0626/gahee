# GAHEE 웹사이트

GAHEE(주식회사 가히) 게임 퍼블리셔 공식 마케팅 사이트. 백엔드 서버 없는 **정적 SPA**로, 개발사·퍼블리셔 문의와 게임 유저 고객센터(CS)를 함께 제공합니다.

- **저장소**: `eddy0626/gahee`
- **스택**: React 19 + TypeScript(strict) + Vite 7 · CSS 토큰(프레임워크 없음) · 상태 라이브러리 없음 · 시스템 폰트(외부 웹폰트 없음)

## 주요 기능

- **다크 시네마틱 디자인** — 딥블랙 + 레드(`#CB2957`) 톤, 대형 타이포, 스크롤 등장 모션(`prefers-reduced-motion` 대응)
- **4개 언어** — 한국어 / English / 繁體中文(대만) / Русский. 언어 토글 + `<html lang>` 동기화, 번체 전용 시스템 폰트
- **섹션** — Hero · Stats · Games · Company · Contact + 고객센터(CS) 모달
- **문의 폼 2종 (백엔드 연결됨)**
  - **개발사·퍼블리셔 문의** → Formspree → `biz@gahee.net` (메일 제목 자동 정리)
  - **고객센터(CS) 문의** → Google Apps Script(구글 시트 + 드라이브 사진 저장 + `cs@gahee.net` 알림). **다게임 지원** — 문의 게임 선택, 게임 추가 시 자동 확장
- **게임 상세 모달** — 스크린샷 갤러리, 플랫폼별 스토어 링크
- **법률 페이지** — 개인정보처리방침·이용약관(4개 언어). 전문은 동적 import 로 지연로딩(코드 스플릿)
- **접근성** — 오버레이 포커스 트랩·배경 inert·포커스 복원, `aria-live` 폼, AA 대비

## 최근 작업 (2026-07)

- **디자인 통일** — 라이트 섹션 제거, 전 섹션 다크 시네마틱 톤으로
- **다국어 확장** — KO/EN → **KO/EN/繁中/RU** 전체 번역
- **법률 페이지** — 개인정보처리방침·이용약관을 사이트 내 페이지로 + 4개 언어
- **코드 리뷰 개선** — 법률 전문 코드 스플릿(메인 번들 405→240KB), 죽은 코드 제거, 접근성·타입 강화
- **문의 폼 백엔드 연결** — Contact(Formspree)·CS(Apps Script) 실제 작동
- **CS 폼 다게임화** — `content.ts`에 게임 추가 시 CS 문의 게임 목록 자동 확장
- **데이터 정합** — 실제 라인업(불칸, 모바일)에 맞게 문구·수치 조정

## 실행

```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # dist/ 생성 (정적 배포용)
```

## 프로젝트 구조

```text
src/
├─ App.tsx        # 섹션 컴포넌트 + 상태(모달·CS·법률·언어)
├─ content.ts     # 모든 텍스트·게임·회사 데이터 (4개 언어) — 단일 출처
├─ legal.ts       # 법률 전문(4개 언어) — 동적 import 로 지연로딩
├─ config.ts      # 문의 폼 전송(Formspree / Apps Script)
├─ styles.css     # 디자인 토큰 + 다크 테마 + 컴포넌트 스타일
├─ HeroGlobe.tsx  # 히어로 캔버스 글로브
└─ useReveal.ts   # 스크롤 등장 훅
docs/
└─ cs-apps-script.gs  # CS 백엔드 (구글 Apps Script)
public/           # 게임 이미지, robots.txt, sitemap.xml
```

## 게임·문구 추가 (확장)

사이트는 대부분 **`src/content.ts` 데이터만** 고치면 확장됩니다. 코드 수정 거의 없음.

- **게임 추가**: `games` 배열에 항목 추가(`slug`·`title`·`titleKo`·`genre`·`image`·`platforms`·`links`·`description` 4언어) → 게임 카드·플랫폼 필터·**CS 문의 게임 드롭다운에 자동 반영**. `placeholder: true` 면 숨김(준비 중), `featured: true` 면 큰 카드.
- **문구·번역**: `content.ts` 의 해당 키(4개 언어 항상 함께). 법률 전문은 `legal.ts`.

## 폼 백엔드

- **Contact** — `src/config.ts` 의 `FORM_ENDPOINT`(Formspree). 비어 있으면 `mailto` 폴백.
- **CS** — `CS_ENDPOINT`(Apps Script 웹앱 URL). 스크립트 `docs/cs-apps-script.gs` 를 구글 시트에 배포(실행=나, 액세스=모든 사용자).

## 배포

정적 빌드(`npm run build` → `dist/`). Netlify/Vercel 에 GitHub 저장소를 연결하면 `main` push 시 자동 배포 — **연결 예정.**

## ⚠️ 배포(공개) 전 확인

- 이용약관 일부·번역본은 초안/참고용 → **법무·네이티브 검토** 필요
- Formspree 첫 제출 **활성화** 확인 / CS 시트 테스트 데이터 정리
