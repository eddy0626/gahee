# 작업 이어가기 (HANDOFF)

> 다른 PC(회사)에서 이어서 작업할 때 참고. 새 Claude Code 세션이면 **이 파일을 먼저 읽고** 시작하세요.

## 프로젝트
- **GAHEE** 게임 퍼블리셔 마케팅 사이트 (백엔드 없는 정적 SPA)
- **스택**: React 19 + TypeScript(strict) + Vite 7 · CSS 토큰(프레임워크 없음) · 상태 라이브러리 없음
- **저장소**: `eddy0626/gahee` (GitHub), 작업 브랜치 `main` (현재 `main` = `origin/main` = `cdbcd8d`)
- **🌐 라이브**: **https://www.gahee.net** (및 apex `gahee.net`) — Cloudflare Workers 배포, 커스텀 도메인 연결됨.

## 현재 상태 (2026-07-10 기준)
- **6/29~7/10 작업 전부 `main` 병합 완료** (최신 PR #15). 아래가 현재 사이트이며 **라이브에도 반영됨**.
- **🎨 라이트 Material You(MD3) 테마** — 2026-07-07 사장님 피드백("너무 어두컴컴") 반영해 **다크 시네마틱 → 밝은 MD3 라이트**로 전환(PR #12). 토널 서피스·채움형 입력·유기적 블러·상태 레이어·큰 라운드. `theme-color=#f7f5f1`. 시드색=GAHEE 레드(#CB2957) 유지, 폰트=맑은 고딕.
- **섹션**: Hero · Stats · Games · Company · Contact + 푸터. **nav = 회사·게임·문의 (3개)**. 고객센터(CS) 문의는 **불칸 게임 모달의 "고객센터 문의" 버튼**으로 진입(별도 nav 아님, `Game.support` 플래그 기반).
- **게임 라인업**:
  - **불칸(Vulcan)** — 유일한 라이브 타이틀. Google Play·App Store 배지 + 링크 유지, CS 문의 지원.
  - **과거 출시작 4종**(메이지스 시크릿·포켓시티빌더·Abyss·슈프림 카레이싱) — "출시 타이틀" 퍼블리싱 실적 포트폴리오로 노출(PR #13). **서비스 종료라 스토어 배지·링크 전부 없음**(`platforms: []`, PR #14). 카드·모달 모두 배지 미표시.
  - placeholder("준비 중") 2장은 데이터만 보존, 렌더 숨김.
  - 게임 필터 칩(전체/모바일 등)은 **카테고리가 여러 개일 때만** 표시(`cats.length>1`). 현재 실질 카테고리가 Mobile 하나라 **미표시**.
- **4개 언어** KO / EN / 繁中(대만) / RU. 언어 토글 4버튼, `<html lang>` 매핑(번체=`zh-Hant`), 번체 전용 **시스템 TC 폰트**. 문구/데이터는 `content.ts`의 `[locale]` 구조(`Locale`·`LocalizedText`), 로케일 콘텐츠 **명시 타입**으로 번역 누락을 컴파일 에러화(PR #11).
- **법률 페이지** — 개인정보처리방침·이용약관(4개 언어), 사이트 내 풀스크린(`#privacy`/`#terms`, 푸터 링크). 전문은 **`src/legal.ts`로 분리 + 동적 import 지연로딩**(메인 JS 244KB / legal 167KB 별도 청크). ⚠️ **약관 제11조~부칙은 표준약관 기반 초안, 번역은 참고용 → 이미 공개된 상태이므로 변호사·네이티브 검토 시급.**
- **문의 폼(2종) 백엔드 연결됨**:
  - **Contact 폼**(개발사·퍼블리셔) → Formspree(`config.ts` `FORM_ENDPOINT` = `formspree.io/f/mpqgokgv`) → biz@gahee.net. ⏳ **사용자: Formspree 활성화 메일 클릭 필요**(안 하면 수신 안 됨).
  - **불칸 CS 폼**(사진 업로드) → 회사계정 Google Apps Script(`config.ts` `CS_ENDPOINT`) → 구글 시트 + 드라이브(사진) + cs@gahee.net 알림. 엔드포인트 테스트 `{ok:true}` 확인 완료.
- **회사 정보**: 회사 프로필(Company 섹션)에서 **사업자번호 제거**(2026-07-10, PR #15). 단 **하단 푸터엔 `CRN 508-86-02578` 유지**(전자상거래법 표시 의무 가능성).
- **접근성**: 오버레이 열림 시 배경 `inert`(포커스 트랩+스크린리더 배경 숨김), 포커스 복원(공유 `useFocusTrap` 훅, PR #11), aria-live 폼. 외부 웹폰트 없음(번체만 시스템 TC).
- **타입 안전**: strict + `noUnusedLocals`/`noUnusedParameters`/`noFallthroughCasesInSwitch`, `Platform` 유니온.
- **다음 작업은 `main` 기준 새 브랜치 → PR → 병합** 권장(main 직접 푸시 지양). 세션 내 PR #14·#15는 `--rebase`로 선형 병합.

## 실행 방법
```bash
npm install
npm run dev      # http://127.0.0.1:5173
npm run build    # dist/ 생성 (tsc -b && vite build, minify=esbuild). 정적 배포용.
```

## 🚀 배포 (Cloudflare Workers) — 라이브·자동화 아님(CLI 수동)
- **라이브**: `www.gahee.net`·`gahee.net` — Cloudflare 워커 **`dawn-mouse-ab0a`**(계정 `gaheegame22@gmail.com`), Direct Upload 방식.
- **도메인**: 가비아 등록, 네임서버 Wix→Cloudflare 이전 완료(2026-07-08). 이메일(Daum MX/SPF) 보존됨.
- **⚠️ 도메인 갱신 만기: 2026-07-30** (가비아). 만기 시 사이트·이메일 정지 → **갱신 필요(시급)**.
- **재배포 레시피(코드 변경 라이브 반영)**:
  1. `npm run build`
  2. **사용자가** `! npx wrangler login` → 브라우저에서 Cloudflare `gaheegame22@gmail.com` 승인. (토큰은 로컬 저장, Claude가 안 봄.)
  3. **계정 확인**: `npx wrangler whoami`(= gaheegame22, account `fdc8a1a0…`). *다른 계정이면 새 워커 생기고 도메인 안 붙음 → 필수 체크.*
  4. `npx wrangler deploy` — repo 루트 **`wrangler.jsonc`**(untracked, `name=dawn-mouse-ab0a`·`assets=./dist`·SPA) 사용. name 일치라 새 워커 안 생기고 커스텀 도메인 유지.
  5. **QA**: `www.gahee.net`·`gahee.net` 200 + 배포본 CSS/JS **SHA256 = 로컬 `dist` 해시 일치** 확인(미니파이가 한글을 `\uXXXX` 이스케이프 → curl+grep 헛빔, 해시 대조/유니코드 디코드로 검증) + `dig MX gahee.net`(=aspmx.daum.net) 무손상.
- (선택) 자동배포(push-to-deploy): 현재 CLI 수동. 워커 Build에 Git 연결하면 자동화 가능.

## 파일 구조 (어디를 고치나)
- `src/content.ts` — 모든 텍스트·게임·회사·Stats·연락처 데이터 (**4개 언어 KO/EN/繁中/RU**). 문구/데이터 수정은 여기.
- `src/legal.ts` — 개인정보처리방침·이용약관 전문(4개 언어). 무거워서 **동적 import 로 지연로딩**.
- `src/App.tsx` — 앱 셸 + 섹션(Nav, Drawer, Hero, Stats, Games, Company, Contact, Footer) + 상태. (2026-07-06 분리)
- `src/modals.tsx` — 오버레이 3종(GameModal, CSModal, LegalPage). `src/icons.tsx` — 아이콘. `src/i18n.ts` — 로케일 헬퍼.
- `src/useFocusTrap.ts` — 오버레이 공용 포커스 트랩 훅. `src/useReveal.ts` — 스크롤 등장 훅.
- `src/styles.css` — 디자인 시스템(CSS 토큰, **라이트 MD3 톤**, 타이포, 모션). 색·레이아웃·줄간격 수정은 여기.
- `src/HeroGlobe.tsx` — 히어로 캔버스 글로브(rAF 최적화됨).
- `src/config.ts` — Contact 폼(Formspree + mailto 폴백) · CS 폼(Apps Script no-cors) 전송.
- `index.html` — 메타/OG/canonical(canonical=www 하드코딩)·`theme-color`. `public/` — 게임 이미지, robots.txt, sitemap.xml.
- `wrangler.jsonc` — Cloudflare 배포 설정(**repo에 포함됨**, 민감정보 없음). 로컬 캐시 `.wrangler/`·시크릿 `.dev.vars`만 gitignore.
- `docs/cs-apps-script.gs` — CS 폼 수신용 Apps Script 코드(회사계정에 붙여넣어 배포함).

## 남은 작업 (우선순위)
1. **⚠️ 도메인 갱신** — gahee.net 만기 **2026-07-30**. (사용자, 시급)
2. **⏳ Formspree 활성화** — 사용자가 활성화 메일 클릭해야 Contact 문의가 biz@gahee.net로 전달 시작. (사용자)
3. **⚖️ 법률 검토** — 이용약관 제11조~부칙 변호사 검토 + 번역본(EN/繁中/RU) 네이티브 검수. 이미 공개돼 있어 시급. (사용자/외부)
4. **CS 시트 정리** — Apps Script 테스트로 생긴 시트 행·드라이브 이미지 정리. (사용자)
5. (선택) **게임 스크린샷 갤러리** — `public/assets/games/<slug>/`에 WebP 넣고 `content.ts` 게임 `screenshots` 배열에 경로 등록.
6. (선택) **게임별 스토어 URL** — 불칸 외 게임은 서비스 종료라 링크 없음. 신작 출시 시 `content.ts` 게임 `links`·`platforms`에 추가.
7. (선택) 언어 선호 localStorage 저장 · apex→www 301 리다이렉트 · 자동배포 Git 연동 · 옛 Wix 사이트/플랜 정리 · 병합된 브랜치 정리.

## 이력 (참고, 현재는 상당수 대체됨)
- **2026-06-11 시네마틱 리디자인**(다크↔라이트 교차, 레드 네트워크-글로브, 풀블리드 게임 쇼케이스) — 이후 **2026-07-07 라이트 MD3 전환으로 톤 대체**. 글로브·게임 모달·포커스 트랩 등 구조는 계승.
- **2026-06/07 정비**: 회사+퍼블리싱 섹션 병합·축소, 다국어 4개 언어, 번체 폰트, 법률 페이지(4언어), 코드리뷰 Tier B/C(법률 코드스플릿·a11y·TS 엄격·App.tsx 분리·useFocusTrap·HeroGlobe 최적화), 폼 백엔드 연결, Cloudflare 배포+도메인, 출시 타이틀 포트폴리오, 스토어 배지 정리, 사업자번호(중간) 제거·줄간격 조정.
- 상세 이력·결정·재개 절차는 **옵시디언 볼트**(`~/Downloads/gaheewepsite/gaheewepsite/`)의 `진행 로그`·`할 일`·`결정 기록` 참고. (repo에 없는 지속 메모리)

## ⚠️ 회사 PC에서 주의
- 이 PC(집)에만 있고 **회사 PC엔 없는 것**(gitignore라 repo에 없음): `.claude/`(로컬 설정), `CLAUDE.md`, 옵시디언 볼트(작업기록·지식베이스), `dist/`(빌드 산출물), `.wrangler/`(로컬 캐시). *(`wrangler.jsonc` 배포 설정은 이제 repo에 포함되므로 clone 시 딸려옴.)*
- **회사 PC 준비물**: Git · Node.js(LTS) · Claude Code → `git clone https://github.com/eddy0626/gahee.git` → `npm install`. 배포하려면 `npx wrangler login`으로 Cloudflare `gaheegame22` 로그인만 하면 됨(`wrangler.jsonc`는 repo에 있음).
- 이 대화의 컨텍스트는 안 넘어가니, 새 세션에서 **"HANDOFF.md 읽고 이어서 작업하자"**로 시작하면 됩니다.
