import { areEquivalent, generateDailyPuzzle } from "./math";

describe("areEquivalent", () => {
  it("should return true for equivalent expressions", () => {
    expect(areEquivalent("2*3+4", "3*2+4")).toBe(true);
    expect(areEquivalent("5*2-44", "2*5-44")).toBe(true);
    expect(areEquivalent("3-1+2", "2+3-1")).toBe(true);
  });

  it("should return false for non-equivalent expressions", () => {
    expect(areEquivalent("2*3+4", "3*2-4")).toBe(false);
    expect(areEquivalent("5*2-44", "7-7-54")).toBe(false);
    expect(areEquivalent("1+1+1", "2+2")).toBe(false);
  });

  it("should handle spaces and operator variations", () => {
    expect(areEquivalent(" 2*3 +4", "3* 2 + 4 ")).toBe(true);
    expect(areEquivalent("1- 1 + 1", "2 +  2")).toBe(false);
  });
});

describe("generateDailyPuzzle", () => {
  it("should generate a valid expression", () => {
    const expression = generateDailyPuzzle();
    expect(expression).toMatch(/^[0-9+\-*/]{6}$/); // Exactly 6 valid digits
  });
  it("should not repeat operators", () => {
    const expression = generateDailyPuzzle();
    expect(expression).not.toMatch(/([+\-*/])\1/); // No repeated operators
  });

  it("should not end with an operator", () => {
    const expression = generateDailyPuzzle();
    expect(expression).not.toMatch(/[+\-*/]$/); // Doesn't end with an operator
  });

  it("should have a divisor after a division operator", () => {
    const expression = generateDailyPuzzle();
    const divisions = expression.split("/").filter(Boolean);
    if (divisions.length > 1) {
      const lastDivision = divisions[divisions.length - 1];
      const dividend = parseInt(lastDivision[lastDivision.length - 2], 10);
      const divisor = parseInt(lastDivision[lastDivision.length - 1], 10);
      expect(dividend % divisor).toBe(0); // Check if division is valid
    }
  });
});
