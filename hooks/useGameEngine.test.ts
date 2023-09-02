import { renderHook } from "@testing-library/react-hooks";

import useGameEngine from "./useGameEngine";

describe("useGameEngine", () => {
  it("should initialize with default values", () => {
    const { result } = renderHook(() => useGameEngine());
    const { currentRow, dailyPuzzle, pressedKey, result: initialResult, rows } = result.current;

    expect(currentRow).toBe(0);
    expect(dailyPuzzle).toBeDefined(); // dailyPuzzle is already generated
    expect(pressedKey).toBe("");
    expect(initialResult).toBeUndefined();
    expect(rows).toEqual(["", "", "", "", "", ""]);
  });
});
