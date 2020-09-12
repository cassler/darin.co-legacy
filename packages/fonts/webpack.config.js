const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
/* eslint-disable import/no-extraneous-dependencies */
// const path = require('path');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

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
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
  ],
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            // options: {
            //   publicPath: '.',
            // },
          },
          'css-loader',
        ],
      },
      {
        test: /\.(ttf|eot)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]',
            // publicPath: '.', // Take the directory into account
          },
        },
      },
      {
        // Match woff2 and patterns like .woff?v=1.1.1.
        test: /\.woff2?(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 50000,
            mimetype: 'application/font-woff',
            name: 'fonts/[name].[ext]', // Output below ./fonts
            // publicPath: '.', // Take the directory into account
          },
        },
      },
    ],
  },
};
