const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  output: {
    publicPath: "auto",
    uniqueName: "authMicrofrontend", // Ensures unique module name
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "authMicrofrontend",
      filename: "remoteEntry.js",
      exposes: {
        // Expose a specific component instead of the module
        './AuthComponent': './src/app/auth/auth.component.ts',
      },
      shared: {
        "@angular/core": { singleton: true, strictVersion: true },
        "@angular/common": { singleton: true, strictVersion: true },
        "@angular/router": { singleton: true, strictVersion: true },
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
