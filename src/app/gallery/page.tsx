"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Image, Video, Palette, Award,
  ChevronLeft, ChevronRight, X,
  ZoomIn, Heart, Share2, Download
} from "lucide-react";
import { clsx } from "clsx";

interface GalleryItem {
  id: string;
  type: "image" | "artwork" | "screenshot" | "video";
  title: string;
  description: string;
  thumbnail: string;
  fullUrl: string;
  likes: number;
  category: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: "1",
    type: "artwork",
    title: "Komodo Sang Penjaga",
    description: "Artwork resmi karakter utama Komodo dengan costume default",
    thumbnail: "/assets/gallery/komodo-thumb.jpg",
    fullUrl: "/assets/gallery/komodo-full.jpg",
    likes: 234,
    category: "Characters",
  },
  {
    id: "2",
    type: "screenshot",
    title: "Battle Arena - Pertama",
    description: "Tampilan pertama kali masuk battle arena",
    thumbnail: "/assets/gallery/battle1-thumb.jpg",
    fullUrl: "/assets/gallery/battle1-full.jpg",
    likes: 189,
    category: "Gameplay",
  },
  {
    id: "3",
    type: "artwork",
    title: "Wayang Owl - Shadow Skin",
    description: "Variant skin Shadow Owl yang misterius",
    thumbnail: "/assets/gallery/owl-shadow-thumb.jpg",
    fullUrl: "/assets/gallery/owl-shadow-full.jpg",
    likes: 312,
    category: "Skins",
  },
  {
    id: "4",
    type: "screenshot",
    title: "Quest Mode - Budget Basics",
    description: "Tampilan quiz mode saat menjawab pertanyaan",
    thumbnail: "/assets/gallery/quest1-thumb.jpg",
    fullUrl: "/assets/gallery/quest1-full.jpg",
    likes: 156,
    category: "Gameplay",
  },
  {
    id: "5",
    type: "artwork",
    title: "Slot Siren - Vice Monster",
    description: "Monster vice pertama yang harus dikalahkan",
    thumbnail: "/assets/gallery/slot-siren-thumb.jpg",
    fullUrl: "/assets/gallery/slot-siren-full.jpg",
    likes: 278,
    category: "Monsters",
  },
  {
    id: "6",
    type: "artwork",
    title: "Dashboard Overview",
    description: "Tampilan dashboard dengan semua fitur",
    thumbnail: "/assets/gallery/dashboard-thumb.jpg",
    fullUrl: "/assets/gallery/dashboard-full.jpg",
    likes: 198,
    category: "UI",
  },
  {
    id: "7",
    type: "screenshot",
    title: "Victory Screen",
    description: "Tampilan saat berhasil mengalahkan monster",
    thumbnail: "/assets/gallery/victory-thumb.jpg",
    fullUrl: "/assets/gallery/victory-full.jpg",
    likes: 345,
    category: "Gameplay",
  },
  {
    id: "8",
    type: "artwork",
    title: "Flame of Change - Mythic",
    description: "Karakter mythic dengan api biru yang poderosa",
    thumbnail: "/assets/gallery/flame-blue-thumb.jpg",
    fullUrl: "/assets/gallery/flame-blue-full.jpg",
    likes: 421,
    category: "Characters",
  },
];

