"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { WalletButton } from "@/components/wallet/WalletButton";
import { 
  Settings as SettingsIcon, User, Bell, Lock, 
  Palette, Globe, HelpCircle, Info, 
  ChevronRight, Moon, Sun, Volume2, VolumeX,
  Check, X
} from "lucide-react";
import { clsx } from "clsx";

interface ToggleOption {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
}

interface SelectOption {
  id: string;
  label: string;
  value: string;
  options: { value: string; label: string }[];
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState("account");

  const [toggles, setToggles] = useState<ToggleOption[]>([
    { id: "notifications", label: "Push Notifications", description: "Terima notifikasi untuk quest dan event", enabled: true },
    { id: "sound", label: "Sound Effects", description: "Aktifkan efek suara dalam game", enabled: true },
    { id: "music", label: "Background Music", description: "Mainkan musik latar", enabled: false },
    { id: "animations", label: "Motion Animations", description: "Aktifkan animasi pada UI", enabled: true },
    { id: "reducedMotion", label: "Reduced Motion", description: "Kurangi animasi untuk aksesibilitas", enabled: false },
    { id: "publicProfile", label: "Public Profile", description: "Tampilkan profil di leaderboard", enabled: true },
  ]);

  const [selects, setSelects] = useState<SelectOption[]>([
    { id: "language", label: "Language", value: "id", options: [
      { value: "id", label: "Indonesia" },
      { value: "en", label: "English" },
    ]},
    { id: "theme", label: "Theme", value: "dark", options: [
      { value: "dark", label: "Dark" },
      { value: "light", label: "Light" },
      { value: "system", label: "System" },
    ]},
    { id: "currency", label: "Currency Display", value: "idr", options: [
      { value: "idr", label: "IDR (Rp)" },
      { value: "usd", label: "USD ($)" },
    ]},
  ]);

  const toggleOption = (id: string) => {
    setToggles(prev => prev.map(t => 
      t.id === id ? { ...t, enabled: !t.enabled } : t
    ));
  };

  const updateSelect = (id: string, value: string) => {
    setSelects(prev => prev.map(s => 
      s.id === id ? { ...s, value } : s
    ));
  };

