/* ============================================================
   GAHEE 사이트 콘텐츠 — 모든 문구·게임·회사 데이터의 단일 출처
   문구 수정은 이 파일에서. 다국어 문자열은 ko/en 쌍으로 항상 함께 관리한다.
   ============================================================ */

export type Locale = "ko" | "en" | "zh" | "ru";

export type LocalizedText = { ko: string; en: string; zh: string; ru: string };

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
    { label: "게임", href: "#games" },
    { label: "문의", href: "#contact" },
  ],
  en: [
    { label: "Company", href: "#company" },
    { label: "Games", href: "#games" },
    { label: "Contact", href: "#contact" },
  ],
  zh: [
    { label: "公司", href: "#company" },
    { label: "遊戲", href: "#games" },
    { label: "聯絡", href: "#contact" },
  ],
  ru: [
    { label: "Компания", href: "#company" },
    { label: "Игры", href: "#games" },
    { label: "Контакты", href: "#contact" },
  ],
};

/** UI 공통 카피 — ko/en 의 키 구조는 항상 동일하게 유지한다 (불일치 시 컴파일 에러). */
export const copy = {
  ko: {
    heroText:
      "모바일·PC·콘솔, 8개+ 글로벌 스튜디오와 함께. 좋은 게임을 한국과 아시아 13개 시장으로 잇습니다.",
    heroEyebrow: "한국·아시아 퍼블리싱 게이트웨이 · Since 2022",
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
      "Mobile, PC, and console — partnered with 8+ global studios. We bring great games to Korea and 13 Asian markets.",
    heroEyebrow: "Your Gateway to Korea & Asia · Since 2022",
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
  zh: {
    heroText:
      "行動裝置・PC・主機，攜手 8+ 家全球工作室。將優質遊戲帶進韓國與亞洲 13 個市場。",
    heroEyebrow: "通往韓國與亞洲的發行門戶 · Since 2022",
    eyebrow: {
      games: "遊戲",
      company: "公司",
      publishing: "發行",
      contact: "聯絡",
    },
    primaryCta: "洽談合作",
    secondaryCta: "查看遊戲",
    navCta: "聯絡我們",
    drawerCta: "洽談合作",
    aboutTitle: "我們發掘遊戲，並讓它抵達市場。",
    aboutBody:
      "GAHEE 是一家總部位於韓國的行動、PC 與主機遊戲發行商。自 2022 年起，我們將值得信賴的全球工作室作品帶進韓國與更廣闊的亞洲市場。",
    partnershipTitle: "我們尋找能長期同行的夥伴。",
    roadmapTitle: "下一步",
    publishingTitle: "發行的每一個環節，由同一支團隊負責。",
    publishingText:
      "從洽談、遊戲評估到簽約、在地化、上線與上線後的營運——發行的六個階段全由同一支團隊親自執行。",
    gamesTitle: "營運中的作品",
    gamesText: "一覽我們在行動、PC 與主機共 6 個平台上營運的作品，以及籌備中的陣容。",
    contactTitle: "如果您手上有好遊戲，請先告訴我們。",
    contactText:
      "無論是發行、商務合作或徵才需求，留言給我們，專人審閱後將與您聯繫。",
    submit: "送出諮詢",
    sending: "傳送中…",
    submitSuccess: "您的諮詢已送出，我們將於審閱後與您聯繫。",
    submitMailto: "已開啟郵件程式，請確認內容後寄出。（或寄至 biz@gahee.net）",
    submitError: "傳送失敗，請稍後再試，或寄信至 biz@gahee.net。",
    detailCta: "查看詳情",
    menuToggle: "開啟選單",
    closeLabel: "關閉",
    prevLabel: "上一張",
    nextLabel: "下一張",
    topLabel: "回到頂部",
    comingSoon: "即將推出",
    imageLabel: "圖片",
    storeLabel: "遊戲商店",
    fieldLabels: {
      name: "姓名",
      company: "公司名稱",
      email: "電子郵件",
      game: "遊戲名稱",
      genre: "類型",
      platform: "平台",
      status: "上線狀態",
      video: "遊戲影片連結",
      store: "商店連結",
      message: "介紹內容",
    },
  },
  ru: {
    heroText:
      "Мобильные, PC и консоли — вместе с 8+ мировыми студиями. Мы приводим хорошие игры на рынок Кореи и 13 рынков Азии.",
    heroEyebrow: "Ваш путь в Корею и Азию · Since 2022",
    eyebrow: {
      games: "Игры",
      company: "Компания",
      publishing: "Издательство",
      contact: "Контакты",
    },
    primaryCta: "Запрос о партнёрстве",
    secondaryCta: "Смотреть игры",
    navCta: "Связаться",
    drawerCta: "Запрос о партнёрстве",
    aboutTitle: "Мы находим игры и выводим их на рынок.",
    aboutBody:
      "GAHEE — издатель мобильных, PC- и консольных игр со штаб-квартирой в Корее. С 2022 года мы выводим проекты проверенных мировых студий на рынок Кореи и всей Азии.",
    partnershipTitle: "Мы ищем партнёров надолго.",
    roadmapTitle: "Куда мы движемся дальше",
    publishingTitle: "Весь путь издания ведёт одна команда.",
    publishingText:
      "От консультаций и оценки игры до контрактов, локализации, запуска и последующего сопровождения — все шесть этапов издания ведёт одна команда.",
    gamesTitle: "Игры в сервисе",
    gamesText: "Наши игры на 6 платформах — мобильных, PC и консолях, а также готовящиеся проекты.",
    contactTitle: "Есть хорошая игра? Расскажите нам первыми.",
    contactText:
      "Оставьте запрос по изданию, бизнесу или вакансиям — наша команда рассмотрит его и свяжется с вами.",
    submit: "Отправить запрос",
    sending: "Отправка…",
    submitSuccess: "Ваш запрос отправлен. Мы рассмотрим его и свяжемся с вами.",
    submitMailto: "Открыто почтовое приложение. Проверьте письмо и отправьте его (или на biz@gahee.net).",
    submitError: "Не удалось отправить. Повторите позже или напишите на biz@gahee.net.",
    detailCta: "Подробнее",
    menuToggle: "Открыть меню",
    closeLabel: "Закрыть",
    prevLabel: "Предыдущее изображение",
    nextLabel: "Следующее изображение",
    topLabel: "Наверх",
    comingSoon: "Скоро",
    imageLabel: "Изображение",
    storeLabel: "Магазин игр",
    fieldLabels: {
      name: "Имя",
      company: "Компания",
      email: "Эл. почта",
      game: "Название игры",
      genre: "Жанр",
      platform: "Платформа",
      status: "Статус выпуска",
      video: "Ссылка на видео",
      store: "Ссылка на магазин",
      message: "Описание",
    },
  },
};

/** 핵심 수치 (Stats 섹션) — 실제 수치만 쓴다. 파트너 향 신뢰 숫자(리서치 적용안 ③).
 *  6 플랫폼 근거: Google Play·App Store·One Store·Steam·Nintendo·PlayStation (platformIcons 6종).
 *  13개 시장 근거: 한국·일본·대만·홍콩·마카오·싱가포르·필리핀·말레이시아·인도네시아·태국·베트남·라오스·캄보디아 */
export const stats = [
  { value: "5", label: { ko: "서비스 타이틀", en: "Titles Live", zh: "營運作品", ru: "Игр в сервисе" } },
  { value: "6", label: { ko: "서비스 플랫폼", en: "Platforms", zh: "服務平台", ru: "Платформы" } },
  { value: "13", label: { ko: "아시아 출시 시장", en: "Asia Markets", zh: "亞洲市場", ru: "Рынки Азии" } },
  { value: "8+", label: { ko: "글로벌 파트너", en: "Global Studios", zh: "全球夥伴", ru: "Мировых студий" } },
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
  zh: { all: "全部", Mobile: "行動", PC: "PC", Console: "主機" },
  ru: { all: "Все", Mobile: "Моб.", PC: "PC", Console: "Консоль" },
};

/** GAHEE 공식 Google Play 개발자 페이지 —
 *  게임별 스토어 페이지 URL 을 확보하기 전까지 Google Play 배지의 대체 링크로 쓴다. */
const GAHEE_PLAY_DEV_PAGE = "https://play.google.com/store/apps/dev?id=5871699805522095691";

/** 게임 라인업 — featured 1종이 쇼케이스 큰 카드, placeholder 는 "준비 중" 카드 */
export const games: Game[] = [
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
      zh: "在一個和平的帝國裡，傳來尋找鍛造之神伏爾坎後裔的消息。成為那位後裔，鍛造出最強的傳奇吧。",
      ru: "В мирной империи разносится весть: ищут потомка Вулкана, бога-кузнеца. Станьте им и достигните вершин кузнечного мастерства.",
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
      zh: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      ru: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
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
      zh: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
      ru: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.",
    },
  },
];

/** 불칸 CS 고객 문의 폼 — 불칸 모달의 "고객센터 문의" 버튼에서 열린다.
 *  제출은 Apps Script(config.ts CS_ENDPOINT)로 → 구글 시트 + 드라이브(사진).
 *  원폼 "[불칸CS] 고객 문의사항 접수"의 핵심 항목(1~8)만. 사진 업로드 + 영상은 링크. */
export const csForm = {
  button: { ko: "고객센터 문의", en: "Customer Support", zh: "客服諮詢", ru: "Поддержка" },
  nav: { ko: "고객센터", en: "Support", zh: "客服", ru: "Поддержка" },
  title: { ko: "불칸 고객 문의 접수", en: "Vulcan — Support Request", zh: "伏爾坎 客服諮詢", ru: "Vulcan — обращение в поддержку" },
  intro: {
    ko: "불칸 플레이 중 불편하신 점을 접수해 주세요. 입력하신 이메일로 답변드립니다.",
    en: "Tell us about any issue with Vulcan. We'll reply to the email you provide.",
    zh: "遊玩伏爾坎時遇到任何問題，歡迎告訴我們。我們會回覆至您填寫的電子郵件。",
    ru: "Расскажите о любой проблеме в Vulcan. Мы ответим на указанный вами адрес эл. почты.",
  },
  privacyUrl: "https://gahee.net/privacypolicy",
  privacyLabel: { ko: "개인정보처리방침", en: "Privacy Policy", zh: "隱私權政策", ru: "Политика конфиденциальности" },
  consents: {
    privacy: {
      ko: "문의 접수·처리를 위한 개인정보 제3자 제공에 동의합니다. (필수)",
      en: "I agree to share my personal data with third parties to handle this inquiry. (required)",
      zh: "我同意為受理及處理本次諮詢，向第三方提供個人資料。（必填）",
      ru: "Я согласен(на) на передачу моих персональных данных третьим лицам для обработки этого обращения. (обязательно)",
    },
    notice: {
      ko: "처리 완료 전 계정 탈퇴·로그인 계정/번호 변경 등이 발생하면 처리·보상이 불가할 수 있음을 확인했습니다. (필수)",
      en: "I understand account deletion or login/phone changes before resolution may prevent handling or compensation. (required)",
      zh: "我了解在處理完成前若刪除帳號或變更登入帳號／電話，可能導致無法處理或補償。（必填）",
      ru: "Я понимаю, что удаление аккаунта или смена логина/номера до решения вопроса могут сделать обработку или компенсацию невозможными. (обязательно)",
    },
  },
  categories: [
    { ko: "게임플레이 / 버그 문의", en: "Gameplay / Bug", zh: "遊戲進行／錯誤回報", ru: "Игровой процесс / ошибка" },
    { ko: "루비·상점아이템 문의 (미지급·수령오류)", en: "Ruby & Shop Items (missing / error)", zh: "紅寶石・商店道具（未發放／領取錯誤）", ru: "Рубины и предметы магазина (не получены / ошибка)" },
    { ko: "환불 및 게임탈퇴", en: "Refund & Account Deletion", zh: "退款與刪除帳號", ru: "Возврат и удаление аккаунта" },
    { ko: "게임유저 신고", en: "Report a Player", zh: "檢舉玩家", ru: "Пожаловаться на игрока" },
    { ko: "기타 게임제안", en: "Other / Suggestion", zh: "其他／建議", ru: "Другое / предложение" },
  ],
  labels: {
    email: { ko: "이메일", en: "Email", zh: "電子郵件", ru: "Эл. почта" },
    gameId: { ko: "게임 내 아이디", en: "In-game ID", zh: "遊戲內 ID", ru: "Игровой ID" },
    gameIdHelp: { ko: "예: 불칸최고 — 접수·처리·보상에 사용됩니다.", en: "e.g., VulcanHero — used for handling and rewards.", zh: "例如：伏爾坎最強 — 用於受理、處理與補償。", ru: "Напр.: VulcanHero — используется для обработки и компенсаций." },
    contact: { ko: "연락처", en: "Contact (phone)", zh: "聯絡電話", ru: "Контакт (телефон)" },
    category: { ko: "문의 항목", en: "Category", zh: "諮詢類別", ru: "Категория" },
    categoryPlaceholder: { ko: "선택해 주세요", en: "Select…", zh: "請選擇", ru: "Выберите…" },
    detail: { ko: "문의 세부 내용", en: "Details", zh: "詳細內容", ru: "Подробности" },
    detailPlaceholder: { ko: "어떤 문제인지 자세히 적어 주세요.", en: "Describe the issue in detail.", zh: "請詳細說明您遇到的問題。", ru: "Опишите проблему подробно." },
    files: { ko: "스크린샷 / 이미지 첨부", en: "Screenshots / Images", zh: "螢幕截圖／圖片", ru: "Скриншоты / изображения" },
    filesHelp: { ko: "최대 5장 · 장당 10MB · jpg·png·webp·gif", en: "Up to 5 files · 10MB each · jpg·png·webp·gif", zh: "最多 5 張 · 每張 10MB · jpg·png·webp·gif", ru: "До 5 файлов · по 10 МБ · jpg·png·webp·gif" },
    videoUrl: { ko: "영상 링크 (선택)", en: "Video link (optional)", zh: "影片連結（選填）", ru: "Ссылка на видео (необязательно)" },
    videoUrlHelp: { ko: "게임플레이 영상은 유튜브·드라이브 등 링크로 첨부", en: "Paste a YouTube/Drive link for gameplay video", zh: "遊戲影片可貼上 YouTube／雲端硬碟連結", ru: "Вставьте ссылку на игровое видео с YouTube/Drive" },
  },
  submit: { ko: "문의 접수", en: "Submit", zh: "送出", ru: "Отправить" },
  sending: { ko: "접수 중…", en: "Submitting…", zh: "受理中…", ru: "Отправка…" },
  success: { ko: "문의가 접수되었습니다. 입력하신 이메일로 답변드리겠습니다.", en: "Your inquiry has been received. We'll reply to your email.", zh: "已收到您的諮詢，我們將回覆至您的電子郵件。", ru: "Ваше обращение получено. Мы ответим на вашу эл. почту." },
  error: { ko: "접수에 실패했습니다. 잠시 후 다시 시도하거나 cs@gahee.net 로 보내주세요.", en: "Submission failed. Please try again or email cs@gahee.net.", zh: "受理失敗，請稍後再試，或寄信至 cs@gahee.net。", ru: "Не удалось отправить. Повторите попытку или напишите на cs@gahee.net." },
  notReady: { ko: "문의 접수 준비 중입니다. 우선 cs@gahee.net 로 보내주세요.", en: "Support intake is being set up. Please email cs@gahee.net for now.", zh: "客服受理系統準備中，請先寄信至 cs@gahee.net。", ru: "Приём обращений настраивается. Пока напишите на cs@gahee.net." },
  errFiles: { ko: "이미지는 최대 5장, 장당 10MB까지 가능합니다.", en: "Up to 5 images, 10MB each.", zh: "圖片最多 5 張，每張至多 10MB。", ru: "До 5 изображений, по 10 МБ." },
  errConsent: { ko: "필수 동의 항목에 체크해 주세요.", en: "Please check the required consents.", zh: "請勾選必填的同意項目。", ru: "Отметьте обязательные согласия." },
};

