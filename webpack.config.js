/* eslint @typescript-eslint/no-var-requires: "off" */
const path = require("path")
const HTMLWebpackPlugin = require("html-webpack-plugin")
const webpack = require("webpack")

module.exports = {
  devServer: {
    historyApiFallback: true,
    port: 3666,
    proxy: {
      "/api": "http://localhost:8180",
    },
  },
  devtool: "source-map",
  entry: "./src/index.tsx",
  mode: process.env.MODE || "production",
  module: {
    rules: [
      {
        exclude: /node_modules/,
        test: /\.ts(x?)$/,
        use: ["babel-loader"],
      },
      {
        test: /\.module\.css$/,
        use: [
          {
            loader: "style-loader",
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]___[hash:base64:5]",
              },
            },
          },
        ],
      },
      {
        test: /(?<!module)\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    publicPath: "/",
    sourceMapFilename: "[name].js.map",
  },
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: "[file].map[query]",
    }),
    new webpack.EnvironmentPlugin({
      MODE: process.env.MODE,
    }),
    new HTMLWebpackPlugin({
      template: "public/index.html",
    }),
  ],
  resolve: {
    alias: {
      // Fixes issues while local development with `npm link`
      // such as multiple `react` versions in one app app,
      // or losing context because of imports from different `react-router-dom` modules.
      react: path.resolve("./node_modules/react"),
      "react-dom": path.resolve("./node_modules/react-dom"),
      "react-router-dom": path.resolve("./node_modules/react-router-dom"),
      antd: path.resolve("./node_modules/antd"),

      "#components": path.resolve(process.cwd(), "src/components"),
      "#machines": path.resolve(process.cwd(), "src/machines"),
      "#utils": path.resolve(process.cwd(), "src/utils"),
      "#views": path.resolve(process.cwd(), "src/views"),
    },
    extensions: [".css", ".js", ".ts", ".tsx"],
  },
}
