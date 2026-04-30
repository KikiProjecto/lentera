export interface QuizQuestion {
  id: string;
  question: string;
  questionEn: string;
  options: string[];
  correctIndex: number;
  explanation: string;
  explanationEn: string;
}

export interface Quest {
  id: string;
  title: string;
  titleEn: string;
  description: string;
  descriptionEn: string;
  category: "budget" | "saving" | "investing" | "scam" | "debt";
  difficulty: 1 | 2 | 3;
  questions: QuizQuestion[];
  timeLimit: number;
  rewards: {
    tokens: number;
    xp: number;
  };
  streakBonus?: {
    days: number;
    multiplier: number;
  };
}

export const QUESTS: Quest[] = [
  {
    id: "budget-basics",
    title: "Dasar-dasar Anggaran",
    titleEn: "Budget Basics",
    description: "Pelajari cara membuat anggaran yang sehat",
    descriptionEn: "Learn how to create a healthy budget",
    category: "budget",
    difficulty: 1,
    timeLimit: 300,
    rewards: { tokens: 50, xp: 100 },
    streakBonus: { days: 3, multiplier: 1.5 },
    questions: [
      {
        id: "bb1",
        question: "Apa itu 50/30/20 dalam pengelolaan keuangan?",
        questionEn: "What is 50/30/20 in financial management?",
        options: [
          "50% kebutuhan, 30% keinginan, 20% tabungan",
          "50% tabungan, 30% kebutuhan, 20% keinginan",
          "50% utang, 30% tabungan, 20% investasi",
          "50% investasi, 30% tabungan, 20% kebutuhan",
        ],
        correctIndex: 0,
        explanation: "Aturan 50/30/20 adalah: 50% untuk kebutuhan pokok, 30% untuk keinginan, dan 20% untuk tabungan dan investasi.",
        explanationEn: "The 50/30/20 rule is: 50% for needs, 30% for wants, and 20% for savings and investment.",
      },
      {
        id: "bb2",
        question: "Manakah yang BUKAN contoh kebutuhan pokok?",
        questionEn: "Which is NOT an example of a basic need?",
        options: ["Makanan", "Sewa rumah", "Liburan", "Listrik"],
        correctIndex: 2,
        explanation: "Liburan adalah keinginan, bukan kebutuhan pokok. Kebutuhan pokok meliputi makanan, tempat tinggal, dan utilitas dasar.",
        explanationEn: "Vacation is a want, not a basic need. Basic needs include food, shelter, and basic utilities.",
      },
      {
        id: "bb3",
        question: "Apa langkah pertama dalam membuat anggaran?",
        questionEn: "What is the first step in creating a budget?",
        options: [
          "Mengurangi pengeluaran",
          "Menghitung total pendapatan",
          "Menabung otomatis",
          "Membeli investasi",
        ],
        correctIndex: 1,
        explanation: "Langkah pertama adalah mengetahui berapa banyak uang yang masuk setiap bulan.",
        explanationEn: "The first step is knowing how much money comes in each month.",
      },
    ],
  },
  {
    id: "scam-awareness",
    title: "Waspada Penipuan Online",
    titleEn: "Online Scam Awareness",
    description: "Kenali tanda-tanda penipuan online",
    descriptionEn: "Recognize signs of online scams",
    category: "scam",
    difficulty: 2,
    timeLimit: 240,
    rewards: { tokens: 75, xp: 150 },
    questions: [
      {
        id: "sa1",
        question: "Tanda apa yang menunjukkan investasi skema ponzi?",
        questionEn: "What sign indicates a Ponzi scheme investment?",
        options: [
          "Returns stabil setiap bulan",
          "Janji return sangat tinggi dengan risiko rendah",
          "Terdaftar di OJK",
          "Memiliki kantor fisik",
        ],
        correctIndex: 1,
        explanation: "Janji return sangat tinggi dengan risiko rendah adalah tanda klasik skema ponzi.",
        explanationEn: "Promises of very high returns with low risk is a classic sign of a Ponzi scheme.",
      },
      {
        id: "sa2",
        question: "Apa itu 'rug pull' dalam kripto?",
        questionEn: "What is a 'rug pull' in crypto?",
        options: [
          "Menarik investasi karena sudah profit",
          "Developer meninggalkan proyek dan membawa dana investor",
          "Koin turun karena pasar bearish",
          "Exchange diretas",
        ],
        correctIndex: 1,
        explanation: "Rug pull terjadi ketika developercoin baru menarik semua likuiditas dan menghilang.",
        explanationEn: "A rug pull occurs when new coin developers pull all liquidity and disappear.",
      },
      {
        id: "sa3",
        question: "Phishing通常在哪里发生？",
        questionEn: "Where does phishing usually happen?",
        options: ["Di ATM", "Lewat email atau pesan palsu", "Di bank langsung", "Melalui ATM"],
        correctIndex: 1,
        explanation: "Phishing terjadi melalui email, pesan, atau website palsu yang menyamar sebagai resmi.",
        explanationEn: "Phishing happens through fake emails, messages, or websites pretending to be legitimate.",
      },
    ],
  },
  {
    id: "saving-habits",
    title: "Kebiasaan Menabung",
    titleEn: "Saving Habits",
    description: "Bangun kebiasaan menabung yang sehat",
    descriptionEn: "Build healthy saving habits",
    category: "saving",
    difficulty: 1,
    timeLimit: 180,
    rewards: { tokens: 40, xp: 80 },
    streakBonus: { days: 7, multiplier: 2 },
    questions: [
      {
        id: "sh1",
        question: "Berapa persen pendapatan yang sebaiknya ditabung?",
        questionEn: "What percentage of income should be saved?",
        options: ["5%", "10-20%", "50%", "Semua sisanya"],
        correctIndex: 1,
        explanation: "Rekomendasi minimum adalah menabung 10-20% dari pendapatan.",
        explanationEn: "The recommendation is to save 10-20% of income.",
      },
      {
        id: "sh2",
        question: "Apa itu dana darurat?",
        questionEn: "What is an emergency fund?",
        options: [
          "Uang untuk investasi",
          "Tabungan untuk keadaan darurat 3-6 bulan pengeluaran",
          "Uang untuk rencana liburan",
          "Dana untuk membeli rumah",
        ],
        correctIndex: 1,
        explanation: "Dana darurat adalah tabungan sebesar 3-6 bulan pengeluaran untuk keadaan tak terduga.",
        explanationEn: "An emergency fund is 3-6 months of expenses saved for unexpected situations.",
      },
    ],
  },
  {
    id: "debt-warning",
    title: "Bahaya Utang",
    titleEn: "Debt Warning",
    description: "Pahami bahaya utang berlebihan",
    descriptionEn: "Understand the dangers of excessive debt",
    category: "debt",
    difficulty: 2,
    timeLimit: 300,
    rewards: { tokens: 60, xp: 120 },
    questions: [
      {
        id: "dw1",
        question: "Apa itu utang produktif?",
        questionEn: "What is productive debt?",
        options: [
          "Utang kartu kredit untuk kebutuhan sehari-hari",
          "Utang untuk investasi yang menghasilkan return",
          "Utang untuk hal yang tidak perlu",
          "Utang loan shark",
        ],
        correctIndex: 1,
        explanation: "Utang produktif adalah utang yang digunakan untuk investasi yang menghasilkan return lebih besar dari bunganya.",
        explanationEn: "Productive debt is debt used for investment that generates returns greater than its interest.",
      },
      {
        id: "dw2",
        question: "Berapa rasio utang ideal terhadap pendapatan?",
        questionEn: "What is the ideal debt-to-income ratio?",
        options: ["70%", "36% atau kurang", "90%", "50%"],
        correctIndex: 1,
        explanation: "Rasio utang terhadap pendapatan idealnya tidak lebih dari 36%.",
        explanationEn: "The ideal debt-to-income ratio should not exceed 36%.",
      },
    ],
  },
];

export function getQuestById(id: string): Quest | undefined {
  return QUESTS.find(q => q.id === id);
}

export function getQuestsByCategory(category: Quest["category"]): Quest[] {
  return QUESTS.filter(q => q.category === category);
}

export function getRandomQuest(difficulty?: 1 | 2 | 3): Quest {
  let filtered = QUESTS;
  if (difficulty) {
    filtered = QUESTS.filter(q => q.difficulty === difficulty);
  }
  return filtered[Math.floor(Math.random() * filtered.length)];
}