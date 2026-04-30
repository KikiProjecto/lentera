# 🎨 LENTERA: Visual Asset & Brand Elevation Master Instructions
## Transforming Prototype Visuals into World-Class GameFi Excellence

You are an **Expert Creative Director and Senior UI/UX Designer** agent. Your mission is to overhaul every icon, asset, and visual object in **Lentera** to meet the "Absolute Winner" standard for the Superteam Indonesia National Campus Hackathon. The current "emoji-based" visuals must be replaced with high-fidelity, professional assets that embody the **"Neon-Ethnic"** aesthetic.

---

## 🚀 The Visual Mission
Lentera must bridge the gap between **Indonesian Heritage** and **Solana Cyberpunk**. Every pixel must scream professionalism while maintaining a "Human Developing Vibe" that feels accessible yet sophisticated.

---

## 1. Visual Quality Standards & Aesthetic Guidelines

To elevate Lentera from a prototype to a world-class GameFi project, the following visual quality standards must be strictly adhered to. The current use of basic emojis and generic placeholders is unacceptable for an "Absolute Winner" entry.

### 1.1. The "Neon-Ethnic" Aesthetic

Lentera's visual identity is defined as **"Neon-Ethnic."** This aesthetic combines the high-tech, vibrant glow of Cyberpunk with the traditional, intricate patterns of Indonesian culture (e.g., Batik, Wayang).

*   **Cyberpunk Elements:** Incorporate high-contrast colors, neon glows, glassmorphism (semi-transparent, blurred backgrounds), and digital "glitch" effects for transitions.
*   **Ethnic Elements:** Integrate subtle Batik motifs in UI borders, use Wayang-inspired silhouettes for mystical characters, and include traditional Indonesian architectural shapes in environmental assets.

### 1.2. Iconography Standards

Icons must be consistent in style, weight, and color throughout the application.

*   **Style:** Utilize "Line-Art" or "Duo-Tone" icons, enhanced with a subtle neon glow.
*   **Consistency:** All icons must maintain a uniform stroke width (e.g., 2px) and corner radius (e.g., 4px).
*   **Feedback:** Implement distinct hover states (e.g., color shift or increased glow) and active states (e.g., slight scale down) to provide haptic-like visual feedback.

### 1.3. Character & Monster Assets

All emojis representing characters and monsters must be replaced with high-quality 2D sprites or vector illustrations.

*   **Guardians:** Character designs should be heroic and visually distinct, reflecting their elemental roles and cultural inspiration.
*   **Monsters:** Each monster should embody the "Vice" it represents (e.g., a Slot Goblin could feature mechanical, casino-like elements).
*   **Animation:** Implement idle animations (e.g., breathing, floating) and distinct attack/damage animations within the Phaser engine to bring characters to life.

### 1.4. UI/UX Object Shapes

Move beyond standard rectangular shapes to create a more dynamic and unique interface.

*   **Squircles & Octagons:** Employ rounded squares (squircles) or beveled octagonal shapes for buttons and cards to reinforce the sci-fi/game aesthetic.
*   **Asymmetry:** Utilize slightly asymmetrical layouts for the dashboard and other key interfaces to create a more dynamic and "hand-crafted" feel.

### 1.5. Color & Depth

Leverage the defined color palette and introduce visual depth to enhance the user experience.

