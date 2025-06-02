const { merge } = require('webpack-merge')
const common = require('./webpack.common.js')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const path = require('path')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  cache: false,
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'dist/main.js'),
          to: path.resolve(__dirname, '../../website/static/image-map-pro.min.js'),
        },
      ],
    }),
  ],
})
