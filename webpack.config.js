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
        test: /\.mustache$/,
        use: [{ loader: "mustache-loader" }]
      }, {
        test: /\.less$/i,
        use: [
          // compiles Less to CSS
          "style-loader",
          "css-loader",
          "less-loader",
        ],
      }
    ]

  }, 
  plugins: [
    new HtmlWebpackPlugin({
      template: "app/view/indexDocument.html", 
      hash: true,
      publicPath: "assets"
    })
]
};