const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "./static/frontend"),
    filename: "[name].js",
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
    ],
  },
  optimization: {
    minimize: process.env.NODE_ENV === 'production',
  },
  devtool: process.env.NODE_ENV === 'development' ? 'inline-source-map' : false,
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true,
    port: 9000,
  },
  plugins: [
    new webpack.DefinePlugin({
      "process.env": {
        // This has effect on the react lib size
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
  ],
};