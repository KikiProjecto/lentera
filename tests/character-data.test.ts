import { GUARDIANS, VICE_MONSTERS, RARITY_COLORS } from "../../src/data/characters";

describe("Character Data", () => {
  describe("Guardians", () => {
    it("should have exactly 5 guardians", () => {
      expect(GUARDIANS).toHaveLength(5);
    });

    it("should have unique IDs for all guardians", () => {
      const ids = GUARDIANS.map((g) => g.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have valid element types", () => {
      const validElements = ["light", "fire", "water", "earth", "air", "void"];
      GUARDIANS.forEach((guardian) => {
        expect(validElements).toContain(guardian.element);
      });
    });

    it("should have valid rarity levels", () => {
      const validRarities = ["common", "rare", "epic", "legendary", "mythic"];
      GUARDIANS.forEach((guardian) => {
        expect(validRarities).toContain(guardian.rarity);
      });
    });

    it("should have sprite paths defined", () => {
      GUARDIANS.forEach((guardian) => {
        expect(guardian.sprites).toBeDefined();
        expect(guardian.sprites.idle).toContain(".svg");
      });
    });

    it("should have stats within valid ranges", () => {
      GUARDIANS.forEach((guardian) => {
        const stats = guardian.stats;
        expect(stats.attack).toBeGreaterThan(0);
        expect(stats.attack).toBeLessThanOrEqual(150);
        expect(stats.defense).toBeGreaterThan(0);
        expect(stats.defense).toBeLessThanOrEqual(150);
        expect(stats.speed).toBeGreaterThan(0);
        expect(stats.speed).toBeLessThanOrEqual(150);
        expect(stats.wisdom).toBeGreaterThan(0);
        expect(stats.wisdom).toBeLessThanOrEqual(150);
      });
    });

    it("should have at least one ability", () => {
      GUARDIANS.forEach((guardian) => {
        expect(guardian.abilities.length).toBeGreaterThan(0);
      });
    });
  });

  describe("Vice Monsters", () => {
    it("should have at least 4 monsters", () => {
      expect(VICE_MONSTERS.length).toBeGreaterThanOrEqual(4);
    });

    it("should have unique IDs for all monsters", () => {
      const ids = VICE_MONSTERS.map((m) => m.id);
      const uniqueIds = new Set(ids);
      expect(uniqueIds.size).toBe(ids.length);
    });

    it("should have valid types", () => {
      const validTypes = ["slot", "rug", "fomo", "greed", "scam", "phishing"];
      VICE_MONSTERS.forEach((monster) => {
        expect(validTypes).toContain(monster.type);
      });
    });

    it("should have valid difficulty levels", () => {
      VICE_MONSTERS.forEach((monster) => {
        expect(monster.difficulty).toBeGreaterThanOrEqual(1);
        expect(monster.difficulty).toBeLessThanOrEqual(5);
      });
    });

    it("should have positive health values", () => {
      VICE_MONSTERS.forEach((monster) => {
        expect(monster.health).toBeGreaterThan(0);
      });
    });

    it("should have sprite paths defined", () => {
      VICE_MONSTERS.forEach((monster) => {
        expect(monster.sprite).toBeDefined();
        expect(monster.sprite).toContain(".svg");
      });
    });

    it("should have valid reward values", () => {
      VICE_MONSTERS.forEach((monster) => {
        expect(monster.reward.tokens).toBeGreaterThan(0);
        expect(monster.reward.xp).toBeGreaterThan(0);
      });
    });
  });

  describe("Rarity Colors", () => {
    it("should have valid hex colors", () => {
      Object.values(RARITY_COLORS).forEach((color) => {
        expect(color).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });

    it("should have all rarity levels", () => {
      expect(RARITY_COLORS.common).toBeDefined();
      expect(RARITY_COLORS.rare).toBeDefined();
      expect(RARITY_COLORS.epic).toBeDefined();
      expect(RARITY_COLORS.legendary).toBeDefined();
      expect(RARITY_COLORS.mythic).toBeDefined();
    });
  });
});