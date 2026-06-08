# GAHEE Website Redesign

GAHEE 공식 웹사이트 리뉴얼 프로젝트입니다. 퍼블리싱 파트너 유치와 게임 라인업 소개를 중심으로, 기존 사이트 콘텐츠와 회사 소개서의 핵심 메시지를 React + Vite 기반 단일 페이지 사이트로 재구성했습니다. 이후 디자인을 정제하고 인터랙션·다크모드·게임 상세 모달·실제 작동 문의 폼 등의 기능을 추가했습니다.

## 목표

- 퍼블리싱 파트너가 GAHEE의 역량을 빠르게 이해할 수 있는 구조
- 실제 서비스 중인 GAHEE 게임 이미지를 활용한 게임 포트폴리오
- 국문/영문 전환을 지원하는 콘텐츠 구조
- 기존 사이트의 회사 정보, 게임 설명, 문의 정보, 약관/개인정보 링크 유지
- `#000000`, `#CB2957`, `#DDDDDD`, `#EEEEEE` 기반의 밝은 톤 + 검정/레드 브랜드 컬러 (다크모드는 선택형 토글)

## 주요 기능

- **국문/영문 전환** — 헤더 토글 및 모바일 메뉴에서 KO/EN 전환
- **다크모드 토글** — 헤더의 테마 버튼으로 light/dark 전환, `localStorage`에 저장되어 재방문 시 유지. `index.html` 인라인 스크립트로 첫 페인트 전에 테마를 적용해 깜빡임(FOUC) 방지. 기본 테마는 light
- **게임 상세 모달 + 스크린샷 갤러리** — 게임 카드 클릭/Enter 시 모달이 열리며, 스크린샷 갤러리(좌우 화살표·키보드 ←/→·썸네일), 설명, 장르, 플랫폼별 스토어 링크 표시. `Esc`·배경 클릭으로 닫힘, 포커스 트랩 및 닫을 때 포커스 복원
- **스크롤 등장 / 호버 모션** — `IntersectionObserver` 기반으로 섹션·카드가 부드럽게 등장하고, 카드·버튼·칩에 호버 모션 적용. `prefers-reduced-motion` 사용자에겐 애니메이션 비활성
- **실제 작동 문의 폼** — 이메일 서비스(Formspree) 전송을 지원하며, 엔드포인트 미설정 시 메일 앱(mailto)으로 폴백. 전송 중/성공/실패 상태 표시
- **모바일 햄버거 메뉴** — 좁은 화면에서 슬라이드 오버레이 메뉴 제공(메뉴 열림 시 본문 스크롤 잠금, `Esc`·배경 클릭으로 닫힘)
- **맨 위로 버튼** — 스크롤 시 우하단에 표시
- **반응형 레이아웃** — 모바일/태블릿/데스크톱 브레이크포인트 분리
- **SEO/공유 메타** — Open Graph·Twitter 카드, `theme-color` 메타 포함

## 프로젝트 구조

```text
.
├─ index.html            # 메타/OG 태그, FOUC 방지 테마 초기화 스크립트
├─ package.json
├─ package-lock.json
├─ tsconfig.json
├─ vite.config.ts
├─ public/
│  └─ assets/
│     └─ games/
│        ├─ gahee-logo.png
│        ├─ mage-secret.webp
│        ├─ tap-tap-builder.webp
│        ├─ abyss.webp
│        ├─ supreme-car-racing.webp
│        ├─ vulcan-wide.webp
│        └─ platform icons...
└─ src/
   ├─ main.tsx
   ├─ App.tsx            # 섹션 컴포넌트 + 테마/모달/모바일 메뉴/폼 로직
   ├─ content.ts         # 모든 텍스트·게임·회사 데이터
   ├─ config.ts          # 문의 폼 전송 설정 및 헬퍼
   ├─ useReveal.ts       # 스크롤 등장 애니메이션 훅
   └─ styles.css         # 디자인 토큰 + 다크 테마 + 컴포넌트 스타일
```

## 설계 방식

### `src/content.ts`

사이트의 텍스트, 게임 데이터, 플랫폼 아이콘, 회사 프로필, 파트너, 로드맵, 연락처 정보를 한 곳에 모았습니다.

- `ko`, `en` 키로 국문/영문 문구를 분리했습니다.
- `Game` 타입을 정의하고, 각 게임에 `slug`, 모달용 `screenshots?`(스크린샷 배열)·`detail?`(긴 설명) 필드를 추가했습니다. 미제공 시 대표 이미지·기본 설명으로 폴백합니다.
- 기존 사이트의 placeholder 카드도 `placeholder: true`로 유지했습니다(모달 비활성).
- 모달/폼/테마/메뉴용 UI 문구도 `copy`에 함께 관리합니다.

### `src/App.tsx`

페이지를 섹션 단위 컴포넌트로 나누어 구성하고, 상호작용 상태(테마, 모바일 메뉴, 선택된 게임)를 최상위에서 관리합니다.

