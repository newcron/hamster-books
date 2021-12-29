const path = require('path');

const HtmlWebpackPlugin = require("html-webpack-plugin");



module.exports = {
  entry: './app/js/hamstersBooks.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'app-optimized/assets'),
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: "ts-loader", 
        exclude: /node_modules/

      }, {
        test: /\.mustache$/,
        use: [{ loader: "mustache-loader" }]
      }, {
        test: /\.less$/i,
        use: [
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      }
    ]

  }, 
  resolve: {
    extensions: [".js", ".ts"]
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/view/indexDocument.html", 
      hash: true,
      publicPath: "assets"
    })
]
};