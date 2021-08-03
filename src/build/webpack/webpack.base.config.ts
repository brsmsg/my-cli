import { getCwdPath, getDirPath } from "../../util";

interface IWebpack {
  entry: any;
  output: any;
  mode?: "development" | "production" | "none";
  template?: string;
}

export default ({ mode, entry, output, template }: IWebpack) => {
  return {
    mode,
    entry,
    target: "web",
    output,
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: require.resolve("babel-loader"),
            options: {
              presets: [
                require.resolve("@babel/preset-env"),
                [
                  require.resolve("@babel/preset-react"),
                  {
                    runtime: "automatic",
                  },
                ],
              ],
            },
          },
          exclude: [
            getCwdPath("node_modules"), // 由于 node_modules 都是编译过的文件，这里做过滤处理
          ],
        },
        {
          test: /\.css$/,
          use: [
            "style-loader",
            {
              loader: require.resolve("css-loader"),
              options: {
                importLoaders: 1,
              },
            },
            {
              loader: require.resolve("postcss-loader"),
              options: {
                postcssOptions: {
                  plugins: [
                    [
                      require.resolve("postcss-preset-env"),
                      {
                        ident: "postcss",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
        {
          test: /\.(woff(2)?|eot|ttf|otf|svg|)$/,
          type: "asset/inline",
        },
        {
          test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
          loader: require.resolve("url-loader"),
          options: {
            limit: 10000,
            name: "static/media/[name].[hash:8].[ext]",
          },
        },
      ],
    },
    resolve: {
      extensions: ["", ".js", ".json", ".sass"],
    },
  };
};
