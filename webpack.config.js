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
        test: /\.module\.scss$/,
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
          {
            loader: "sass-loader",
          },
        ],
      },
      {
        test: /(?<!module)\.scss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
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
      "#components": path.resolve(process.cwd(), "src/components"),
      "#machines": path.resolve(process.cwd(), "src/machines"),
      "#mocks": path.resolve(process.cwd(), "src/mocks"),
      "#styles": path.resolve(process.cwd(), "src/styles"),
      "#utils": path.resolve(process.cwd(), "src/utils"),
      "#views": path.resolve(process.cwd(), "src/views"),
    },
    extensions: [".css", ".js", ".ts", ".tsx"],
  },
}
