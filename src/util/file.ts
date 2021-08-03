import fs from "fs";
import { loggerError } from ".";

export const loadFile = (path: string) => {
  try {
    const data = fs.readFileSync(path, "utf8");
    const config = JSON.parse(data);
    return config;
  } catch (err) {
    loggerError(`Error reading file from disk: ${err}`);
  }
};
