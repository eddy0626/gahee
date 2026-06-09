# 작업 이어가기 (HANDOFF)

> 다른 PC(회사)에서 이어서 작업할 때 참고. 새 Claude Code 세션이면 **이 파일을 먼저 읽고** 시작하세요.

## 프로젝트
- **GAHEE** 게임 퍼블리셔 마케팅 사이트 (백엔드 없는 정적 SPA)
- **스택**: React 19 + TypeScript(strict) + Vite 7 · CSS 토큰(프레임워크 없음) · 상태 라이브러리 없음
- **저장소**: `eddy0626/gahee` (GitHub), 작업 브랜치 `main`

## 현재 상태 (2026-06-09 기준)
- **시네마틱 에디토리얼 리디자인 완료**, `main`에 머지됨 (squash, 커밋 `5a6394d` 외).
  - JoyCity 기업사이트를 참고하되 **GAHEE 레드(#CB2957)** 유지.
  - 다크 시네마틱 ↔ 라이트 에디토리얼 **섹션 교차** 리듬.
  - 히어로: 레드 **네트워크-글로브 캔버스 애니메이션**(`src/HeroGlobe.tsx`) + 큰 디스플레이 타이포.
  - 게임: 풀블리드 커버아트 시네마틱 쇼케이스 + 상세 모달.
  - **폰트 = 맑은 고딕**(시스템 폰트, 외부 웹폰트 없음).
  - 한글 줄바꿈 `word-break: keep-all`, 회사소개·역량카드 등 **한/영(ko/en) 분리** 완료.
  - KO/EN 토글, 모달/모바일 메뉴 포커스 트랩, aria-live 폼, 스크롤 리빌, `prefers-reduced-motion` 유지.
- 이전 이력: `#2` 다크+레드 톤, `#3` 코드리뷰 수정(a11y/정확성/성능/SEO), `#4` 이번 리디자인.

## 실행 방법
```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # dist/ 생성 (minify=esbuild). 정적 배포용.
```

## 파일 구조 (어디를 고치나)
- `src/content.ts` — 모든 텍스트·게임·회사 데이터 (ko/en). 문구/데이터 수정은 여기.
- `src/App.tsx` — 섹션 컴포넌트(Nav, Hero, Stats, Games, Publishing, Company, Contact, Footer, GameModal) + 상태.
- `src/styles.css` — 디자인 시스템(CSS 토큰, 라이트/다크 섹션, 타이포, 모션). 색·레이아웃 수정은 여기.
- `src/HeroGlobe.tsx` — 히어로 캔버스 글로브.
- `src/config.ts` — 문의 폼 전송(Formspree + mailto 폴백).
- `src/useReveal.ts` — 스크롤 등장 훅.
- `index.html` — 메타/OG/canonical. `public/` — 게임 이미지, robots.txt, sitemap.xml.

## 배포
- **임시 미리보기**(상사 검토용): Netlify Drop → `https://charming-boba-ea2f44.netlify.app` (익명 배포라 **1시간·비밀번호 `My-Drop-Site`**, 곧 만료됨).
- **영구화 방법(택1)**: ① Netlify 무료 가입 후 그 사이트 Claim ② Netlify/Vercel에 GitHub 저장소 연결(push 시 자동 배포) ③ GitHub Pages(워크플로+`base:'/gahee/'` 설정 필요).

## 남은 작업 (다음 우선순위)
1. **배포 영구화** — 위 택1 (Netlify claim 또는 GitHub 연결).
2. **문의 폼 실제 전송** — `src/config.ts`의 `FORM_ENDPOINT`에 Formspree 엔드포인트 입력 (비어 있으면 mailto 폴백).
3. **게임 스크린샷 갤러리** — `public/assets/games/<slug>/`에 이미지 넣고 `content.ts`의 게임 `screenshots` 배열에 경로 등록.
4. (선택) 히어로 영문 슬로건 한국어화 검토 · `content.ts` 미사용 export 정리(`heroHighlights`/`markets`/`heroKicker`).

## ⚠️ 회사 PC에서 주의
- 이 PC(집)에만 있고 **회사 PC엔 없는 것**(gitignore라 repo에 없음): `.claude/`(로컬 설정), `CLAUDE.md`, `gaheeweb/`(옵시디언 볼트·스킬문서·작업기록), `data/`(agentmemory 로컬 DB).
- **회사 PC 준비물**: Git · Node.js(LTS) · Claude Code 설치 → `git clone https://github.com/eddy0626/gahee.git` → `npm install`.
- 이 대화의 컨텍스트는 안 넘어가니, 새 세션에서 **"HANDOFF.md 읽고 이어서 작업하자"**라고 시작하면 됩니다.
