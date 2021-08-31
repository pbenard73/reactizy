const path = require('path')

const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const nodeExternals = require('webpack-node-externals');

module.exports = {
    mode:'production',
  entry: {
    index: './lib/index.js',
    class: './lib/indexClass.js',
    hookBuilder: './lib/hookBuilder.js',
  },
  externals: [nodeExternals()],
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'core'),
    library: '',
    libraryTarget: 'commonjs-module'
  },
  plugins: [new CleanWebpackPlugin()],
  module: {
    rules: [
     {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      { 
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
        include: path.resolve(__dirname, './src')
      }
    ]
  }
}
