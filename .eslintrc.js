module.exports = {
  extends: [
    "universe/native",
    "universe/shared/typescript-analysis",
    "plugin:prettier/recommended",
  ],
  overrides: [
    {
      files: ["*.ts", "*.tsx", "*.d.ts"],
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  ],
  rules: {
    "@typescript-eslint/no-use-before-define": ["error"],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-inferrable-types": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
      },
    ],
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "import/no-cycle": "error",
    "react/jsx-filename-extension": [
      "error",
      {
        extensions: [".tsx"],
      },
    ],
    "import/order": [
      "error",
      {
        groups: ["builtin", "external", "internal", "parent", "sibling", "index", "object", "type"],
        pathGroups: [
          {
            pattern: "react",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "^react-native",
            group: "builtin",
            position: "before",
          },
          {
            pattern: "^@react*",
            group: "builtin",
            position: "before",
          },
        ],
        "newlines-between": "ignore",
      },
    ],
    "import/no-named-as-default": 0,
    "sort-keys": 0,
    "no-restricted-imports": [
      "error",
      {
        patterns: ["../../../*"], // relative imports are allowed only up to two directories above the current
      },
    ],
    "arrow-body-style": ["error", "as-needed", { requireReturnForObjectLiteral: true }],
  },
};