const categories = ["All", "Characters", "Monsters", "Skins", "Gameplay", "UI"];
const typeIcons = {
  image: Image,
  artwork: Palette,
  screenshot: Image,
  video: Video,
};

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [likedItems, setLikedItems] = useState<Set<string>>(new Set());

  const filteredItems = activeCategory === "All" 
    ? galleryItems 
    : galleryItems.filter(item => item.category === activeCategory);

  const toggleLike = (id: string) => {
    setLikedItems(prev => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient">Gallery</span>
          </h1>
          <p className="text-light-400 text-lg max-w-2xl mx-auto">
            Koleksi artwork, screenshot, dan momen terbaik dari Lentera
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-wrap justify-center gap-2 mb-8"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={clsx(
                "px-4 py-2 rounded-full font-medium transition-all",
                activeCategory === category
                  ? "bg-neon-cyan text-dark-950"
                  : "bg-dark-800 text-light-300 hover:bg-dark-700"
              )}
            >
              {category}
            </button>
          ))}
        </motion.div>

        <motion.div
          key={activeCategory}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        >
          {filteredItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="group relative"
            >
              <div 
                className="glass-panel rounded-2xl overflow-hidden cursor-pointer"
                onClick={() => setSelectedItem(item)}
              >
                <div className="aspect-square relative overflow-hidden">
                  <div 
                    className="absolute inset-0 bg-gradient-to-br from-dark-800 to-dark-900 flex items-center justify-center"
                    style={{
                      background: item.category === "Characters" 
                        ? "linear-gradient(135deg, #2DD4BF20, #0D948820)"
                        : item.category === "Monsters"
                        ? "linear-gradient(135deg, #7C3AED20, #DC262620)"
                        : "linear-gradient(135deg, #8338EC20, #FF006E20)",
                    }}
                  >
                    <span className="text-6xl opacity-50">
                      {item.category === "Characters" ? "🦎" :
                       item.category === "Monsters" ? "👹" :
                       item.category === "Skins" ? "✨" :
                       item.category === "Gameplay" ? "🎮" : "🖼️"}
                    </span>
                  </div>
                  
                  <div className="absolute inset-0 bg-dark-950/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <ZoomIn className="w-12 h-12 text-neon-cyan" />
                  </div>

                  <div className="absolute top-3 right-3 px-2 py-1 rounded-lg bg-dark-950/80 backdrop-blur">
                    {(() => {
                      const Icon = typeIcons[item.type];
                      return <Icon className="w-4 h-4 text-light-300" />;
                    })()}
                  </div>
                </div>

                <div className="p-4">
                  <h3 className="font-semibold text-light-100 mb-1 truncate">{item.title}</h3>
                  <p className="text-light-400 text-sm line-clamp-2">{item.description}</p>
                  
                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-dark-700/50">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleLike(item.id);
                      }}
                      className={clsx(
                        "flex items-center gap-1 text-sm transition-colors",
                        likedItems.has(item.id) ? "text-neon-pink" : "text-light-400 hover:text-neon-pink"
                      )}
                    >
                      <Heart className={clsx("w-4 h-4", likedItems.has(item.id) && "fill-current")} />
                      {item.likes + (likedItems.has(item.id) ? 1 : 0)}
                    </button>
                    <button className="text-light-400 hover:text-neon-cyan transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {filteredItems.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="text-6xl mb-4">🖼️</div>
            <h3 className="text-xl font-semibold text-light-100 mb-2">Belum ada item</h3>
            <p className="text-light-400">Kategori ini belum memiliki item gallery</p>
          </motion.div>
        )}

        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-950/95 backdrop-blur-lg"
              onClick={() => setSelectedItem(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="w-full max-w-4xl glass-panel rounded-2xl overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="relative aspect-video bg-dark-900 flex items-center justify-center">
                  <span className="text-8xl opacity-30">
                    {selectedItem.category === "Characters" ? "🦎" :
                     selectedItem.category === "Monsters" ? "👹" :
                     selectedItem.category === "Skins" ? "✨" :
                     selectedItem.category === "Gameplay" ? "🎮" : "🖼️"}
                  </span>
                  
                  <button
                    onClick={() => setSelectedItem(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-dark-800/80 hover:bg-dark-700 transition-colors"
                  >
                    <X className="w-6 h-6 text-light-100" />
                  </button>
                </div>

                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="font-display text-2xl font-bold text-light-100 mb-1">
                        {selectedItem.title}
                      </h2>
                      <p className="text-light-400">{selectedItem.category}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => toggleLike(selectedItem.id)}
                        className={clsx(
                          "flex items-center gap-2 px-4 py-2 rounded-xl transition-colors",
                          likedItems.has(selectedItem.id)
                            ? "bg-neon-pink/20 text-neon-pink"
                            : "bg-dark-700 text-light-300 hover:bg-dark-600"
                        )}
                      >
                        <Heart className={clsx("w-5 h-5", likedItems.has(selectedItem.id) && "fill-current")} />
                        {selectedItem.likes + (likedItems.has(selectedItem.id) ? 1 : 0)}
                      </button>
                      <button className="p-2 rounded-xl bg-dark-700 hover:bg-dark-600 transition-colors">
                        <Download className="w-5 h-5 text-light-300" />
                      </button>
                    </div>
                  </div>
                  
                  <p className="text-light-300 mb-6">{selectedItem.description}</p>

                  <div className="flex items-center justify-between pt-4 border-t border-dark-700/50">
                    <button className="flex items-center gap-2 text-light-400 hover:text-neon-cyan transition-colors">
                      <ChevronLeft className="w-5 h-5" />
                      Previous
                    </button>
                    <button className="flex items-center gap-2 text-light-400 hover:text-neon-cyan transition-colors">
                      Next
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-12 glass-panel rounded-2xl p-8"
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-cyan to-neon-purple flex items-center justify-center">
              <Award className="w-6 h-6 text-dark-950" />
            </div>
            <div>
              <h3 className="font-display text-xl font-bold text-light-100">Submit Your Art!</h3>
              <p className="text-light-400">Bagikan kreasi kamu ke community</p>
            </div>
          </div>
          <p className="text-light-300 mb-4">
            Buat artwork, fanart, atau screenshot terbaik? Submit ke komunitas dan有机会 mendapat ditampilkan di gallery resmi!
          </p>
          <button className="px-6 py-3 rounded-xl bg-neon-cyan text-dark-950 font-semibold hover:bg-neon-cyan/90 transition-colors">
            Submit Sekarang
          </button>
        </motion.div>
      </div>
    </div>
  );
}