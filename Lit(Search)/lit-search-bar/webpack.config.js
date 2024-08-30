const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;

module.exports = {
  entry: './search-bar.js', 
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'Lit-app-bundle.js',
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                targets: '> 0.25%, not dead',
              }],
            ],
            plugins: ['@babel/plugin-transform-runtime'],
          },
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html', 
      filename: 'index.html',
    }),
    new ModuleFederationPlugin({
      name: 'searchBarApp',
      filename: 'litremoteEntry.js',
      exposes: {
        './SearchBar': './search-bar.js', 
      },
      shared: {
        'lit': { singleton: true, strictVersion: true, eager: true, },
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    compress: true,
    port: 3004, 
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  resolve: {
    extensions: ['.js'],
  },
  devtool: 'source-map',
};