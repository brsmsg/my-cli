import { resolve } from "path";
import chalk from "chalk";

// 获取本地路径
export const getDirPath = (relPath: string = "") => {
  return resolve(__dirname, relPath);
};

// 获取运行时路径
export const getCwdPath = (relPath: string = "") => {
  return resolve(process.cwd(), relPath);
};

// 计时日志
export const loggerTiming = (str: string = "", start: boolean = true) => {
  if (start) {
    console.time("Timing");
    console.log(chalk.cyan(`***** ${str} start *****`));
  } else {
    console.log(chalk.cyan(`***** ${str} end *****`));
    console.time("Timing");
  }
};

// 普通日志
export const loggerInfo = (str: string = "") => {
  console.log(chalk.green(`[INFO]: ${str}`));
};

// 警告日志
export const loggerWarning = (str: string = "") => {
  console.log(chalk.yellowBright(`[WARNING]: ${str}`));
};

// 成功日志
export const loggerSuccess = (str: string = "") => {
  console.log(chalk.greenBright(`[SUCCESS]: ${str}`));
};

// 报错日志
export const loggerError = (str: string = "") => {
  console.log(chalk.redBright(`[ERROR: ${str}`));
};
