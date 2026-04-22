export interface CharacterConfig {
  id: string;
  name: string;
  nameEn: string;
  role: string;
  description: string;
  descriptionEn: string;
  color: string;
  secondaryColor: string;
  accentColor: string;
  glowColor: string;
  rarity: "common" | "rare" | "epic" | "legendary" | "mythic";
  stats: {
    attack: number;
    defense: number;
    speed: number;
    wisdom: number;
    charisma: number;
  };
  abilities: {
    name: string;
    description: string;
    cooldown: number;
  }[];
  voiceLine: string;
  personality: string[];
  origin: string;
  element: "light" | "fire" | "water" | "earth" | "air" | "void";
  skins: CharacterSkin[];
}

export interface CharacterSkin {
  id: string;
  name: string;
  description: string;
  colorTheme: {
    primary: string;
    secondary: string;
    accent: string;
  };
  price: number;
  unlockRequirement: string;
  isLimited: boolean;
  event?: string;
}

export interface ViceMonster {
  id: string;
  name: string;
  nameEn: string;
  description: string;
  descriptionEn: string;
  type: "slot" | "rug" | "fomo" | "greed" | "scam" | "phishing";
  color: string;
  difficulty: number;
  health: number;
  attackPattern: string;
  weakness: string;
  reward: {
    tokens: number;
    xp: number;
    item?: string;
  };
  appearance: {
    shape: string;
    features: string[];
    animation: string;
  };
}

