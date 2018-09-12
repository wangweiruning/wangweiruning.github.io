const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); 
const webpack = require('webpack');
module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'app.js',
    path: path.resolve('', 'dist')
  },
  module: {
    rules: [
        {   
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
        },
        {
        test: /\.(png|svg|jpg|gif)$/,
        use: ['url-loader']
        },
        {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['url-loader']
        },
        {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
        loader: 'babel-loader'
           }
        }
        ]
   },
   plugins: [
    new HtmlWebpackPlugin({
     title: 'production',
     template: './index.html' 
    }),
    // hot 检测文件改动替换plugin
    new webpack.NamedModulesPlugin(),  
    new webpack.HotModuleReplacementPlugin()
    ],
       // webpack-dev-server 配置
    devServer: {
    contentBase: './dist',
    hot: true
    },
}