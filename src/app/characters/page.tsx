"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CharacterCard from "@/components/characters/CharacterCard";
import { GUARDIANS, VICE_MONSTERS, type CharacterConfig, RARITY_COLORS } from "@/data/characters";
import { 
  Search, Filter, Star, 
  Sparkles, Zap, Shield, 
  ChevronRight, Grid, List
} from "lucide-react";
import { clsx } from "clsx";

type TabType = "guardians" | "monsters";
type SortType = "name" | "rarity" | "element";
type ViewMode = "grid" | "list";

export default function CharactersPage() {
  const [activeTab, setActiveTab] = useState<TabType>("guardians");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [selectedRarity, setSelectedRarity] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortType>("rarity");
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterConfig | typeof VICE_MONSTERS[0] | null>(null);

  const elements = ["earth", "void", "air", "water", "fire", "light"];
  const rarities = ["common", "rare", "epic", "legendary", "mythic"];

  const characters: (CharacterConfig | typeof VICE_MONSTERS[0])[] = activeTab === "guardians" ? GUARDIANS : VICE_MONSTERS;

  const filteredCharacters = characters
    .filter((char: any) => {
      const name = char.name || "";
      const matchesSearch = name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesElement = !selectedElement || ("element" in char && char.element === selectedElement);
      const matchesRarity = !selectedRarity || char.rarity === selectedRarity;
      return matchesSearch && matchesElement && matchesRarity;
    })
    .sort((a: any, b: any) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "rarity") {
        const rarityOrder = ["common", "rare", "epic", "legendary", "mythic"];
        return rarityOrder.indexOf(b.rarity || "common") - rarityOrder.indexOf(a.rarity || "common");
      }
      if (sortBy === "element" && "element" in a && "element" in b) {
        return a.element.localeCompare(b.element);
      }
      return 0;
    });

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">The Lumnis</span>
          </h1>
          <p className="text-light-400 text-lg max-w-2xl mx-auto">
            Temui guardian dan monster yang akan kau hadapi dalam perjalananmu
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass-panel rounded-2xl p-4 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-light-400" />
              <input
                type="text"
                placeholder="Cari karakter..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-dark-800/50 border border-dark-600/50 rounded-xl text-light-100 placeholder:text-light-400 focus:outline-none focus:border-neon-cyan/50"
              />
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setActiveTab("guardians")}
                className={clsx(
                  "px-4 py-2 rounded-xl font-medium transition-all",
                  activeTab === "guardians"
                    ? "bg-neon-cyan text-dark-950"
                    : "bg-dark-700 text-light-300 hover:bg-dark-600"
                )}
              >
                🛡️ Guardians
              </button>
              <button
                onClick={() => setActiveTab("monsters")}
                className={clsx(
                  "px-4 py-2 rounded-xl font-medium transition-all",
                  activeTab === "monsters"
                    ? "bg-vice-slot text-white"
                    : "bg-dark-700 text-light-300 hover:bg-dark-600"
                )}
              >
                👹 Vice Monsters
              </button>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={clsx(
                  "p-2 rounded-lg transition-all",
                  viewMode === "grid" ? "bg-neon-cyan/20 text-neon-cyan" : "text-light-400"
                )}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={clsx(
                  "p-2 rounded-lg transition-all",
                  viewMode === "list" ? "bg-neon-cyan/20 text-neon-cyan" : "text-light-400"
                )}
              >
                <List className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t border-dark-700/50">
            <div className="flex items-center gap-2">
              <span className="text-light-400 text-sm">Element:</span>
              <div className="flex gap-1">
                {elements.map((el) => (
                  <button
                    key={el}
                    onClick={() => setSelectedElement(selectedElement === el ? null : el)}
                    className={clsx(
                      "px-3 py-1 rounded-full text-xs font-medium capitalize transition-all",
                      selectedElement === el
                        ? "bg-neon-cyan text-dark-950"
                        : "bg-dark-700 text-light-300 hover:bg-dark-600"
                    )}
                  >
                    {el}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-light-400 text-sm">Rarity:</span>
              <div className="flex gap-1">
                {rarities.map((rarity) => (
                  <button
                    key={rarity}
                    onClick={() => setSelectedRarity(selectedRarity === rarity ? null : rarity)}
                    className={clsx(
                      "px-3 py-1 rounded-full text-xs font-medium capitalize transition-all",
                      selectedRarity === rarity
                        ? "bg-neon-purple text-white"
                        : "bg-dark-700 text-light-300 hover:bg-dark-600"
                    )}
                    style={selectedRarity === rarity ? {} : { color: RARITY_COLORS[rarity as keyof typeof RARITY_COLORS] }}
                  >
                    {rarity}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

<motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={clsx(
                "grid gap-6",
                viewMode === "grid" 
                  ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
                  : "grid-cols-1"
              )}
            >
              {filteredCharacters.map((character: any, index) => (
                <motion.div
                  key={character.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {viewMode === "grid" ? (
                    <div
                      onClick={() => setSelectedCharacter(character)}
                      className="cursor-pointer"
                    >
                      {"element" in character ? (
                        <CharacterCard
                          character={character as CharacterConfig}
                          variant="full"
                          showStats={true}
                        />
                      ) : (
                        <div className="glass-panel p-6 rounded-2xl">
                          <div className="w-20 h-20 mx-auto mb-4 rounded-xl flex items-center justify-center text-5xl" style={{ background: `${character.color}20` }}>
                            {character.type === "slot" ? "🎰" : character.type === "rug" ? "😈" : character.type === "fomo" ? "👻" : "👺"}
                          </div>
                          <h3 className="font-semibold text-light-100 text-center">{character.name}</h3>
                          <p className="text-light-400 text-sm text-center">Difficulty: {character.difficulty}</p>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      onClick={() => setSelectedCharacter(character)}
                      className="cursor-pointer glass-panel p-4 rounded-xl hover:border-neon-cyan/30 transition-all"
                    >
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                          style={{
                            background: "element" in character
                              ? `linear-gradient(135deg, ${character.color}20, ${character.secondaryColor}30)`
                              : `${character.color}20`,
                          }}
                        >
                          {"element" in character 
                            ? (character.element === "earth" ? "🦎" : 
                               character.element === "void" ? "🦉" : 
                               character.element === "air" ? "🦧" : 
                               character.element === "water" ? "💎" : 
                               character.element === "fire" ? "🔥" : "☀️")
                            : (character.type === "slot" ? "🎰" : 
                               character.type === "rug" ? "😈" : 
                               character.type === "fomo" ? "👻" : "👺")
                            }
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-light-100">{character.name}</h3>
                          <p className="text-light-400 text-sm">{character.role || `Difficulty: ${character.difficulty || 1}`}</p>
                        </div>
                        <ChevronRight className="w-5 h-5 text-light-400" />
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>

        {filteredCharacters.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-light-100 mb-2">Tidak ditemukan</h3>
            <p className="text-light-400">Coba ubah filter atau kata kunci pencarian</p>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedCharacter && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/90 backdrop-blur-lg"
              onClick={() => setSelectedCharacter(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-2xl glass-panel rounded-2xl p-6"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-start gap-6">
                  <div 
                    className="w-32 h-32 rounded-2xl flex items-center justify-center text-6xl shrink-0"
                    style={{
                      background: "element" in (selectedCharacter as any)
                        ? `linear-gradient(135deg, ${(selectedCharacter as any).color}30, ${(selectedCharacter as any).secondaryColor}20)`
                        : `${(selectedCharacter as any).color}20`,
                      border: `2px solid ${(selectedCharacter as any).color}`,
                    }}
                  >
                    {"element" in (selectedCharacter as any)
                      ? ((selectedCharacter as CharacterConfig).element === "earth" ? "🦎" : 
                         (selectedCharacter as CharacterConfig).element === "void" ? "🦉" : 
                         (selectedCharacter as CharacterConfig).element === "air" ? "🦧" : 
                         (selectedCharacter as CharacterConfig).element === "water" ? "💎" : 
                         (selectedCharacter as CharacterConfig).element === "fire" ? "🔥" : "☀️")
                      : ((selectedCharacter as any).type === "slot" ? "🎰" : 
                         (selectedCharacter as any).type === "rug" ? "😈" : 
                         (selectedCharacter as any).type === "fomo" ? "👻" : "👺")
                    }
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h2 className="font-display text-2xl font-bold text-light-100">
                        {(selectedCharacter as any)?.name}
                      </h2>
                      <span 
                        className="px-3 py-1 rounded-full text-xs font-medium"
                        style={{ 
                          backgroundColor: "#A0A0B020",
                          color: "#A0A0B0",
                        }}
                      >
                        {((selectedCharacter as any)?.rarity || "common")}
                      </span>
                    </div>
                    <p className="text-light-400 mb-4">{(selectedCharacter as any)?.role || (selectedCharacter as any)?.description}</p>
                    
                    {"abilities" in (selectedCharacter as any) && (
                      <div className="space-y-2">
                        <h4 className="text-light-300 font-medium">Kemampuan:</h4>
                        {(selectedCharacter as any)?.abilities?.map((ability: any, idx: number) => (
                          <div key={idx} className="flex items-center gap-2 text-sm">
                            <Zap className="w-4 h-4 text-neon-cyan" />
                            <span className="text-light-200">{ability.name}</span>
                            <span className="text-light-400">- {ability.description}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedCharacter(null)}
                  className="mt-6 w-full py-3 rounded-xl bg-dark-700 text-light-300 hover:bg-dark-600 transition-colors"
                >
                  Tutup
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}