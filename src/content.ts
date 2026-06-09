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
  platforms: string[];
  link?: string;
  description: LocalizedText;
  /** 모달용 긴 설명 (없으면 description 으로 폴백) */
  detail?: LocalizedText;
  /** 상세 모달 갤러리 이미지들 (없으면 image 1장으로 폴백)
   *  추가 방법: public/assets/games/<slug>/shot-01.webp … 에 넣고 경로 등록 */
  screenshots?: string[];
};

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

export const copy = {
  ko: {
    heroKicker: "한국 기반 글로벌 게임 퍼블리셔",
    heroTitle: "우리가 발견한 게임, 세계가 즐기는 게임으로.",
    heroText:
      "2022년부터 모바일·PC·콘솔 6개 플랫폼에서 게임을 서비스하며, 8곳 이상의 글로벌 스튜디오와 출시부터 라이브 운영까지 함께합니다.",
    primaryCta: "파트너십 문의",
    secondaryCta: "게임 라인업 보기",
    oldHero: "We focus on your unique game's success!",
    aboutTitle: "우리는 게임을 발견하고, 시장에 닿게 합니다.",
    aboutBody:
      "GAHEE는 한국에 기반을 둔 모바일, PC, 콘솔 게임 퍼블리셔입니다. 디자인, 로컬라이제이션, 마케팅, 출시까지 전 과정을 직접 운영하며 검증된 글로벌 개발사와 함께 한국과 아시아 시장에 게임을 선보입니다.",
    legacyAbout:
      "We aim to become a global game publisher, delivering games that everyone can enjoy.",
    partnershipTitle: "오래 함께 걸을 파트너를 찾습니다.",
    partnershipBody:
      "We are not looking for one or two games, We are looking for a partner to walk with us for a long time.",
    publishingTitle: "퍼블리싱의 모든 과정, 한 팀이 책임집니다.",
    publishingText:
      "상담과 게임 검토부터 계약·현지화·런칭, 출시 후 라이브 운영까지 — 퍼블리싱 6단계 전 과정을 한 팀이 직접 수행합니다.",
    gamesTitle: "서비스 중인 타이틀",
    gamesText: "모바일·PC·콘솔 6개 플랫폼에서 서비스하는 타이틀과 준비 중인 라인업을 한눈에 확인하세요.",
    gamesLegacy: "Enjoy the simple joys of life with our games!",
    companyTitle: "작지만 단단한 글로벌 퍼블리싱 팀",
    companyText:
      "2022년 설립 이후 모바일에서 PC, 콘솔까지 라인업을 확장하며 8개 이상의 글로벌 스튜디오와 협업하고 있습니다.",
    legacyIntroTitle: "기존 회사 소개",
    contactTitle: "좋은 게임을 가지고 계시다면, 우리에게 먼저 알려주세요.",
    contactText:
      "퍼블리싱, 사업 제휴, 채용 문의를 남겨주시면 담당자가 검토 후 연락드립니다.",
    submit: "문의 보내기",
    sending: "전송 중…",
    submitSuccess: "문의가 정상적으로 전송되었습니다. 담당자가 검토 후 연락드리겠습니다.",
    submitMailto: "메일 앱을 열었습니다. 작성된 내용을 확인 후 보내주세요. (또는 biz@gahee.net)",
    submitError: "전송에 실패했습니다. 잠시 후 다시 시도하거나 biz@gahee.net으로 보내주세요.",
    detailCta: "자세히 보기",
    themeToggle: "테마 전환",
    menuToggle: "메뉴 열기",
    closeLabel: "닫기",
    prevLabel: "이전 이미지",
    nextLabel: "다음 이미지",
    topLabel: "맨 위로",
  },
  en: {
    heroKicker: "Korea-based global game publisher",
    heroTitle: "From games we discover to games the world enjoys.",
    heroText:
      "Since 2022 we've shipped mobile, PC, and console titles across 6 platforms, working with 8+ global studios from launch through live operations.",
    primaryCta: "Partnership Inquiry",
    secondaryCta: "View Games",
    oldHero: "We focus on your unique game's success!",
    aboutTitle: "We discover games and bring them to market.",
    aboutBody:
      "GAHEE is a Korean game publisher operating the full publishing cycle, from design and localization to marketing, launch, and live operations with trusted global studios.",
    legacyAbout:
      "We aim to become a global game publisher, delivering games that everyone can enjoy.",
    partnershipTitle: "We look for long-term partners.",
    partnershipBody:
      "We are not looking for one or two games, We are looking for a partner to walk with us for a long time.",
    publishingTitle: "One team handles the full publishing journey.",
    publishingText:
      "From consultation and game review to contracts, localization, launch, and post-launch live ops — one team runs all six publishing stages.",
    gamesTitle: "Live titles",
    gamesText: "Explore our live titles across 6 platforms on mobile, PC, and console, plus the reserved lineup.",
    gamesLegacy: "Enjoy the simple joys of life with our games!",
    companyTitle: "A compact global publishing team",
    companyText:
      "Since 2022, GAHEE has expanded from mobile to PC and console while partnering with more than eight global studios.",
    legacyIntroTitle: "Original Introduction",
    contactTitle: "If you have a good game, tell us first.",
    contactText:
      "Send a publishing, business, or recruiting inquiry and our team will review it.",
    submit: "Send Inquiry",
    sending: "Sending…",
    submitSuccess: "Your inquiry has been sent. Our team will review it and get back to you.",
    submitMailto: "Your mail app is open. Please review the message and send it (or biz@gahee.net).",
    submitError: "Sending failed. Please try again later or email biz@gahee.net.",
    detailCta: "View details",
    themeToggle: "Toggle theme",
    menuToggle: "Open menu",
    closeLabel: "Close",
    prevLabel: "Previous image",
    nextLabel: "Next image",
    topLabel: "Back to top",
  },
};

