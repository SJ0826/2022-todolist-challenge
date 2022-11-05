module.exports = {
  env: {
    // 어떤 환경에서 스크립트를 실행할 것인지 설정
    browser: true,
    es2021: true,
  },
  extends: [
    // ESLint 설정을 확장할 때 사용. prettier, airbnb 등 다른 사용자들의 설정도 사용가능.
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:@typescript-eslint/recommended",
  ],
  overrides: [],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint"],
  rules: {
    // 프로젝트에서 강제하고 싶은 규칙 설정
  },
};
