import {
  ELEMENTAL_ADVANTAGES,
  getElementalMultiplier,
  ELEMENT_COLORS,
} from "../../src/data/characters";
import type { Element } from "../../src/data/characters";

describe("Elemental System", () => {
  describe("ELEMENTAL_ADVANTAGES", () => {
    it("should have strong and weak relationships for each element", () => {
      const elements: Element[] = ["fire", "water", "earth", "air", "light", "void"];

      elements.forEach((element) => {
        expect(ELEMENTAL_ADVANTAGES[element]).toBeDefined();
        expect(ELEMENTAL_ADVANTAGES[element].strong).toBeDefined();
        expect(ELEMENTAL_ADVANTAGES[element].weak).toBeDefined();
      });
    });

    it("should define correct relationships", () => {
      expect(ELEMENTAL_ADVANTAGES.fire.strong).toBe("air");
      expect(ELEMENTAL_ADVANTAGES.fire.weak).toBe("water");
      expect(ELEMENTAL_ADVANTAGES.water.strong).toBe("earth");
      expect(ELEMENTAL_ADVANTAGES.water.weak).toBe("fire");
    });
  });

  describe("getElementalMultiplier", () => {
    it("should return 1.5 for strong elemental advantage", () => {
      expect(getElementalMultiplier("fire", "air")).toBe(1.5);
      expect(getElementalMultiplier("water", "earth")).toBe(1.5);
      expect(getElementalMultiplier("earth", "void")).toBe(1.5);
    });

    it("should return 0.75 for weak elemental disadvantage", () => {
      expect(getElementalMultiplier("fire", "water")).toBe(0.75);
      expect(getElementalMultiplier("water", "fire")).toBe(0.75);
    });

    it("should return 1.0 for neutral matchups", () => {
      expect(getElementalMultiplier("fire", "earth")).toBe(1.0);
      expect(getElementalMultiplier("water", "air")).toBe(1.0);
    });
  });

  describe("ELEMENT_COLORS", () => {
    it("should have a color for each element", () => {
      const elements: Element[] = ["fire", "water", "earth", "air", "light", "void"];

      elements.forEach((element) => {
        expect(ELEMENT_COLORS[element]).toBeDefined();
        expect(ELEMENT_COLORS[element]).toMatch(/^#[0-9A-Fa-f]{6}$/);
      });
    });
  });
});