export const legacyCompanyIntro = [
  "Gahee is embarking on its journey as a mobile game publisher, rapidly expanding into Southeast Asia, one of the world's fastest-growing gaming markets. By 2025, we aim to establish ourselves as a leading global publisher for mobile games.",
  "At Gahee, we excel in mobile game publishing with a proven track record of delivering outstanding results. Our team boasts extensive expertise in design, localization, translation, and comprehensive publishing. We are fully equipped to handle every aspect of the publishing process, ensuring a seamless and successful launch in new regions.",
  "We have partnered with numerous developers and publishers worldwide, helping them introduce their titles to Korea and other Asian markets effectively.",
];

export const stats = [
  { value: "4", label: { ko: "서비스 타이틀", en: "Titles Live" } },
  { value: "6", label: { ko: "장르 경험", en: "Genres" } },
  { value: "12+", label: { ko: "아시아 출시 시장", en: "Asia Markets" } },
  { value: "8+", label: { ko: "글로벌 파트너", en: "Global Studios" } },
];

// 히어로 신뢰 배지 — 실제 수치만 사용 (영상: 뻔한 말 대신 구체적 숫자)
export const heroHighlights: LocalizedText[] = [
  { ko: "since 2022", en: "Since 2022" },
  { ko: "글로벌 스튜디오 8곳+", en: "8+ global studios" },
  { ko: "모바일 · PC · 콘솔", en: "Mobile · PC · Console" },
];

export const capabilities = [
  {
    title: "Sourcing & Evaluation",
    body: {
      ko: "글로벌 개발사로부터 게임을 수급하고 시장성과 완성도를 검증합니다.",
      en: "We source titles from global studios and evaluate market fit and readiness.",
    },
  },
  {
    title: "Contract & Legal",
    body: {
      ko: "퍼블리싱 계약, NDA, 라이선스 협상까지 직접 진행합니다.",
      en: "We handle publishing contracts, NDAs, and licensing negotiations.",
    },
  },
  {
    title: "Localization",
    body: {
      ko: "한국어, 일본어, 동남아 다국어 번역과 문화권별 검수를 수행합니다.",
      en: "We localize into Korean, Japanese, and Southeast Asian languages with cultural review.",
    },
  },
  {
    title: "Build & QA",
    body: {
      ko: "심의 등급, 빌드 테스트, 결제 및 광고 SDK 통합을 지원합니다.",
      en: "We support ratings, build testing, payment, and ad SDK integration.",
    },
  },
  {
    title: "Marketing & Launch",
    body: {
      ko: "보도자료, 사전예약, CPI 캠페인, 라운지 운영을 실행합니다.",
      en: "We execute PR, pre-registration, CPI campaigns, and community launch operations.",
    },
  },
  {
    title: "Live Operations",
    body: {
      ko: "출시 이후 업데이트, 번역 추가, 이벤트, CS와 추가 마케팅을 운영합니다.",
      en: "We manage updates, added localization, events, CS, and post-launch marketing.",
    },
  },
];