*   **Primary Palette:** Maintain the core colors of Cyan (#00F5D4), Pink (#FF006E), and Purple (#8338EC).
*   **Depth Layers:** Implement at least three distinct layers of depth in the UI:
    1.  **Background:** A deep dark navy/black with subtle, intricate patterns.
    2.  **Midground:** Semi-transparent glass panels for content display, utilizing glassmorphism effects.
    3.  **Foreground:** High-contrast text, glowing icons, and interactive elements to draw user attention.

---

## 2. Free High-Quality Resource Library

Use these curated free resources to find and apply professional assets. **NEVER use generic emojis for core gameplay again.**

### 2.1. Game UI & HUD Kits

*   **[Itch.io Cyberpunk UI Starter Kit](https://itch.io/game-assets/free/tag-cyberpunk/tag-user-interface):** Excellent for acquiring "Neon" buttons, progress bars, and heads-up display (HUD) elements.
*   **[Figma Community: Cyberpunk UI Elements](https://www.figma.com/community/file/1410999019282442873):** Provides professional-grade vector decals and UI panels suitable for a polished interface.
*   **[TitanUI: Cyberpunk Game UI Kit](https://www.titanui.com/114869-cyberpunk-game-ui-kit/):** Offers high-fidelity desktop and mobile game interface components, ideal for comprehensive UI redesign.

### 2.2. Icons & Symbols

*   **[Hugeicons (Free Tier)](https://hugeicons.com/):** A vast library offering 12+ styles of consistent SVG icons. Prioritize "Stroke" or "Duo-tone" styles, applying neon colors to match Lentera's theme.
*   **[Game-Icons.net](https://game-icons.net/):** Features over 4,000+ specialized game icons. This resource is perfect for designing "Elemental" abilities and "Vice" monster symbols.
*   **[Lucide React](https://lucide.dev/):** While already integrated into the project, its use should be limited to utility UI elements (e.g., settings, close buttons), not for game-specific actions or core mechanics.

### 2.3. Character & Environment Sprites

*   **[Itch.io Free 2D Assets](https://itch.io/game-assets/free):** A valuable source for game assets. Search using tags like "Monster," "Guardian," "Fantasy," or "Cyberpunk" to find relevant sprites.
*   **[OpenGameArt.org](https://opengameart.org/):** A comprehensive repository of free game assets. Focus on CC0 or CC-BY licensed sprites that can be easily adapted and recolored to fit the "Neon-Ethnic" palette.
*   **[Freepik (Free Vectors)](https://www.freepik.com/):** An excellent resource for high-quality character illustrations that can be converted to SVG or PNG formats if raster sprites are not readily available.

---

## 3. Execution Instructions for the AI Agent

This section provides detailed, actionable instructions for the AI agent to systematically replace and improve Lentera's visual assets, adhering to the "Neon-Ethnic" aesthetic and professional quality standards.

### 3.1. Icon Overhaul: From Generic to Themed

**Objective:** Replace all generic icons with themed, high-quality alternatives that align with the "Neon-Ethnic" aesthetic and apply consistent visual effects.

1.  **Identify Target Icons:** Begin by auditing `src/components/battle/BattleUI.tsx`, `src/components/quest/QuestComponents.tsx`, and any other UI components that currently use generic icons (e.g., Lucide React icons, basic UI elements).
2.  **Resource Selection:** Utilize the resources listed in Section 2.2 to find suitable replacements. Prioritize icons that can be easily adapted to a line-art or duo-tone style and are relevant to game actions or elements.
3.  **Asset Acquisition & Preparation:** Download selected icons as SVG files for scalability. If necessary, use a vector graphics editor to adjust stroke width to a consistent 2px and corner radius to 4px. Export icons as optimized SVG or PNG files with transparent backgrounds.
4.  **Integration into Project:** Create a new directory (e.g., `public/assets/icons/game/`) to store the new icon assets. Update relevant React components to import and render these new assets.
5.  **Visual Effects Application:** Apply a CSS `drop-shadow` or `filter: drop-shadow(0 0 8px var(--neon-color))` to each game icon, where `--neon-color` dynamically changes based on context. Implement hover states that subtly increase the glow intensity or shift the icon's color.

### 3.2. Character Sprite Replacement: From Emojis to Guardians

**Objective:** Replace all placeholder emojis for Guardian characters and Vice Monsters with high-quality 2D sprites or vector illustrations that reflect their unique identities and the "Neon-Ethnic" theme.

1.  **Identify Target Placeholders:** Locate all instances where character emojis are used, particularly in `src/lib/game-engine.ts` (Phaser scenes) and `src/components/characters/CharacterCard.tsx`.
2.  **Resource Selection:** Explore the resources listed in Section 2.3 for suitable character and monster assets. Prioritize assets with multiple frames for idle and attack animations.
3.  **Asset Acquisition & Preparation:** Download or create 2D sprites for each of the 5 Guardians and 4 Vice Monsters. Ensure sprites have transparent backgrounds and are provided in a consistent resolution (e.g., 128x128px or 256x256px). Organize animation frames into sprite sheets or individual files for Phaser integration.
4.  **Data Model Update:** Modify `src/data/characters.ts` to include new fields for `spritePath` (path to the main sprite image) and `animationConfig` (an object defining animation frames, speed, and loops for Phaser).
5.  **Phaser Engine Refactoring:** Update `src/lib/game-engine.ts` to load these new sprite textures using Phaser's asset loader instead of drawing simple circles or rendering emojis. Implement basic idle animations and integrate attack/damage animations for both player and enemy characters during battle sequences.

### 3.3. UI Depth and Glassmorphism Implementation

**Objective:** Introduce visual depth and a modern glassmorphism effect to key UI elements, enhancing the "Neon-Ethnic" aesthetic and making the interface more dynamic.

1.  **Tailwind CSS Configuration Update:** Edit `tailwind.config.ts` to extend the theme with a new `glass` utility class or a set of glassmorphism-related properties (e.g., `backdrop-filter: blur(10px); background-color: rgba(255, 255, 255, 0.1); border: 1px solid rgba(255, 255, 255, 0.2);`).
2.  **Global Styles Enhancement:** Modify `src/app/globals.css` to define a subtle background pattern that serves as the deepest layer of the UI. Define custom CSS variables for neon colors and their glow effects.
3.  **Application to UI Components:** Apply the new `glass` utility class to components such as `Card.tsx`, `QuestModal.tsx`, and relevant sections of the Dashboard and Battle overlays. Ensure text and interactive elements on glassmorphic backgrounds maintain high contrast and readability.

### 3.4. Cultural "Ethnic" Infusion: Batik Patterns

**Objective:** Integrate subtle Indonesian cultural elements, specifically Batik patterns, into the UI to reinforce the "Neon-Ethnic" theme and cultural resonance.

1.  **Asset Acquisition:** Search for free SVG Batik patterns (e.g., "Mega Mendung," "Parang," or other geometric Indonesian motifs) on platforms like Freepik or by creating simplified vector versions. Ensure patterns are suitable for subtle background use.
2.  **Integration as Backgrounds/Borders:** Store SVG patterns in `public/assets/patterns/`. Use these patterns as low-opacity background images for certain UI sections or as decorative borders for "Legendary" rarity character cards or achievement badges.

---

## 4. Quality Control Checklist

Before considering any visual task complete, the AI agent must verify the following:

1.  **Does it Glow?** Every interactive element should possess a subtle neon aura, consistent with the "Neon-Ethnic" theme.
2.  **Is it Consistent?** All visual elements, from buttons to character sprites, must maintain a cohesive style across the entire application.
3.  **Is it Readable?** High-contrast text is mandatory to ensure optimal readability. `Space Grotesk` should be used for body text, and `Bricolage Grotesque` for display elements.
4.  **Does it feel "Indonesian"?** The cultural elements must be seamlessly integrated into the sci-fi theme, avoiding a "tacked on" appearance.

---

**AGENT: YOUR FIRST TASK IS TO RE-SKIN THE BATTLE OVERLAY USING THE CYBERPUNK UI KIT PRINCIPLES AND REPLACE THE CHARACTER EMOJIS WITH PROFESSIONAL SPRITES.**
