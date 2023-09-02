export const generateDailyPuzzle = () => {
  const operators = ["+", "-", "*", "/"];
  const digits = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const getRandom = (array: string[]) => array[Math.floor(Math.random() * array.length)];
  const getRandomOperator = () => getRandom(operators);
  const getRandomOperatorExceptDivision = () => getRandom(operators.filter((op) => op !== "/"));
  const getRandomDigit = () => getRandom(digits);
  const getDivisorDigit = (expression: string) => {
    const dividend = parseInt(expression[expression.length - 2], 10);
    const divisors = digits.filter((digit: string) => {
      const digitAsNumber = parseInt(digit, 10);
      const isDivisor = dividend % digitAsNumber === 0;
      return isDivisor;
    });
    return getRandom(divisors);
  };

  let expression = "";

  // First digit is a random one (can't be an operator);
  expression += getRandomDigit();

  for (let i = 1; i < 6; i++) {
    const prevChar = expression[expression.length - 1];
    if (prevChar === "/") {
      // Make sure the number is a divisor of the previous number
      expression += getDivisorDigit(expression); // if i === 4
    } else if (
      // Make sure operator is not repeated and last digit is not an operator
      i === 5 ||
      prevChar === " " ||
      prevChar === "+" ||
      prevChar === "-" ||
      prevChar === "*"
    ) {
      expression += getRandomDigit();
    } else if (i === 3) {
      // Avoid situations like 5/1/10, 7/1/16, etc
      expression += getRandomOperatorExceptDivision();
    } else {
      expression += getRandomOperator();
    }
  }

  return expression;
};

// Compare two expressions and return true if they are equivalent (considering commutative property)
export function areEquivalent(expression1: string, expression2: string): boolean {
  // Remove whitespaces
  const normalizeExpression = (expression: string): string => expression.replace(/\s/g, "");
  // Evaluate expression and return NaN if it's not valid
  const evalExpression = (expression: string): number => {
    try {
      // eslint-disable-next-line no-eval
      return eval(expression);
    } catch (error) {
      return NaN;
    }
  };
  // Check if two expressions are equal according to eval function (same result)
  const areEvalEqual = (expression1: string, expression2: string): boolean => {
    const normalizedExpression1 = normalizeExpression(expression1);
    const normalizedExpression2 = normalizeExpression(expression2);

    return evalExpression(normalizedExpression1) === evalExpression(normalizedExpression2);
  };
  // Get all permutations of an expression (considering commutative property)
  const getCommutativePermutations = (expression: string): string[] => {
    const normalizedExpression = normalizeExpression(expression);
    const tokens = normalizedExpression.split(/([+\-*/])/);
    const permutations: string[] = [];
    const used: boolean[] = new Array(tokens.length).fill(false);
    const generatePermutations = (currentPermutation: string) => {
      if (currentPermutation.length === tokens.length) {
        permutations.push(currentPermutation);
        return;
      }
      for (let i = 0; i < tokens.length; i++) {
        if (!used[i]) {
          used[i] = true;
          generatePermutations(currentPermutation + tokens[i]);
          used[i] = false;
        }
      }
    };
    generatePermutations("");
    return permutations;
  };

  const equivalentPermutations1 = getCommutativePermutations(expression1);
  const equivalentPermutations2 = getCommutativePermutations(expression2);

  // If there are permutations and eval values are equal, then expressions are equivalent

  return (
    areEvalEqual(expression1, expression2) &&
    equivalentPermutations1.some((perm) => equivalentPermutations2.includes(perm))
  );
}
