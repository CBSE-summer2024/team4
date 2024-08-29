const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const { ModuleFederationPlugin } = webpack.container;

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'Auth-bundle.js',
    publicPath: 'auto', 
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3005,
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ModuleFederationPlugin({
      name: 'authMicrofrontend',
      filename: 'remoteEntry.js',
      exposes: {
        './AuthModule': './src/app/auth/auth.module.ts',
      },
      shared: {
        '@angular/core': { singleton: true ,eager: true},
        '@angular/common': { singleton: true,eager: true },
        '@angular/router': { singleton: true,eager: true },
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
    new webpack.DefinePlugin({
      'process.env.PUBLIC_URL': JSON.stringify(''),
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@angular/core': path.resolve(__dirname, 'node_modules/@angular/core'),
      '@angular/common': path.resolve(__dirname, 'node_modules/@angular/common'),
      '@angular/router': path.resolve(__dirname, 'node_modules/@angular/router'),
    }
  },
  devtool: 'source-map', 
};
