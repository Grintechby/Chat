const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";

const babelOptions = (presets) => {
  const options = {
    presets: ["@babel/preset-env"],
    plugins: ["@babel/plugin-transform-runtime"],
  };

  if (presets) {
    options.presets = options.presets.concat(presets);
  }

  return options;
};

module.exports = {
  mode: "development",
  entry: {
    main: ["@babel/polyfill", "./src/index.tsx"],
  },
  output: {
    filename: "[name].[hash].js",
    path: path.resolve(__dirname, "dist"),
    assetModuleFilename: "assets/[hash][ext][query]",
    clean: true,
  },
  resolve: {
    extensions: [
      ".js",
      ".jsx",
      ".ts",
      ".tsx",
      ".png",
      ".svg",
      ".webp",
      ".css",
      ".sass",
      ".scss",
    ],
  },
  optimization: {
    minimizer: [new TerserWebpackPlugin(), new CssMinimizerWebpackPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new HTMLWebpackPlugin({
      template: "./public/index.html",
      minify: {
        collapseWhitespace: !isDev,
      },
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "public/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
    }),
  ],
  devtool: isDev ? "source-map" : "cheap-source-map",
  devServer: {
    port: 3000,
    hot: isDev,
  },
  module: {
    rules: [
      {
        test: /\.(s[ac])ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|webp|ico)/,
        type: isDev ? "asset" : "asset/resource",
      },
      {
        test: /\.(woff2?|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions(),
        },
      },
      {
        test: /\.m?ts$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions(["@babel/preset-typescript"]),
        },
      },
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions(["@babel/preset-react"]),
        },
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: babelOptions([
            "@babel/preset-react",
            "@babel/preset-typescript",
          ]),
        },
      },
    ],
  },
};
