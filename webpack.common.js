//const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: path.resolve(__dirname, 'client/index.js'),
  output: {
    path: path.resolve(__dirname, 'server/static/build'),
    filename: 'bundle.js'
  },
  resolve: {
    alias: {
      "@redux": path.resolve(__dirname, 'client/redux/'),
      "@client": path.resolve(__dirname, 'client/')
    }
  },
  module: {
    rules: [{
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.less$/,
        use: [{
          loader: "style-loader" // creates style nodes from JS strings
        }, {
          loader: "css-loader" // translates CSS into CommonJS
        }, {
          loader: "less-loader" // compiles Less to CSS
        }]
      },
      // {
      //   test: /(\.css|\.less)$/,
      //   use: 'ignore-loader'
      // }
      // {
      //   test: /\.html$/,
      //   use: ['parseHtml']
      // }
    ]
  },
  // plugins: [new HtmlWebpackPlugin({
  //   template: '!!ejs-loader!' + path.join(__dirname, 'client/public/index.html')
  // })]
};
