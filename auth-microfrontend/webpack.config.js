const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const path = require("path");

module.exports = {
  entry: './src/main.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: "auto",
    uniqueName: "authMicrofrontend", 
    libraryTarget: 'var',
    library: 'authMicrofrontend'
  },
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@angular/core': path.resolve(__dirname, 'node_modules/@angular/core'),
      '@angular/common': path.resolve(__dirname, 'node_modules/@angular/common'),
      '@angular/router': path.resolve(__dirname, 'node_modules/@angular/router'),
    }
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/
      },
      {
        test: /\.html$/,
        use: 'html-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
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
  ]
};
