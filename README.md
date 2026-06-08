# GAHEE Website Redesign

GAHEE 공식 웹사이트 리뉴얼 프로젝트입니다. 퍼블리싱 파트너 유치와 게임 라인업 소개를 중심으로, 기존 사이트 콘텐츠와 회사 소개서의 핵심 메시지를 React + Vite 기반 단일 페이지 사이트로 재구성했습니다.

## 목표

- 퍼블리싱 파트너가 GAHEE의 역량을 빠르게 이해할 수 있는 구조
- 실제 서비스 중인 GAHEE 게임 이미지를 활용한 게임 포트폴리오
- 국문/영문 전환을 지원하는 콘텐츠 구조
- 기존 사이트의 회사 정보, 게임 설명, 문의 정보, 약관/개인정보 링크 유지
- `#000000`, `#CB2957`, `#DDDDDD`, `#EEEEEE` 기반의 밝고 캐주얼한 GAHEE 브랜드 톤

## 프로젝트 구조

```text
.
├─ index.html
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
   ├─ App.tsx
   ├─ content.ts
   └─ styles.css
```

## 설계 방식

### `src/content.ts`

사이트의 텍스트, 게임 데이터, 플랫폼 아이콘, 회사 프로필, 파트너, 로드맵, 연락처 정보를 한 곳에 모았습니다.

- `ko`, `en` 키로 국문/영문 문구를 분리했습니다.
- 게임 카드 데이터는 이미지, 장르, 플랫폼, 스토어 링크, 설명을 포함합니다.
- 기존 사이트의 placeholder 카드도 `placeholder: true`로 유지했습니다.
- 향후 게임 추가 시 `games` 배열에 항목을 추가하면 화면에 자동 반영됩니다.

### `src/App.tsx`

페이지를 섹션 단위 컴포넌트로 나누어 구성했습니다.

- `Header`: 로고, 내비게이션, KO/EN 전환
- `Hero`: 핵심 메시지와 실제 게임 이미지 쇼케이스
- `StatStrip`: 회사 소개서 기반 주요 수치
- `Publishing`: 퍼블리싱 역량과 프로세스
- `Games`: 서비스 타이틀과 예정 카드
- `Company`: 회사 소개, 기존 소개 문구, 파트너, 로드맵
- `Contact`: 퍼블리싱 문의 폼
- `Footer`: 회사 정보, 약관, 개인정보, SNS/스토어 링크

### `src/styles.css`

별도 UI 라이브러리 없이 CSS로 디자인 시스템을 구성했습니다.

- 컬러 토큰: black, accent, line, paper, white
- 카드 반경은 8px 이하로 제한
- 모바일/태블릿/데스크톱 브레이크포인트 분리
- 한글 줄바꿈을 위해 주요 제목에 `word-break: keep-all` 적용
- 실제 게임 이미지가 안정적으로 보이도록 고정 aspect-ratio 사용

### `public/assets/games`

실제 GAHEE 기존 사이트에서 사용 중인 게임 이미지를 프로젝트용 WebP로 정리했습니다.

- `Mage's Secret`
- `Tap Tap Builder`
- `Abyss`
- `Supreme Car Racing`
- `Vulcan - Blacksmith RPG`
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

## 빌드

```bash
npm run build
```

빌드 스크립트는 OneDrive 작업 경로에서 `dist` 삭제 충돌이 발생하지 않도록 `vite build --emptyOutDir false`를 사용합니다.

## 콘텐츠 수정 가이드

- 문구 수정: `src/content.ts`
- 섹션 구조 수정: `src/App.tsx`
- 색상/레이아웃 수정: `src/styles.css`
- 게임 이미지 교체: `public/assets/games`에 파일 추가 후 `src/content.ts`의 `image` 경로 수정

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
