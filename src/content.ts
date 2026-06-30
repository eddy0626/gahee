/* ============================================================
   GAHEE 사이트 콘텐츠 — 모든 문구·게임·회사 데이터의 단일 출처
   문구 수정은 이 파일에서. 다국어 문자열은 ko/en 쌍으로 항상 함께 관리한다.
   ============================================================ */

export type Locale = "ko" | "en";

export type LocalizedText = { ko: string; en: string };

export type Game = {
  /** 슬러그: 스크린샷 폴더명/React key 로 사용 (public/assets/games/<slug>/) */
  slug: string;
  title: string;
  titleKo: string;
  genre: string;
  image?: string;
  icon?: string;
  featured?: boolean;
  placeholder?: boolean;
  /** 출시 상태 — 데이터 모델용. 현재 화면 배지는 미표시(전부 released)이며,
   *  향후 실제 Coming Soon 타이틀이 생기면 배지 렌더를 켠다. 미지정=released 취급. */
  status?: "released" | "coming-soon";
  platforms: string[];
  /** 플랫폼별 스토어 링크 — 키는 platforms 의 항목명과 동일해야 한다.
   *  URL 이 없는 플랫폼은 모달에서 링크 없는 배지로만 표시된다. */
  links?: Partial<Record<string, string>>;
  description: LocalizedText;
  /** 모달용 긴 설명 (없으면 description 으로 폴백) */
  detail?: LocalizedText;
  /** 상세 모달 갤러리 이미지들 (없으면 image 1장으로 폴백)
   *  추가 방법: public/assets/games/<slug>/shot-01.webp … 에 넣고 경로 등록 */
  screenshots?: string[];
};

/** 상단 내비게이션 메뉴 (섹션 앵커 이동) */
export const nav = {
  ko: [
    { label: "회사", href: "#company" },
    { label: "퍼블리싱", href: "#publishing" },
    { label: "게임", href: "#games" },
    { label: "문의", href: "#contact" },
  ],
  en: [
    { label: "Company", href: "#company" },
    { label: "Publishing", href: "#publishing" },
    { label: "Games", href: "#games" },
    { label: "Contact", href: "#contact" },
  ],
};

