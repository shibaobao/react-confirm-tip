var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

//定义文件夹的路径
var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

var config = {
  //输入的文件
  entry: {
    index: APP_PATH + '/index.js'
  },

  //输出的文件名
  output: {
    path: BUILD_PATH ,
    filename: '[name].js'
  },

  module: {
    loaders: [
      {
        test: /\.css$/,
        loader: 'style!css'
      },

      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
      },

      {
        test: /\.png$/,
        loader: "url-loader?limit=100000"
      },

      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract(
          "style-loader",
          "css-loader!sass-loader"
        )
      },
    ]
  },

  resolve: {
    extensions: ['', '.js', '.jsx']
  }
};

module.exports = config;
