"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  BookOpen, Sparkles, Shield, Flame,
  ChevronRight, Star, Heart, Target,
  Users, Globe, Award, Zap
} from "lucide-react";
import { clsx } from "clsx";

interface StoryChapter {
  id: string;
  title: string;
  subtitle: string;
  icon: string;
  content: string[];
  bgGradient: string;
}

const storyChapters: StoryChapter[] = [
  {
    id: "origin",
    title: "Asal Mula",
    subtitle: "Dunia Lentera",
    icon: "🌍",
    content: [
      "Di sebuah dunia yang sekarang kita kenal sebagai Indonesia, there existed sebuah dimensi zwischen antara dunia nyata dan dunia digital. Di sini, exists sebuah entitas bernama Lentera - cahaya pengetahuan yang telah ada seit ribuan tahun.",
      "Lentera adalah simbol kebijaksanaan para leluhur yang menjaga generasi muda dari godaan kegelapan. Sekarang, seiring dengan berkembangnya teknologi, godaan baru muncul dalam bentuk yang lebih berbahaya - Judi Online.",
    ],
    bgGradient: "from-neon-cyan to-neon-purple",
  },
  {
    id: " guardians",
    title: "Guardian Terlahir",
    subtitle: "The Lumnis",
    icon: "🛡️",
    content: [
      "Untuk melawan kegelapan digital, Lentera memanggil para guardian - entitas yang lahir dari nilai-nilai luhur budaya Indonesia.",
      "Komodo Sang Penjaga - dari Pulau Komodo, symbolize kekuatan dan ketahanan. Wayang Owl - dari keraton Yogyakarta, symbol kebijaksanaan dan pengetahuan. Orangutan Si Inovator - dari hutan Kalimantan, symbol kreativitas dan adaptasi.",
      "Mereka adalah The Lumnis - cahaya yang melawan kejahatan digital.",
    ],
    bgGradient: "from-neon-cyan to-neon-pink",
  },
  {
    id: "vice",
    title: "Monster Vice",
    subtitle: "Musuh yang Harus Dikalahkan",
    icon: "👹",
    content: [
      "Tapi Licht tidak bisa melawan sendirian. Dari kegelapan internet, muncul monster-monster yang memanfaatkan kelemahan manusia:",
      "Slot Siren - monster yang menarik mangsa dengan janji kemenangan mudah. Rugpull Demon - yang membawa pergi semua modal. FOMO Ghost - yang memanfaatkan ketakutan kehilangan kesempatan.",
      "Setiap player harus menghadapi monster-monster ini sambil belajar literasi keuangan yang sebenarnya.",
    ],
    bgGradient: "from-vice-rug to-vice-slot",
  },
  {
    id: "mission",
    title: "Misi Kita",
    subtitle: "Together We Rise",
    icon: "🎯",
    content: [
      "Lentera lahir dari keprihatinan - jutaan youth Indonesia terjerat dalam Judi Online. Menurut data PPATK, transaksi judol online mencapai Rp 327 Trilyun!",
      "Kami percaya bahwa cara terbaik untuk melawan ini bukan dengan melarang, tapi dengan mengedukasi dan memberikan alternatif yang lebih positif.",
      "Main game, belajar keuangan, mendapatkan reward - semua dalam satu platform yang fun dan engaging!",
    ],
    bgGradient: "from-neon-yellow to-neon-orange",
  },
];

interface Value {
  icon: string;
  title: string;
  description: string;
}

const values: Value[] = [
  { icon: "📚", title: "Edukasi", description: "Belajar literasi keuangan dengan cara yang fun" },
  { icon: "🎮", title: "Entertainment", description: "Game yang engaging dan menghibur" },
  { icon: "💰", title: "Reward", description: "Dapatkan reward nyata untuk progress kamu" },
  { icon: "🤝", title: "Komunitas", description: "Bersatu dengan player lain untuk melawan judol" },
];

interface TeamMember {
  name: string;
  role: string;
  icon: string;
}

const team: TeamMember[] = [
  { name: "Dev Team", role: "Development", icon: "👨‍💻" },
  { name: "Design Team", role: "UI/UX Design", icon: "🎨" },
  { name: "Content Team", role: "Story & Quest", icon: "📝" },
  { name: "Community", role: "Player Heroes", icon: "⭐" },
];

