const path = require('path')
const webpack = require('webpack')
const packageJson = require('./package.json')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: './',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  resolve: {
    alias: {
      Client: path.resolve(__dirname, './src/'),
      ClientAssets: path.resolve(__dirname, './assets/'),
      Editor: path.resolve(__dirname, '../editor/src/'),
    },
    modules: [path.join(__dirname, 'node_modules')],
  },
  plugins: [
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(packageJson.version),
    }),
  ],
}