/** UI 공통 카피 — ko/en 의 키 구조는 항상 동일하게 유지한다 (불일치 시 컴파일 에러). */
export const copy = {
  ko: {
    heroText:
      "2022년부터 모바일·PC·콘솔 6개 플랫폼에서 게임을 서비스하며, 8곳 이상의 글로벌 스튜디오와 출시부터 라이브 운영까지 함께합니다.",
    eyebrow: {
      games: "Games — 게임 라인업",
      company: "Company — 회사 소개",
      publishing: "Publishing — 퍼블리싱",
      contact: "Contact — 문의",
    },
    primaryCta: "파트너십 문의",
    secondaryCta: "게임 라인업 보기",
    navCta: "문의하기",
    drawerCta: "파트너십 문의",
    aboutTitle: "우리는 게임을 발견하고, 시장에 닿게 합니다.",
    aboutBody:
      "GAHEE는 한국에 기반을 둔 모바일·PC·콘솔 게임 퍼블리셔입니다. 2022년부터 검증된 글로벌 개발사의 게임을 한국과 아시아 시장에 선보여 왔습니다.",
    partnershipTitle: "오래 함께 걸을 파트너를 찾습니다.",
    roadmapTitle: "다음에 갈 곳",
    publishingTitle: "퍼블리싱의 모든 과정, 한 팀이 책임집니다.",
    publishingText:
      "상담과 게임 검토부터 계약·현지화·런칭, 출시 후 라이브 운영까지 — 퍼블리싱 6단계 전 과정을 한 팀이 직접 수행합니다.",
    gamesTitle: "서비스 중인 타이틀",
    gamesText: "모바일·PC·콘솔 6개 플랫폼에서 서비스하는 타이틀과 준비 중인 라인업을 한눈에 확인하세요.",
    contactTitle: "좋은 게임을 가지고 계시다면, 우리에게 먼저 알려주세요.",
    contactText:
      "퍼블리싱, 사업 제휴, 채용 문의를 남겨주시면 담당자가 검토 후 연락드립니다.",
    submit: "문의 보내기",
    sending: "전송 중…",
    submitSuccess: "문의가 정상적으로 전송되었습니다. 담당자가 검토 후 연락드리겠습니다.",
    submitMailto: "메일 앱을 열었습니다. 작성된 내용을 확인 후 보내주세요. (또는 biz@gahee.net)",
    submitError: "전송에 실패했습니다. 잠시 후 다시 시도하거나 biz@gahee.net으로 보내주세요.",
    detailCta: "자세히 보기",
    menuToggle: "메뉴 열기",
    closeLabel: "닫기",
    prevLabel: "이전 이미지",
    nextLabel: "다음 이미지",
    topLabel: "맨 위로",
    comingSoon: "준비 중",
    imageLabel: "이미지",
    storeLabel: "게임 스토어",
    fieldLabels: {
      name: "이름",
      company: "회사명",
      email: "이메일",
      game: "게임명",
      genre: "장르",
      platform: "플랫폼",
      status: "출시 상태",
      video: "게임 영상 링크",
      store: "스토어 링크",
      message: "소개 내용",
    },
  },
  en: {
    heroText:
      "Since 2022 we've shipped mobile, PC, and console titles across 6 platforms, working with 8+ global studios from launch through live operations.",
    eyebrow: {
      games: "Games",
      company: "Company",
      publishing: "Publishing",
      contact: "Contact",
    },
    primaryCta: "Partnership Inquiry",
    secondaryCta: "View Games",
    navCta: "Contact",
    drawerCta: "Partnership Inquiry",
    aboutTitle: "We discover games and bring them to market.",
    aboutBody:
      "GAHEE is a Korea-based mobile, PC, and console game publisher. Since 2022 we've brought titles from trusted global studios to Korea and the wider Asian market.",
    partnershipTitle: "We look for long-term partners.",
    roadmapTitle: "Where we go next",
    publishingTitle: "One team handles the full publishing journey.",
    publishingText:
      "From consultation and game review to contracts, localization, launch, and post-launch live ops — one team runs all six publishing stages.",
    gamesTitle: "Live titles",
    gamesText: "Explore our live titles across 6 platforms on mobile, PC, and console, plus the reserved lineup.",
    contactTitle: "If you have a good game, tell us first.",
    contactText:
      "Send a publishing, business, or recruiting inquiry and our team will review it.",
    submit: "Send Inquiry",
    sending: "Sending…",
    submitSuccess: "Your inquiry has been sent. Our team will review it and get back to you.",
    submitMailto: "Your mail app is open. Please review the message and send it (or biz@gahee.net).",
    submitError: "Sending failed. Please try again later or email biz@gahee.net.",
    detailCta: "View details",
    menuToggle: "Open menu",
    closeLabel: "Close",
    prevLabel: "Previous image",
    nextLabel: "Next image",
    topLabel: "Back to top",
    comingSoon: "Coming Soon",
    imageLabel: "Image",
    storeLabel: "Game Store",
    fieldLabels: {
      name: "Name",
      company: "Company",
      email: "Email",
      game: "Game Title",
      genre: "Genre",
      platform: "Platform",
      status: "Release Status",
      video: "Gameplay Video Link",
      store: "Store Link",
      message: "Introduction",
    },
  },
};

/** 핵심 수치 (Stats 섹션) — 실제 수치만 쓴다.
 *  13개 시장 근거: 한국·일본·대만·홍콩·마카오·싱가포르·필리핀·말레이시아·인도네시아·태국·베트남·라오스·캄보디아 */
export const stats = [
  { value: "5", label: { ko: "서비스 타이틀", en: "Titles Live" } },
  { value: "5", label: { ko: "장르 경험", en: "Genres" } },
  { value: "13", label: { ko: "아시아 출시 시장", en: "Asia Markets" } },
  { value: "8+", label: { ko: "글로벌 파트너", en: "Global Studios" } },
];

export const process = [
  { ko: "상담", en: "Talk" },
  { ko: "게임 검토", en: "Review" },
  { ko: "계약", en: "Contract" },
  { ko: "현지화", en: "Localize" },
  { ko: "런칭", en: "Launch" },
  { ko: "라이브 운영", en: "Live Ops" },
];

