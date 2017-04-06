
let path = require('path')

module.exports = {
    entry: './src/main.js',
    resolve: {
        extensions: ['', '.js'],
        alias: {
            'src': path.resolve(__dirname, './src'),
            'components': path.resolve(__dirname, './src/components'),
            'directives': path.resolve(__dirname, './src/directives'),
            'utils': path.resolve(__dirname, './src/utils')
        }
    },
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
          },
          {
              test: /\.jsx?$/,
              exclude: /(node_modules|bower_components)/,
              loader: 'babel', // 'babel-loader' is also a legal name to reference
              query: {
                  presets: ['es2015']
              }
          }
        ]
    },
    output: {
        path: __dirname + '/dist', // 输出文件的保存路径
        filename: 'bt-table.js' // 输出文件的名称
    }
};