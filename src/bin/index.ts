#!/usr/bin/env node

import { Command } from "commander";
const program = new Command();

import { getEslint } from "../eslint";
import { buildWebpack } from "../build/webpack";

program
  .version("0.1.0")
  .description("start eslint and fix code")
  // .command("eslint")
  .command("webpack")
  .action((value) => {
    // getEslint();
    buildWebpack();
  });

// process.argv [node执行路径, 当前执行文件路径, 执行命令带入参数]
program.parse(process.argv);
