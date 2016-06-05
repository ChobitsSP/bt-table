
var path = require('path')

module.exports = {
  entry: './app.js',
  module: {
    preLoaders: [
      { 
        test: /\.js$/, 
        loader: 'baggage?[file].html&[file].css' 
      }
    ],
    loaders: [
      {
        test: /\.html$/,
        loader: 'ngtemplate?relativeTo=' + __dirname + '/!html'
      }
    ]
  },
  output: {
    path: __dirname, // 输出文件的保存路径
    filename: 'bt-table.js' // 输出文件的名称
  }
};