/** 회사 프로필 표 (Company 섹션 우측) */
export const companyProfile = [
  { label: { ko: "회사명", en: "Company", zh: "公司名稱", ru: "Компания" }, value: "GAHEE., LTD" },
  { label: { ko: "설립일", en: "Founded", zh: "成立日期", ru: "Основана" }, value: "2022. 10. 31" },
  { label: { ko: "대표이사", en: "CEO", zh: "代表理事", ru: "Ген. директор" }, value: "Hyunwoo Koo" },
  { label: { ko: "사업분야", en: "Business", zh: "營業項目", ru: "Деятельность" }, value: "Mobile · PC · Console Publishing" },
  { label: { ko: "본사", en: "HQ", zh: "總部", ru: "Штаб-квартира" }, value: "Gwangjin-gu, Seoul" },
  { label: { ko: "사업자번호", en: "CRN", zh: "統一編號", ru: "Рег. номер" }, value: "508-86-02578" },
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

/* ============================================================
   법률 문서 — 사이트 내 전용 페이지(개인정보처리방침·이용약관).
   원문(한국어)을 문자열로 보관하고, 렌더 시 줄 단위로 소제목/목록/문단을 구분한다.
   ⚠️ 법적 문구 — 수정 시 원문 대조 필수. 출처: gahee.net.
   원문의 명백한 오탈자(법→'밥', 법령→'범령' 등)는 바로잡았으며 최종 검수 권장.
   ============================================================ */
export type LegalDoc = { title: Record<Locale, string>; body: Record<Locale, string> };

export const legalDocs: Partial<Record<"privacy" | "terms", LegalDoc>> = {
  privacy: {
    title: { ko: "개인정보처리방침", en: "Privacy Policy", zh: "隱私權政策", ru: "Политика конфиденциальности" },
    body: {
      ko: `(주)가히(이하 '회사')는 이용자의 개인정보를 적극적으로 보호하며 정보통신망법·개인정보보호법 및 유관 기관이 제정한 지침을 준수함으로써 이용자 권익 보호에 최선을 다하고 있습니다.

1. 개인정보 수집·이용 항목과 목적, 수집방법
회사는 원활한 서비스 제공을 위하여 아래와 같은 정보를 이용자의 동의를 득한 후 수집하고 있습니다.

1) 연동하는 계정의 플랫폼과 마켓에 따라 수집·이용하는 정보는 아래와 같습니다.
● 동의 구분: 필수
● 수집 목적: 콘텐츠 이용 및 개인식별
● 수집 방법: 회원가입 및 서비스 이용 과정에서 개인정보 수집에 대해 동의한 경우
● 수집 항목: 페이스북 플랫폼(이름, 닉네임, 프로필, 친구목록, 생년, 국가, 로케일, 성별) / 구글 마켓(구글플러스ID, 프로필, 닉네임) / 애플 마켓(애플게임센터ID, 프로필, 닉네임)

2) 원활한 고객상담 및 이용자 식별을 위해 고객센터를 통해 수집·이용하는 정보는 아래와 같습니다.
● 동의 구분: 필수
● 수집 목적: 고객상담 및 개인 식별
● 수집 방법: 1:1 상담, 이메일 상담 등 고객센터 이용 시
● 수집 항목: 이름, 이메일, 연락처(휴대폰 또는 일반전화), ID, 결제정보, 국가, IP 등

3) 서비스 이용 과정에서 정보통신서비스 제공자가 자동화된 방법으로 생성하여 수집·이용하거나, 이용자 기기의 고유한 정보를 원래의 값을 확인하지 못하도록 안전하게 변환하여 수집하는 정보는 필수와 선택 동의로 구분됩니다.
● 동의 구분: 필수
● 수집 목적: 서비스 이용기록과 접속빈도 분석, 게임 실행 파일 저장, 법령 및 이용약관 위반 행위에 대한 이용제한 조치
● 수집 방법: 자동생성 또는 앱 최초 실행 시 이용자가 기기 접근에 동의한 경우
● 수집 항목: 이용자의 휴대폰 단말기 정보(모델명, OS종류 및 버전, 마켓 명, 국가 등), 서비스 이용기록, 접속로그, 결제기록 등
● 동의 구분: 선택
● 수집 목적: 음성 대화 및 리소스 다운로드
● 수집 방법: 앱 최초 실행 시 이용자가 기기 접근에 동의한 경우
● 수집 항목: 사진/미디어/파일/스토리지 저장공간 및 SD카드 등

2. 개인정보 제공
회사는 원칙적으로 이용자의 사전 동의없이 개인정보를 외부에 제공하지 않습니다. 단, 이용자가 외부 서비스를 이용하기 위하여 개인정보 제공에 직접 동의를 한 경우, 관련 법령에 의거해 회사에서 개인정보 제출 의무가 발생한 경우에 한해 개인정보를 제공하고 있습니다.

3. 개인정보 보유기간 및 파기
회사는 원칙적으로 이용자의 개인정보를 회원 탈퇴 시 지체없이 파기합니다. 단, 이용자에게 개인정보 보관 기간에 대해 별도의 동의를 얻은 경우, 또는 법령에서 일정 기간 정보보관 의무를 부과하는 경우에는 해당 기간 동안 개인정보를 안전하게 보관합니다.

1) 법령에 따라 일정기간 정보를 보관하는 규정은 아래와 같습니다.
● 계약 또는 청약철회 등에 관한 기록: 5년 (전자상거래 등에서 소비자 보호에 관한 법률)
● 대금결제 및 재화 등의 공급에 관한 기록: 5년 (전자상거래 등에서 소비자 보호에 관한 법률)
● 소비자의 불만 또는 분쟁처리에 관한 기록: 3년 (전자상거래 등에서 소비자 보호에 관한 법률)
● 로그인 기록: 3개월 (통신비밀보호법)

2) 회원탈퇴, 서비스종료, 이용자에게 동의받은 개인정보의 보유기간이 도래한 개인정보는 재생이 불가능한 방법으로 파기하고 있습니다. 법령에서 보존의무를 부과한 정보에 대해서도 해당 기간 경과 후 지체없이 재생이 불가능한 방법으로 파기합니다.

3) 전자적 파일 형태의 경우 복구 및 재생이 되지 않도록 기술적인 방법을 이용하여 안전하게 삭제하며, 출력물 등은 분쇄하거나 소각하는 방식 등으로 파기합니다.

4. 이용자 및 법정대리인의 권리와 행사방법
1) 이용자는 언제든지 서비스 내의 회원탈퇴 등을 통해 개인정보 수집 및 이용동의를 철회할 수 있습니다. 만 14세 미만 아동의 경우, 법정대리인이 아동의 개인정보를 조회하거나 수정할 권리, 수집 및 이용동의를 철회할 권리를 가집니다.
2) 이용자의 개인정보의 오류에 대한 정정을 요청한 경우, 정정을 완료하기 전까지 해당 개인정보를 이용 또는 제공하지 않습니다.

5. 개인정보보호를 위한 회사의 노력
회사는 이용자의 개인정보를 안전하게 관리하기 위하여 최선을 다하고 있습니다. 대내외의 보안위협으로부터 개인정보를 안전하게 관리하며 개인정보처리자를 최소한으로 유지하며 정기적인 교육을 진행하고 있습니다. 또한 비인가자에 대한 출입 통제 및 문서 보안을 위해 개인정보가 포함된 서류 및 저장매체 등을 잠금장치가 있는 안전한 장소에 보관하고 있습니다.

6. 개인정보 보호책임자 및 담당부서
회사는 이용자들의 개인정보를 보호하고 개인정보와 관련된 불만을 처리하기 위하여 아래와 같이 개인정보 보호 책임자 및 담당부서를 지정하고 있습니다.
● 개인정보 보호책임자: 구현우
● 개인정보 보호 담당부서: 게임사업부
● 연락처: cs@gahee.net

7. 본 개인정보처리방침의 적용 범위
본 개인정보처리방침은 회사에 링크되어 있는 다른 회사의 웹사이트 또는 어플리케이션에서 개인정보를 수집하는 경우, 이용자 동의 하에 개인정보가 제공된 이후에는 본 개인정보처리방침이 적용되지 않습니다.

8. 고지 의무
본 개인정보처리방침의 내용 추가, 삭제 및 수정이 있을 경우 개정 최소 7일 전에 회사에서 운영하는 커뮤니티 또는 어플리케이션 공지사항을 통해 사전 공지를 할 것입니다. 다만, 수집하는 개인정보의 항목, 이용목적의 변경 등과 같이 이용자의 권리의 중대한 변경이 발생할 때에는 최소 30일 전에 공지하며, 필요 시 이용자 동의를 다시 받을 수도 있습니다.

본 개인정보처리방침은 2024년 09월 01일부터 적용됩니다.`,
      en: `GAHEE Co., Ltd. (the "Company") actively protects users' personal information and complies with the Act on Promotion of Information and Communications Network Utilization and Information Protection, the Personal Information Protection Act, and the guidelines established by relevant authorities, doing its utmost to protect users' rights and interests.

1. Items, Purpose, and Method of Collecting and Using Personal Information
To provide a smooth service, the Company collects the following information after obtaining the user's consent.

1) Information collected and used depending on the platform and market of the linked account is as follows.
● Consent type: Required
● Purpose: Use of content and personal identification
● Method: When the user consents to the collection of personal information during sign-up and use of the service
● Items: Facebook platform (name, nickname, profile, friend list, birth year, country, locale, gender) / Google market (Google Plus ID, profile, nickname) / Apple market (Apple Game Center ID, profile, nickname)

2) Information collected and used through customer support for smooth consultation and user identification is as follows.
● Consent type: Required
● Purpose: Customer consultation and personal identification
● Method: When using customer support such as 1:1 or email consultation
● Items: Name, email, contact (mobile or landline), ID, payment information, country, IP, etc.

3) Information generated and collected automatically by the information and communications service provider during use of the service, or collected after being securely converted so that the unique information of the user's device cannot be identified in its original value, is divided into required and optional consent.
● Consent type: Required
● Purpose: Analysis of service usage records and access frequency, saving of game execution files, and measures to restrict use for violations of laws or the terms of service
● Method: When automatically generated, or when the user consents to device access at first launch of the app
● Items: The user's mobile device information (model name, OS type and version, market name, country, etc.), service usage records, access logs, payment records, etc.
● Consent type: Optional
● Purpose: Voice chat and resource download
● Method: When the user consents to device access at first launch of the app
● Items: Photos / media / files / storage space and SD card, etc.

2. Provision of Personal Information
As a rule, the Company does not provide personal information to any third party without the user's prior consent. However, the Company provides personal information only where the user has directly consented to such provision in order to use an external service, or where the Company is obligated to submit personal information under relevant laws.

3. Retention Period and Destruction of Personal Information
As a rule, the Company destroys the user's personal information without delay upon withdrawal of membership. However, where separate consent has been obtained from the user regarding the retention period, or where laws impose an obligation to retain information for a certain period, the Company safely retains the personal information for that period.

1) Provisions for retaining information for a certain period under the law are as follows.
● Records on contracts or withdrawal of subscription, etc.: 5 years (Act on Consumer Protection in Electronic Commerce, etc.)
● Records on payment and the supply of goods, etc.: 5 years (Act on Consumer Protection in Electronic Commerce, etc.)
● Records on consumer complaints or dispute handling: 3 years (Act on Consumer Protection in Electronic Commerce, etc.)
● Login records: 3 months (Protection of Communications Secrets Act)

2) Personal information whose retention period has arrived — upon withdrawal of membership, termination of service, or by the user's consent — is destroyed by a method that cannot be reproduced. Information for which laws impose a retention obligation is likewise destroyed without delay by an irreproducible method after the relevant period has elapsed.

3) Personal information in the form of electronic files is safely deleted using technical methods so that it cannot be recovered or reproduced, and printed materials are destroyed by shredding or incineration.

4. Rights of Users and Legal Representatives and How to Exercise Them
1) Users may at any time withdraw their consent to the collection and use of personal information through membership withdrawal within the service, etc. For children under the age of 14, the legal representative has the right to view or correct the child's personal information and to withdraw consent to its collection and use.
2) Where a user requests the correction of an error in personal information, the Company does not use or provide the personal information until the correction is completed.

5. The Company's Efforts to Protect Personal Information
The Company does its utmost to safely manage users' personal information. It safely manages personal information against internal and external security threats, keeps the number of personal information handlers to a minimum, and conducts regular training. In addition, to control access by unauthorized persons and for document security, documents and storage media containing personal information are kept in a secure location fitted with a locking device.

6. Personal Information Protection Officer and Department
The Company designates a personal information protection officer and department as follows in order to protect users' personal information and handle related complaints.
● Personal Information Protection Officer: Hyunwoo Koo
● Department in charge: Game Business Division
● Contact: cs@gahee.net

7. Scope of Application of this Privacy Policy
This Privacy Policy does not apply where personal information is collected on the website or application of another company linked to the Company, after such personal information has been provided with the user's consent.

8. Duty to Notify
In the event of any addition, deletion, or amendment to this Privacy Policy, the Company will give prior notice through the community or application notices operated by the Company at least 7 days before the effective date. However, in the event of a material change to users' rights, such as a change in the items of personal information collected or the purpose of use, the Company will give notice at least 30 days in advance and may obtain the user's consent again if necessary.

This Privacy Policy is effective as of September 1, 2024.`,
      zh: `GAHEE 股份有限公司（以下簡稱「公司」）積極保護用戶的個人資料，並遵守《資訊通信網利用促進及資訊保護等相關法律》、《個人資料保護法》及相關機關制定之方針，竭力保護用戶之權益。

1. 個人資料蒐集・利用項目與目的、蒐集方法
公司為順利提供服務，於取得用戶同意後蒐集下列資訊。

1) 依連動帳號之平台與市集而蒐集・利用之資訊如下。
● 同意類別：必要
● 蒐集目的：內容利用及個人識別
● 蒐集方法：於註冊及使用服務過程中同意蒐集個人資料時
● 蒐集項目：Facebook 平台（姓名、暱稱、個人檔案、好友名單、出生年、國家、地區設定、性別）／Google 市集（Google Plus ID、個人檔案、暱稱）／Apple 市集（Apple Game Center ID、個人檔案、暱稱）

2) 為順利進行客服諮詢及用戶識別，透過客服中心蒐集・利用之資訊如下。
● 同意類別：必要
● 蒐集目的：客服諮詢及個人識別
● 蒐集方法：使用 1:1 諮詢、電子郵件諮詢等客服中心時
● 蒐集項目：姓名、電子郵件、聯絡方式（行動電話或市內電話）、ID、付款資訊、國家、IP 等

3) 於使用服務過程中，由資訊通信服務提供者以自動化方式生成並蒐集・利用，或將用戶裝置之固有資訊安全轉換為無法確認原始值後蒐集之資訊，分為必要及選擇性同意。
● 同意類別：必要
● 蒐集目的：服務使用紀錄與連線頻率分析、遊戲執行檔儲存、針對違反法令及服務條款行為之使用限制措施
● 蒐集方法：自動生成，或於 App 首次執行時用戶同意裝置存取時
● 蒐集項目：用戶之行動裝置資訊（型號、OS 種類及版本、市集名稱、國家等）、服務使用紀錄、連線紀錄、付款紀錄等
● 同意類別：選擇
● 蒐集目的：語音對話及資源下載
● 蒐集方法：於 App 首次執行時用戶同意裝置存取時
● 蒐集項目：照片／媒體／檔案／儲存空間及 SD 卡等

2. 個人資料之提供
公司原則上未經用戶事前同意，不會將個人資料提供予外部。但用戶為使用外部服務而直接同意提供個人資料時，或依相關法令公司負有提交個人資料義務時，僅於該範圍內提供個人資料。

3. 個人資料之保存期間及銷毀
公司原則上於用戶退出會員時立即銷毀其個人資料。但已就個人資料保存期間另行取得用戶同意，或法令課予一定期間之資訊保存義務時，於該期間內安全保存個人資料。

1) 依法令保存一定期間資訊之規定如下。
● 契約或撤回申請等相關紀錄：5 年（電子商務等消費者保護相關法律）
● 付款及財貨等供給相關紀錄：5 年（電子商務等消費者保護相關法律）
● 消費者投訴或糾紛處理相關紀錄：3 年（電子商務等消費者保護相關法律）
● 登入紀錄：3 個月（通訊秘密保護法）

2) 因退出會員、服務終止或經用戶同意而保存期間屆至之個人資料，以無法還原之方式銷毀。對於法令課予保存義務之資訊，亦於該期間屆滿後立即以無法還原之方式銷毀。

3) 電子檔案形式者，以技術方法安全刪除使其無法復原及重生，列印物等則以碎紙或焚燒等方式銷毀。

4. 用戶及法定代理人之權利與行使方法
1) 用戶得隨時透過服務內之退出會員等方式，撤回個人資料蒐集及利用之同意。未滿 14 歲兒童之情形，法定代理人有查詢或修改該兒童個人資料、撤回蒐集及利用同意之權利。
2) 用戶就個人資料錯誤請求更正時，於更正完成前，公司不會利用或提供該個人資料。

5. 公司為保護個人資料所做之努力
公司竭力安全管理用戶之個人資料。公司於面對內外部安全威脅時安全管理個人資料，將個人資料處理人員維持於最低限度並定期實施教育。此外，為管制未經授權者之出入及文件安全，將含有個人資料之文件及儲存媒體等保管於設有上鎖裝置之安全場所。

6. 個人資料保護負責人及負責部門
公司為保護用戶之個人資料並處理相關投訴，指定個人資料保護負責人及負責部門如下。
● 個人資料保護負責人：Hyunwoo Koo（具賢祐）
● 個人資料保護負責部門：遊戲事業部
● 聯絡方式：cs@gahee.net

7. 本隱私權政策之適用範圍
於與公司連結之其他公司網站或應用程式蒐集個人資料時，本隱私權政策自經用戶同意提供個人資料之後起不予適用。

8. 告知義務
本隱私權政策之內容有新增、刪除及修改時，公司將於修訂生效至少 7 日前，透過公司營運之社群或應用程式公告事項事前公告。但如蒐集之個人資料項目、利用目的變更等涉及用戶權利之重大變更時，將於至少 30 日前公告，並於必要時重新取得用戶同意。

本隱私權政策自 2024 年 09 月 01 日起適用。`,
      ru: `GAHEE Co., Ltd. (далее — «Компания») активно защищает персональные данные пользователей и, соблюдая Закон о содействии использованию информационно-коммуникационных сетей и о защите информации, Закон о защите персональных данных, а также руководящие принципы соответствующих органов, прилагает все усилия для защиты прав и интересов пользователей.

1. Состав, цели и способы сбора и использования персональных данных
Для бесперебойного оказания услуг Компания собирает следующие данные после получения согласия пользователя.

1) Данные, собираемые и используемые в зависимости от платформы и магазина привязанной учётной записи, следующие.
● Вид согласия: обязательное
● Цель: использование контента и идентификация личности
● Способ: при согласии пользователя на сбор персональных данных в процессе регистрации и использования сервиса
● Состав: платформа Facebook (имя, никнейм, профиль, список друзей, год рождения, страна, локаль, пол) / магазин Google (Google Plus ID, профиль, никнейм) / магазин Apple (Apple Game Center ID, профиль, никнейм)

2) Данные, собираемые и используемые через службу поддержки для консультаций и идентификации пользователя, следующие.
● Вид согласия: обязательное
● Цель: консультация клиентов и идентификация личности
● Способ: при обращении в службу поддержки (индивидуальная консультация или по эл. почте)
● Состав: имя, эл. почта, контакт (мобильный или стационарный телефон), ID, платёжная информация, страна, IP и т. д.

3) Данные, автоматически формируемые и собираемые поставщиком информационно-коммуникационных услуг в процессе использования сервиса, либо собираемые после безопасного преобразования уникальной информации устройства пользователя так, чтобы её исходное значение нельзя было установить, делятся на обязательное и необязательное согласие.
● Вид согласия: обязательное
● Цель: анализ записей использования сервиса и частоты доступа, сохранение исполняемых файлов игры, меры по ограничению использования при нарушении законов или условий использования
● Способ: при автоматическом формировании либо при согласии пользователя на доступ к устройству при первом запуске приложения
● Состав: информация о мобильном устройстве пользователя (модель, тип и версия ОС, название магазина, страна и т. д.), записи использования сервиса, журналы доступа, записи о платежах и т. д.
● Вид согласия: необязательное
● Цель: голосовой чат и загрузка ресурсов
● Способ: при согласии пользователя на доступ к устройству при первом запуске приложения
● Состав: фото / медиа / файлы / пространство хранения и SD-карта и т. д.

2. Предоставление персональных данных
Как правило, Компания не предоставляет персональные данные третьим лицам без предварительного согласия пользователя. Однако Компания предоставляет персональные данные лишь тогда, когда пользователь прямо согласился на их предоставление для использования внешнего сервиса, либо когда у Компании возникает обязанность предоставить персональные данные в соответствии с законодательством.

3. Срок хранения и уничтожение персональных данных
Как правило, Компания уничтожает персональные данные пользователя без промедления при выходе из числа участников. Однако при получении отдельного согласия пользователя относительно срока хранения либо при наличии установленной законом обязанности хранить данные в течение определённого срока Компания безопасно хранит персональные данные в течение этого срока.

1) Положения о хранении данных в течение определённого срока согласно закону следующие.
● Записи о договорах или отзыве оферты и т. п.: 5 лет (Закон о защите прав потребителей в электронной торговле и т. п.)
● Записи об оплате и поставке товаров и т. п.: 5 лет (Закон о защите прав потребителей в электронной торговле и т. п.)
● Записи о жалобах потребителей или урегулировании споров: 3 года (Закон о защите прав потребителей в электронной торговле и т. п.)
● Записи о входе в систему: 3 месяца (Закон о защите тайны связи)

2) Персональные данные, срок хранения которых истёк вследствие выхода из числа участников, прекращения сервиса или по согласию пользователя, уничтожаются способом, не допускающим их восстановления. Данные, обязанность хранения которых установлена законом, также уничтожаются без промедления невосстановимым способом по истечении соответствующего срока.

3) Данные в форме электронных файлов безопасно удаляются техническими методами так, чтобы их нельзя было восстановить или воспроизвести, а печатные материалы уничтожаются измельчением или сжиганием.

4. Права пользователей и законных представителей и порядок их осуществления
1) Пользователь может в любое время отозвать согласие на сбор и использование персональных данных путём выхода из числа участников в рамках сервиса и т. п. В отношении детей младше 14 лет законный представитель вправе просматривать или исправлять персональные данные ребёнка и отзывать согласие на их сбор и использование.
2) При запросе пользователя об исправлении ошибки в персональных данных Компания не использует и не предоставляет соответствующие данные до завершения исправления.

5. Усилия Компании по защите персональных данных
Компания прилагает все усилия для безопасного управления персональными данными пользователей. Она безопасно управляет персональными данными в условиях внутренних и внешних угроз безопасности, поддерживает минимальное число лиц, обрабатывающих персональные данные, и проводит регулярное обучение. Кроме того, для контроля доступа посторонних лиц и защиты документов документы и носители, содержащие персональные данные, хранятся в безопасном месте с запирающим устройством.

6. Ответственный за защиту персональных данных и подразделение
Для защиты персональных данных пользователей и рассмотрения связанных жалоб Компания назначает ответственного за защиту персональных данных и подразделение следующим образом.
● Ответственный за защиту персональных данных: Hyunwoo Koo
● Ответственное подразделение: Отдел игрового бизнеса
● Контакт: cs@gahee.net

7. Сфера применения настоящей Политики конфиденциальности
Настоящая Политика конфиденциальности не применяется в случае сбора персональных данных на сайте или в приложении другой компании, связанной с Компанией, после того как такие данные были предоставлены с согласия пользователя.

8. Обязанность уведомления
При добавлении, удалении или изменении содержания настоящей Политики конфиденциальности Компания заранее уведомит об этом через сообщество или уведомления приложения, управляемые Компанией, не менее чем за 7 дней до даты вступления в силу. Однако при существенном изменении прав пользователя, например при изменении состава собираемых персональных данных или целей использования, уведомление будет сделано не менее чем за 30 дней, и при необходимости может быть повторно получено согласие пользователя.

Настоящая Политика конфиденциальности действует с 1 сентября 2024 года.`,
    },
  },
  terms: {
    title: { ko: "이용약관", en: "Terms of Service", zh: "服務條款", ru: "Условия использования" },
    body: {
      ko: `제1장 총칙

제1조 (목적)
이 약관은 (주)가히(이하 '회사'라 합니다)가 제공하는 게임 및 이에 부수하는 제반 서비스(이하 '게임서비스'라 합니다)의 이용과 관련해, 회사와 회원 간의 권리·의무, 책임사항 및 기타 필요한 사항을 규정하는 것을 목적으로 합니다.

제2조 (용어의 정의)
① 이 약관에서 사용하는 용어의 정의는 다음과 같습니다.
(1) '회사'란 온라인 또는 모바일 기기를 통해 게임서비스를 제공하는 사업자를 의미합니다.
(2) '회원'이란 이 약관에 따라 '회사'와 이용계약을 체결하고, '회사'가 제공하는 '게임서비스'를 이용하는 사람을 의미합니다.
(3) '임시회원(guest)'이란 '계정정보'를 외부계정과 연동 또는 인증을 하지 않거나 게스트 로그인 기능을 통해 '게임서비스'를 이용하는 '회원'을 의미합니다.
(4) '모바일기기'란 '콘텐츠'를 다운로드하거나 설치해 사용할 수 있는 기기로서, 휴대폰, 스마트폰, 휴대정보단말기(PDA), 태블릿 등을 의미합니다.
(5) '계정정보'란 '회원'의 회원번호, 외부계정정보, 별명, 프로필 사진, 친구 목록 등 '회원'이 '회사'에 제공한 일반 정보와 기기 정보, 게임 이용정보(캐릭터 정보, 아이템, 레벨 등), 결제 정보 등을 통칭합니다.
(6) '콘텐츠'란 '회사'가 '게임서비스' 제공과 관련해 디지털 방식으로 제작한 유료 또는 무료의 내용물 일체(게임 및 네트워크 서비스, 애플리케이션, 게임 머니, 게임 아이템 등)를 의미합니다.
(7) '애플리케이션'이란 '회사'가 제공하는 '게임서비스'를 이용하기 위해 모바일 기기 또는 '회사'가 제공하는 런처 프로그램을 통해 다운로드하거나 설치하여 사용하는 프로그램 일체를 의미합니다.
(8) '게임세계'란 '게임서비스'를 통해 다중의 회원이 일정한 규칙(이하 '게임규칙'이라 합니다)에 따라 오락을 하거나 오락에 부수해 여가선용, 친목 도모, 정보매개 등을 할 수 있도록 게임서버로 구현한 가변적인 가상세계를 의미합니다.
(9) '오픈마켓'이란 모바일 기기에서 애플리케이션을 설치하고 유료 결제를 할 수 있도록 구축된 전자상거래 환경을 의미합니다.
(10) '결제업체'란 신용카드, 휴대폰결제 등 오픈마켓에서 사용 가능한 전자 지급수단을 제공하는 업체를 의미합니다.
(11) '제휴서비스'란 회사가 카카오, 라인 등 모바일 플랫폼 서비스사와 제휴 계약을 체결하여 회원이 제휴된 플랫폼에서의 가입 정보, 프로필 사진 등을 이용해 모바일 기기에서 콘텐츠를 이용할 수 있도록 제공하는 개별 또는 일체의 서비스를 의미합니다.
(12) '개인프로필'이란 카카오톡, Google, Facebook 등 모바일 플랫폼 서비스에서 이용자의 식별을 위해 부여한 회원번호 및 닉네임을 의미하며 이용자가 설정한 사진 등의 프로필 사진을 포함합니다.
(13) '아이템'이란 게임 내에서 사용할 수 있는 상품, 교환 수단, 게임 내 머니, 이용권, 기타 일정 또는 랜덤한 결과값을 나타낼 수 있도록 하는 데이터 또는 이를 인식 가능하게 표현한 것을 의미합니다.
(14) '유료 결제'란 회원이 게임 서비스 내 콘텐츠 등을 이용하기 위해 회사가 인정하는 결제업체를 통해 결제하는 행위를 의미합니다.
(15) '유료 아이템'이란 유료 결제를 통해 구매한 아이템을 의미합니다.
(16) '무료 아이템'이란 '회사'가 '회원'에게 무상으로 지급한 아이템(무상으로 지급한 유료 아이템 포함)을 의미합니다.
② 이 약관에서 사용하는 용어의 정의는 본 조 제1항 각 호에서 정하는 것을 제외하고는 관계법령 및 기타 일반적인 상관례에 의합니다.

제3조 (회사정보 등의 제공)
회사는 다음 각 호의 사항을 회원이 알아보기 쉽도록 게임서비스 내에 표시합니다. 다만, 개인정보처리방침과 약관은 회원이 연결 화면을 통하여 볼 수 있도록 할 수 있습니다.
(1) 상호 및 대표자의 성명
(2) 영업소 소재지 주소(회원의 불만을 처리할 수 있는 곳의 주소를 포함합니다)
(3) 전화번호, 전자우편주소
(4) 사업자 등록번호
(5) 통신판매업신고번호
(6) 개인정보처리방침
(7) 서비스 이용약관

제4조 (약관의 효력 및 변경)
① 회사는 본 약관의 내용을 회원이 쉽게 알 수 있도록 서비스 초기화면 또는 회사의 홈페이지, 공식 카페에 게시하거나 연결 화면을 제공하여 공지합니다. 회원이 회사의 게임을 다운로드해 실행하고 본 약관의 동의 버튼을 클릭하여 정상적인 게임 플레이 진행 시 본 약관을 동의한 것으로 간주합니다.
② 회사는 서비스를 이용하고자 하는 자(이하 '회원'이라 합니다)가 약관의 내용을 쉽게 알 수 있도록 작성하되, 약관에 동의하기에 앞서 약관에 정해져 있는 내용 중 게임서비스 중단, 청약철회, 과오납금의 환급, 계약 해제·해지, 회사의 면책사항, 회원에 대한 피해 보상 등과 같은 중요한 내용을 회원이 쉽게 이해할 수 있도록 명확히 표시하거나 별도의 연결 화면 또는 팝업 화면 등을 제공합니다.
③ 회사는 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「게임산업진흥에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「콘텐츠산업진흥법」 등 관련 법령에 위배하지 않는 범위에서 이 약관을 개정할 수 있습니다.
④ 회사가 약관을 개정할 경우에는 적용일자 및 개정내용, 개정사유 등을 명시하여 최소한 그 적용일 7일 이전부터 게임서비스 내 또는 그 연결 화면에 게시하여 회원에게 공지합니다. 다만, 변경된 내용이 회원에게 불리하거나 중대한 사항의 변경인 경우에는 그 적용일 30일 이전까지 본문과 같은 방법으로 공지하고 제24조 제1항의 방법으로 회원에게 통지합니다. 이 경우 개정 전 내용과 개정 후 내용을 명확하게 비교하여 회원이 알기 쉽도록 표시합니다.
⑤ 회사가 약관을 개정할 경우 개정 약관 공지 후 개정 약관의 적용에 대한 회원의 동의 여부를 확인합니다. 회사는 제4항의 공지 또는 통지를 할 경우 회원이 개정 약관에 대해 동의 또는 거부의 의사표시를 하지 않으면 동의한 것으로 볼 수 있다는 내용도 함께 공지 또는 통지를 하며, 회원이 이 약관 시행일까지 거부의 의사표시를 하지 않는다면 개정 약관에 동의한 것으로 볼 수 있습니다.
⑥ 회원이 개정 약관에 대해 동의하지 않는 경우 회사 또는 회원은 서비스 이용계약을 해지할 수 있습니다.
⑦ 회사는 회원이 회사와 이 약관의 내용에 관하여 질의 및 응답을 할 수 있도록 조치를 취합니다.
⑧ 본 약관에 동의하는 것은 정기적으로 서비스를 방문하여 약관의 변경 사항을 확인하는 것에 동의함을 의미합니다. 변경된 약관으로 인해 발생한 피해 및 회원이 과실로 개정된 약관의 내용을 알지 못해 발생하는 회원의 피해는 회사에서 책임지지 않습니다.
⑨ 본 약관에 동의하는 경우 회원에게 본 약관의 효력이 발생합니다.

제5조 (약관 외 준칙)
회사는 개별 게임서비스 등에 대해 별도의 이용약관, 규약 및 운영정책(이하 '개별 서비스 약관 등'이라 합니다)을 둘 수 있으며, 해당 내용이 이 약관과 상충할 경우에는 개별 서비스 약관 등이 우선하여 적용됩니다. 본 약관에서 정하지 아니한 사항이나 본 약관의 해석에 대해서는 개별 서비스 등 및 「전자상거래 등에서의 소비자보호에 관한 법률」, 「약관의 규제에 관한 법률」, 「게임산업진흥에 관한 법률」, 「개인정보 보호법」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」, 「콘텐츠산업진흥법」, 「저작권법」 등 관계법령과 상관례에 따릅니다.

제6조 (이용계약의 체결 및 적용)
① 회원이 되고자 하는 이용자는 회사와 서비스 이용계약을 체결하여야 합니다. 서비스 이용계약은 이용자가 서비스의 제공에 필요한 개인정보의 제공 및 본 약관에 동의하여 이용신청을 하면 회사가 이용자의 이용을 승낙함으로써 성립합니다.
② 이용신청자는 이용신청 시 회사에서 요구하는 제반정보를 제공해야 합니다.
③ 이용신청자는 이용신청 시 관련 법령에 따라 본인의 실제 정보를 기재해야 합니다. 실명 또는 식별정보를 허위로 기재하거나 타인의 명의를 도용한 경우 이 약관에 의한 회원의 권리를 주장할 수 없고, 회사는 환급 없이 이용계약을 취소하거나 해지할 수 있습니다.
④ 회원이 되고자 하는 이용신청자가 청소년(「초·중등교육법」 제2조의 규정에 의한 고등학교에 재학 중인 학생 포함)으로서 이용신청을 할 경우에는 법정대리인의 동의를 얻어야 하고, 구체적인 동의 절차는 「게임산업진흥에 관한 법률」 및 시행령에 따라 회사가 제공하는 방법에 따르도록 합니다. 단, 카카오 및 모바일 플랫폼을 통하여 서비스가 제공될 경우 본 조의 동의는 위 모바일 플랫폼의 회원가입 및 동의절차로서 갈음합니다.
⑤ 회사는 원칙적으로 이용자의 서비스 이용신청 순서에 따라 서비스 이용에 대한 승낙을 진행합니다. 다만, 아래 각 호에 해당하는 경우에는 그 사유가 해소될 때까지 승낙을 보류할 수 있습니다.
(1) 회사의 설비에 여유가 없거나 기술적 장애가 있는 경우
(2) 게임서비스에 장애가 발생한 경우
(3) 청소년(본 조 제4항에서 정의한 청소년과 같음)임에도 법정대리인의 동의를 얻지 아니하였거나 동의를 얻었음을 확인할 수 없는 경우
(4) 기타 위에 준하는 사유로서 회사의 사정으로 이용 승낙이 곤란한 경우
⑥ 회사는 아래 각 호에 해당되는 경우에 대해서는 승낙하지 않거나 서비스 이용을 제한할 수 있습니다.
(1) 이용신청 내용을 허위로 기재하거나 이용신청 요건을 충족하지 못한 경우
(2) 타인의 정보 또는 모바일 기기를 도용한 경우
(3) 「형법」에서 규정한 범죄 행위의 목적으로 서비스를 이용하고자 하는 경우
(4) 「청소년 보호법」의 취지에 위배되는 목적으로 서비스를 이용하고자 하는 경우
(5) 영리를 추구할 목적으로 서비스를 이용하고자 하는 경우
(6) 서비스와 경쟁 관계에 있는 회원이 회사의 이익을 저해하려는 목적으로 신청하는 경우
(7) 대한민국 이외의 국가 중 회사에서 아직 서비스를 제공할 것으로 결정하지 않은 국가에서 서비스를 이용하는 경우로, 회사가 해외 서비스 업체와 체결한 계약이나 특정 국가에서 접속하는 회원에 대한 서비스 제공과 관련하여 서비스 제공을 제한할 필요가 있는 경우
(8) 회사가 서비스 이용을 제한한 모바일 기기에서 서비스 이용의 신청을 하는 경우
(9) 「게임산업진흥에 관한 법률」, 「정보통신망 이용촉진 및 정보보호 등에 관한 법률」 및 그 밖의 관계 법령에서 금지하는 위법행위를 할 목적으로 이용신청을 하는 경우
(10) 기타 회사가 규정한 사항을 위반하여 신청하였거나 승낙이 부적절하다고 판단되는 경우
⑦ 회사는 이용자의 편의를 위해 게임서비스에 대해 임시회원(guest) 기능을 제공할 수 있습니다. 임시회원(guest) 기능 이용 중 아래 각 호에 해당하는 경우 계정정보가 삭제되거나 기록을 확인할 수 없는 문제가 발생할 수 있으며, 임시회원(guest) 기능을 통해 이용하던 게임서비스의 계정 정보는 이후 연계되는 이전이 불가능할 수 있습니다. 이 경우 회사는 계정정보의 복구를 보장하지 않으며 이에 대한 보상 및 손해배상에 대한 책임을 지지 않습니다. 단, 회사의 고의 또는 중과실에 의한 경우에는 그렇지 않습니다.
(1) 모바일 기기를 변경한 경우
(2) 모바일 기기를 개조하거나 초기화한 경우
(3) 모바일 기기에서 애플리케이션 등 콘텐츠의 전부 또는 일부를 삭제한 경우
⑧ 회사는 회원이 약관 절차 또는 서비스 이용에 필요한 개인정보의 입력을 완료하면, 승낙을 보류하거나 거부할 사항이 없는 경우 그 즉시 서비스를 이용할 수 있도록 합니다. 단, 사후에 승낙을 거부할 사항이 발견되는 경우에는 본 약관의 규정에 따라 이용제한이나 계약해지를 할 수 있습니다.

제7조 (운영정책)
① 약관을 적용하기 위해 필요한 사항의 규정, 회원의 권익 보호 및 게임세계 내 질서 유지를 위해 회사는 약관에서 구체적 범위를 정해 위임한 사항을 게임서비스 운영정책(이하 '운영정책'이라 합니다)으로 정할 수 있습니다.
② 회사는 운영정책의 내용을 회원이 알 수 있도록 서비스 초기화면 또는 회사의 홈페이지, 공식 카페에 게시하거나 연결 화면을 제공하여 게시합니다.
③ 운영정책을 개정하는 경우 제4조 제4항의 절차에 따릅니다. 다만, 운영정책 개정이 다음 각 호의 어느 하나에 해당하는 경우에는 제2항의 방법으로 사전에 공지합니다.
(1) 약관에서 구체적으로 범위를 정하여 위임한 사항을 개정하는 경우
(2) 회원의 권리·의무와 관련 없는 사항을 개정하는 경우
(3) 운영정책의 내용이 약관에서 정한 내용과 근본적으로 다르지 않고 회원이 예측 가능한 범위 내에서 운영정책을 개정하는 경우

제2장 개인정보 관리

제8조 (개인정보의 보호 및 사용)
① 회사는 관련 법령이 정하는 바에 따라 계정정보를 포함한 회원의 개인정보를 보호하기 위해 노력하며, 개인정보의 보호 및 사용에 대해서는 관련 법령 및 회사의 개인정보처리방침에 따릅니다. 다만, 회사가 제공하는 게임서비스 이외에 단순히 링크된 제3자 제공의 서비스에 대해서는 회사의 개인정보처리방침이 적용되지 않습니다.
② 서비스의 운영 및 안정화, 서비스 품질 개선을 위하여 회원의 단말기 정보, OS 정보 및 버전, 이용하고 있는 가입 통신사 정보, 회원의 서비스 이용 내역 등의 정보를 수집할 수 있습니다.
③ 서비스의 특성에 따라 회원의 개인정보와 관련이 없는 별명·캐릭터 사진·상태정보 등을 소개하는 내용이 공개될 수 있습니다.
④ 회원은 게임 서비스 이용을 위해 자신의 개인정보를 성실히 관리해야 하며, 개인정보 변동 사항이 있을 경우 이를 변경해야 합니다. 회원의 개인정보 변경이 지연되거나 누락되어 발생하는 손해는 회원의 책임으로 합니다.
⑤ 회사는 회원의 귀책사유로 회원의 개인정보 또는 계정정보 등이 유출되어 발생한 피해에 대해 책임을 지지 않습니다.

제3장 이용계약 당사자의 의무

제9조 (회사의 의무)
① 회사는 관련 법령 및 이 약관에서 정하는 권리의 행사 및 의무의 이행을 신의에 따라 성실하게 준수합니다.
② 회사는 회원이 안전하게 서비스를 이용할 수 있도록 개인정보(신용정보 포함) 보호를 위해 보안시스템을 갖추어야 하며 개인정보처리방침을 공시하고 준수합니다. 회사는 관련 법령에 의한 경우와 이 약관 및 개인정보처리방침에서 정한 경우를 제외하고는 회원의 개인정보가 제3자에게 공개되거나 제공되지 않도록 합니다.
③ 회사는 계속적이고 안정적인 서비스의 제공을 위한 개선작업 중 설비에 장애가 생기거나 데이터 등이 멸실·훼손된 때에는 천재지변, 비상사태, 현재의 기술로는 해결이 불가능한 장애나 결함 등 부득이한 사유가 없는 한 지체 없이 이를 수리 또는 복구하도록 최선의 노력을 다합니다.

제10조 (회원의 의무)
① 회원은 회사에서 제공하는 서비스의 이용과 관련하여 다음 각 호에 해당하는 행위를 해서는 안 됩니다.
(1) 이용신청 또는 회원정보 변경 시 허위사실을 기재하거나, 타인의 정보를 사용하는 행위
(2) 회사의 서비스를 이용하여 얻은 정보를 회사의 사전 승낙 없이 복제·유통·조장하거나 상업적으로 이용하는 행위
(3) 타인의 명예를 훼손하거나 모욕하는 행위
(4) 타인의 지적재산권, 초상권 등 권리를 침해하는 행위
(5) 해킹, 악성 프로그램(버그의 악용, 자동화 프로그램 등)의 배포, 접속 권한 초과 행위 등 회사의 정상적인 시스템 운영을 방해하는 행위
(6) 회사의 서비스 및 콘텐츠를 비정상적인 방법으로 이용하거나 시스템에 접근하는 행위
(7) 게임 데이터(계정, 아이템, 게임 머니 등)를 회사가 정한 방법 외의 방법으로 타인과 거래하거나 현금으로 환전·양도하는 행위
(8) 관련 법령에 위반되거나 미풍양속에 반하는 정보를 게시·유통하는 행위
(9) 회사의 동의 없이 영리를 목적으로 서비스를 이용하는 행위
(10) 기타 관련 법령에 위반되거나 회사가 운영정책 등을 통해 금지하는 행위
② 회원은 관계 법령, 이 약관의 규정, 이용안내 및 서비스와 관련하여 공지한 주의사항, 회사가 통지하는 사항 등을 준수하여야 하며, 기타 회사의 업무에 방해되는 행위를 하여서는 안 됩니다.
③ 회원의 계정 및 모바일 기기에 관한 관리책임은 회원에게 있으며, 이를 제3자가 이용하도록 하여서는 안 됩니다. 회원의 관리 소홀로 인해 발생하는 손해에 대해 회사는 책임지지 않습니다.

제4장 서비스의 이용

제11조 (콘텐츠 및 게시물의 저작권)
① 회사가 제작한 콘텐츠에 대한 저작권 및 기타 지적재산권은 회사에 귀속됩니다.
② 회원은 게임서비스를 이용하여 얻은 정보 중 회사 또는 제공업체에 지적재산권이 귀속된 정보를 회사 또는 제공업체의 사전 승낙 없이 복제·전송·출판·배포·방송 기타 방법으로 이용하거나 제3자에게 이용하게 하여서는 안 됩니다.
③ 회원이 서비스 내에 게시한 게시물의 저작권은 해당 게시물의 저작자에게 귀속됩니다. 다만, 회사는 서비스의 운영·전시·전송·배포·홍보의 목적으로 회원의 별도 허락 없이 무상으로 저작권법에 따라 회원이 등록한 게시물을 사용할 수 있습니다.
④ 회사는 회원이 게시하거나 등록한 게시물이 관련 법령 또는 이 약관에 위반되는 경우 관련 법령에 따라 해당 게시물의 게시 중단·삭제 등의 조치를 취할 수 있습니다.

제12조 (서비스의 제공 및 이용)
① 회사는 회원에게 이용계약이 성립된 이후 게임서비스를 이용할 수 있도록 합니다.
② 게임서비스는 연중무휴 1일 24시간 제공을 원칙으로 합니다. 다만, 회사는 서비스의 종류나 성질에 따라 제공하는 서비스 중 일부에 대해서는 별도로 이용시간을 정할 수 있으며, 이 경우 사전에 공지합니다.
③ 회사는 컴퓨터 등 정보통신설비의 보수점검·교체 및 고장, 통신두절 또는 운영상 상당한 이유가 있는 경우 게임서비스의 제공을 일시적으로 중단할 수 있습니다.

제13조 (서비스의 변경)
① 회사는 안정적인 서비스 제공을 위하여 서비스의 내용, 운영상·기술상 사항 등을 변경할 수 있습니다.
② 회사는 서비스를 변경할 경우 변경 내용과 적용일자를 명시하여 사전에 공지합니다. 다만, 회원의 권리·의무에 중대한 영향을 미치는 변경의 경우에는 적용일자 30일 이전에 공지합니다.
③ 회원은 서비스 변경에 동의하지 않을 경우 이용계약을 해지할 수 있습니다.

제14조 (서비스의 중단)
① 회사는 다음 각 호에 해당하는 경우 서비스의 전부 또는 일부를 제한하거나 중단할 수 있습니다.
(1) 서비스용 설비의 보수 등 공사로 인한 부득이한 경우
(2) 회원이 회사의 영업활동을 방해하는 경우
(3) 정전, 제반 설비의 장애 또는 이용량의 폭주 등으로 정상적인 서비스 이용에 지장이 있는 경우
(4) 천재지변, 국가비상사태 등 불가항력적 사유가 있는 경우
② 회사는 서비스를 중단할 경우 그 사유와 기간 등을 회원에게 사전에 공지합니다. 다만, 사전에 공지할 수 없는 부득이한 사정이 있는 경우 사후에 공지할 수 있습니다.

제15조 (정보의 제공 및 광고의 게재)
① 회사는 회원에게 서비스 이용에 필요한 정보나 공지사항을 서비스 화면에 게시하거나 전자우편, 문자메시지 등의 방법으로 제공할 수 있습니다.
② 회사는 서비스와 관련하여 서비스 화면, 홈페이지, 전자우편 등에 광고를 게재할 수 있습니다. 광고성 정보를 전송하는 경우에는 관련 법령에 따라 수신자의 사전 동의를 받으며, 회원은 언제든지 수신을 거부할 수 있습니다.

제5장 유료서비스

제16조 (유료서비스의 결제)
① 회원은 회사가 제공하는 유료 콘텐츠(유료 아이템 등)를 오픈마켓 사업자 등이 제공하는 결제수단을 통해 구매할 수 있습니다.
② 유료 콘텐츠의 결제금액은 각 오픈마켓 사업자의 정책 및 결제수단에 따라 부과·청구되며, 결제와 관련한 사항은 해당 오픈마켓 사업자 및 결제업체의 정책에 따릅니다.
③ 미성년자가 법정대리인의 동의 없이 유료 콘텐츠를 결제한 경우, 본인 또는 법정대리인은 관련 법령에 따라 해당 결제를 취소할 수 있습니다.

제17조 (확률형 아이템에 관한 정보의 제공)
회사는 유료로 판매하는 확률형 아이템을 제공하는 경우 「게임산업진흥에 관한 법률」 및 관련 법령에 따라 아이템의 종류·구성비율·획득확률 등 관련 정보를 게임서비스 및 그 광고·선전물에 표시합니다.

제18조 (청약철회 및 환불)
① 회사와 유료 콘텐츠 이용에 관한 계약을 체결한 회원은 관련 법령에 따라 구매일 또는 이용 가능일 중 늦은 날부터 7일 이내에 청약철회를 할 수 있습니다.
② 다음 각 호의 경우에는 회원의 청약철회가 제한될 수 있으며, 이 경우 회사는 청약철회가 제한되는 유료 콘텐츠에 대해 그 사실을 구매 과정에서 회원이 알 수 있도록 표시합니다.
(1) 구매 즉시 사용되거나 적용되는 유료 콘텐츠
(2) 개봉 또는 사용으로 그 가치가 현저히 감소하는 유료 콘텐츠
(3) 추가적인 혜택이 부여된 유료 콘텐츠에서 그 혜택을 사용한 경우
(4) 기타 거래의 안전을 위하여 관련 법령에서 정하는 경우
③ 회사는 회원이 청약철회를 한 경우 지체 없이 회원의 결제수단을 통해 대금을 환급하며, 환급이 지연되는 경우 관련 법령에서 정하는 지연이자를 지급합니다. 결제업체의 정책에 따라 환급이 이루어지는 경우 해당 정책에 따릅니다.

제19조 (과오납금의 환급)
① 회사는 과오납금이 발생하는 경우 회원이 결제한 방법과 동일한 방법으로 과오납금을 환급합니다. 다만, 동일한 방법으로 환급이 불가능할 때에는 이를 사전에 고지합니다.
② 회사의 책임 있는 사유로 과오납금이 발생한 경우 회사는 계약비용, 수수료 등에 관계없이 과오납금 전액을 환급합니다. 다만, 회원의 책임 있는 사유로 과오납금이 발생한 경우 회사가 과오납금을 환급하는 데 소요되는 비용은 합리적인 범위 내에서 회원이 부담할 수 있습니다.

제6장 계약 해지 및 이용 제한

제20조 (회원의 계약 해지)
① 회원은 언제든지 서비스 내 회원탈퇴(계정 삭제) 절차 등을 통해 이용계약의 해지를 신청할 수 있으며, 회사는 관련 법령이 정하는 바에 따라 이를 처리합니다.
② 회원이 계약을 해지하는 경우 관련 법령 및 개인정보처리방침에 따라 회사가 회원정보를 보유하는 경우를 제외하고 해지 즉시 회원의 계정정보 및 데이터는 삭제되어 복구할 수 없습니다.

제21조 (회사의 이용 제한 및 계약 해지)
① 회사는 회원이 이 약관 또는 관련 법령을 위반하는 경우, 위반 행위의 경중에 따라 경고, 일시정지, 영구이용정지 등으로 서비스 이용을 단계적으로 제한하거나 이용계약을 해지할 수 있습니다.
② 회사가 제1항에 따라 이용을 제한하거나 계약을 해지하는 경우, 회사는 그 사유·일시 및 기간을 정하여 제24조의 방법으로 회원에게 통지합니다. 다만, 회사가 긴급하게 이용을 정지할 필요가 있다고 인정하는 경우에는 그러하지 아니합니다.
③ 회원은 회사의 이용제한 조치에 대해 회사가 정한 절차에 따라 이의를 제기할 수 있으며, 회사는 이의가 정당하다고 인정하는 경우 즉시 서비스 이용을 재개합니다.

제22조 (서비스의 종료)
① 회사는 게임서비스를 종료하고자 하는 경우 종료 예정일부터 30일 이전에 종료 일자, 사유 및 보상조건 등을 게임서비스 초기화면 또는 그 연결 화면에 게시하고 제24조의 방법으로 회원에게 통지합니다.
② 회사는 서비스 종료 후에도 관련 법령에서 정하는 기간 동안 회원의 환불 등 문의를 처리하기 위한 창구를 운영합니다.
③ 회원이 보유한 유료 아이템 중 사용하지 않은 부분에 대해서는 관련 법령 및 회사가 공지하는 보상기준에 따라 환급합니다.

제7장 손해배상 및 분쟁의 해결

제23조 (손해배상)
① 회사 또는 회원이 이 약관을 위반하여 상대방에게 손해를 입힌 경우 그 손해를 배상할 책임이 있습니다. 다만, 고의 또는 과실이 없는 경우에는 그러하지 아니합니다.
② 회사가 개별 서비스 제공자와 제휴 계약을 맺고 회원에게 개별 서비스를 제공하는 경우, 회원이 개별 서비스 이용약관에 동의한 뒤 개별 서비스 이용 시 발생한 손해에 대해서는 해당 개별 서비스 제공자와 회원이 해결하여야 합니다.

제24조 (회원에 대한 통지)
① 회사가 회원에게 통지를 하는 경우 회원이 지정한 전자우편주소, 문자메시지, 서비스 내 알림 등으로 할 수 있습니다.
② 회사는 회원 전체에 대한 통지의 경우 7일 이상 게임서비스 초기화면 또는 그 연결 화면에 게시함으로써 제1항의 통지에 갈음할 수 있습니다. 다만, 회원 본인의 거래와 관련하여 중대한 영향을 미치는 사항에 대하여는 개별 통지합니다.

제25조 (면책조항)
① 회사는 천재지변, 국가비상사태, 해결이 곤란한 기술적 결함 기타 불가항력으로 인하여 서비스를 제공할 수 없는 경우에는 서비스 제공에 관한 책임이 면제됩니다.
② 회사는 회원의 귀책사유로 인한 서비스 이용의 장애 또는 손해에 대하여 책임을 지지 않습니다.
③ 회사는 회원 상호 간 또는 회원과 제3자 상호 간에 서비스를 매개로 발생한 분쟁에 대해 개입할 의무가 없으며, 이로 인한 손해를 배상할 책임이 없습니다.
④ 회사는 무료로 제공되는 서비스의 이용과 관련하여 관련 법령에 특별한 규정이 없는 한 회원에게 발생한 손해에 대하여 책임을 지지 않습니다.

제26조 (분쟁의 해결 및 재판관할)
① 회사와 회원은 서비스와 관련하여 발생한 분쟁을 원만하게 해결하기 위하여 필요한 모든 노력을 하여야 합니다.
② 제1항의 노력에도 불구하고 분쟁이 해결되지 않을 경우 양 당사자는 관련 법령에 따라 콘텐츠분쟁조정위원회 등에 분쟁의 조정을 신청할 수 있습니다.
③ 이 약관은 대한민국 법령에 따라 규율되고 해석되며, 서비스 이용과 관련하여 회사와 회원 간에 발생한 소송의 관할법원은 「민사소송법」에 따라 정합니다.

부칙
이 약관은 2024년 09월 01일부터 시행됩니다.`,
      en: `Chapter 1 General Provisions

Article 1 (Purpose)
These Terms govern the rights, obligations, responsibilities, and other necessary matters between GAHEE Co., Ltd. (the "Company") and its members in relation to the use of the games and incidental services (the "Game Services") provided by the Company.

Article 2 (Definitions)
① The definitions of terms used in these Terms are as follows.
(1) "Company" means the business operator that provides the Game Services through online or mobile devices.
(2) "Member" means a person who enters into a service agreement with the Company under these Terms and uses the Game Services provided by the Company.
(3) "Temporary member (guest)" means a Member who uses the Game Services without linking or authenticating account information with an external account, or through a guest login function.
(4) "Mobile device" means a device on which content can be downloaded or installed for use, such as a mobile phone, smartphone, PDA, or tablet.
(5) "Account information" collectively refers to a Member's membership number, external account information, nickname, profile picture, friend list, and other general information provided by the Member to the Company, as well as device information, game usage information (character information, items, level, etc.), and payment information.
(6) "Content" means all paid or free materials produced digitally by the Company in connection with the provision of the Game Services (games and network services, applications, game money, game items, etc.).
(7) "Application" means all programs downloaded or installed and used through a mobile device or a launcher program provided by the Company in order to use the Game Services.
(8) "Game world" means the variable virtual world implemented on the game server so that multiple Members can play according to certain rules (the "Game Rules") through the Game Services, or engage in leisure, socializing, information exchange, and the like incidental to play.
(9) "Open market" means the e-commerce environment established so that applications can be installed and paid for on a mobile device.
(10) "Payment company" means a company that provides electronic means of payment available in the open market, such as credit cards and mobile phone billing.
(11) "Affiliated service" means the individual or collective services that the Company provides by entering into affiliate agreements with mobile platform providers such as Kakao and Line, enabling a Member to use content on a mobile device with the sign-up information, profile picture, etc. from the affiliated platform.
(12) "Personal profile" means the membership number and nickname assigned to identify a user on mobile platform services such as KakaoTalk, Google, and Facebook, and includes the profile picture set by the user.
(13) "Item" means data, or a perceptible representation thereof, that can indicate goods, means of exchange, in-game money, usage rights, or other fixed or random result values usable within the game.
(14) "Paid purchase" means the act by which a Member makes a payment through a payment company recognized by the Company in order to use content within the game service.
(15) "Paid item" means an item purchased through a paid purchase.
(16) "Free item" means an item provided by the Company to a Member free of charge (including paid items provided free of charge).
② Except as provided in each subparagraph of Paragraph 1 of this Article, the definitions of terms used in these Terms follow the relevant laws and general commercial practice.

Article 3 (Provision of Company Information, etc.)
The Company displays the following within the Game Services so that Members can easily identify them. However, the privacy policy and terms may be made available for Members to view through a linked page.
(1) Trade name and the name of the representative
(2) Address of the place of business (including the address where Member complaints can be handled)
(3) Telephone number and email address
(4) Business registration number
(5) Mail-order business report number
(6) Privacy policy
(7) Service terms of use

Article 4 (Effect and Amendment of the Terms)
① The Company posts the content of these Terms on the initial service screen or the Company's website or official café, or provides a linked page, so that Members can easily be aware of it. A Member is deemed to have agreed to these Terms when the Member downloads and runs the Company's game, clicks the consent button of these Terms, and proceeds with normal gameplay.
② The Company drafts these Terms so that a person who wishes to use the service (the "Member") can easily understand them, and before consent, clearly displays or provides a separate linked page or pop-up screen for important matters such as suspension of the Game Services, withdrawal of subscription, refund of overpayments, cancellation and termination of the contract, the Company's disclaimers, and compensation for Member damages.
③ The Company may amend these Terms within the scope that does not violate the relevant laws, such as the Act on Consumer Protection in Electronic Commerce, etc., the Act on the Regulation of Terms and Conditions, the Game Industry Promotion Act, the Act on Promotion of Information and Communications Network Utilization and Information Protection, and the Content Industry Promotion Act.
④ When the Company amends these Terms, it specifies the effective date, the amended content, and the reasons for amendment, and posts them within the Game Services or on a linked page to notify Members at least 7 days before the effective date. However, where the amended content is unfavorable to Members or constitutes a material change, the Company gives notice at least 30 days before the effective date in the same manner and notifies Members by the method set out in Article 24, Paragraph 1. In this case, the Company clearly compares the content before and after the amendment so that Members can easily understand it.
⑤ When the Company amends these Terms, it confirms the Member's consent to the application of the amended Terms after giving notice. When giving notice under Paragraph 4, the Company also notifies that a Member may be deemed to have consented if the Member does not express consent to or refusal of the amended Terms, and if the Member does not express refusal by the effective date of these Terms, the Member may be deemed to have consented to the amended Terms.
⑥ If a Member does not agree to the amended Terms, the Company or the Member may terminate the service agreement.
⑦ The Company takes measures so that Members can raise questions and receive answers regarding the content of these Terms.
⑧ Consenting to these Terms means consenting to periodically visit the service to check for changes to the Terms. The Company is not responsible for damages caused by the amended Terms or damages incurred by a Member due to the Member's negligence in not being aware of the amended Terms.
⑨ Upon consent to these Terms, these Terms take effect with respect to the Member.

Article 5 (Rules Outside the Terms)
The Company may establish separate terms of use, rules, and operating policies (the "Individual Service Terms, etc.") for individual game services, and where such content conflicts with these Terms, the Individual Service Terms, etc. shall prevail. Matters not stipulated in these Terms and the interpretation of these Terms are governed by the Individual Service Terms, etc. and by the relevant laws and commercial practice, such as the Act on Consumer Protection in Electronic Commerce, etc., the Act on the Regulation of Terms and Conditions, the Game Industry Promotion Act, the Personal Information Protection Act, the Act on Promotion of Information and Communications Network Utilization and Information Protection, the Content Industry Promotion Act, and the Copyright Act.

Article 6 (Conclusion and Application of the Service Agreement)
① A user who wishes to become a Member shall enter into a service agreement with the Company. The service agreement is concluded when the user provides the personal information necessary for the provision of the service, agrees to these Terms, and applies for use, and the Company approves the user's use.
② An applicant shall provide the various information required by the Company at the time of application.
③ An applicant shall enter the applicant's actual information in accordance with the relevant laws at the time of application. If the applicant enters false real-name or identification information or misappropriates another person's name, the applicant may not assert the rights of a Member under these Terms, and the Company may cancel or terminate the service agreement without a refund.
④ Where an applicant who wishes to become a Member is a minor (including students enrolled in high school as defined in Article 2 of the Elementary and Secondary Education Act), the applicant shall obtain the consent of a legal representative, and the specific consent procedure follows the method provided by the Company in accordance with the Game Industry Promotion Act and its Enforcement Decree. However, where the service is provided through Kakao or a mobile platform, the consent under this Article is replaced by the membership sign-up and consent procedure of that mobile platform.
⑤ The Company, in principle, grants approval for service use in the order of users' applications. However, the Company may withhold approval until the relevant cause is resolved in any of the following cases.
(1) Where there is no spare capacity in the Company's facilities or there is a technical obstacle
(2) Where a failure has occurred in the Game Services
(3) Where the applicant is a minor (as defined in Paragraph 4 of this Article) but has not obtained the consent of a legal representative, or such consent cannot be confirmed
(4) Where approval is difficult due to the Company's circumstances for other reasons equivalent to the above
⑥ The Company may refuse approval or restrict service use in any of the following cases.
(1) Where the application content is falsely entered or the application requirements are not met
(2) Where another person's information or mobile device is misappropriated
(3) Where the service is to be used for the purpose of a criminal act prescribed by the Criminal Act
(4) Where the service is to be used for a purpose contrary to the intent of the Juvenile Protection Act
(5) Where the service is to be used for the purpose of pursuing profit
(6) Where a Member in a competitive relationship with the service applies for the purpose of undermining the Company's interests
(7) Where the service is used in a country, among countries other than the Republic of Korea, in which the Company has not yet decided to provide the service, and it is necessary to restrict the provision of the service in connection with an agreement with an overseas service provider or with the provision of the service to Members accessing from a particular country
(8) Where an application for service use is made from a mobile device for which the Company has restricted service use
(9) Where an application is made for the purpose of committing an unlawful act prohibited by the Game Industry Promotion Act, the Act on Promotion of Information and Communications Network Utilization and Information Protection, or other relevant laws
(10) Where the application violates other matters prescribed by the Company or approval is otherwise deemed inappropriate
⑦ The Company may provide a temporary member (guest) function for the convenience of users. During use of the temporary member (guest) function, in any of the following cases, account information may be deleted or records may not be verifiable, and the account information of the Game Services used through the temporary member (guest) function may not be transferable to subsequent linkage. In such cases, the Company does not guarantee the recovery of account information and bears no liability for compensation or damages, except where caused by the Company's intent or gross negligence.
(1) Where the mobile device is changed
(2) Where the mobile device is modified or reset
(3) Where all or part of the content, such as the application, is deleted from the mobile device
⑧ Once a Member completes entry of the personal information necessary for the terms procedure or service use, the Company enables the Member to use the service immediately, provided there is no matter for which approval should be withheld or refused. However, where a matter for which approval should be refused is discovered afterward, the Company may restrict use or terminate the contract in accordance with these Terms.

Article 7 (Operating Policies)
① In order to prescribe matters necessary to apply these Terms, protect Members' rights and interests, and maintain order within the game world, the Company may establish, as game service operating policies (the "Operating Policies"), matters delegated within a specific scope by these Terms.
② The Company posts the content of the Operating Policies on the initial service screen or the Company's website or official café, or provides a linked page, so that Members can be aware of it.
③ Amendments to the Operating Policies follow the procedure of Article 4, Paragraph 4. However, where an amendment to the Operating Policies falls under any of the following, the Company gives prior notice by the method of Paragraph 2.
(1) Where matters delegated within a specific scope by the Terms are amended
(2) Where matters unrelated to Members' rights and obligations are amended
(3) Where the content of the Operating Policies is not fundamentally different from what is stipulated in the Terms and the Operating Policies are amended within a scope foreseeable by Members

Chapter 2 Management of Personal Information

Article 8 (Protection and Use of Personal Information)
① The Company endeavors to protect Members' personal information, including account information, as prescribed by the relevant laws, and the protection and use of personal information are governed by the relevant laws and the Company's privacy policy. However, the Company's privacy policy does not apply to services provided by third parties that are merely linked, other than the Game Services provided by the Company.
② For the operation and stabilization of the service and the improvement of service quality, the Company may collect information such as a Member's device information, OS type and version, the telecommunications carrier in use, and the Member's service usage history.
③ Depending on the nature of the service, content introducing a Member's nickname, character picture, status information, and the like, which are unrelated to the Member's personal information, may be disclosed.
④ A Member shall faithfully manage the Member's own personal information for use of the game service and shall update it in the event of any change. The Member is responsible for damages arising from a delay or omission in updating the Member's personal information.
⑤ The Company bears no liability for damage arising from the leakage of a Member's personal information or account information due to reasons attributable to the Member.

Chapter 3 Obligations of the Parties to the Service Agreement

Article 9 (Obligations of the Company)
① The Company faithfully complies, in good faith, with the exercise of rights and the performance of obligations prescribed by the relevant laws and these Terms.
② The Company shall establish a security system to protect personal information (including credit information) so that Members can use the service safely, and shall publish and comply with its privacy policy. Except as provided by the relevant laws and as stipulated in these Terms and the privacy policy, the Company ensures that Members' personal information is not disclosed or provided to third parties.
③ Where a facility fails or data is lost or damaged during improvement work for the continuous and stable provision of the service, the Company makes its best effort to repair or restore it without delay, unless there is an unavoidable reason such as a natural disaster, an emergency, or a defect or failure that cannot be resolved with current technology.

Article 10 (Obligations of the Member)
① A Member shall not engage in any of the following acts in connection with the use of the service provided by the Company.
(1) Entering false information at the time of application or when changing member information, or using another person's information
(2) Reproducing, distributing, or promoting information obtained by using the Company's service, or using it commercially, without the Company's prior consent
(3) Defaming or insulting another person
(4) Infringing the intellectual property rights, portrait rights, or other rights of another person
(5) Interfering with the Company's normal system operation, such as hacking, distributing malicious programs (exploiting bugs, automation programs, etc.), or exceeding access authority
(6) Using the Company's services and content in an abnormal manner, or accessing the system in an abnormal manner
(7) Trading game data (accounts, items, game money, etc.) with others, or converting it into cash or transferring it, by a method other than that prescribed by the Company
(8) Posting or distributing information that violates the relevant laws or is contrary to public order and morals
(9) Using the service for profit-making purposes without the Company's consent
(10) Other acts that violate the relevant laws or are prohibited by the Company through its Operating Policies, etc.
② A Member shall comply with the relevant laws, the provisions of these Terms, usage guidance and precautions announced in relation to the service, and matters notified by the Company, and shall not engage in any other act that interferes with the Company's business.
③ Responsibility for managing a Member's account and mobile device rests with the Member, who shall not allow a third party to use them. The Company is not responsible for damages arising from the Member's negligent management.

Chapter 4 Use of the Service

Article 11 (Copyright of Content and Postings)
① Copyright and other intellectual property rights in the content produced by the Company belong to the Company.
② A Member shall not, without the prior consent of the Company or the provider, use — by reproduction, transmission, publication, distribution, broadcasting, or other means — or allow a third party to use, information obtained through the Game Services in which the intellectual property rights belong to the Company or the provider.
③ Copyright in a posting that a Member posts within the service belongs to the author of that posting. However, the Company may, for the purposes of operating, displaying, transmitting, distributing, and promoting the service, use postings registered by the Member in accordance with the Copyright Act, free of charge and without separate permission from the Member.
④ Where a posting that a Member posts or registers violates the relevant laws or these Terms, the Company may take measures such as suspending or deleting the posting in accordance with the relevant laws.

Article 12 (Provision and Use of the Service)
① The Company enables a Member to use the Game Services after the service agreement is concluded.
② The Game Services are, in principle, provided 24 hours a day, year-round. However, the Company may set separate hours of use for some of the services provided, depending on the type or nature of the service, in which case it gives prior notice.
③ The Company may temporarily suspend the provision of the Game Services in the event of maintenance, inspection, or replacement of information and communications facilities such as computers, or a malfunction, communication interruption, or a substantial operational reason.

Article 13 (Change of the Service)
① The Company may change the content of the service and operational or technical matters, etc., in order to provide a stable service.
② When changing the service, the Company gives prior notice specifying the details of the change and the effective date. However, in the case of a change that materially affects Members' rights and obligations, the Company gives notice at least 30 days before the effective date.
③ A Member may terminate the service agreement if the Member does not agree to a change of the service.

Article 14 (Suspension of the Service)
① The Company may restrict or suspend all or part of the service in any of the following cases.
(1) Where it is unavoidable due to construction such as maintenance of service facilities
(2) Where a Member interferes with the Company's business activities
(3) Where there is an obstacle to normal service use due to a power outage, a failure of various facilities, a surge in usage, etc.
(4) Where there is a force majeure event such as a natural disaster or a national emergency
② When suspending the service, the Company gives Members prior notice of the reason and period, etc. However, where there is an unavoidable circumstance in which prior notice cannot be given, the Company may give notice afterward.

Article 15 (Provision of Information and Posting of Advertisements)
① The Company may provide Members with information or notices necessary for using the service by posting them on the service screen or by means such as email or text message.
② The Company may post advertisements in connection with the service on the service screen, website, email, etc. Where transmitting commercial information, the Company obtains the recipient's prior consent in accordance with the relevant laws, and a Member may refuse to receive it at any time.

Chapter 5 Paid Services

Article 16 (Payment for Paid Services)
① A Member may purchase paid content (paid items, etc.) provided by the Company through payment methods provided by open market operators, etc.
② The payment amount for paid content is charged and billed according to the policies and payment methods of each open market operator, and matters related to payment follow the policies of the relevant open market operator and payment company.
③ Where a minor has paid for paid content without the consent of a legal representative, the minor or the legal representative may cancel such payment in accordance with the relevant laws.

Article 17 (Provision of Information on Probability-Type Items)
Where the Company provides probability-type items sold for a fee, the Company displays related information such as the type, composition ratio, and acquisition probability of the items in the Game Services and their advertisements and promotional materials, in accordance with the Game Industry Promotion Act and the relevant laws.

Article 18 (Withdrawal of Subscription and Refund)
① A Member who has entered into a contract with the Company for the use of paid content may withdraw the subscription within 7 days from the later of the date of purchase or the date on which use becomes possible, in accordance with the relevant laws.
② In the following cases, a Member's withdrawal of subscription may be restricted, in which case the Company indicates that withdrawal of subscription is restricted for the relevant paid content so that the Member can be aware of it during the purchase process.
(1) Paid content used or applied immediately upon purchase
(2) Paid content whose value is significantly reduced by opening or use
(3) Where an additional benefit granted to paid content has been used
(4) Other cases prescribed by the relevant laws for the safety of transactions
③ Where a Member withdraws a subscription, the Company refunds the amount without delay through the Member's payment method, and where the refund is delayed, pays the delay interest prescribed by the relevant laws. Where the refund is made according to the payment company's policy, that policy applies.

Article 19 (Refund of Overpayments)
① Where an overpayment occurs, the Company refunds it by the same method used by the Member for payment. However, where a refund by the same method is not possible, the Company gives prior notice.
② Where an overpayment occurs due to a cause attributable to the Company, the Company refunds the full amount of the overpayment regardless of contract costs, fees, etc. However, where an overpayment occurs due to a cause attributable to the Member, the cost incurred by the Company in refunding the overpayment may be borne by the Member within a reasonable scope.

Chapter 6 Termination of Contract and Restriction of Use

Article 20 (Termination of Contract by the Member)
① A Member may at any time apply for termination of the service agreement through the membership withdrawal (account deletion) procedure, etc. within the service, and the Company processes it as prescribed by the relevant laws.
② Where a Member terminates the contract, the Member's account information and data are deleted immediately upon termination and cannot be recovered, except where the Company retains member information in accordance with the relevant laws and the privacy policy.

Article 21 (Restriction of Use and Termination of Contract by the Company)
① Where a Member violates these Terms or the relevant laws, the Company may restrict service use in stages — such as by warning, temporary suspension, or permanent suspension — or terminate the service agreement, depending on the severity of the violation.
② Where the Company restricts use or terminates the contract under Paragraph 1, the Company notifies the Member of the reason, date, and period by the method of Article 24. However, this does not apply where the Company deems it necessary to urgently suspend use.
③ A Member may raise an objection to the Company's restriction measure in accordance with the procedure prescribed by the Company, and where the Company recognizes the objection as justified, it immediately resumes service use.

Article 22 (Termination of the Service)
① Where the Company intends to terminate the Game Services, it posts the termination date, reasons, compensation conditions, etc. on the initial service screen or a linked page at least 30 days before the scheduled termination date, and notifies Members by the method of Article 24.
② Even after termination of the service, the Company operates a channel to handle Members' inquiries, such as refunds, for the period prescribed by the relevant laws.
③ For the unused portion of paid items held by a Member, the Company provides a refund in accordance with the relevant laws and the compensation standards announced by the Company.

Chapter 7 Damages and Dispute Resolution

Article 23 (Damages)
① Where the Company or a Member causes damage to the other party by violating these Terms, it is liable to compensate for such damage. However, this does not apply where there is no intent or negligence.
② Where the Company enters into an affiliate agreement with an individual service provider and provides an individual service to a Member, damages arising from the use of the individual service after the Member has agreed to the individual service terms shall be resolved between the relevant individual service provider and the Member.

Article 24 (Notice to Members)
① Where the Company gives notice to a Member, it may do so by the email address, text message, in-service notification, etc. designated by the Member.
② In the case of notice to all Members, the Company may substitute the notice under Paragraph 1 by posting it on the initial service screen or a linked page for at least 7 days. However, individual notice is given for matters that materially affect the Member's own transactions.

Article 25 (Disclaimer)
① The Company is exempt from responsibility for providing the service where it cannot provide the service due to a natural disaster, a national emergency, a technical defect that is difficult to resolve, or other force majeure.
② The Company is not liable for obstacles to service use or damages arising from causes attributable to the Member.
③ The Company has no obligation to intervene in disputes arising through the service between Members or between a Member and a third party, and is not liable to compensate for damages resulting therefrom.
④ The Company is not liable for damages incurred by a Member in connection with the use of services provided free of charge, unless there is a special provision in the relevant laws.

Article 26 (Dispute Resolution and Jurisdiction)
① The Company and a Member shall make all necessary efforts to amicably resolve any dispute arising in connection with the service.
② Notwithstanding the efforts under Paragraph 1, if a dispute is not resolved, either party may apply for dispute mediation to the Content Dispute Mediation Committee, etc. in accordance with the relevant laws.
③ These Terms are governed by and construed in accordance with the laws of the Republic of Korea, and the court of jurisdiction for any litigation arising between the Company and a Member in connection with the use of the service is determined in accordance with the Civil Procedure Act.

Addendum
These Terms take effect on September 1, 2024.`,
      zh: `第1章 總則

第1條 (目的)
本條款旨在規範 GAHEE 股份有限公司（以下簡稱「公司」）所提供之遊戲及其附隨之各項服務（以下簡稱「遊戲服務」）之使用相關事宜，以及公司與會員間之權利義務、責任事項及其他必要事項。

第2條 (用語之定義)
① 本條款所使用用語之定義如下。
(1) 「公司」指透過線上或行動裝置提供遊戲服務之事業者。
(2) 「會員」指依本條款與「公司」締結使用契約，並使用「公司」所提供「遊戲服務」之人。
(3) 「臨時會員(guest)」指未將「帳號資訊」與外部帳號連動或認證，或透過訪客登入功能使用「遊戲服務」之「會員」。
(4) 「行動裝置」指得下載或安裝「內容」以使用之裝置，如行動電話、智慧型手機、掌上型資訊終端(PDA)、平板等。
(5) 「帳號資訊」指「會員」之會員編號、外部帳號資訊、暱稱、個人檔案照片、好友名單等「會員」提供予「公司」之一般資訊，及裝置資訊、遊戲使用資訊（角色資訊、道具、等級等）、付款資訊等之統稱。
(6) 「內容」指「公司」就「遊戲服務」之提供而以數位方式製作之付費或免費內容物全部（遊戲及網路服務、應用程式、遊戲貨幣、遊戲道具等）。
(7) 「應用程式」指為使用「公司」所提供「遊戲服務」，透過行動裝置或「公司」提供之啟動程式下載或安裝並使用之程式全部。
(8) 「遊戲世界」指透過「遊戲服務」，使多數會員得依一定規則（以下簡稱「遊戲規則」）進行娛樂，或附隨娛樂進行休閒、聯誼、資訊媒介等，而以遊戲伺服器實現之可變虛擬世界。
(9) 「開放市集」指於行動裝置安裝應用程式並得付費之電子商務環境。
(10) 「付款業者」指提供信用卡、行動電話付款等開放市集可用電子支付方式之業者。
(11) 「合作服務」指公司與 Kakao、Line 等行動平台服務商締結合作契約，使會員得利用合作平台之加入資訊、個人檔案照片等，於行動裝置使用內容之個別或全部服務。
(12) 「個人檔案」指於 KakaoTalk、Google、Facebook 等行動平台服務中為識別使用者所賦予之會員編號及暱稱，並包含使用者所設定之照片等個人檔案照片。
(13) 「道具」指得於遊戲內使用之商品、交換手段、遊戲內貨幣、使用權，及其他得表現一定或隨機結果值之資料或其可辨識之表現。
(14) 「付費購買」指會員為使用遊戲服務內之內容等，透過公司認可之付款業者付款之行為。
(15) 「付費道具」指透過付費購買所購得之道具。
(16) 「免費道具」指「公司」無償提供予「會員」之道具（含無償提供之付費道具）。
② 本條款所使用用語之定義，除本條第1項各款所定者外，依相關法令及一般商業慣例。

第3條 (公司資訊等之提供)
公司將下列各款事項於遊戲服務內標示，俾會員易於辨識。但隱私權政策與條款得供會員透過連結畫面閱覽。
(1) 商號及代表人姓名
(2) 營業所所在地地址（含得處理會員投訴之處所地址）
(3) 電話號碼、電子郵件地址
(4) 營業登記編號
(5) 通信販賣業申報編號
(6) 隱私權政策
(7) 服務使用條款

第4條 (條款之效力及變更)
① 公司將本條款之內容於服務初始畫面或公司網站、官方社群刊載，或提供連結畫面公告，俾會員易於知悉。會員下載並執行公司之遊戲，點擊本條款之同意按鈕並進行正常遊戲時，視為已同意本條款。
② 公司就欲使用服務之人（以下簡稱「會員」）製作本條款俾其易於知悉，且於同意前，就條款所定內容中遊戲服務中斷、撤回申請、溢繳金額退還、契約解除・終止、公司之免責事項、對會員之損害賠償等重要內容，明確標示或提供另設之連結畫面或彈出畫面等。
③ 公司於不違反《電子商務等消費者保護相關法律》、《約款規制相關法律》、《遊戲產業振興相關法律》、《資訊通信網利用促進及資訊保護等相關法律》、《內容產業振興法》等相關法令之範圍內，得變更本條款。
④ 公司變更條款時，載明適用日期、變更內容、變更事由等，至遲於適用日 7 日前於遊戲服務內或其連結畫面刊載並向會員公告。但變更內容對會員不利或屬重大事項變更時，於適用日 30 日前以與前述相同方法公告，並依第24條第1項之方法通知會員。此時明確比較變更前後內容俾會員易於知悉。
⑤ 公司變更條款時，於公告變更條款後確認會員就變更條款適用之同意與否。公司為第4項之公告或通知時，一併告知「會員如未就變更條款表示同意或拒絕，得視為同意」之內容，會員如至本條款施行日前未表示拒絕，得視為已同意變更條款。
⑥ 會員不同意變更條款時，公司或會員得終止服務使用契約。
⑦ 公司採取措施，俾會員得就本條款內容與公司進行詢問及回覆。
⑧ 同意本條款，即意謂同意定期造訪服務以確認條款之變更事項。因變更後條款所生之損害，及會員因過失未知悉變更條款內容所生之會員損害，公司不負責任。
⑨ 同意本條款時，本條款對會員生效。

第5條 (條款外準則)
公司就個別遊戲服務等得另設使用條款、規約及營運政策（以下簡稱「個別服務條款等」），該內容與本條款牴觸時，個別服務條款等優先適用。本條款未規定之事項或本條款之解釋，依個別服務等及《電子商務等消費者保護相關法律》、《約款規制相關法律》、《遊戲產業振興相關法律》、《個人資料保護法》、《資訊通信網利用促進及資訊保護等相關法律》、《內容產業振興法》、《著作權法》等相關法令與商業慣例。

第6條 (使用契約之締結及適用)
① 欲成為會員之使用者應與公司締結服務使用契約。服務使用契約於使用者提供服務提供所需之個人資料並同意本條款而申請使用，經公司承諾使用者之使用時成立。
② 申請人應於申請時提供公司所要求之各項資訊。
③ 申請人應於申請時依相關法令記載本人之真實資訊。虛偽記載實名或識別資訊或冒用他人名義時，不得主張本條款所定會員之權利，公司得不予退款而取消或終止使用契約。
④ 欲成為會員之申請人為青少年（含依《初・中等教育法》第2條規定之高級中學在學學生）而申請使用時，應取得法定代理人之同意，具體同意程序依《遊戲產業振興相關法律》及施行令，按公司所提供之方法。但透過 Kakao 及行動平台提供服務時，本條之同意以上述行動平台之會員加入及同意程序代之。
⑤ 公司原則上依使用者之服務使用申請順序進行服務使用之承諾。但於下列各款情形，得於該事由解消前保留承諾。
(1) 公司設備無餘裕或有技術性障礙時
(2) 遊戲服務發生障礙時
(3) 雖為青少年（與本條第4項所定青少年相同）卻未取得法定代理人同意，或無法確認已取得同意時
(4) 其他準於前述而因公司情事致承諾使用有困難時
⑥ 公司於下列各款情形，得不予承諾或限制服務使用。
(1) 虛偽記載申請內容或未符合申請要件時
(2) 冒用他人資訊或行動裝置時
(3) 以《刑法》所定犯罪行為為目的而欲使用服務時
(4) 以違反《青少年保護法》宗旨之目的而欲使用服務時
(5) 以營利為目的而欲使用服務時
(6) 與服務具競爭關係之會員以妨害公司利益為目的而申請時
(7) 於大韓民國以外國家中公司尚未決定提供服務之國家使用服務，且就公司與海外服務業者締結之契約或就自特定國家連線之會員之服務提供，有限制服務提供之必要時
(8) 自公司限制服務使用之行動裝置提出服務使用申請時
(9) 以從事《遊戲產業振興相關法律》、《資訊通信網利用促進及資訊保護等相關法律》及其他相關法令所禁止違法行為為目的而申請使用時
(10) 其他違反公司所定事項而申請，或承諾經判斷為不適當時
⑦ 公司為使用者之便利，得就遊戲服務提供臨時會員(guest)功能。臨時會員(guest)功能使用中於下列各款情形，可能發生帳號資訊遭刪除或無法確認紀錄之問題，且透過臨時會員(guest)功能使用之遊戲服務帳號資訊，其後可能無法連接移轉。此時公司不保證帳號資訊之復原，並不就其補償及損害賠償負責。但因公司之故意或重大過失者，不在此限。
(1) 變更行動裝置時
(2) 改造或初始化行動裝置時
(3) 自行動裝置刪除應用程式等內容之全部或一部時
⑧ 公司於會員完成條款程序或服務使用所需個人資料之輸入後，如無應保留或拒絕承諾之事項，即刻使其得使用服務。但事後發現應拒絕承諾之事項時，得依本條款之規定為使用限制或契約終止。

第7條 (營運政策)
① 為規範適用本條款所需事項、保護會員權益及維持遊戲世界內秩序，公司得將條款以具體範圍委任之事項訂為遊戲服務營運政策（以下簡稱「營運政策」）。
② 公司將營運政策之內容於服務初始畫面或公司網站、官方社群刊載，或提供連結畫面，俾會員知悉。
③ 變更營運政策時依第4條第4項之程序。但營運政策之變更屬下列任一款時，以第2項之方法事前公告。
(1) 就條款以具體範圍委任之事項為變更時
(2) 就與會員權利義務無關之事項為變更時
(3) 營運政策之內容與條款所定內容無根本差異，且於會員可預測範圍內變更營運政策時

第2章 個人資料管理

第8條 (個人資料之保護及使用)
① 公司依相關法令所定，為保護含帳號資訊之會員個人資料而努力，個人資料之保護及使用依相關法令及公司之隱私權政策。但就公司所提供遊戲服務以外，僅單純連結之第三方提供服務，不適用公司之隱私權政策。
② 為服務之營運及穩定化、服務品質改善，得蒐集會員之終端裝置資訊、OS 資訊及版本、所使用之加入電信商資訊、會員之服務使用明細等資訊。
③ 依服務特性，與會員個人資料無關之暱稱・角色照片・狀態資訊等介紹內容可能公開。
④ 會員為使用遊戲服務，應誠實管理自身之個人資料，個人資料有變動時應予變更。因會員個人資料變更延遲或遺漏所生之損害，由會員負責。
⑤ 因會員之可歸責事由致會員之個人資料或帳號資訊等外洩所生之損害，公司不負責任。

第3章 使用契約當事人之義務

第9條 (公司之義務)
① 公司依相關法令及本條款所定，本於誠信誠實遵守權利之行使及義務之履行。
② 公司為使會員得安全使用服務，應建置保安系統以保護個人資料（含信用資訊），並公示及遵守隱私權政策。除依相關法令之情形及本條款與隱私權政策所定情形外，公司使會員之個人資料不對第三方公開或提供。
③ 公司於為持續且穩定提供服務之改善作業中，設備發生障礙或資料等滅失・毀損時，除天災地變、緊急事態、以現有技術無法解決之障礙或瑕疵等不得已事由外，即刻盡最大努力予以修復或復原。

第10條 (會員之義務)
① 會員就公司所提供服務之使用，不得為下列各款行為。
(1) 於申請或變更會員資訊時虛偽記載，或使用他人資訊之行為
(2) 未經公司事前承諾，複製・流通・助長利用公司服務所得資訊，或供商業利用之行為
(3) 毀損或侮辱他人名譽之行為
(4) 侵害他人智慧財產權、肖像權等權利之行為
(5) 駭客攻擊、散布惡意程式（濫用漏洞、自動化程式等）、逾越存取權限等妨害公司正常系統營運之行為
(6) 以異常方法使用公司之服務及內容，或以異常方法存取系統之行為
(7) 以公司所定方法以外之方法，將遊戲資料（帳號、道具、遊戲貨幣等）與他人交易或兌換現金・讓與之行為
(8) 刊載・流通違反相關法令或違背善良風俗資訊之行為
(9) 未經公司同意以營利為目的使用服務之行為
(10) 其他違反相關法令或公司透過營運政策等所禁止之行為
② 會員應遵守相關法令、本條款之規定、就服務所公告之使用指引及注意事項、公司所通知之事項等，並不得為其他妨害公司業務之行為。
③ 會員帳號及行動裝置之管理責任在於會員，不得使第三方使用。因會員管理疏忽所生之損害，公司不負責任。

第4章 服務之使用

第11條 (內容及刊載物之著作權)
① 公司所製作內容之著作權及其他智慧財產權歸屬於公司。
② 會員不得未經公司或提供業者事前承諾，就利用遊戲服務所得資訊中著作權歸屬於公司或提供業者之資訊，以複製・傳輸・出版・散布・播送或其他方法利用，或使第三方利用。
③ 會員於服務內刊載之刊載物，其著作權歸屬於該刊載物之著作人。但公司為服務之營運・展示・傳輸・散布・宣傳之目的，得未經會員另行許可而無償依著作權法使用會員所登錄之刊載物。
④ 會員所刊載或登錄之刊載物違反相關法令或本條款時，公司得依相關法令為該刊載物之刊載中斷・刪除等措施。

第12條 (服務之提供及使用)
① 公司於使用契約成立後，使會員得使用遊戲服務。
② 遊戲服務原則上全年無休、1日24小時提供。但公司得依服務之種類或性質，就所提供服務中一部另定使用時間，此時事前公告。
③ 公司於電腦等資訊通信設備之維修檢查・更換及故障、通信中斷或有營運上相當理由時，得暫時中斷遊戲服務之提供。

第13條 (服務之變更)
① 公司為穩定提供服務，得變更服務之內容、營運上・技術上事項等。
② 公司變更服務時，載明變更內容與適用日期事前公告。但對會員權利義務有重大影響之變更，於適用日 30 日前公告。
③ 會員不同意服務變更時，得終止使用契約。

第14條 (服務之中斷)
① 公司於下列各款情形，得限制或中斷服務之全部或一部。
(1) 因服務用設備之維修等工程而不得已時
(2) 會員妨害公司營業活動時
(3) 因停電、各項設備之障礙或使用量暴增等致正常服務使用受阻時
(4) 有天災地變、國家緊急事態等不可抗力事由時
② 公司中斷服務時，將其事由與期間等事前向會員公告。但有無法事前公告之不得已情事時，得事後公告。

第15條 (資訊之提供及廣告之刊載)
① 公司得將服務使用所需資訊或公告事項刊載於服務畫面，或以電子郵件、簡訊等方法提供予會員。
② 公司得就服務於服務畫面、網站、電子郵件等刊載廣告。傳送廣告性資訊時，依相關法令取得收件人之事前同意，會員得隨時拒絕接收。

第5章 付費服務

第16條 (付費服務之付款)
① 會員得透過開放市集業者等所提供之付款方式，購買公司所提供之付費內容（付費道具等）。
② 付費內容之付款金額，依各開放市集業者之政策及付款方式課予・請求，付款相關事項依該開放市集業者及付款業者之政策。
③ 未成年人未經法定代理人同意付款購買付費內容時，本人或法定代理人得依相關法令取消該付款。

第17條 (機率型道具相關資訊之提供)
公司提供付費販售之機率型道具時，依《遊戲產業振興相關法律》及相關法令，將道具之種類・組成比率・獲得機率等相關資訊標示於遊戲服務及其廣告・宣傳物。

第18條 (撤回申請及退款)
① 與公司締結付費內容使用契約之會員，得依相關法令，自購買日或可使用日中之較晚日起 7 日內撤回申請。
② 於下列各款情形，會員之撤回申請可能受限，此時公司就撤回申請受限之付費內容，於購買過程標示該事實俾會員知悉。
(1) 購買後即刻使用或適用之付費內容
(2) 因開封或使用致其價值顯著減少之付費內容
(3) 就附加額外優惠之付費內容已使用該優惠時
(4) 其他為交易安全而由相關法令所定之情形
③ 會員撤回申請時，公司即刻透過會員之付款方式退還款項，退款遲延時支付相關法令所定之遲延利息。依付款業者政策退款時，依該政策。

第19條 (溢繳金額之退還)
① 發生溢繳金額時，公司以與會員付款相同之方法退還溢繳金額。但無法以相同方法退還時，事前告知。
② 因公司之可歸責事由發生溢繳金額時，公司不論契約費用、手續費等，退還溢繳金額全額。但因會員之可歸責事由發生溢繳金額時，公司退還溢繳金額所需費用，得於合理範圍內由會員負擔。

第6章 契約終止及使用限制

第20條 (會員之契約終止)
① 會員得隨時透過服務內之退出會員（刪除帳號）程序等，申請使用契約之終止，公司依相關法令所定處理之。
② 會員終止契約時，除依相關法令及隱私權政策公司保存會員資訊之情形外，終止後即刻刪除會員之帳號資訊及資料，無法復原。

第21條 (公司之使用限制及契約終止)
① 會員違反本條款或相關法令時，公司得依違反行為之輕重，以警告、暫時停止、永久停止使用等分階段限制服務使用，或終止使用契約。
② 公司依第1項限制使用或終止契約時，訂明其事由・日時及期間，依第24條之方法通知會員。但公司認有緊急停止使用之必要時，不在此限。
③ 會員得依公司所定程序，就公司之使用限制措施提出異議，公司認異議正當時，即刻恢復服務使用。

第22條 (服務之終止)
① 公司欲終止遊戲服務時，至遲於預定終止日 30 日前，將終止日期、事由及補償條件等刊載於遊戲服務初始畫面或其連結畫面，並依第24條之方法通知會員。
② 公司於服務終止後，於相關法令所定期間內，營運處理會員退款等詢問之窗口。
③ 就會員所持有付費道具中未使用部分，依相關法令及公司所公告之補償基準退還。

第7章 損害賠償及糾紛之解決

第23條 (損害賠償)
① 公司或會員違反本條款致他方受損害時，負賠償該損害之責任。但無故意或過失時，不在此限。
② 公司與個別服務提供者締結合作契約而向會員提供個別服務時，會員同意個別服務使用條款後，就使用個別服務時所生之損害，應由該個別服務提供者與會員解決。

第24條 (對會員之通知)
① 公司對會員為通知時，得以會員所指定之電子郵件地址、簡訊、服務內通知等為之。
② 就全體會員之通知，公司得於遊戲服務初始畫面或其連結畫面刊載 7 日以上，以代第1項之通知。但就對會員本人交易有重大影響之事項，為個別通知。

第25條 (免責條款)
① 公司因天災地變、國家緊急事態、難以解決之技術性瑕疵或其他不可抗力致無法提供服務時，免除服務提供相關之責任。
② 公司就因會員之可歸責事由所生服務使用之障礙或損害，不負責任。
③ 公司就會員相互間或會員與第三方相互間以服務為媒介所生之糾紛，無介入義務，並不就其所生損害負賠償責任。
④ 公司就免費提供服務之使用，除相關法令另有特別規定外，縱會員受有損害亦不負責任。

第26條 (糾紛之解決及裁判管轄)
① 公司與會員為圓滿解決就服務所生之糾紛，應盡一切必要之努力。
② 縱經第1項之努力糾紛仍未解決時，雙方當事人得依相關法令向內容糾紛調整委員會等申請糾紛之調整。
③ 本條款依大韓民國法令規律及解釋，就服務使用而於公司與會員間所生訴訟之管轄法院，依《民事訴訟法》定之。

附則
本條款自 2024 年 09 月 01 日起施行。`,
      ru: `Глава 1. Общие положения

Статья 1 (Цель)
Настоящие Условия регулируют права, обязанности, вопросы ответственности и иные необходимые вопросы между компанией GAHEE Co., Ltd. (далее — «Компания») и участниками в связи с использованием игр и сопутствующих услуг (далее — «Игровые услуги»), предоставляемых Компанией.

Статья 2 (Определения)
① Определения терминов, используемых в настоящих Условиях, следующие.
(1) «Компания» означает предпринимателя, предоставляющего Игровые услуги через онлайн- или мобильные устройства.
(2) «Участник» означает лицо, заключившее с «Компанией» договор об использовании в соответствии с настоящими Условиями и использующее «Игровые услуги», предоставляемые «Компанией».
(3) «Временный участник (guest)» означает «Участника», использующего «Игровые услуги» без привязки или аутентификации «учётных данных» с внешней учётной записью либо через функцию гостевого входа.
(4) «Мобильное устройство» означает устройство, на которое можно загрузить или установить «Контент» для использования, например мобильный телефон, смартфон, КПК (PDA), планшет и т. п.
(5) «Учётные данные» — совокупность общей информации, предоставленной «Участником» «Компании» (номер участника, данные внешней учётной записи, псевдоним, фото профиля, список друзей и т. п.), а также информации об устройстве, информации об игровом использовании (данные персонажа, предметы, уровень и т. п.) и платёжной информации.
(6) «Контент» означает всю совокупность платных или бесплатных материалов, созданных «Компанией» в цифровой форме в связи с предоставлением «Игровых услуг» (игры и сетевые услуги, приложения, игровая валюта, игровые предметы и т. п.).
(7) «Приложение» означает всю совокупность программ, загружаемых или устанавливаемых и используемых через мобильное устройство или программу-лаунчер, предоставляемую «Компанией», для использования «Игровых услуг».
(8) «Игровой мир» означает изменяемый виртуальный мир, реализованный на игровом сервере, в котором множество участников могут играть по определённым правилам (далее — «Правила игры») либо, сопутственно игре, проводить досуг, общаться, обмениваться информацией и т. п.
(9) «Открытый магазин» означает среду электронной торговли, созданную для установки приложений и осуществления платежей на мобильном устройстве.
(10) «Платёжная компания» означает компанию, предоставляющую доступные в открытом магазине электронные средства платежа, такие как кредитные карты и оплата с мобильного телефона.
(11) «Партнёрская услуга» означает отдельные или совокупные услуги, которые Компания предоставляет, заключая партнёрские договоры с операторами мобильных платформ, такими как Kakao и Line, позволяя участнику использовать контент на мобильном устройстве с помощью регистрационных данных, фото профиля и т. п. с партнёрской платформы.
(12) «Личный профиль» означает номер участника и псевдоним, присвоенные для идентификации пользователя в услугах мобильных платформ, таких как KakaoTalk, Google и Facebook, и включает фото профиля, установленное пользователем.
(13) «Предмет» означает данные или их воспринимаемое представление, способные обозначать товары, средства обмена, внутриигровую валюту, права пользования либо иные фиксированные или случайные значения результата, используемые в игре.
(14) «Платная покупка» означает действие, при котором участник производит оплату через признанную Компанией платёжную компанию для использования контента в рамках игровой услуги.
(15) «Платный предмет» означает предмет, приобретённый посредством платной покупки.
(16) «Бесплатный предмет» означает предмет, предоставленный «Компанией» «Участнику» безвозмездно (включая платные предметы, предоставленные безвозмездно).
② Определения терминов, используемых в настоящих Условиях, за исключением установленных в каждом подпункте пункта 1 настоящей статьи, следуют соответствующему законодательству и общей коммерческой практике.

Статья 3 (Предоставление информации о Компании и др.)
Компания отображает в рамках Игровых услуг следующие сведения, чтобы участники могли легко с ними ознакомиться. При этом политика конфиденциальности и условия могут быть предоставлены участникам для ознакомления через связанную страницу.
(1) Фирменное наименование и имя представителя
(2) Адрес места ведения деятельности (включая адрес, по которому могут рассматриваться жалобы участников)
(3) Номер телефона, адрес электронной почты
(4) Регистрационный номер предприятия
(5) Регистрационный номер бизнеса дистанционной торговли
(6) Политика конфиденциальности
(7) Условия использования услуги

Статья 4 (Действие и изменение Условий)
① Компания размещает содержание настоящих Условий на начальном экране сервиса либо на сайте или в официальном кафе Компании, либо предоставляет связанную страницу, чтобы участники могли легко ознакомиться. Участник считается согласившимся с настоящими Условиями, когда он загружает и запускает игру Компании, нажимает кнопку согласия с настоящими Условиями и приступает к обычной игре.
② Компания составляет настоящие Условия так, чтобы лицо, желающее использовать сервис (далее — «Участник»), могло легко с ними ознакомиться, и до выражения согласия чётко отображает либо предоставляет отдельную связанную страницу или всплывающий экран для важных положений, таких как приостановка Игровых услуг, отзыв оферты, возврат переплаты, расторжение и прекращение договора, оговорки об освобождении Компании от ответственности и компенсация ущерба участникам.
③ Компания вправе изменять настоящие Условия в пределах, не нарушающих соответствующее законодательство, такое как Закон о защите прав потребителей в электронной торговле и т. п., Закон о регулировании условий и оговорок, Закон о содействии игровой индустрии, Закон о содействии использованию информационно-коммуникационных сетей и о защите информации, Закон о содействии индустрии контента.
④ При изменении Условий Компания указывает дату вступления в силу, содержание изменений, причины изменений и т. п. и размещает их в рамках Игровых услуг или на связанной странице для уведомления участников не менее чем за 7 дней до даты вступления в силу. При этом, если изменённое содержание неблагоприятно для участников или представляет собой существенное изменение, Компания уведомляет не менее чем за 30 дней до даты вступления в силу тем же способом и уведомляет участников способом, предусмотренным пунктом 1 статьи 24. В этом случае Компания наглядно сопоставляет содержание до и после изменения, чтобы участники могли легко его понять.
⑤ При изменении Условий Компания после уведомления подтверждает согласие участника с применением изменённых Условий. При уведомлении по пункту 4 Компания также сообщает, что если участник не выразит согласие или отказ в отношении изменённых Условий, он может считаться согласившимся, и если участник не выразит отказ до даты вступления настоящих Условий в силу, он может считаться согласившимся с изменёнными Условиями.
⑥ Если участник не согласен с изменёнными Условиями, Компания или участник вправе расторгнуть договор об использовании услуги.
⑦ Компания принимает меры к тому, чтобы участники могли задавать вопросы и получать ответы относительно содержания настоящих Условий.
⑧ Согласие с настоящими Условиями означает согласие периодически посещать сервис для проверки изменений в Условиях. Компания не несёт ответственности за ущерб, причинённый изменёнными Условиями, а также за ущерб участника, возникший вследствие того, что участник по своей неосторожности не ознакомился с содержанием изменённых Условий.
⑨ При согласии с настоящими Условиями они вступают в силу в отношении участника.

Статья 5 (Правила помимо Условий)
Компания вправе устанавливать отдельные условия использования, регламенты и операционные политики (далее — «Отдельные условия услуги и т. п.») для отдельных игровых услуг, и в случае противоречия такого содержания настоящим Условиям приоритет имеют Отдельные условия услуги и т. п. Вопросы, не урегулированные настоящими Условиями, и толкование настоящих Условий регулируются Отдельными условиями услуги и т. п., а также соответствующим законодательством и коммерческой практикой, такими как Закон о защите прав потребителей в электронной торговле и т. п., Закон о регулировании условий и оговорок, Закон о содействии игровой индустрии, Закон о защите персональных данных, Закон о содействии использованию информационно-коммуникационных сетей и о защите информации, Закон о содействии индустрии контента, Закон об авторском праве.

Статья 6 (Заключение и применение договора об использовании услуги)
① Пользователь, желающий стать участником, заключает с Компанией договор об использовании услуги. Договор считается заключённым, когда пользователь предоставляет персональные данные, необходимые для оказания услуги, соглашается с настоящими Условиями и подаёт заявку на использование, а Компания одобряет использование пользователем.
② Заявитель предоставляет при подаче заявки различную информацию, требуемую Компанией.
③ Заявитель при подаче заявки указывает свои действительные данные в соответствии с законодательством. В случае указания ложных данных настоящего имени или идентификационных данных либо присвоения имени другого лица заявитель не может ссылаться на права участника по настоящим Условиям, а Компания вправе аннулировать или расторгнуть договор об использовании без возврата средств.
④ Если заявитель, желающий стать участником, является несовершеннолетним (включая учащихся старшей школы согласно статье 2 Закона о начальном и среднем образовании), он должен получить согласие законного представителя, и конкретная процедура получения согласия следует способу, предоставляемому Компанией в соответствии с Законом о содействии игровой индустрии и указом о его исполнении. При этом при оказании услуги через Kakao или мобильную платформу согласие по настоящей статье заменяется процедурой регистрации и получения согласия соответствующей мобильной платформы.
⑤ Компания, как правило, предоставляет одобрение на использование услуги в порядке подачи заявок пользователями. При этом в любом из следующих случаев Компания вправе отложить одобрение до устранения соответствующей причины.
(1) Когда у Компании нет свободных мощностей или имеется техническое препятствие
(2) Когда произошёл сбой в Игровых услугах
(3) Когда заявитель является несовершеннолетним (как определено в пункте 4 настоящей статьи), но не получил согласия законного представителя либо получение такого согласия не может быть подтверждено
(4) Когда одобрение использования затруднено вследствие обстоятельств Компании по иным причинам, равнозначным вышеуказанным
⑥ В любом из следующих случаев Компания вправе отказать в одобрении или ограничить использование услуги.
(1) Когда содержание заявки указано ложно или не соблюдены требования к заявке
(2) Когда присвоены информация или мобильное устройство другого лица
(3) Когда услугу намереваются использовать в целях преступного деяния, предусмотренного Уголовным законом
(4) Когда услугу намереваются использовать в целях, противоречащих смыслу Закона о защите несовершеннолетних
(5) Когда услугу намереваются использовать в целях извлечения прибыли
(6) Когда участник, находящийся в конкурентных отношениях с услугой, подаёт заявку в целях причинения вреда интересам Компании
(7) Когда услуга используется в стране, среди стран помимо Республики Корея, в которой Компания ещё не приняла решение о предоставлении услуги, и необходимо ограничить предоставление услуги в связи с договором с зарубежным поставщиком услуг или с предоставлением услуги участникам, подключающимся из определённой страны
(8) Когда заявка на использование услуги подаётся с мобильного устройства, для которого Компания ограничила использование услуги
(9) Когда заявка подаётся в целях совершения противоправного деяния, запрещённого Законом о содействии игровой индустрии, Законом о содействии использованию информационно-коммуникационных сетей и о защите информации или иным соответствующим законодательством
(10) Когда заявка нарушает иные положения, установленные Компанией, или одобрение иным образом признано ненадлежащим
⑦ Компания вправе для удобства пользователей предоставлять функцию временного участника (guest). В любом из следующих случаев при использовании этой функции может произойти удаление учётных данных или невозможность подтверждения записей, а учётные данные Игровых услуг, использовавшихся через функцию временного участника (guest), впоследствии могут не подлежать переносу при связывании. В таких случаях Компания не гарантирует восстановление учётных данных и не несёт ответственности за компенсацию и возмещение ущерба, за исключением случаев умысла или грубой неосторожности Компании.
(1) При замене мобильного устройства
(2) При модификации или сбросе мобильного устройства
(3) При удалении всего или части контента, например приложения, с мобильного устройства
⑧ После того как участник завершает ввод персональных данных, необходимых для процедуры принятия условий или использования услуги, Компания при отсутствии оснований для отложения или отказа в одобрении предоставляет возможность немедленно использовать услугу. При этом, если основание для отказа в одобрении будет обнаружено впоследствии, Компания вправе ограничить использование или расторгнуть договор в соответствии с настоящими Условиями.

Статья 7 (Операционные политики)
① В целях установления положений, необходимых для применения настоящих Условий, защиты прав и интересов участников и поддержания порядка в игровом мире, Компания вправе устанавливать в качестве операционных политик игровой услуги (далее — «Операционные политики») вопросы, делегированные в определённых пределах настоящими Условиями.
② Компания размещает содержание Операционных политик на начальном экране сервиса либо на сайте или в официальном кафе Компании, либо предоставляет связанную страницу, чтобы участники могли ознакомиться.
③ Изменение Операционных политик осуществляется по процедуре пункта 4 статьи 4. При этом, если изменение подпадает под любой из следующих случаев, Компания заранее уведомляет способом пункта 2.
(1) При изменении вопросов, делегированных в определённых пределах Условиями
(2) При изменении вопросов, не связанных с правами и обязанностями участников
(3) Когда содержание Операционных политик принципиально не отличается от установленного Условиями и изменяется в пределах, предсказуемых для участников

Глава 2. Управление персональными данными

Статья 8 (Защита и использование персональных данных)
① Компания стремится защищать персональные данные участников, включая учётные данные, как это предусмотрено законодательством, а защита и использование персональных данных регулируются соответствующим законодательством и политикой конфиденциальности Компании. При этом политика конфиденциальности Компании не применяется к услугам, предоставляемым третьими лицами, которые лишь связаны ссылкой, помимо Игровых услуг, предоставляемых Компанией.
② В целях эксплуатации и стабилизации сервиса и повышения его качества Компания вправе собирать такую информацию, как данные об устройстве участника, сведения об ОС и её версии, используемый оператор связи, история использования сервиса участником.
③ В зависимости от характера сервиса может раскрываться содержание, представляющее псевдоним, изображение персонажа, сведения о статусе и т. п. участника, не связанные с его персональными данными.
④ Участник должен добросовестно управлять собственными персональными данными для использования игровой услуги и обязан обновлять их при изменении. Ответственность за ущерб, возникший вследствие задержки или упущения при обновлении персональных данных участника, несёт участник.
⑤ Компания не несёт ответственности за ущерб, возникший вследствие утечки персональных данных или учётных данных участника по причинам, за которые отвечает участник.

Глава 3. Обязанности сторон договора об использовании услуги

Статья 9 (Обязанности Компании)
① Компания добросовестно, в соответствии с принципом доброй совести, соблюдает осуществление прав и исполнение обязанностей, предусмотренных соответствующим законодательством и настоящими Условиями.
② Компания создаёт систему безопасности для защиты персональных данных (включая кредитную информацию), чтобы участники могли безопасно пользоваться услугой, а также публикует и соблюдает политику конфиденциальности. За исключением случаев, предусмотренных законодательством, и случаев, установленных настоящими Условиями и политикой конфиденциальности, Компания обеспечивает, чтобы персональные данные участников не раскрывались и не предоставлялись третьим лицам.
③ В случае сбоя оборудования либо утраты или повреждения данных в ходе работ по совершенствованию для непрерывного и стабильного оказания услуги Компания без промедления прилагает все усилия к их ремонту или восстановлению, если нет неустранимой причины, такой как стихийное бедствие, чрезвычайная ситуация либо препятствие или дефект, которые невозможно устранить при современном уровне технологий.

Статья 10 (Обязанности участника)
① Участник не должен совершать в связи с использованием услуги, предоставляемой Компанией, ни одно из следующих действий.
(1) Указание ложных сведений при подаче заявки или изменении сведений участника либо использование информации другого лица
(2) Воспроизведение, распространение или поощрение использования информации, полученной с использованием услуги Компании, либо её коммерческое использование без предварительного согласия Компании
(3) Умаление чести или оскорбление другого лица
(4) Нарушение интеллектуальных прав, права на изображение и иных прав другого лица
(5) Действия, препятствующие нормальной работе системы Компании, такие как взлом, распространение вредоносных программ (использование ошибок, программы автоматизации и т. п.), превышение прав доступа
(6) Использование услуг и контента Компании ненадлежащим образом либо доступ к системе ненадлежащим образом
(7) Торговля игровыми данными (учётные записи, предметы, игровая валюта и т. п.) с другими лицами либо их обмен на денежные средства или передача способом, отличным от установленного Компанией
(8) Размещение или распространение информации, нарушающей законодательство или противоречащей общественному порядку и нравственности
(9) Использование услуги в целях извлечения прибыли без согласия Компании
(10) Иные действия, нарушающие законодательство или запрещённые Компанией посредством Операционных политик и т. п.
② Участник обязан соблюдать законодательство, положения настоящих Условий, руководства по использованию и меры предосторожности, объявленные в связи с услугой, уведомляемые Компанией сведения и т. п., и не должен совершать иных действий, препятствующих деятельности Компании.
③ Ответственность за управление учётной записью и мобильным устройством участника несёт участник, и он не должен допускать их использования третьими лицами. Компания не несёт ответственности за ущерб, возникший вследствие небрежного управления со стороны участника.

Глава 4. Использование услуги

Статья 11 (Авторское право на контент и публикации)
① Авторское право и иные интеллектуальные права на контент, созданный Компанией, принадлежат Компании.
② Участник не должен без предварительного согласия Компании или поставщика использовать — путём воспроизведения, передачи, публикации, распространения, вещания или иным способом — либо позволять третьим лицам использовать информацию, полученную через Игровые услуги, интеллектуальные права на которую принадлежат Компании или поставщику.
③ Авторское право на публикацию, размещённую участником в рамках сервиса, принадлежит автору такой публикации. При этом Компания вправе в целях эксплуатации, демонстрации, передачи, распространения и продвижения сервиса использовать публикации, зарегистрированные участником, безвозмездно и без отдельного разрешения участника в соответствии с Законом об авторском праве.
④ Если публикация, размещённая или зарегистрированная участником, нарушает законодательство или настоящие Условия, Компания вправе принять меры, такие как приостановка или удаление такой публикации, в соответствии с законодательством.

Статья 12 (Предоставление и использование услуги)
① Компания предоставляет участнику возможность использовать Игровые услуги после заключения договора об использовании услуги.
② Игровые услуги, как правило, предоставляются круглосуточно и без выходных. При этом Компания вправе установить отдельное время использования для части предоставляемых услуг в зависимости от их вида или характера, о чём уведомляет заранее.
③ Компания вправе временно приостановить предоставление Игровых услуг в случае обслуживания, проверки или замены информационно-коммуникационного оборудования, такого как компьютеры, а также неисправности, обрыва связи или наличия существенной эксплуатационной причины.

Статья 13 (Изменение услуги)
① Компания вправе изменять содержание услуги, эксплуатационные и технические вопросы и т. п. в целях стабильного оказания услуги.
② При изменении услуги Компания заранее уведомляет с указанием содержания изменения и даты вступления в силу. При этом в случае изменения, существенно затрагивающего права и обязанности участников, Компания уведомляет не менее чем за 30 дней до даты вступления в силу.
③ Участник вправе расторгнуть договор об использовании, если не согласен с изменением услуги.

Статья 14 (Приостановка услуги)
① Компания вправе ограничить или приостановить всю услугу или её часть в любом из следующих случаев.
(1) Когда это неизбежно вследствие работ, таких как обслуживание сервисного оборудования
(2) Когда участник препятствует деловой деятельности Компании
(3) Когда нормальному использованию услуги мешают отключение электроэнергии, сбой различного оборудования, всплеск нагрузки и т. п.
(4) При наличии обстоятельств непреодолимой силы, таких как стихийное бедствие или национальная чрезвычайная ситуация
② При приостановке услуги Компания заранее уведомляет участников о причине, сроке и т. п. При этом при наличии неизбежных обстоятельств, когда заранее уведомить невозможно, Компания вправе уведомить впоследствии.

Статья 15 (Предоставление информации и размещение рекламы)
① Компания вправе предоставлять участникам информацию или объявления, необходимые для использования услуги, путём их размещения на экране сервиса либо посредством электронной почты, текстовых сообщений и т. п.
② Компания вправе размещать рекламу в связи с услугой на экране сервиса, сайте, в электронной почте и т. п. При передаче рекламной информации Компания получает предварительное согласие получателя в соответствии с законодательством, и участник вправе в любое время отказаться от её получения.

Глава 5. Платные услуги

Статья 16 (Оплата платных услуг)
① Участник вправе приобретать платный контент (платные предметы и т. п.), предоставляемый Компанией, через средства оплаты, предоставляемые операторами открытых магазинов и т. п.
② Сумма оплаты платного контента начисляется и выставляется в соответствии с политиками и средствами оплаты каждого оператора открытого магазина, а вопросы, связанные с оплатой, регулируются политиками соответствующего оператора открытого магазина и платёжной компании.
③ Если несовершеннолетний оплатил платный контент без согласия законного представителя, сам несовершеннолетний или его законный представитель вправе отменить такую оплату в соответствии с законодательством.

Статья 17 (Предоставление информации о вероятностных предметах)
При предоставлении вероятностных предметов, продаваемых за плату, Компания отображает соответствующую информацию, такую как вид, состав и вероятность получения предметов, в Игровых услугах и их рекламных и промо-материалах в соответствии с Законом о содействии игровой индустрии и соответствующим законодательством.

Статья 18 (Отзыв оферты и возврат средств)
① Участник, заключивший с Компанией договор об использовании платного контента, вправе отозвать оферту в течение 7 дней с более поздней из дат — даты покупки или даты, когда использование стало возможным, — в соответствии с законодательством.
② В следующих случаях отзыв оферты участником может быть ограничен, при этом Компания указывает факт ограничения отзыва оферты для соответствующего платного контента так, чтобы участник мог узнать об этом в процессе покупки.
(1) Платный контент, используемый или применяемый сразу же после покупки
(2) Платный контент, ценность которого существенно снижается при вскрытии или использовании
(3) Когда была использована дополнительная выгода, предоставленная платному контенту
(4) Иные случаи, предусмотренные законодательством в целях безопасности сделок
③ При отзыве оферты участником Компания без промедления возвращает сумму через средство оплаты участника, а при задержке возврата уплачивает проценты за просрочку, предусмотренные законодательством. Если возврат осуществляется в соответствии с политикой платёжной компании, применяется такая политика.

Статья 19 (Возврат переплаты)
① При возникновении переплаты Компания возвращает её тем же способом, которым участник произвёл оплату. При этом, если возврат тем же способом невозможен, Компания уведомляет об этом заранее.
② Если переплата возникла по причине, за которую отвечает Компания, Компания возвращает всю сумму переплаты независимо от расходов по договору, комиссий и т. п. При этом, если переплата возникла по причине, за которую отвечает участник, расходы Компании на возврат переплаты могут быть возложены на участника в разумных пределах.

Глава 6. Расторжение договора и ограничение использования

Статья 20 (Расторжение договора участником)
① Участник вправе в любое время подать заявление о расторжении договора об использовании услуги через процедуру выхода из числа участников (удаления учётной записи) и т. п. в рамках сервиса, и Компания обрабатывает его в порядке, предусмотренном законодательством.
② При расторжении договора участником учётные данные и данные участника удаляются немедленно после расторжения и не подлежат восстановлению, за исключением случаев, когда Компания хранит сведения об участнике в соответствии с законодательством и политикой конфиденциальности.

Статья 21 (Ограничение использования и расторжение договора Компанией)
① В случае нарушения участником настоящих Условий или законодательства Компания вправе поэтапно ограничивать использование услуги — путём предупреждения, временной или постоянной приостановки использования — либо расторгнуть договор об использовании в зависимости от тяжести нарушения.
② При ограничении использования или расторжении договора по пункту 1 Компания уведомляет участника о причине, дате и сроке способом статьи 24. При этом это не применяется, когда Компания сочтёт необходимым срочно приостановить использование.
③ Участник вправе заявить возражение против меры Компании по ограничению использования в порядке, установленном Компанией, и, если Компания признаёт возражение обоснованным, немедленно возобновляет использование услуги.

Статья 22 (Прекращение услуги)
① При намерении прекратить Игровые услуги Компания не менее чем за 30 дней до планируемой даты прекращения размещает дату прекращения, причины, условия компенсации и т. п. на начальном экране сервиса или связанной странице и уведомляет участников способом статьи 24.
② Даже после прекращения услуги Компания в течение срока, предусмотренного законодательством, обеспечивает работу канала для рассмотрения обращений участников, таких как возврат средств.
③ В отношении неиспользованной части платных предметов, имеющихся у участника, Компания осуществляет возврат в соответствии с законодательством и объявленными Компанией стандартами компенсации.

Глава 7. Возмещение ущерба и разрешение споров

Статья 23 (Возмещение ущерба)
① Если Компания или участник причиняет ущерб другой стороне, нарушая настоящие Условия, она обязана возместить такой ущерб. При этом это не применяется при отсутствии умысла или неосторожности.
② Если Компания заключает партнёрский договор с поставщиком отдельной услуги и предоставляет участнику отдельную услугу, ущерб, возникший при использовании отдельной услуги после согласия участника с условиями использования отдельной услуги, разрешается между соответствующим поставщиком отдельной услуги и участником.

Статья 24 (Уведомление участников)
① При уведомлении участника Компания вправе осуществлять его по адресу электронной почты, посредством текстового сообщения, уведомления в рамках сервиса и т. п., указанным участником.
② В случае уведомления всех участников Компания вправе заменить уведомление по пункту 1 размещением его на начальном экране сервиса или связанной странице в течение не менее 7 дней. При этом по вопросам, существенно затрагивающим сделки самого участника, осуществляется индивидуальное уведомление.

Статья 25 (Оговорка об освобождении от ответственности)
① Компания освобождается от ответственности за предоставление услуги, если она не может предоставить услугу вследствие стихийного бедствия, национальной чрезвычайной ситуации, трудноустранимого технического дефекта или иной непреодолимой силы.
② Компания не несёт ответственности за препятствия использованию услуги или ущерб, возникшие по причинам, за которые отвечает участник.
③ Компания не обязана вмешиваться в споры, возникшие через услугу между участниками либо между участником и третьим лицом, и не несёт ответственности за возмещение ущерба, возникшего вследствие этого.
④ Компания не несёт ответственности за ущерб, причинённый участнику в связи с использованием услуг, предоставляемых бесплатно, если иное специально не предусмотрено законодательством.

Статья 26 (Разрешение споров и подсудность)
① Компания и участник прилагают все необходимые усилия для мирного разрешения любого спора, возникшего в связи с услугой.
② Несмотря на усилия по пункту 1, если спор не разрешён, любая из сторон вправе обратиться за урегулированием спора в Комитет по урегулированию споров в сфере контента и т. п. в соответствии с законодательством.
③ Настоящие Условия регулируются и толкуются в соответствии с законодательством Республики Корея, а суд, компетентный рассматривать любые судебные споры между Компанией и участником в связи с использованием услуги, определяется в соответствии с Гражданским процессуальным законом.

Дополнение
Настоящие Условия вступают в силу 1 сентября 2024 года.`,
    },
  },
};
