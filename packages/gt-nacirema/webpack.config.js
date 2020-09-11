const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'development',
  output: {
    filename: 'bundle.js',
  },
  // resolve: {
  //   extensions: [".ts", ".tsx", ".js"],
  //   plugins: [new TsconfigPathsPlugin(), new ExtractCssChunks()],
  // },
  plugins: [
    new TsconfigPathsPlugin(),
    new ExtractCssChunks({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      // Font stylesheets
      {
        // test: /\.(scss|css)$/,
        test: /\.css$/i,
        use: [
          {
            loader: ExtractCssChunks.loader,
            // options: {
            //   publicPath: 'static/',
            // },
          },
          'css-loader',
        ],
        // loaders: [
        //   ExtractCssChunks.loader,
        //   'style-loader',
        //   'css-loader',
        //   'resolve-url-loader', // add this before sass-loader
        //   'sass-loader',
        // ],
      },

      // Font files
      {
        test: /\.(ttf|eot|woff|woff2|svg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'static/',
            esModule: false,
          },
        },
      },
    ],
  },
};
