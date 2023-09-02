import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import useGameEngine from "../../hooks/useGameEngine";
import GameContainer from "./GameContainer";

jest.mock("../../hooks/useGameEngine");

describe("GameContainer", () => {
  it("should render correctly", () => {
    // Mock the useGameEngine hook
    (useGameEngine as jest.Mock).mockReturnValue({
      currentRow: 0,
      dailyPuzzle: "2+2+2",
      dailyPuzzleEval: 6,
      handleKeyPress: jest.fn(),
      handleRestart: jest.fn(),
      result: undefined,
      rows: ["", "", "", "", "", ""],
    });

    const { getByText } = render(<GameContainer />);

    // Verify that the title is rendered correctly
    const title = getByText("Find the hidden calculation that equals 6");
    expect(title).toBeTruthy();
  });

  it("should handle key press", () => {
    // Mock the useGameEngine hook
    const handleKeyPress = jest.fn();
    (useGameEngine as jest.Mock).mockReturnValue({
      currentRow: 0,
      dailyPuzzle: "2+2",
      dailyPuzzleEval: 4,
      handleKeyPress,
      handleRestart: jest.fn(),
      result: undefined,
      rows: ["", "", "", "", "", ""],
    });

    const { getByText } = render(<GameContainer />);

    // Simulate key press, e.g., press the "7" key
    fireEvent.press(getByText("7"));

    // Verify that handleKeyPress is called with the correct key
    expect(handleKeyPress).toHaveBeenCalledWith("7");
  });
});
