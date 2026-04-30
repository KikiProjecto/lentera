"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { WalletButton } from "@/components/wallet/WalletButton";
import { 
  Home, Gamepad2, Users, Trophy, 
  Settings, BookOpen, Image, ChevronDown,
  Menu, X, Sparkles
} from "lucide-react";
import { clsx } from "clsx";

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/game", label: "Battle", icon: Gamepad2 },
  { href: "/characters", label: "Guardians", icon: Users },
  { href: "/quest", label: "Quests", icon: BookOpen },
  { href: "/gallery", label: "Gallery", icon: Image },
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/about", label: "Story", icon: Sparkles },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showWallet, setShowWallet] = useState(false);

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-950/80 backdrop-blur-xl border-b border-dark-700/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-3 group">
            <motion.div
              whileHover={{ rotate: 15 }}
              className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center"
            >
              <span className="text-xl">🕯️</span>
            </motion.div>
            <span className="font-display text-xl font-bold text-light-100 group-hover:text-neon-cyan transition-colors">
              LENTERA
            </span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    "flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200",
                    active
                      ? "bg-neon-cyan/10 text-neon-cyan"
                      : "text-light-300 hover:text-light-100 hover:bg-dark-800"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:block relative">
              <button
                onClick={() => setShowWallet(!showWallet)}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-dark-800/50 border border-dark-600/50 hover:border-neon-cyan/30 transition-all"
              >
                <WalletButton />
              </button>
            </div>
            <div className="md:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 rounded-lg hover:bg-dark-800 transition-colors"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6 text-light-100" />
                ) : (
                  <Menu className="w-6 h-6 text-light-100" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden border-t border-dark-700/50 bg-dark-950/95 backdrop-blur-xl"
          >
            <div className="px-4 py-4 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={clsx(
                      "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
                      active
                        ? "bg-neon-cyan/10 text-neon-cyan"
                        : "text-light-300 hover:text-light-100 hover:bg-dark-800"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    {item.label}
                  </Link>
                );
              })}
              <div className="pt-4 border-t border-dark-700/50">
                <div className="px-4">
                  <WalletButton />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}