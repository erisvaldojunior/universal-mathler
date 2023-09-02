import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import SoftwareKeyboard from "./SoftwareKeyboard";

describe("SoftwareKeyboard", () => {
  it("should render all keys", () => {
    const handleKeyPress = jest.fn();
    const { getByText } = render(<SoftwareKeyboard handleKeyPress={handleKeyPress} />);

    // Verify that all keys are rendered
    const keys = [
      "7",
      "8",
      "9",
      "/",
      "4",
      "5",
      "6",
      "*",
      "1",
      "2",
      "3",
      "-",
      "0",
      "⌫", // Delete
      "↵", // Enter
      "+",
    ];
    keys.forEach((key) => {
      const keyButton = getByText(key);
      expect(keyButton).toBeTruthy();
    });
  });

  it("should call handleKeyPress when a key is pressed", () => {
    const handleKeyPress = jest.fn();
    const { getByText } = render(<SoftwareKeyboard handleKeyPress={handleKeyPress} />);
    // Click on a key
    const keyButton = getByText("7");
    fireEvent.press(keyButton);
    // Verify that handleKeyPress is called with the correct key
    expect(handleKeyPress).toHaveBeenCalledWith("7");
  });
});