export const GUARDIANS: CharacterConfig[] = [
  {
    id: "komodo",
    name: "Komodo Sang Penjaga",
    nameEn: "Komodo The Guardian",
    role: "Tank / Leader",
    description: "Komodo adalah guardian utama yang melambangkan kekuatan dan kebijaksanaan. Dari Pulau Komodo, ia menjaga para pemain dari godaan jahat.",
    descriptionEn: "Komodo is the main guardian symbolizing strength and wisdom. From Komodo Island, he guards players against evil temptations.",
    color: "#2DD4BF",
    secondaryColor: "#0D9488",
    accentColor: "#5EEAD4",
    glowColor: "rgba(45, 212, 191, 0.4)",
    rarity: "legendary",
    stats: { attack: 75, defense: 95, speed: 60, wisdom: 85, charisma: 70 },
    abilities: [
      { name: "Cakar Kebijaksanaan", description: "Menyerang dengan kearifan, memberikan damage + debuff Wissdom Down", cooldown: 3 },
      { name: "Perisai Nusa", description: "Membentuk perisai dari tanah Pulau Komodo", cooldown: 5 },
      { name: "Raungan Penglihatan", description: "Mengungkapkan identitas asli vice monster", cooldown: 8 },
    ],
    voiceLine: "Bersama kita kuat!",
    personality: ["Pemimpin alami", "Tenang tapi tegas", "Melindungi yang lemah"],
    origin: "Pulau Komodo, Nusa Tenggara Timur",
    element: "earth",
    skins: [
      { id: "komodo-default", name: "Default", description: "Tampilan default Komodo", colorTheme: { primary: "#2DD4BF", secondary: "#0D9488", accent: "#5EEAD4" }, price: 0, unlockRequirement: "Starter", isLimited: false },
      { id: "komodo-batik", name: "Batik Komodo", description: "Batik khasIndonesia dengan motif tradisional", colorTheme: { primary: "#1E3A5F", secondary: "#8B4513", accent: "#DAA520" }, price: 500, unlockRequirement: "Lv.10", isLimited: false },
      { id: "komodo-garudha", name: "Garudha Komodo", description: "Perwujudan mitos Garuda", colorTheme: { primary: "#FFD700", secondary: "#FF4500", accent: "#FFA500" }, price: 2000, unlockRequirement: "Event", isLimited: true, event: "HariIndonesia2024" },
    ],
  },
  {
    id: "owl",
    name: "Wayang Owl",
    nameEn: "Wayang Owl",
    role: "Mage / Wisdom",
    description: "Wayang Owl adalah seekor burung hantu yang Bijak dan ber pengetahuan luas. Ia adalah penasehat utama dalam menghadapi godaan.",
    descriptionEn: "Wayang Owl is a wise owl with vast knowledge. He is the main advisor in facing temptations.",
    color: "#A78BFA",
    secondaryColor: "#7C3AED",
    accentColor: "#C4B5FD",
    glowColor: "rgba(167, 139, 250, 0.4)",
    rarity: "epic",
    stats: { attack: 90, defense: 50, speed: 75, wisdom: 100, charisma: 80 },
    abilities: [
      { name: "Serpihan Pengetahuan", description: "Melemparkan kebenaran yang membakar ketidaktauan", cooldown: 2 },
      { name: "Penglihatan Malam", description: "Melihat through godaan dan ilusi", cooldown: 4 },
      { name: "Wisdom Wave", description: "Gelombang kebijaksanaan yang membersihkan pikiran", cooldown: 10 },
    ],
    voiceLine: "Pengetahuan adalah kekuatan!",
    personality: ["Filosofis", "Penyimpan rahasia", "Suka mengajar"],
    origin: "Keraton Yogyakarta",
    element: "void",
    skins: [
      { id: "owl-default", name: "Default", description: "Tampilan default Wayang Owl", colorTheme: { primary: "#A78BFA", secondary: "#7C3AED", accent: "#C4B5FD" }, price: 0, unlockRequirement: "Starter", isLimited: false },
      { id: "owl-shadow", name: "Shadow Owl", description: "Versi bayangan yang misterius", colorTheme: { primary: "#4C1D95", secondary: "#1E1B4B", accent: "#8B5CF6" }, price: 800, unlockRequirement: "Lv.15", isLimited: false },
      { id: "owl-lunar", name: "Lunar Owl", description: "Per bulan purnama", colorTheme: { primary: "#E0E7FF", secondary: "#4338CA", accent: "#A5B4FC" }, price: 1500, unlockRequirement: "Event", isLimited: true, event: "BloodMoon" },
    ],
  },
  {
    id: "orangutan",
    name: "Orangutan Si Inovator",
    nameEn: "Orangutan The Inventor",
    role: "Support / Tech",
    description: "Orangutan adalah genius inventorsecara digital. Ia membantu pemain dengan teknologi untuk melawan vice.",
    descriptionEn: "Orangutan is a tech genius. He helps players with technology to fight vice.",
    color: "#F59E0B",
    secondaryColor: "#D97706",
    accentColor: "#FCD34D",
    glowColor: "rgba(245, 158, 11, 0.4)",
    rarity: "rare",
    stats: { attack: 70, defense: 60, speed: 90, wisdom: 75, charisma: 85 },
    abilities: [
      { name: "Gadget Shield", description: "Membentengi dengan teknologi tercanggih", cooldown: 4 },
      { name: "Innovation Boost", description: "Meningkatkan semua stats sementara", cooldown: 6 },
      { name: "Tech Recovery", description: "Mengembalikan health menggunakan tech", cooldown: 12 },
    ],
    voiceLine: "Teknologi untuk kebaikan!",
    personality: ["Kreatif tanpa batas", "Selalu berpikir out-of-the-box", "Berbagi ilmu"],
    origin: "Taman Nasional Tanjung Puting",
    element: "air",
    skins: [
      { id: "orangutan-default", name: "Default", description: "Tampilan default Orangutan", colorTheme: { primary: "#F59E0B", secondary: "#D97706", accent: "#FCD34D" }, price: 0, unlockRequirement: "Starter", isLimited: false },
      { id: "orangutan-cyber", name: "Cyber Orangutan", description: "Tampilan cyberpunk modern", colorTheme: { primary: "#06B6D4", secondary: "#0E7490", accent: "#22D3EE" }, price: 600, unlockRequirement: "Lv.8", isLimited: false },
    ],
  },
  {
    id: "prism",
    name: "Prisma Cahaya",
    nameEn: "Prism Light",
    role: "Healer / Light",
    description: "Prisma adalah entitas cahaya yang membawa harapan. Kemampuannya adalah menyembuhkan dan memberikan cahaya.",
    descriptionEn: "Prism is a light entity that brings hope. Its ability is to heal and provide light.",
    color: "#06B6D4",
    secondaryColor: "#0891B2",
    accentColor: "#22D3EE",
    glowColor: "rgba(6, 182, 212, 0.4)",
    rarity: "epic",
    stats: { attack: 60, defense: 70, speed: 80, wisdom: 90, charisma: 95 },
    abilities: [
      { name: "Cahaya Penyembuhan", description: "Mercovery semua ally ke full health", cooldown: 8 },
      { name: "Rainbow Shield", description: "Perisai yang memantulkan attack", cooldown: 5 },
      { name: "Prism Burst", description: "Ledakan cahaya yang memb blinding musuh", cooldown: 15 },
    ],
    voiceLine: "Terang selalu mengalahkan gelap!",
    personality: ["Penuh harapan", "Memancarkan positif", "Mem percaya"],
    origin: "Pelangi Nusantara",
    element: "water",
    skins: [
      { id: "prism-default", name: "Default", description: "Tampilan default Prisma", colorTheme: { primary: "#06B6D4", secondary: "#0891B2", accent: "#22D3EE" }, price: 0, unlockRequirement: "Starter", isLimited: false },
    ],
  },
  {
    id: "flame",
    name: "Api Perubahan",
    nameEn: "Flame of Change",
    role: "DPS / Burst",
    description: "Api adalah simbol perubahan dan pembakaran. Kemampuannya adalah menghancurkan keburukan dengan api.",
    descriptionEn: "Flame is a symbol of change and burning. Its ability is to destroy evil with fire.",
    color: "#EF4444",
    secondaryColor: "#DC2626",
    accentColor: "#FCA5A5",
    glowColor: "rgba(239, 68, 68, 0.4)",
    rarity: "mythic",
    stats: { attack: 100, defense: 45, speed: 95, wisdom: 70, charisma: 60 },
    abilities: [
      { name: "Inferno Strike", description: "Serangan api dahsyat yang membakar", cooldown: 3 },
      { name: "Phoenix Rise", description: "Revive dengan full attack", cooldown: 20 },
      { name: "Wildfire", description: "Area damage ke semua musuh", cooldown: 12 },
    ],
    voiceLine: "Keburukan harus terbakar!",
    personality: ["Energik", "Tidak gentar", "Mau berubah"],
    origin: "Gunung Merapi",
    element: "fire",
    skins: [
      { id: "flame-default", name: "Default", description: "Tampilan default Api", colorTheme: { primary: "#EF4444", secondary: "#DC2626", accent: "#FCA5A5" }, price: 0, unlockRequirement: "Starter", isLimited: false },
      { id: "flame-blue", name: "Blue Flame", description: "Api biru yang lebih panas", colorTheme: { primary: "#3B82F6", secondary: "#1D4ED8", accent: "#60A5FA" }, price: 3000, unlockRequirement: "Event", isLimited: true, event: "SummerBurn" },
    ],
  },
];

