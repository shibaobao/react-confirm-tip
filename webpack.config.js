var path = require('path');

var ROOT_PATH = path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'app');
var BUILD_PATH = path.resolve(ROOT_PATH, 'dist');

module.exports = {

  entry: APP_PATH + '/index.js',

  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
  },

  module:{
    loaders:[
      { test: /\.scss$/, include: APP_PATH, loader: "style!css!sass"},
      { test: /\.js[x]?$/, include: APP_PATH, exclude: /node_modules/, loader: 'babel-loader' },
    ]
  }

}
