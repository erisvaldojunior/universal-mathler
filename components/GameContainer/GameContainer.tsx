import { useEffect } from "react";
import { Button, ScrollView, Text, View } from "react-native";

import { router } from "expo-router";
import useGameEngine from "../../hooks/useGameEngine";
import SoftwareKeyboard from "../SoftwareKeyboard";
import { MonoText } from "../StyledText";
import styles from "./styles";

const GameContainer: React.FC = () => {
  const { currentRow, dailyPuzzle, dailyPuzzleEval, handleKeyPress, handleRestart, result, rows } =
    useGameEngine();

  useEffect(() => {
    if (result) {
      if (result.status === "success") {
        router.push({
          pathname: "/modal",
          params: { expression: `${dailyPuzzle} = ${dailyPuzzleEval}`, title: "You made it!" },
        });
      } else if (result.status === "failure") {
        router.push({
          pathname: "/modal",
          params: { expression: `${dailyPuzzle} = ${dailyPuzzleEval}`, title: "Ops... try again!" },
        });
      }
    }
  }, [result, dailyPuzzle, dailyPuzzleEval]);

  const renderCell = (rowIndex: number, columnIndex: number, digit: string) => {
    let cellStyle = [styles.cell, styles.notEvaluatedCell];
    const rowResult = result?.rowResults?.[rowIndex];
    if (rowResult) {
      if (
        rowResult.correctDigitPositions &&
        rowResult.correctDigitPositions.includes(columnIndex)
      ) {
        cellStyle = [styles.cell, styles.correctCell];
      } else if (
        rowResult.foundDigitPositions &&
        rowResult.foundDigitPositions.includes(columnIndex)
      ) {
        cellStyle = [styles.cell, styles.foundCell];
      } else if (
        rowResult.wrongDigitPositions &&
        rowResult.wrongDigitPositions.includes(columnIndex)
      ) {
        cellStyle = [styles.cell, styles.wrongCell];
      }
    }

    return (
      <View key={columnIndex} style={cellStyle}>
        <Text>{digit}</Text>
      </View>
    );
  };

  const isFinished = result && (result.status === "success" || result.status === "failure");

  return (
    <ScrollView
      contentContainerStyle={{
        flex: 1,
        justifyContent: "center",
      }}>
      <View style={styles.container}>
        {isFinished && (
          <View style={{ alignItems: "center" }}>
            <Button onPress={handleRestart} title="Play Again" />
          </View>
        )}
        <MonoText style={styles.title}>
          Find the hidden calculation that equals {dailyPuzzleEval}
        </MonoText>
        <View style={styles.gridContainer}>
          {Array.from({ length: 6 }).map((_, rowIndex) => (
            <View
              key={rowIndex}
              style={currentRow === rowIndex ? [styles.activeRow, styles.row] : styles.row}>
              {Array.from({ length: 6 }).map((_, columnIndex) =>
                renderCell(rowIndex, columnIndex, rows[rowIndex][columnIndex])
              )}
            </View>
          ))}
        </View>
        <SoftwareKeyboard handleKeyPress={handleKeyPress} />
      </View>
    </ScrollView>
  );
};

export default GameContainer;
