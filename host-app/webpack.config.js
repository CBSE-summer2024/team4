// Webpack configuration for hostApp
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { ModuleFederationPlugin } = webpack.container;
const { VueLoaderPlugin } = require('vue-loader');

module.exports = {
  entry: ['@babel/polyfill', './src/main.js'],
  target: 'web',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'hostApp-bundle.js',
    publicPath: 'http://localhost:3001/',
  },
  module: {
    rules: [
      { 
        test: /\.vue$/, 
        loader: 'vue-loader' 
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-env',
              '@babel/preset-react'
            ],
            plugins: [
              '@babel/plugin-transform-react-jsx'
            ]
          }
        }
      },
      { 
        test: /\.css$/, 
        use: ['style-loader', 'css-loader'] 
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'hostApp',
      remotes: {
        Cart: 'Cart@http://localhost:3003/remoteEntry.js',
        filterApp: 'filterApp@http://localhost:3002/remoteEntry.js',
        searchApp: 'searchBarApp@http://localhost:3004/litremoteEntry.js',
        svelteApp: 'svelteApp@http://localhost:3005/remoteEntry.js',
        
      },
      shared: {
        vue: { singleton: true, eager: true, requiredVersion: '^3.4.38' },
        react: { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'react-dom': { singleton: true, eager: true, requiredVersion: '^18.0.0' },
        'lit': { singleton: true, strictVersion: true, eager: true, },
        svelte: { singleton: true, eager: true, requiredVersion: '^3.59.2' },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    extensions: ['.js', '.jsx', '.vue', '.json', '.svelte'],
    alias: {
      vue$: 'vue/dist/vue.runtime.esm-bundler.js',
    },
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3001,
    historyApiFallback: true,
    hot: true,
  },
};
