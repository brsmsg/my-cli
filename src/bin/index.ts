#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();

import { getEslint } from "../eslint";

program
  .version("0.1.0")
  .description("start eslint and fix code")
  .command("eslint")
  .action((value) => {
    getEslint();
  });
// process.argv [node执行路径, 当前执行文件路径, 执行命令带入参数]
program.parse(process.argv);
