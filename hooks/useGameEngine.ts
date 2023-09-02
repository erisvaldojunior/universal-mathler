import { useEffect, useState } from "react";
import { areEquivalent, generateDailyPuzzle } from "../utils/math";

const TOTAL_ROWS = 6;
const ROW_LENGTH = 6;

interface RowResult {
  correctDigitPositions: number[];
  foundDigitPositions: number[];
  wrongDigitPositions: number[];
}

interface Result {
  status: "failure" | "inProgress" | "success";
  rowResults?: RowResult[];
}

const useGameEngine = () => {
  const [currentRow, setCurrentRow] = useState(0);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [dailyPuzzle, setDailyPuzzle] = useState<string>("");
  const [dailyPuzzleEval, setDailyPuzzleEval] = useState<number>();
  const [pressedKey, setPressedKey] = useState("");
  const [result, setResult] = useState<Result>();
  const [rows, setRows] = useState<string[]>(["", "", "", "", "", ""]);

  useEffect(() => {
    if (dailyPuzzle === "") {
      const generatedDailyPuzzle = generateDailyPuzzle();
      setDailyPuzzle(generatedDailyPuzzle);
      // eslint-disable-next-line no-eval
      setDailyPuzzleEval(parseInt(eval(generatedDailyPuzzle), 10));
    }
  }, [dailyPuzzle]);

  const evaluate = () => {
    try {
      const correctDigitPositions: number[] = [];
      const foundOrWrongDigitPositions: number[] = [];
      const foundDigitPositions: number[] = [];
      const wrongDigitPositions: number[] = [];
      let digitIndex = 0;
      // Check digits that are correct and in the right position
      for (; digitIndex < rows[currentRow].length; digitIndex++) {
        const currentDigit = rows[currentRow][digitIndex];
        const puzzleDigit = dailyPuzzle[digitIndex];
        if (currentDigit && currentDigit === puzzleDigit) {
          correctDigitPositions.push(digitIndex);
        } else {
          // If it is not correct and in the right position, we add it to the foundOrWrongDigits array
          foundOrWrongDigitPositions.push(digitIndex);
        }
      }
      // If the user has entered less digits than the row length, we add the remaining digits to the wrongDigits array
      for (let positionToAdd = digitIndex; positionToAdd < ROW_LENGTH; positionToAdd++) {
        wrongDigitPositions.push(positionToAdd);
      }
      // Get daily puzzle without correct digits, so we can split the rest between found and wrong digits
      const dailyPuzzleWithoutCorrectDigits = [...dailyPuzzle].filter((digit, index) =>
        foundOrWrongDigitPositions.includes(index)
      );
      // Split foundOrWrongDigits between found and wrong digits
      for (let i = 0; i < foundOrWrongDigitPositions.length; i++) {
        const foundOrWrongDigit = rows[currentRow][foundOrWrongDigitPositions[i]];
        if (dailyPuzzleWithoutCorrectDigits.includes(foundOrWrongDigit)) {
          foundDigitPositions.push(foundOrWrongDigitPositions[i]);
        } else {
          wrongDigitPositions.push(foundOrWrongDigitPositions[i]);
        }
      }

      const rowResult: RowResult = {
        correctDigitPositions,
        foundDigitPositions,
        wrongDigitPositions,
      };
      const rowResultsCopy = result?.rowResults ? [...result.rowResults] : [];
      rowResultsCopy[currentRow] = rowResult;

      if (areEquivalent(rows[currentRow], dailyPuzzle)) {
        setResult({ status: "success", rowResults: rowResultsCopy });
      } else {
        setResult({
          status: currentRow === TOTAL_ROWS - 1 ? "failure" : "inProgress",
          rowResults: rowResultsCopy,
        });
      }

      console.log("evaluate() dailyPuzzle expression: " + dailyPuzzle);
    } catch (error) {
      // Handle evaluation error
      console.log(error);
    } finally {
      setCurrentRow((prevRow) => prevRow + 1);
      setCursorPosition(0);
    }
  };

  const handleKeyPress = (key: string) => {
    const isFinished = result && (result.status === "success" || result.status === "failure");
    if (!isFinished) {
      setPressedKey(key);
      if (key === "Enter") {
        evaluate();
      } else if (key === "Delete") {
        const newRowsArray = rows.map((row, index) => {
          if (index === currentRow) {
            return row.slice(0, cursorPosition - 1) + row.slice(cursorPosition);
          }
          return row;
        });
        setRows(newRowsArray);
        setCursorPosition((prevCursorPosition) => Math.max(0, prevCursorPosition - 1));
      } else {
        const newRowsArray = rows.map((row, index) => {
          if (index === currentRow && cursorPosition < ROW_LENGTH) {
            return row.slice(0, cursorPosition) + key + row.slice(cursorPosition);
          }
          return row;
        });
        setRows(newRowsArray);
        setCursorPosition((prevCursorPosition) =>
          Math.min(
            prevCursorPosition < ROW_LENGTH ? prevCursorPosition + 1 : ROW_LENGTH,
            rows[currentRow].length + 1
          )
        );
      }
    }
  };

  const handleRestart = () => {
    setCurrentRow(0);
    setCursorPosition(0);
    setDailyPuzzle("");
    setDailyPuzzleEval(undefined);
    setResult(undefined);
    setRows(["", "", "", "", "", ""]);
  };

  return {
    currentRow,
    dailyPuzzle,
    dailyPuzzleEval,
    handleKeyPress,
    handleRestart,
    pressedKey,
    result,
    rows,
  };
};

export default useGameEngine;
