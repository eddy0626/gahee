# 작업 이어가기 (HANDOFF)

> 다른 PC(회사)에서 이어서 작업할 때 참고. 새 Claude Code 세션이면 **이 파일을 먼저 읽고** 시작하세요.

## 프로젝트
- **GAHEE** 게임 퍼블리셔 마케팅 사이트 (백엔드 없는 정적 SPA)
- **스택**: React 19 + TypeScript(strict) + Vite 7 · CSS 토큰(프레임워크 없음) · 상태 라이브러리 없음
- **저장소**: `eddy0626/gahee` (GitHub), 작업 브랜치 `main`

## 현재 상태 (2026-07-03 기준)
- **6/29~7/3 작업 전부 `main` 병합 완료** (최신 PR #7). 아래가 현재 사이트.
- **다크 시네마틱 단일 톤** — 라이트 섹션 0개(Company까지 다크 전환). 섹션: Hero · Stats · Games(불칸) · Company · Contact + 고객센터(CS) 모달. nav: 회사·게임·문의·고객센터.
- **4개 언어** KO / EN / 繁中(대만) / RU. 언어 토글 4버튼, `<html lang>` 매핑(번체=`zh-Hant`), 번체 전용 **시스템 TC 폰트**. 문구/데이터는 `content.ts`의 `[locale]` 구조(`Locale`·`LocalizedText`).
- **법률 페이지** — 개인정보처리방침·이용약관(4개 언어), 사이트 내 풀스크린(`#privacy`/`#terms`, 푸터 링크). 전문은 **`src/legal.ts`로 분리 + 동적 import 지연로딩**(메인 JS 405→240KB). ⚠️ 약관 제11조~부칙은 표준약관 기반 **초안**, 번역은 참고용 → **배포 전 변호사·네이티브 검토 필수**.
- **불칸 CS 문의 폼**(사진 업로드 → Apps Script `docs/cs-apps-script.gs`). 백엔드 `CS_ENDPOINT` 연결은 대기(현재 "준비 중" 안내).
- **접근성**: 오버레이 열림 시 배경 `inert`(포커스 트랩+스크린리더 배경 숨김), 포커스 복원, aria-live 폼. **폰트=맑은 고딕**(번체만 시스템 TC), 외부 웹폰트 없음.
- **타입 안전**: strict + `noUnusedLocals`/`noUnusedParameters`/`noFallthroughCasesInSwitch`, `Platform` 유니온.
- **다음 작업은 `main` 기준 새 브랜치** 권장. (구 브랜치 `merge-company-publishing`는 병합됨 → 삭제 가능.)

## 이력: 2026-06-11 시네마틱 리디자인 (당시 기준, 이후 상당수 변경됨)
- **시네마틱 에디토리얼 리디자인 완료**, `main`에 머지됨 (squash, 커밋 `5a6394d` 외).
  - JoyCity 기업사이트를 참고하되 **GAHEE 레드(#CB2957)** 유지.
  - 다크 시네마틱 ↔ 라이트 에디토리얼 **섹션 교차** 리듬.
  - 히어로: 레드 **네트워크-글로브 캔버스 애니메이션**(`src/HeroGlobe.tsx`) + 큰 디스플레이 타이포.
  - 게임: 풀블리드 커버아트 시네마틱 쇼케이스 + 상세 모달.
  - **폰트 = 맑은 고딕**(시스템 폰트, 외부 웹폰트 없음).
  - 한글 줄바꿈 `word-break: keep-all`, 회사소개·역량카드 등 **한/영(ko/en) 분리** 완료.
  - KO/EN 토글, 모달/모바일 메뉴 포커스 트랩, aria-live 폼, 스크롤 리빌, `prefers-reduced-motion` 유지.
- 이전 이력: `#2` 다크+레드 톤, `#3` 코드리뷰 수정(a11y/정확성/성능/SEO), `#4` 이번 리디자인.
- **2026-06-11 정비**: og:image 절대 URL · 모달 플랫폼 배지를 **플랫폼별 링크**(`Game.links`)로 분리(URL 없는 스토어는 표시만) · reduced-motion 글로브 리사이즈 재렌더 · hero Scroll 힌트 키보드 포커스 제외 · 로드맵 라벨 `2022–/2025/NOW/BEYOND` · 드로어 닫힘 애니메이션 보존 · 필수 입력 `*` 표시 · 미사용 카피/CSS 정리 · 전 컴포넌트 한글 주석.

## 실행 방법
```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # dist/ 생성 (minify=esbuild). 정적 배포용.
```

## 파일 구조 (어디를 고치나)
- `src/content.ts` — 모든 텍스트·게임·회사 데이터 (**4개 언어 KO/EN/繁中/RU**). 문구/데이터 수정은 여기.
- `src/legal.ts` — 개인정보처리방침·이용약관 전문(4개 언어). 무거워서 **동적 import 로 지연로딩**.
- `src/App.tsx` — 섹션 컴포넌트(Nav, Drawer, Hero, Stats, Games, Company, Contact, Footer, GameModal, CSModal, LegalPage) + 상태.
- `src/styles.css` — 디자인 시스템(CSS 토큰, **다크 톤 통일**, 타이포, 모션). 색·레이아웃 수정은 여기.
- `src/HeroGlobe.tsx` — 히어로 캔버스 글로브.
- `src/config.ts` — 문의 폼 전송(Formspree + mailto 폴백) · CS 문의(Apps Script no-cors).
- `src/useReveal.ts` — 스크롤 등장 훅.
- `index.html` — 메타/OG/canonical. `public/` — 게임 이미지, robots.txt, sitemap.xml.

## 배포
- **임시 미리보기**(상사 검토용): Netlify Drop → `https://charming-boba-ea2f44.netlify.app` (익명 배포라 **1시간·비밀번호 `My-Drop-Site`**, 곧 만료됨).
- **영구화 방법(택1)**: ① Netlify 무료 가입 후 그 사이트 Claim ② Netlify/Vercel에 GitHub 저장소 연결(push 시 자동 배포) ③ GitHub Pages(워크플로+`base:'/gahee/'` 설정 필요).

## 남은 작업 (다음 우선순위)
1. **배포 영구화** — 위 택1 (Netlify claim 또는 GitHub 연결).
2. **문의 폼 실제 전송** — `src/config.ts`의 `FORM_ENDPOINT`에 Formspree 엔드포인트 입력 (비어 있으면 mailto 폴백).
3. **게임 스크린샷 갤러리** — `public/assets/games/<slug>/`에 이미지 넣고 `content.ts`의 게임 `screenshots` 배열에 경로 등록.
4. **게임별 스토어 URL** — App Store(슈프림)·Steam(불칸)·One Store(Abyss) 페이지 URL 확보 후 `content.ts` 각 게임 `links`에 추가 (현재는 링크 없는 배지로 표시).
5. (선택) 히어로 영문 슬로건 한국어화 검토.

## ⚠️ 회사 PC에서 주의
- 이 PC(집)에만 있고 **회사 PC엔 없는 것**(gitignore라 repo에 없음): `.claude/`(로컬 설정), `CLAUDE.md`, `gaheeweb/`(옵시디언 볼트·스킬문서·작업기록), `data/`(agentmemory 로컬 DB).
- **회사 PC 준비물**: Git · Node.js(LTS) · Claude Code 설치 → `git clone https://github.com/eddy0626/gahee.git` → `npm install`.
- 이 대화의 컨텍스트는 안 넘어가니, 새 세션에서 **"HANDOFF.md 읽고 이어서 작업하자"**라고 시작하면 됩니다.
