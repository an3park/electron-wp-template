const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

module.exports = {
  mode: isDev ? 'development' : 'production',
  target: 'electron-renderer',
  context: path.resolve(__dirname, 'src', 'renderer'),
  entry: './index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build', 'renderer')
  },
  devServer: {
    port: +process.env.PORT || 3030,
    hot: isDev
  },
  plugins: [new HTMLWebpackPlugin()]
}