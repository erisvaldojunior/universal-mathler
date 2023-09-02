import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import styles from "./styles";

interface SoftwareKeyboardProps {
  handleKeyPress: (key: string) => void;
}

const SoftwareKeyboard: React.FC<SoftwareKeyboardProps> = ({ handleKeyPress }) => {
  const keyboardButtons: string[][] = [
    ["7", "8", "9", "/"],
    ["4", "5", "6", "*"],
    ["1", "2", "3", "-"],
    ["0", "Delete", "Enter", "+"],
  ];

  const renderKeyText = (key: string) => {
    switch (key) {
      case "Enter":
        return "↵";
      case "Delete":
        return "⌫";
      default:
        return key;
    }
  };

  return (
    <View style={styles.keyboardContainer}>
      {keyboardButtons.map((row, rowIndex) => (
        <View key={rowIndex} style={styles.row}>
          {row.map((key, columnIndex) => (
            <TouchableOpacity
              key={columnIndex}
              style={styles.keyButton}
              onPress={() => handleKeyPress(key)}>
              <Text style={styles.keyText}>{renderKeyText(key)}</Text>
            </TouchableOpacity>
          ))}
        </View>
      ))}
    </View>
  );
};

export default SoftwareKeyboard;
