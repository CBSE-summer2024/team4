import path from 'path';
import { fileURLToPath } from 'url';
import webpack from 'webpack';
import sveltePreprocess from 'svelte-preprocess';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: 'auto',
  },
  module: {
    rules: [
      {
        test: /\.svelte$/,
        use: {
          loader: 'svelte-loader',
          options: {
            preprocess: sveltePreprocess(),
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        include: path.resolve(__dirname, 'src'),
      },
    ],
  },
  resolve: {
    alias: {
      svelte: path.resolve('node_modules', 'svelte'),
    },
    extensions: ['.js', '.svelte'],
  },
  plugins: [
    new webpack.container.ModuleFederationPlugin({
      name: 'svelteApp',
      filename: 'remoteEntry.js',
      exposes: {
        './Signup': './src/Signup.svelte',
        './Signin': './src/Signin.svelte',
      },
      shared: {
        'svelte': { singleton: true, eager: true, requiredVersion: '^3.59.2' },
      },
    }),
  ],
  devServer: {
    static: {
      directory: path.join(__dirname, 'public'),
    },
    compress: true,
    port: 3005,
    historyApiFallback: true,
  },
};