/** 플랫폼명 → 스토어 아이콘 경로 (게임 모달의 플랫폼 배지에 사용) */
export const platformIcons: Record<string, string> = {
  "Google Play": "/assets/games/google-play.webp",
  "App Store": "/assets/games/app-store.webp",
  "One Store": "/assets/games/one-store.webp",
  Steam: "/assets/games/steam.webp",
  Nintendo: "/assets/games/nintendo.webp",
  PlayStation: "/assets/games/playstation.webp",
};

/** 플랫폼 → 상위 카테고리 (Games 필터 칩의 분류축). 새 플랫폼 추가 시 여기에 매핑한다. */
export type GameCategory = "Mobile" | "PC" | "Console";
export const platformCategory: Record<string, GameCategory> = {
  "Google Play": "Mobile",
  "App Store": "Mobile",
  "One Store": "Mobile",
  Steam: "PC",
  Nintendo: "Console",
  PlayStation: "Console",
};

/** Games 필터 칩 라벨 (ko/en). 칩 자체는 실제 게임이 있는 카테고리만 동적으로 노출된다. */
export const gameFilters: Record<Locale, Record<"all" | GameCategory, string>> = {
  ko: { all: "전체", Mobile: "모바일", PC: "PC", Console: "콘솔" },
  en: { all: "All", Mobile: "Mobile", PC: "PC", Console: "Console" },
};

/** GAHEE 공식 Google Play 개발자 페이지 —
 *  게임별 스토어 페이지 URL 을 확보하기 전까지 Google Play 배지의 대체 링크로 쓴다. */
const GAHEE_PLAY_DEV_PAGE = "https://play.google.com/store/apps/dev?id=5871699805522095691";

