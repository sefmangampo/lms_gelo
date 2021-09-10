module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [{ loader: "style-loader" }, { loader: "css-loader" }],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)$/,
        use: "url-loader?name=[name].[ext]",
      },
    ],
  },
};
