import { ESLint } from "eslint";
import {
  getCwdPath,
  getDirPath,
  loggerError,
  loggerSuccess,
  loggerTiming,
} from "../util";

// eslint node.js API
// https://eslint.org/docs/developer-guide/nodejs-api#-eslintlintfilespatterns

// 1. create an instance
const eslint = new ESLint({
  fix: true,
  extensions: [".js", ".ts"],
  // 禁用项目本身.eslintrc，仅使用CLI提供规则校验
  useEslintrc: false,
  overrideConfig: {
    env: {
      browser: true,
      es2021: true,
    },
    parser: require.resolve("@typescript-eslint/parser"),
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
      ecmaVersion: 12,
      sourceType: "module",
    },
    plugins: ["react", "@typescript-eslint"],
  },
  resolvePluginsRelativeTo: getDirPath("node_modules"),
});

export const getEslint = async (path: string = "src") => {
  try {
    loggerTiming("EsLint 校验");
    // 2. Lint fines
    const results = await eslint.lintFiles([`${getCwdPath(path)}`]);
    // 3. Modify the files with the fixed code
    await ESLint.outputFixes(results);
    // 4. Format the results
    const formatter = await eslint.loadFormatter("stylish");
    const resultText = formatter.format(results);
    // 5. output it
    if (resultText) {
      loggerError(`请检查 ===> ${resultText}`);
    } else {
      loggerSuccess("完美");
    }
  } catch (err) {
    process.exitCode = 1;
    loggerError(err);
  } finally {
    loggerTiming("ESlint 校验", false);
  }
};