export const process = [
  { ko: "상담", en: "Talk" },
  { ko: "게임 검토", en: "Review" },
  { ko: "계약", en: "Contract" },
  { ko: "현지화", en: "Localize" },
  { ko: "런칭", en: "Launch" },
  { ko: "라이브 운영", en: "Live Ops" },
];

export const markets = [
  "Korea",
  "Japan",
  "Taiwan",
  "Hong Kong",
  "Macao",
  "Singapore",
  "Philippines",
  "Malaysia",
  "Indonesia",
  "Thailand",
  "Vietnam",
  "Laos",
  "Cambodia",
];

export const platformIcons: Record<string, string> = {
  "Google Play": "/assets/games/google-play.webp",
  "App Store": "/assets/games/app-store.webp",
  "One Store": "/assets/games/one-store.webp",
  Steam: "/assets/games/steam.webp",
  Nintendo: "/assets/games/nintendo.webp",
  PlayStation: "/assets/games/playstation.webp",
};

export const games: Game[] = [
  {
    slug: "mages-secret",
    title: "Mage's Secret",
    titleKo: "메이지스 시크릿",
    genre: "Casual Merge Puzzle",
    image: "/assets/games/mage-secret.webp",
    icon: "/assets/games/mage-icon.webp",
    featured: true,
    platforms: ["Google Play"],
    link: "https://play.google.com/store/apps/details?id=com.gahee.magesecret",
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
    platforms: ["Google Play"],
    link: "https://play.google.com/store/apps/details?id=com.gahee.taptap",
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
    platforms: ["Google Play", "One Store"],
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
    platforms: ["Google Play", "App Store"],
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
    platforms: ["Google Play", "Steam"],
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
    platforms: ["Steam"],
    description: {
      ko: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      en: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
  },
];

export const companyProfile = [
  { label: { ko: "회사명", en: "Company" }, value: "GAHEE., LTD" },
  { label: { ko: "설립일", en: "Founded" }, value: "2022. 10. 31" },
  { label: { ko: "대표이사", en: "CEO" }, value: "Hyunwoo Koo" },
  { label: { ko: "사업분야", en: "Business" }, value: "Mobile · PC · Console Publishing" },
  { label: { ko: "본사", en: "HQ" }, value: "Gwangjin-gu, Seoul" },
  { label: { ko: "사업자번호", en: "CRN" }, value: "508-86-02578" },
];

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

export const roadmap = [
  { label: "NOW", text: { ko: "Google Play 중심의 모바일 출시와 운영", en: "Mobile launch and operations led by Google Play" } },
  { label: "2025", text: { ko: "PC, Steam 라인업 확장", en: "PC and Steam lineup expansion" } },
  { label: "2026", text: { ko: "PlayStation, Nintendo Switch 라이선스 진행", en: "PlayStation and Nintendo Switch licensing" } },
  { label: "BEYOND", text: { ko: "자체 IP 글로벌 퍼블리싱", en: "Original IP global publishing" } },
];

export const contact = {
  business: "biz@gahee.net",
  support: "cs@gahee.net",
  address: "Gingorang-ro 14-gil, Gwangjin-gu, Seoul, Republic of Korea ZIP: 04918",
  web: "www.gahee.net",
  terms: "https://www.gahee.net/termsofservice",
  privacy: "https://www.gahee.net/privacypolicy",
  facebook: "https://www.facebook.com/profile.php?id=61569302554927",
  play: "https://play.google.com/store/apps/dev?id=5871699805522095691",
};
