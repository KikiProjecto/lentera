# Lentera

<p align="center">
  <img src="https://img.shields.io/badge/Solana-000000?style=for-the-badge&logo=solana&logoColor=white" alt="Solana" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</p>

<p align="center">
  <strong>Lentera</strong> — GameFi Edutainment untuk Literasi Keuangan & Pencegahan Judi Online
</p>

---

## Apa Itu Lentera?

Lentera adalah **GameFi dApp** di blockchain Solana yang menggabungkan **edutainment** dengan **play-to-earn** untuk membantu Gen Z dan mahasiswa Indonesia menghindari godaan judi online sambil belajar literasi keuangan.

> **Tagline:** "Jaga Masa Depanmu dari Godaan Digital – Main, Belajar, Menang Bareng Karakter Lucu!"

### Masalah yang Diselesaikan

Berdasarkan data PPATK 2023-2025:
- **Rp 327 Trilyun** transaksi judol online di Indonesia
- **2,37 juta orang** terlibat, 80% dari kelas menengah bawah
- **960.000 mahasiswa dan pelajar** terjerat
- 43,3% mahasiswa pernah berjudi online; 25,9% masih aktif

---

## Karakter Bijak Guardians

| Karakter | Element | Peran |
|----------|---------|-------|
| 🦎 Komodo Dragon | Earth | Hero kuat & bijak |
| 🦉 Wayang Owl | Void | Penasihat pintar |
| 🦧 Orangutan | Air | Inovator kreatif |

### Monster Vice yang Dikalahkan

| Monster | Tipe | Difficulty |
|---------|------|------------|
| 🎰 Slot Siren | Slot | Easy |
| 😈 Rugpull Demon | Rug | Medium |
| 👻 FOMO Ghost | Fomo | Hard |

---

## Tech Stack

### Blockchain & Backend
- **Solana** — Blockchain utama
- **Anchor (Rust)** — Smart contract
- **Metaplex** — NFT Guardians
- **SPL Token** — $LIT token

### Frontend & Game
- **Next.js 14** — React framework
- **TypeScript** — Type safety
- **Tailwind CSS** — Styling
- **Framer Motion** — Animasi
- **Phaser.js** — Game engine

### Infrastructure
- **Helius RPC** — Blockchain indexing
- **Phantom Wallet** — Wallet integration

---

## Quick Start

### Prerequisites

```bash
node.js >= 18
npm or pnpm
Phantom Wallet (browser extension)
```

### Installation

```bash
# Clone repository
git clone https://github.com/KikiProjecto/lentera.git
cd lentera

# Install dependencies
npm install
# atau
pnpm install
```

### Configuration

```bash
# Copy environment file
cp .env.example .env.local

# Edit dengan RPC URL Anda
# NEXT_PUBLIC_SOLANA_RPC_URL=your_rpc_url
```

### Development

```bash
# Run development server
npm run dev
# Buka http://localhost:3000
```

### Build Production

```bash
# Build untuk production
npm run build

# Start production server
npm start
```

---

## Project Structure

```
lentera/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Dashboard page
│   │   ├── game/               # Game page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   ├── providers.tsx       # Context providers
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── Button.tsx
│   │   │   └── Card.tsx
│   │   ├── characters/         # Character components
│   │   │   └── CharacterCard.tsx
│   │   └── game/               # Game components
│   │       └── GameEngineClient.tsx
│   ├── data/
│   │   └── characters.ts       # Character & monster data
│   ├── lib/
│   │   ├── animation-presets.tsx
│   │   ├── design-tokens.ts
│   │   └── game-engine.ts      # Phaser game engine
│   └── types/                  # TypeScript types
├── constants/                  # App constants
├── public/
│   └── assets/                 # Static assets
├── .env.example               # Environment template
├── next.config.mjs            # Next.js config
├── tailwind.config.ts         # Tailwind config
├── tsconfig.json              # TypeScript config
└── package.json               # Dependencies
```

---

## Fitur Utama

### 1. Battle Arena
Pilih Guardian dan lawan monster vice untuk earn rewards.

### 2. Daily Quest
Mini-game edukasi 5-10 menit per hari untuk belajar literasi keuangan.

### 3. NFT Guardians
Koleksi dan upgrade karakter sebagai NFT dengan berbagai skin Indonesia.

### 4. Dashboard
Tracker keuangan personal dan streak "no-gamble pledge".

### 5. Leaderboard Campus
Kompetisi antar-universitas melalui guild system.

---

## Roadmap

### Phase 1: MVP (Sekarang)
- [x] Landing page
- [x] Battle arena prototype
- [x] Character selection
- [x] Dashboard UI

### Phase 2: Beta
- [ ] Wallet connection (Phantom)
- [ ] Phaser game integration
- [ ] Daily quest system
- [ ] Basic token rewards

### Phase 3: Launch
- [ ] Smart contracts (Anchor)
- [ ] NFT Minting (Metaplex)
- [ ] $LIT Token launch
- [ ] Campus guild system

---

## Contributing

Kami welcome kontribusi dari developer!

1. Fork repository
2. Buat feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## License

MIT License — see [LICENSE](LICENSE) for details.

---

## Contact

- **GitHub:** [KikiProjecto/lentera](https://github.com/KikiProjecto/lentera)
- **Discord:** [Join community](#)
