module.exports = {
  entry: ["./build/index.js"],

  output: {
    path: __dirname + "/docs",
    publicPath: "/",
    filename: "bundle.js",
  },
  devServer: {
    contentBase: "./build",
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["eslint-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".jsx"],
  },
};
