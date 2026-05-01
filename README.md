<div align="center">
  <img src="Lentera.png" alt="Lentera Banner+Title" width="65%" />
</div>

<p align="center">
  <img src="https://img.shields.io/badge/Solana-000000?style=for-the-badge&logo=solana&logoColor=white" alt="Solana" />
  <img src="https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white" alt="Next.js" />
  <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" />
  <img src="https://img.shields.io/badge/Tailwind-06B6D4?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind" />
</p>

<p align="center">
  <strong>We are witnessing our Lentera 🪔</strong>
</p>

---

## About Lentera

Lentera is a **GameFi decentralized application** built on the Solana blockchain that combines **edutainment** with **play-to-earn** mechanics to help Gen Z and students avoid the allure of online gambling while acquiring essential financial literacy skills.

> Secure Your Future from Digital Temptation – Play, Learn, and Earn with Enchanting Characters!

### Problem Statement

Based on official financial intelligence data (2023-2025):
- **IDR 327 Trillion** in unauthorized online gambling transactions in Indonesia
- **2.37 million individuals** involved, with 80% from lower-middle-income backgrounds
- **960,000 students and minors** ensnared in gambling habits
- **43.3% of students** have engaged in online gambling; 25.9% remain actively involved

---

## Lentera Characters

| Character | Element | Role |
|-----------|---------|------|
| 🦎 Komodo Dragon | Earth | Powerful and wise hero |
| 🦉 Wayang Owl | Void | Intelligent advisor |
| 🦧 Orangutan | Water | Creative innovator |
| 🔮 Prism | Light | Mystic guardian |
| 🔥 Flame | Fire | Passionate warrior |

### Vice Monsters to Defeat

| Monster | Type | Difficulty |
|---------|------|------------|
| 🎰 Slot Goblin | Slot | Easy |
| 😈 Rugpull Demon | Rug | Medium |
| 👻 FOMO Ghost | FOMO | Hard |
| 👺 Greed Golem | Greed | Expert |

---

## Technology Stack

### Blockchain & Backend
- **Solana** — Primary blockchain
- **Phantom Wallet** — Web3 wallet integration
- **Helius RPC** — Blockchain data indexing
- **SPL Token** — $LIT token standard

### Frontend & Game Engine
- **Next.js 14** — React framework with App Router
- **TypeScript** — Type safety and development
- **Tailwind CSS** — Modern styling
- **Phaser.js** — 2D game engine

---

## Current Features

### ✅ Battle Arena
Select your Guardian character and engage in turn-based battles against vice monsters to earn rewards while learning financial concepts.

### ✅ Daily Quests
Educational mini-games with 4 categories:
- Budget Management
- Saving Habits
- Investment Knowledge
- Debt Management

### Gamification System
- 20+ Achievements with rarity tiers
- Daily Challenges with rewards
- XP & Level Progression (10 tiers)
- Token rewards ($LIT)

### ✅ Campus Competition (Guild System)
- University-based guild rankings
- Weekly & Monthly tournaments
- Campus Cup events
- Leaderboard system

### ✅ Personal Dashboard
- Player stats and profile
- Wallet connection
- Quest tracking
- Progress overview

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with game introduction |
| `/game` | Main game with Phaser engine |
| `/dashboard` | Personal dashboard |
| `/characters` | Guardian & monster collection |
| `/quest` | Quest system with quizzes |
| `/guild` | Campus competition & guild rankings |
| `/leaderboard` | Global player rankings |
| `/gallery` | Game gallery & assets |
| `/settings` | App settings & preferences |
| `/about` | Story & project information |

---

## Quick Start Guide

### Prerequisites

```bash
Node.js >= 18
npm or pnpm package manager
Phantom Wallet browser extension
```

### Installation

```bash
# clone the repository
git clone https://github.com/KikiProjecto/lentera.git
cd lentera

# install project dependencies
npm install
# or use pnpm
pnpm install
```

### Configuration

```bash
# copy the environment template file
cp .env.example .env.local

# update with your Solana RPC provider URL
# NEXT_PUBLIC_SOLANA_RPC_URL=your_rpc_url
# NEXT_PUBLIC_RPC_ENDPOINT=your_endpoint
```

### Development

```bash
# start the development server
npm run dev
# Open http://localhost:3000 in your browser
```

### Production Build

```bash
# Build optimized production bundle
npm run build

# Start the production server
npm start
```

---

## Project Architecture

```
lentera/
├── src/
│   ├── app/                    # Next.js App Router
│   │   ├── dashboard/          # Dashboard page
│   │   ├── game/               # Phaser game page
│   │   ├── characters/         # Characters page
│   │   ├── quest/              # Quest system
│   │   ├── guild/              # Campus competition
│   │   ├── leaderboard/        # Rankings
│   │   ├── gallery/            # Gallery
│   │   ├── settings/           # Settings
│   │   ├── about/              # About page
│   │   ├── layout.tsx          # Root layout
│   │   ├── page.tsx            # Landing page
│   │   ├── providers.tsx       # Context providers
│   │   └── globals.css         # Global styles
│   ├── components/
│   │   ├── battle/             # Battle UI components
│   │   ├── gamification/       # Achievements, quests, progression
│   │   ├── game/               # Game engine & overlay
│   │   ├── characters/         # Character cards
│   │   ├── leaderboard/        # Ranking components
│   │   ├── quest/              # Quest components
│   │   ├── layout/             # Navbar & layout
│   │   ├── ui/                 # Reusable UI
│   │   └── wallet/             # Wallet connection
│   ├── data/                   # Game data (characters, quests)
│   └── lib/                    # Utilities & state
│       ├── game-state.tsx      # Game state management
│       ├── game-engine.ts      # Phaser integration
│       ├── gamification.ts     # Achievements & progression
│       ├── solana-rewards.tsx  # Token rewards
│       └── ...
├── public/
│   ├── manifest.json           # PWA manifest
│   └── sw.js                   # Service worker
└── ...
```

---

## Development Roadmap

### Phase 1: Minimum Viable Product ✅ Complete
- [x] Landing page with project information
- [x] Battle arena prototype and mechanics
- [x] Character selection interface
- [x] Dashboard user interface
- [x] Multiple page routes (10+ pages)

### Phase 2: Beta Release ✅ Complete
- [x] Phantom wallet connection and authentication
- [x] Phaser game engine integration
- [x] Daily quest system implementation
- [x] Basic token reward distribution
- [x] Gamification system (achievements, progression)
- [x] Campus guild competition system

### Phase 3: Public Launch 🔄 In Progress..
- [ ] Smart contract development (Anchor)
- [ ] NFT minting functionality (Metaplex)
- [ ] $LIT Token official launch
- [ ] Advanced guild features

---

## License

This project is licensed under the MIT License — see the [LICENSE](LICENSE) file for complete details.

---

## Contact me

- **Discord:** [kikiprojecto](https://discordapp.com/users/1125940822446186598)
- **Telegram:** [KikiProjecto](https://t.me/KikiProjecto)
