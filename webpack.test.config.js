var webpack = require("webpack");
var path = require("path");
var rootDir = path.resolve(__dirname);

module.exports = {
  // node: {
  // 	fs: "empty"
  // },
  devtool: "eval-source-map",

  resolve: {
    extensions: [".ts", ".js"],
    fallback: {
      fs: false,
    },
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        enforce: "post",
        use: {
          loader: "@jsdevtools/coverage-istanbul-loader",
          options: { esModules: true },
        },
        include: path.resolve(__dirname, "./src"),
        exclude: [/\.spec\.ts$/, /\.e2e\.ts$/, /node_modules/],
      },
    ],
  },
};
