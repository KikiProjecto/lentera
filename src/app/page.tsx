"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useWallet } from "@solana/wallet-adapter-react";
import Button from "@/components/ui/Button";
import CharacterCard from "@/components/characters/CharacterCard";
import { WalletButton } from "@/components/wallet/WalletButton";
import { GUARDIANS, VICE_MONSTERS } from "@/data/characters";
import { 
  Zap, Shield, Flame, 
  Play, Users, Trophy, 
  Wallet, ChevronRight, Star,
  Sparkles, ArrowRight
} from "lucide-react";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 25 }
  }
};

export default function HomePage() {
  const router = useRouter();
  const { connected } = useWallet();
  const [selectedCharacter, setSelectedCharacter] = useState(GUARDIANS[0]);
  const [activeTab, setActiveTab] = useState<"guardians" | "vice">("guardians");

  const handleStartAdventure = () => {
    if (connected) {
      router.push("/game");
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-mesh-gradient" />
        <div className="absolute inset-0 noise-texture" />
        
        {/* Animated Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                background: i % 3 === 0 ? "#00F5D4" : i % 3 === 1 ? "#FF006E" : "#8338EC",
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.8, 0.2, 0.8],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        {/* Floating Orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full opacity-20"
          style={{ background: "radial-gradient(circle, #00F5D4 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full opacity-15"
          style={{ background: "radial-gradient(circle, #FF006E 0%, transparent 70%)" }}
          animate={{ scale: [1, 1.3, 1], opacity: [0.15, 0.25, 0.15] }}
          transition={{ duration: 5, repeat: Infinity, delay: 1 }}
        />

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10 max-w-6xl mx-auto px-6 text-center"
        >
          {/* Logo & Tagline */}
          <motion.div variants={itemVariants} className="mb-6">
            <motion.div
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-dark-800/60 backdrop-blur-lg border border-neon-cyan/30"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ type: "spring", delay: 0.3 }}
            >
              <Sparkles className="w-5 h-5 text-neon-cyan" />
              <span className="text-neon-cyan font-medium">GameFi x Edukasi</span>
            </motion.div>
          </motion.div>

          <motion.h1 
            variants={itemVariants}
            className="font-display text-5xl md:text-7xl lg:text-8xl font-extrabold mb-6"
          >
            <span className="text-gradient">LENTERA</span>
            <br />
            <span className="text-light-100">GameFi</span>
          </motion.h1>

          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-2xl text-light-300 mb-8 max-w-2xl mx-auto"
          >
            Jaga Masa Depanmu dari Godaan Digital
            <br />
            <span className="text-neon-cyan">Main, Belajar, Menang Bareng Karakter Lucu!</span>
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-16"
          >
            <Button size="xl" className="group" onClick={handleStartAdventure}>
              <Play className="w-6 h-6 group-hover:scale-110 transition-transform" />
              Mulai Petualangan
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <div className="flex items-center">
              <WalletButton />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div 
            variants={itemVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto"
          >
            {[
              { icon: Users, label: "Players", value: "50K+" },
              { icon: Trophy, label: "Rewards", value: "100K+" },
              { icon: Zap, label: "Quests", value: "500+" },
              { icon: Shield, label: "Universitas", value: "100+" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="glass-panel p-4 rounded-xl"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.1 }}
              >
                <stat.icon className="w-6 h-6 mx-auto mb-2 text-neon-cyan" />
                <div className="text-2xl font-bold text-light-100">{stat.value}</div>
                <div className="text-light-400 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ChevronRight className="w-8 h-8 text-light-400 rotate-90" />
        </motion.div>
      </section>

      {/* Characters Section */}
      <section className="py-24 px-6 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              <span className="text-gradient">The Lumnis</span>
            </h2>
            <p className="text-light-400 text-lg max-w-2xl mx-auto">
              Pilih guardian-mu untuk melawan monster vice! Setiap karakter memiliki kemampuan unik.
            </p>
          </motion.div>

          {/* Tabs */}
          <div className="flex justify-center gap-4 mb-8">
            <Button
              variant={activeTab === "guardians" ? "primary" : "ghost"}
              onClick={() => setActiveTab("guardians")}
            >
              <Shield className="w-5 h-5" />
              Guardians
            </Button>
            <Button
              variant={activeTab === "vice" ? "danger" : "ghost"}
              onClick={() => setActiveTab("vice")}
            >
              <Flame className="w-5 h-5" />
              Vice Monsters
            </Button>
          </div>

          {/* Character Grid */}
          <AnimatePresence mode="wait">
            {activeTab === "guardians" ? (
              <motion.div
                key="guardians"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {GUARDIANS.map((guardian, index) => (
                  <motion.div
                    key={guardian.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <CharacterCard
                      character={guardian}
                      variant="full"
                      isSelected={selectedCharacter.id === guardian.id}
                      onSelect={setSelectedCharacter}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="vice"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
              >
                {VICE_MONSTERS.map((vice, index) => (
                  <motion.div
                    key={vice.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="vice-card p-6 rounded-2xl">
                      <div 
                        className="w-16 h-16 rounded-xl mb-4 flex items-center justify-center text-4xl"
                        style={{ background: `${vice.color}20` }}
                      >
                        {vice.type === "slot" ? "🎰" : 
                         vice.type === "rug" ? "😈" : 
                         vice.type === "fomo" ? "👻" : 
                         vice.type === "greed" ? "👺" : "💀"}
                      </div>
                      <h4 className="font-semibold text-light-100 mb-2">{vice.name}</h4>
                      <p className="text-light-400 text-sm mb-4">{vice.description}</p>
                      <div className="flex items-center gap-2">
                        <span 
                          className="px-3 py-1 rounded-full text-xs font-medium"
                          style={{ backgroundColor: `${vice.color}20`, color: vice.color }}
                        >
                          Difficulty: {vice.difficulty}
                        </span>
                        <span className="text-neon-cyan text-sm font-semibold">
                          +{vice.reward.tokens} $LIT
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 relative bg-dark-900/50">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
              Fitur <span className="text-neon-cyan">Utama</span>
            </h2>
            <p className="text-light-400 text-lg">
              Semua yang kamu butuhkan untuk mengalahkan kecanduan!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                icon: Zap,
                title: "Quest Harian",
                description: "Mini-game edukasi 5-10 menit untuk bangun kebiasaan finansial sehat.",
                color: "#00F5D4",
              },
              {
                icon: Shield,
                title: "Battle Mode",
                description: "Kalahkan monster vice dan earn $LIT token dengan pengetahuanmu.",
                color: "#FF006E",
              },
              {
                icon: Users,
                title: "Guild Kampus",
                description: "Bersaing dengan teman kampus di leaderboard dan challenges.",
                color: "#8338EC",
              },
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="guardian-card p-8 rounded-2xl text-center"
              >
                <div 
                  className="w-16 h-16 mx-auto mb-4 rounded-xl flex items-center justify-center"
                  style={{ background: `${feature.color}20` }}
                >
                  <feature.icon className="w-8 h-8" style={{ color: feature.color }} />
                </div>
                <h3 className="font-display text-xl font-bold text-light-100 mb-2">{feature.title}</h3>
                <p className="text-light-400">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh-gradient opacity-50" />
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="relative max-w-4xl mx-auto text-center glass-panel p-12 rounded-3xl neon-border"
        >
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            Siap <span className="text-gradient">Menang?</span>
          </h2>
          <p className="text-light-300 text-lg mb-8 max-w-xl mx-auto">
            Join 50.000+ mahasiswa yang sudah libre dari godaan online dengan Lentera!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="xl">
              <Play className="w-5 h-5" />
              Mulai Gratis
            </Button>
            <Button variant="ghost" size="xl">
              Pelajari Lebih Lanjut
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-dark-700/50">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🕯️</span>
            <span className="font-display text-xl font-bold">LENTERA</span>
          </div>
          <div className="text-light-400 text-sm">
            © 2024 Lentera GameFi. Built on Solana.
          </div>
        </div>
      </footer>
    </div>
  );
}