  const sections = [
    { id: "account", label: "Akun", icon: User },
    { id: "notifications", label: "Notifikasi", icon: Bell },
    { id: "appearance", label: "Tampilan", icon: Palette },
    { id: "language", label: "Bahasa & Wilayah", icon: Globe },
    { id: "privacy", label: "Privasi & Keamanan", icon: Lock },
    { id: "help", label: "Bantuan", icon: HelpCircle },
    { id: "about", label: "Tentang", icon: Info },
  ];

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-4xl font-bold mb-4">
            <span className="text-gradient">Pengaturan</span>
          </h1>
          <p className="text-light-400">Kustomisasi pengalamanmu di Lentera</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-1"
          >
            <div className="glass-panel rounded-2xl p-2">
              {sections.map((section) => {
                const Icon = section.icon;
                return (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={clsx(
                      "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all",
                      activeSection === section.id
                        ? "bg-neon-cyan/10 text-neon-cyan"
                        : "text-light-300 hover:text-light-100 hover:bg-dark-800"
                    )}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{section.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="md:col-span-3 space-y-6"
          >
            {activeSection === "account" && (
              <>
                <div className="glass-panel rounded-2xl p-6">
                  <h2 className="font-display text-xl font-bold text-light-100 mb-4">Wallet</h2>
                  <div className="p-4 bg-dark-800/50 rounded-xl">
                    <WalletButton />
                  </div>
                </div>

                <div className="glass-panel rounded-2xl p-6">
                  <h2 className="font-display text-xl font-bold text-light-100 mb-4">Informasi Akun</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="text-light-400 text-sm mb-2 block">Username</label>
                      <input
                        type="text"
                        defaultValue="Player123"
                        className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600/50 rounded-xl text-light-100 focus:outline-none focus:border-neon-cyan/50"
                      />
                    </div>
                    <div>
                      <label className="text-light-400 text-sm mb-2 block">Email</label>
                      <input
                        type="email"
                        defaultValue="player@example.com"
                        className="w-full px-4 py-3 bg-dark-800/50 border border-dark-600/50 rounded-xl text-light-100 focus:outline-none focus:border-neon-cyan/50"
                      />
                    </div>
                    <button className="px-6 py-3 rounded-xl bg-neon-cyan text-dark-950 font-semibold hover:bg-neon-cyan/90 transition-opacity">
                      Simpan Perubahan
                    </button>
                  </div>
                </div>
              </>
            )}

            {activeSection === "notifications" && (
              <div className="glass-panel rounded-2xl p-6">
                <h2 className="font-display text-xl font-bold text-light-100 mb-4">Notifikasi</h2>
                <div className="space-y-4">
                  {toggles.filter(t => ["notifications"].includes(t.id)).map((toggle) => (
                    <div key={toggle.id} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                      <div>
                        <h4 className="text-light-100 font-medium">{toggle.label}</h4>
                        <p className="text-light-400 text-sm">{toggle.description}</p>
                      </div>
                      <button
                        onClick={() => toggleOption(toggle.id)}
                        className={clsx(
                          "w-12 h-6 rounded-full transition-all relative",
                          toggle.enabled ? "bg-neon-cyan" : "bg-dark-600"
                        )}
                      >
                        <div className={clsx(
                          "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                          toggle.enabled ? "left-7" : "left-1"
                        )} />
                      </button>
                    </div>
                  ))}
                  {toggles.filter(t => t.id !== "notifications" && t.id !== "sound" && t.id !== "music" && t.id !== "animations" && t.id !== "reducedMotion" && t.id !== "publicProfile").map((toggle) => (
                    <div key={toggle.id} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                      <div>
                        <h4 className="text-light-100 font-medium">{toggle.label}</h4>
                        <p className="text-light-400 text-sm">{toggle.description}</p>
                      </div>
                      <button
                        onClick={() => toggleOption(toggle.id)}
                        className={clsx(
                          "w-12 h-6 rounded-full transition-all relative",
                          toggle.enabled ? "bg-neon-cyan" : "bg-dark-600"
                        )}
                      >
                        <div className={clsx(
                          "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                          toggle.enabled ? "left-7" : "left-1"
                        )} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "appearance" && (
              <div className="glass-panel rounded-2xl p-6">
                <h2 className="font-display text-xl font-bold text-light-100 mb-4">Tampilan</h2>
                <div className="space-y-4">
                  {selects.filter(s => s.id === "theme").map((select) => (
                    <div key={select.id} className="p-4 bg-dark-800/50 rounded-xl">
                      <h4 className="text-light-100 font-medium mb-3">{select.label}</h4>
                      <div className="flex gap-2">
                        {select.options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => updateSelect(select.id, opt.value)}
                            className={clsx(
                              "px-4 py-2 rounded-lg font-medium transition-all",
                              select.value === opt.value
                                ? "bg-neon-cyan text-dark-950"
                                : "bg-dark-700 text-light-300 hover:bg-dark-600"
                            )}
                          >
                            {opt.label === "Dark" && <Moon className="w-4 h-4 inline mr-2" />}
                            {opt.label === "Light" && <Sun className="w-4 h-4 inline mr-2" />}
                            {opt.label === "System" && <SettingsIcon className="w-4 h-4 inline mr-2" />}
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                  {toggles.filter(t => ["animations", "reducedMotion"].includes(t.id)).map((toggle) => (
                    <div key={toggle.id} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                      <div>
                        <h4 className="text-light-100 font-medium">{toggle.label}</h4>
                        <p className="text-light-400 text-sm">{toggle.description}</p>
                      </div>
                      <button
                        onClick={() => toggleOption(toggle.id)}
                        className={clsx(
                          "w-12 h-6 rounded-full transition-all relative",
                          toggle.enabled ? "bg-neon-cyan" : "bg-dark-600"
                        )}
                      >
                        <div className={clsx(
                          "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                          toggle.enabled ? "left-7" : "left-1"
                        )} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "language" && (
              <div className="glass-panel rounded-2xl p-6">
                <h2 className="font-display text-xl font-bold text-light-100 mb-4">Bahasa & Wilayah</h2>
                <div className="space-y-4">
                  {selects.filter(s => ["language", "currency"].includes(s.id)).map((select) => (
                    <div key={select.id} className="p-4 bg-dark-800/50 rounded-xl">
                      <h4 className="text-light-100 font-medium mb-3">{select.label}</h4>
                      <div className="flex flex-wrap gap-2">
                        {select.options.map((opt) => (
                          <button
                            key={opt.value}
                            onClick={() => updateSelect(select.id, opt.value)}
                            className={clsx(
                              "px-4 py-2 rounded-lg font-medium transition-all",
                              select.value === opt.value
                                ? "bg-neon-cyan text-dark-950"
                                : "bg-dark-700 text-light-300 hover:bg-dark-600"
                            )}
                          >
                            {opt.label}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "privacy" && (
              <div className="glass-panel rounded-2xl p-6">
                <h2 className="font-display text-xl font-bold text-light-100 mb-4">Privasi & Keamanan</h2>
                <div className="space-y-4">
                  {toggles.filter(t => ["publicProfile"].includes(t.id)).map((toggle) => (
                    <div key={toggle.id} className="flex items-center justify-between p-4 bg-dark-800/50 rounded-xl">
                      <div>
                        <h4 className="text-light-100 font-medium">{toggle.label}</h4>
                        <p className="text-light-400 text-sm">{toggle.description}</p>
                      </div>
                      <button
                        onClick={() => toggleOption(toggle.id)}
                        className={clsx(
                          "w-12 h-6 rounded-full transition-all relative",
                          toggle.enabled ? "bg-neon-cyan" : "bg-dark-600"
                        )}
                      >
                        <div className={clsx(
                          "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
                          toggle.enabled ? "left-7" : "left-1"
                        )} />
                      </button>
                    </div>
                  ))}
                  <button className="w-full p-4 bg-dark-800/50 rounded-xl text-left flex items-center justify-between hover:bg-dark-700 transition-colors">
                    <div>
                      <h4 className="text-light-100 font-medium">Ganti Password</h4>
                      <p className="text-light-400 text-sm">Update password akunmu</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-light-400" />
                  </button>
                  <button className="w-full p-4 bg-dark-800/50 rounded-xl text-left flex items-center justify-between hover:bg-dark-700 transition-colors">
                    <div>
                      <h4 className="text-light-100 font-medium">Export Data</h4>
                      <p className="text-light-400 text-sm">Download semua data akunmu</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-light-400" />
                  </button>
                </div>
              </div>
            )}

            {activeSection === "help" && (
              <div className="glass-panel rounded-2xl p-6">
                <h2 className="font-display text-xl font-bold text-light-100 mb-4">Bantuan</h2>
                <div className="space-y-3">
                  {["FAQ", "Cara Main", "Hubungi Kami", "Report Bug"].map((item) => (
                    <button
                      key={item}
                      className="w-full p-4 bg-dark-800/50 rounded-xl text-left flex items-center justify-between hover:bg-dark-700 transition-colors"
                    >
                      <span className="text-light-100 font-medium">{item}</span>
                      <ChevronRight className="w-5 h-5 text-light-400" />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {activeSection === "about" && (
              <div className="glass-panel rounded-2xl p-6">
                <h2 className="font-display text-xl font-bold text-light-100 mb-4">Tentang Lentera</h2>
                <div className="space-y-4">
                  <div className="text-center py-8">
                    <div className="text-6xl mb-4">🕯️</div>
                    <h3 className="font-display text-2xl font-bold text-light-100 mb-2">Lentera</h3>
                    <p className="text-light-400">Version 1.0.0</p>
                  </div>
                  <p className="text-light-300 text-center">
                    GameFi Edutainment untuk Literasi Keuangan & Pencegahan Judi Online
                  </p>
                  <div className="flex justify-center gap-4 pt-4">
                    <button className="px-4 py-2 bg-dark-700 rounded-lg text-light-300 hover:bg-dark-600">
                      Terms of Service
                    </button>
                    <button className="px-4 py-2 bg-dark-700 rounded-lg text-light-300 hover:bg-dark-600">
                      Privacy Policy
                    </button>
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}