/** 게임 라인업 — featured 1종이 쇼케이스 큰 카드, placeholder 는 "준비 중" 카드 */
export const games: Game[] = [
  {
    slug: "mages-secret",
    title: "Mage's Secret",
    titleKo: "메이지스 시크릿",
    genre: "Casual Merge Puzzle",
    image: "/assets/games/mage-secret.webp",
    icon: "/assets/games/mage-icon.webp",
    featured: true,
    status: "released",
    platforms: ["Google Play"],
    links: { "Google Play": "https://play.google.com/store/apps/details?id=com.gahee.magesecret" },
    description: {
      ko: "오랜 시간 즐길 수 있는 모험 속에서 몬스터와 맞서고, 신비한 마법사의 100개 이상 과제를 해결하며 그의 비밀에 다가갑니다.",
      en: "In your adventure, which will keep you busy for many months of playing, you will have to face monsters, complete more than 100 tasks of the mysterious magician, and try to know his main secret.",
    },
  },
  {
    slug: "tap-tap-builder",
    title: "Tap Tap Builder",
    titleKo: "포켓시티빌더",
    genre: "Simulation",
    image: "/assets/games/tap-tap-builder.webp",
    icon: "/assets/games/tap-icon.webp",
    status: "released",
    platforms: ["Google Play"],
    links: { "Google Play": "https://play.google.com/store/apps/details?id=com.gahee.taptap" },
    description: {
      ko: "꿈꾸던 도시를 만들고 시장이 되어 보세요. 건설, 수익, 위기 대응까지 탭 한 번으로 도시를 성장시킵니다.",
      en: "Tap Tap Builder invites you to build the city of your dreams and become its mayor. Build, earn, and save your people with a tap.",
    },
  },
  {
    slug: "abyss",
    title: "Abyss",
    titleKo: "Abyss",
    genre: "MMORPG",
    image: "/assets/games/abyss.webp",
    icon: "/assets/games/abyss-icon.webp",
    status: "released",
    platforms: ["Google Play", "One Store"],
    // One Store 개별 페이지 URL 미확보 — 해당 배지는 링크 없이 표시된다
    links: { "Google Play": GAHEE_PLAY_DEV_PAGE },
    description: {
      ko: "빠른 성장, 치열한 경쟁, 던전 보스 공략을 위한 수동 조작의 재미를 담은 신개념 MMORPG입니다.",
      en: "A new-concept MMORPG that captures rapid growth, intense competition, and manual control for conquering dungeon bosses.",
    },
  },
  {
    slug: "supreme-car-racing",
    title: "Supreme Car Racing",
    titleKo: "슈프림 카레이싱",
    genre: "Racing",
    image: "/assets/games/supreme-car-racing.webp",
    icon: "/assets/games/racing-icon.webp",
    status: "released",
    platforms: ["Google Play", "App Store"],
    // App Store 개별 페이지 URL 미확보 — 해당 배지는 링크 없이 표시된다
    links: { "Google Play": GAHEE_PLAY_DEV_PAGE },
    description: {
      ko: "현실적인 고품질 3D 그래픽과 경계 없는 드라이빙 경험을 제공하는 슈퍼카 레이싱 어드벤처입니다.",
      en: "The real supercar racing adventure begins with realistic driving, high-end 3D graphics, and open-world missions.",
    },
  },
  {
    slug: "vulcan",
    title: "Vulcan - Blacksmith RPG",
    titleKo: "불칸",
    genre: "Idle RPG",
    image: "/assets/games/vulcan-wide.webp",
    icon: "/assets/games/vulcan-icon.webp",
    status: "released",
    platforms: ["Google Play", "Steam"],
    // Steam 개별 페이지 URL 미확보 — 해당 배지는 링크 없이 표시된다
    links: { "Google Play": GAHEE_PLAY_DEV_PAGE },
    description: {
      ko: "평화로운 제국에 대장장이 신 불칸의 후손을 찾는 소식이 전해집니다. 후손이 되어 최고의 대장장이가 되어 보세요.",
      en: "In a peaceful empire, news arrives that a descendant of Vulcan, the god of blacksmiths, is being sought. Become the greatest blacksmith.",
    },
  },
  {
    slug: "coming-soon-1",
    title: "Title",
    titleKo: "Title",
    genre: "genre",
    placeholder: true,
    status: "coming-soon",
    platforms: ["Nintendo", "PlayStation"],
    description: {
      ko: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      en: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  },
  {
    slug: "coming-soon-2",
    title: "Title",
    titleKo: "Title",
    genre: "genre",
    placeholder: true,
    status: "coming-soon",
    platforms: ["Steam"],
    description: {
      ko: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      en: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
  },
];

/** 회사 프로필 표 (Company 섹션 우측) */
export const companyProfile = [
  { label: { ko: "회사명", en: "Company" }, value: "GAHEE., LTD" },
  { label: { ko: "설립일", en: "Founded" }, value: "2022. 10. 31" },
  { label: { ko: "대표이사", en: "CEO" }, value: "Hyunwoo Koo" },
  { label: { ko: "사업분야", en: "Business" }, value: "Mobile · PC · Console Publishing" },
  { label: { ko: "본사", en: "HQ" }, value: "Gwangjin-gu, Seoul" },
  { label: { ko: "사업자번호", en: "CRN" }, value: "508-86-02578" },
];

/** 협업 파트너/스튜디오 명단 */
export const partners = [
  "Geeky House",
  "Herocraft",
  "Ropstam",
  "Asobuild",
  "PlayMeow",
  "happytuk",
  "com2usplatform",
  "Bonuswinner",
];

/** 로드맵 — 지난 마일스톤(연도) → 현재(NOW) → 다음(BEYOND) 순.
 *  항목이 완료되면 NOW 를 다음 항목으로 옮기고, 완료된 항목엔 연도 라벨을 붙인다. */
export const roadmap = [
  { label: "2022–", text: { ko: "Google Play 중심의 모바일 출시와 운영", en: "Mobile launch and operations led by Google Play" } },
  { label: "2025", text: { ko: "PC, Steam 라인업 확장", en: "PC and Steam lineup expansion" } },
  { label: "NOW", text: { ko: "PlayStation, Nintendo Switch 라이선스 진행", en: "PlayStation and Nintendo Switch licensing" } },
  { label: "BEYOND", text: { ko: "자체 IP 글로벌 퍼블리싱", en: "Original IP global publishing" } },
];

/** 연락처·외부 링크 — play 는 GAHEE 공식 Google Play 개발자 페이지 */
export const contact = {
  business: "biz@gahee.net",
  support: "cs@gahee.net",
  address: "Gingorang-ro 14-gil, Gwangjin-gu, Seoul, Republic of Korea ZIP: 04918",
  web: "www.gahee.net",
  terms: "https://www.gahee.net/termsofservice",
  privacy: "https://www.gahee.net/privacypolicy",
  facebook: "https://www.facebook.com/profile.php?id=61569302554927",
  play: GAHEE_PLAY_DEV_PAGE,
};
