/* ============================================================
   GAHEE 사이트 콘텐츠 — 모든 문구·게임·회사 데이터의 단일 출처
   문구 수정은 이 파일에서. 다국어 문자열은 ko/en 쌍으로 항상 함께 관리한다.
   ============================================================ */

export type Locale = "ko" | "en" | "zh" | "ru";

export type LocalizedText = { ko: string; en: string; zh: string; ru: string };

/** 지원 플랫폼 — platformIcons/platformCategory 의 키와 일치. 오타를 컴파일 타임에 차단한다. */
export type Platform = "Google Play" | "App Store" | "One Store" | "Steam" | "Nintendo" | "PlayStation";

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
  platforms: Platform[];
  /** 플랫폼별 스토어 링크 — 키는 Platform 유니온과 일치.
   *  URL 이 없는 플랫폼은 모달에서 링크 없는 배지로만 표시된다. */
  links?: Partial<Record<Platform, string>>;
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
      contact: "Contact — 문의",
    },
    primaryCta: "파트너십 문의",
    secondaryCta: "게임 라인업 보기",
    navCta: "문의하기",
    drawerCta: "파트너십 문의",
    aboutTitle: "우리는 게임을 발견하고, 시장에 닿게 합니다.",
    aboutBody:
      "GAHEE는 한국에 기반을 둔 모바일·PC·콘솔 게임 퍼블리셔입니다. 2022년부터 검증된 글로벌 개발사의 게임을 한국과 아시아 시장에 선보여 왔습니다.",
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
      contact: "Contact",
    },
    primaryCta: "Partnership Inquiry",
    secondaryCta: "View Games",
    navCta: "Contact",
    drawerCta: "Partnership Inquiry",
    aboutTitle: "We discover games and bring them to market.",
    aboutBody:
      "GAHEE is a Korea-based mobile, PC, and console game publisher. Since 2022 we've brought titles from trusted global studios to Korea and the wider Asian market.",
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
      contact: "聯絡",
    },
    primaryCta: "洽談合作",
    secondaryCta: "查看遊戲",
    navCta: "聯絡我們",
    drawerCta: "洽談合作",
    aboutTitle: "我們發掘遊戲，並讓它抵達市場。",
    aboutBody:
      "GAHEE 是一家總部位於韓國的行動、PC 與主機遊戲發行商。自 2022 年起，我們將值得信賴的全球工作室作品帶進韓國與更廣闊的亞洲市場。",
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
      contact: "Контакты",
    },
    primaryCta: "Запрос о партнёрстве",
    secondaryCta: "Смотреть игры",
    navCta: "Связаться",
    drawerCta: "Запрос о партнёрстве",
    aboutTitle: "Мы находим игры и выводим их на рынок.",
    aboutBody:
      "GAHEE — издатель мобильных, PC- и консольных игр со штаб-квартирой в Корее. С 2022 года мы выводим проекты проверенных мировых студий на рынок Кореи и всей Азии.",
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

/** 플랫폼명 → 스토어 아이콘 경로 (게임 모달의 플랫폼 배지에 사용) */
export const platformIcons: Record<Platform, string> = {
  "Google Play": "/assets/games/google-play.webp",
  "App Store": "/assets/games/app-store.webp",
  "One Store": "/assets/games/one-store.webp",
  Steam: "/assets/games/steam.webp",
  Nintendo: "/assets/games/nintendo.webp",
  PlayStation: "/assets/games/playstation.webp",
};

/** 플랫폼 → 상위 카테고리 (Games 필터 칩의 분류축). 새 플랫폼 추가 시 여기에 매핑한다. */
export type GameCategory = "Mobile" | "PC" | "Console";
export const platformCategory: Record<Platform, GameCategory> = {
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

/** 연락처·외부 링크 — play 는 GAHEE 공식 Google Play 개발자 페이지 */
export const contact = {
  business: "biz@gahee.net",
  support: "cs@gahee.net",
  address: "Gingorang-ro 14-gil, Gwangjin-gu, Seoul, Republic of Korea ZIP: 04918",
  facebook: "https://www.facebook.com/profile.php?id=61569302554927",
  play: GAHEE_PLAY_DEV_PAGE,
};