export const VICE_MONSTERS: ViceMonster[] = [
  {
    id: "slot-siren",
    name: "Slot Siren",
    nameEn: "Slot Siren",
    description: " monster yang menarik mangsa dengan janji kemenangan mudah.",
    descriptionEn: "A monster that lures prey with promises of easy wins.",
    type: "slot",
    color: "#DC2626",
    difficulty: 1,
    health: 100,
    attackPattern: "slot-spin-attack",
    weakness: "kebanyakan",
    reward: { tokens: 10, xp: 50 },
    appearance: { shape: "siren-mermaid", features: [" mata memancarkan slots", "ekor seperti mesin slot", "suara yang magnetis"], animation: "spin-attract" },
  },
  {
    id: "rug-demon",
    name: "Rugpull Demon",
    nameEn: "Rugpull Demon",
    description: "Demon yang拉 rug project dan membawa semua dana.",
    descriptionEn: "A demon that rugs projects and takes all funds.",
    type: "rug",
    color: "#7C3AED",
    difficulty: 2,
    health: 200,
    attackPattern: "rug-pull",
    weakness: "due diligence",
    reward: { tokens: 25, xp: 100, item: "Research Lens" },
    appearance: { shape: "demon-cloaked", features: [" mata merah menyala", "tangan yang menarik", "tersenyum jahat"], animation: "fade-away" },
  },
  {
    id: "fomo-ghost",
    name: "FOMO Ghost",
    nameEn: "FOMO Ghost",
    description: "Hantu yang memanfaatkan ketakutan kehilangan kesempatan.",
    descriptionEn: "A ghost that exploits fear of missing out.",
    type: "fomo",
    color: "#DB2777",
    difficulty: 2,
    health: 150,
    attackPattern: "fast-attack-fomo",
    weakness: "kesabaran",
    reward: { tokens: 20, xp: 75 },
    appearance: { shape: "ghost-transparent", features: ["tubuh transparan", "wajah ketakutan", " aura pink"], animation: "flash-appear" },
  },
  {
    id: "greed-goblin",
    name: "Greed Goblin",
    nameEn: "Greed Goblin",
    description: "Makhluk kerdil yang terobsesi dengan kekayaan越多越好.",
    descriptionEn: "A dwarf creature obsessed with wealth - more is better.",
    type: "greed",
    color: "#EA580C",
    difficulty: 3,
    health: 300,
    attackPattern: "gold-steal",
    weakness: "kedermawanan",
    reward: { tokens: 50, xp: 150 },
    appearance: { shape: "goblin-small", features: ["mata kuning seperti koin", "tangan besar", "harta berlimpah"], animation: "gold-shine" },
  },
];

export const CHARACTER_ANIMATIONS = {
  idle: {
    Komodo: { type: "breathe", duration: 2000, intensity: "subtle" },
    Owl: { type: "float", duration: 3000, intensity: "gentle" },
    Orangutan: { type: "bounce", duration: 1500, intensity: "playful" },
    Prism: { type: "rotate", duration: 4000, intensity: "smooth" },
    Flame: { type: "flicker", duration: 500, intensity: "energetic" },
  },
  attack: {
    default: { type: "lunge", duration: 300, easing: "ease-out" },
    fire: { type: "explosion", duration: 500, easing: "ease-out" },
    ice: { type: "freeze", duration: 400, easing: "ease-in-out" },
    light: { type: "beam", duration: 600, easing: "linear" },
  },
  hit: {
    default: { type: "shake", duration: 200, intensity: "medium" },
    light: { type: "flash", duration: 100, intensity: "bright" },
    heavy: { type: "knockback", duration: 400, intensity: "strong" },
  },
  victory: {
    default: { type: "jump", duration: 500 },
    grand: { type: "spin", duration: 1000 },
  },
} as const;

export const RARITY_COLORS = {
  common: "#A0A0B0",
  rare: "#3B82F6",
  epic: "#A855F7",
  legendary: "#F59E0B",
  mythic: "#EF4444",
} as const;

export const ELEMENT_ICONS = {
  light: "☀️",
  fire: "🔥",
  water: "💧",
  earth: "🌍",
  air: "💨",
  void: "✨",
} as const;