import {
  getCwdPath,
  loggerError,
  loggerInfo,
  loggerSuccess,
  loggerTiming,
} from "../../util";
import getWebpackConfig from "./webpack.base.config";
import webpack from "webpack";
import { loadFile } from "../../util/file";

export const buildWebpack = () => {
  loggerTiming("WEBPACK BUILD");

  const webpackConfig = getWebpackConfig({
    entry: getCwdPath("src/index.js"),
    output: { path: getCwdPath("dist"), filename: "bundle.js" },
  });

  console.log(webpackConfig);
  const compiler = webpack(webpackConfig);

  try {
    compiler.run((err: any, stats: any) => {
      if (err) {
        loggerError(err);
      } else {
        loggerSuccess("WEBPACK SUCCESS !");
      }
      // compiler.close(() => {
      //   loggerInfo("WEBPACK GENERATE CACHE");
      // });
      loggerTiming("WEBPACK BUILD", false);
    });
  } catch (error) {
    loggerError(error);
  }
};
