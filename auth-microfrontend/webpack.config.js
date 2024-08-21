const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  output: {
    publicPath: "auto",
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "authMicrofrontend",
      filename: "remoteEntry.js",
      exposes: {
        './AuthModule': './src/app/auth/auth.module.ts',
      },
      shared: {
        "@angular/core": { singleton: true },
        "@angular/common": { singleton: true },
        "@angular/router": { singleton: true },
      },
    }),
  ],
  resolve: {
    alias: {
      '@angular/core': path.resolve(__dirname, 'node_modules/@angular/core'),
      '@angular/common': path.resolve(__dirname, 'node_modules/@angular/common'),
      '@angular/router': path.resolve(__dirname, 'node_modules/@angular/router'),
    }
  }
});
