const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    app: "./src/app.ts",
    popup: "./src/popup.ts"
  },
  output: {
    filename: "[name].js",
    path: __dirname + "/dist",
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new CopyPlugin([
      { from: "resource", to: "" },
    ]),
  ],
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: "ts-loader"
      },
      {
        enforce: "pre",
        test: /\.js$/,
        loader: "source-map-loader"
      },
      {
        test: /\.elm$/,
        exclude: [/elm-stuff/, /node_modules/],
        use: {
          loader: "elm-webpack-loader",
          options: {}
        }
      }
    ]
  },
};
