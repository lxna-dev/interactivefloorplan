const path = require('path')
const sveltePreprocess = require('svelte-preprocess')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack')
const packageJson = require('./package.json')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: path.resolve(__dirname, './dist'),
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
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
      {
        // test: /\.(html|svelte)$/,
        test: /\.(svelte)$/,
        use: {
          loader: 'svelte-loader',
          options: {
            preprocess: sveltePreprocess({
              postcss: true,
            }),
          },
        },
      },
      {
        // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
        test: /node_modules\/svelte\/.*\.mjs$/,
        resolve: {
          fullySpecified: false,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './index.html',
    }),
    new webpack.DefinePlugin({
      __VERSION__: JSON.stringify(packageJson.version),
    }),
  ],
  resolve: {
    alias: {
      Client: path.resolve(__dirname, '../client/src/'),
      ClientAssets: path.resolve(__dirname, './assets/'),
      Editor: path.resolve(__dirname, './src/'),
      svelte: path.resolve('node_modules', 'svelte'),
    },
    modules: [path.join(__dirname, 'node_modules')],
    extensions: ['.mjs', '.js', '.svelte'],
    mainFields: ['svelte', 'browser', 'module', 'main'],
  },
}