- `Header`: 로고, 내비게이션, KO/EN 전환, 테마 토글, 햄버거 버튼
- `MobileNav`: 모바일 슬라이드 오버레이 메뉴
- `Hero`: 핵심 메시지와 실제 게임 이미지 쇼케이스
- `StatStrip`: 회사 소개서 기반 주요 수치
- `Publishing`: 퍼블리싱 역량과 프로세스
- `Games`: 서비스 타이틀과 예정 카드(클릭 시 상세 모달)
- `GameModal`: 스크린샷 갤러리 + 상세 정보 모달
- `Company`: 회사 소개, 기존 소개 문구, 파트너, 로드맵
- `Contact`: 퍼블리싱 문의 폼(비동기 전송)
- `Footer`: 회사 정보, 약관, 개인정보, SNS/스토어 링크
- `BackToTop`: 맨 위로 버튼

### `src/config.ts`

문의 폼 전송 설정과 헬퍼(`submitInquiry`)를 담았습니다.

- `FORM_ENDPOINT`가 설정되면 해당 엔드포인트로 전송(Formspree 방식), 비어 있으면 `mailto`로 폴백합니다.
- 수신 주소 등 폼 관련 설정을 한 곳에서 관리합니다.

### `src/useReveal.ts`

`.reveal` 클래스 요소를 `IntersectionObserver`로 관찰하다가 화면에 들어오면 `.in`을 붙여 CSS 전환을 트리거합니다. `prefers-reduced-motion`이거나 미지원 환경에서는 즉시 모두 표시합니다.

### `src/styles.css`

별도 UI 라이브러리 없이 CSS로 디자인 시스템을 구성했습니다.

- **시맨틱 디자인 토큰** 도입: `--bg`, `--surface`, `--text`, `--text-strong`, `--text-muted`, `--border`, `--accent` 등. 브랜드 4색을 베이스로 사용합니다.
- **다크 테마**: `[data-theme="dark"]`에서 토큰을 오버라이드(검정/레드 브랜드는 유지, 배경·표면·텍스트만 반전).
- 제목/본문에 `clamp()` 유동 타이포 스케일 적용.
- 카드/버튼/칩 호버 모션, 포커스 링, 스크롤 등장(`.reveal`), 모달·모바일 메뉴·맨 위로 버튼 스타일.
- 한글 줄바꿈을 위해 주요 제목에 `word-break: keep-all` 적용.
- 실제 게임 이미지가 안정적으로 보이도록 고정 aspect-ratio 사용.
- `prefers-reduced-motion` 대응 블록 포함.

### `public/assets/games`

실제 GAHEE 기존 사이트에서 사용 중인 게임 이미지를 프로젝트용 WebP로 정리했습니다.

- `Mage's Secret`, `Tap Tap Builder`, `Abyss`, `Supreme Car Racing`, `Vulcan - Blacksmith RPG`
- Google Play, App Store, One Store, Steam, Nintendo, PlayStation 아이콘

## 실행 방법

```bash
npm install
npm run dev
```

기본 개발 서버:

```text
http://127.0.0.1:5173/
```

> 포트가 사용 중이면 Vite가 자동으로 다른 포트(예: 5174)를 사용합니다.

## 빌드

```bash
npm run build
```

빌드 스크립트는 OneDrive 작업 경로에서 `dist` 삭제 충돌이 발생하지 않도록 `vite build --emptyOutDir false`를 사용합니다.

## 설정이 필요한 항목 (선택)

다음 두 가지는 비워둬도 동작하며, 채우면 기능이 강화됩니다.

1. **문의 폼 이메일 전송 (Formspree)**
   - [formspree.io](https://formspree.io) 가입 → 새 Form 생성(수신: `biz@gahee.net`)
   - 발급된 엔드포인트(예: `https://formspree.io/f/abcdwxyz`)를 `src/config.ts`의 `FORM_ENDPOINT`에 입력
   - 비어 있으면 자동으로 메일 앱(mailto)을 여는 방식으로 폴백합니다.

2. **게임 스크린샷 갤러리**
   - 이미지를 `public/assets/games/<slug>/`(예: `mages-secret/`)에 추가
   - `src/content.ts`의 해당 게임 `screenshots` 배열에 경로 등록
   - 등록 전까지는 대표 이미지 1장으로 표시됩니다.

## 콘텐츠 수정 가이드

- 문구 수정: `src/content.ts`
- 섹션 구조 수정: `src/App.tsx`
- 색상/레이아웃/테마 수정: `src/styles.css`
- 게임 이미지 교체: `public/assets/games`에 파일 추가 후 `src/content.ts`의 `image`/`screenshots` 경로 수정
- 문의 폼 전송 설정: `src/config.ts`

## 문의 폼 항목

퍼블리싱 문의 폼은 다음 항목을 받도록 설계했습니다.

- 이름
- 회사명
- 이메일
- 게임명
- 장르
- 플랫폼
- 출시 상태
- 게임 영상 링크
- 스토어 링크
- 소개 내용