export default function AboutPage() {
  const [selectedChapter, setSelectedChapter] = useState(storyChapters[0]);

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="text-gradient">Cerita Lentera</span>
          </h1>
          <p className="text-light-400 text-lg max-w-2xl mx-auto">
            Pelajari sejarah dan lore di balik Lentera GameFi
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12">
          {storyChapters.map((chapter, index) => (
            <motion.button
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              onClick={() => setSelectedChapter(chapter)}
              className={clsx(
                "p-6 rounded-2xl text-left transition-all",
                selectedChapter.id === chapter.id
                  ? "glass-panel neon-border"
                  : "glass-panel hover:border-dark-500"
              )}
            >
              <div className="text-4xl mb-3">{chapter.icon}</div>
              <h3 className="font-display text-lg font-bold text-light-100 mb-1">{chapter.title}</h3>
              <p className="text-light-400 text-sm">{chapter.subtitle}</p>
            </motion.button>
          ))}
        </div>

        <motion.div
          key={selectedChapter.id}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-panel rounded-3xl overflow-hidden mb-12"
        >
          <div className={clsx(
            "h-32 p-8 bg-gradient-to-r",
            selectedChapter.bgGradient
          )}>
            <div className="flex items-center gap-4">
              <span className="text-5xl">{selectedChapter.icon}</span>
              <div>
                <h2 className="font-display text-3xl font-bold text-dark-950">{selectedChapter.title}</h2>
                <p className="text-dark-800/80">{selectedChapter.subtitle}</p>
              </div>
            </div>
          </div>
          
          <div className="p-8 space-y-6">
            {selectedChapter.content.map((paragraph, index) => (
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                className="text-light-300 text-lg leading-relaxed"
              >
                {paragraph}
              </motion.p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl font-bold text-center mb-8">
            <span className="text-gradient">Nilai-Nilai Lentera</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="glass-panel p-6 rounded-2xl text-center hover:border-neon-cyan/30 transition-all"
              >
                <div className="text-4xl mb-3">{value.icon}</div>
                <h3 className="font-semibold text-light-100 mb-2">{value.title}</h3>
                <p className="text-light-400 text-sm">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="glass-panel rounded-2xl p-8 mb-12"
        >
          <div className="flex items-center gap-4 mb-6">
            <Globe className="w-8 h-8 text-neon-cyan" />
            <h2 className="font-display text-2xl font-bold text-light-100">Visi Kami</h2>
          </div>
          <p className="text-light-300 text-lg leading-relaxed mb-6">
            Menjadi platform GameFi terdepan yang membantu generasi muda Indonesia 
            menghindari godaan Judi Online melalui edukasi literasi finansials yang fun, 
            engaging, dan memberikan value nyata.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { label: "Players", value: "50K+" },
              { label: "Quests Selesai", value: "500+" },
              { label: "Universitas", value: "100+" },
              { label: "Token Distributed", value: "100K+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center p-4 bg-dark-800/50 rounded-xl">
                <div className="text-2xl font-bold text-neon-cyan">{stat.value}</div>
                <div className="text-light-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="glass-panel rounded-2xl p-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <Users className="w-8 h-8 text-neon-pink" />
            <h2 className="font-display text-2xl font-bold text-light-100">Tim & Komunitas</h2>
          </div>
          <p className="text-light-300 mb-6">
            Lentera dibangun oleh tim yang passion untuk membantu youth Indonesia. 
            Tapi lebih dari itu, kami adalah komunitas - student, developer, designer, 
            dan survivor yang berjuang bersama.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            {team.map((member) => (
              <div 
                key={member.name}
                className="flex items-center gap-3 px-4 py-2 bg-dark-800/50 rounded-full"
              >
                <span className="text-2xl">{member.icon}</span>
                <div>
                  <div className="text-light-100 font-medium">{member.name}</div>
                  <div className="text-light-400 text-xs">{member.role}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="mt-12 text-center"
        >
          <h3 className="font-display text-2xl font-bold text-light-100 mb-4">
            Ingin bergabung dengan perjalanan ini?
          </h3>
          <p className="text-light-400 mb-6">
            Jadilah bagian dari komunitas Lentera dan bantu kami spread light!
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-neon-cyan to-neon-purple text-dark-950 font-semibold hover:opacity-90 transition-opacity">
              Join Discord
            </button>
            <button className="px-6 py-3 rounded-xl border-2 border-neon-cyan text-neon-cyan font-semibold hover:bg-neon-cyan/10 transition-colors">
              Follow Twitter
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}