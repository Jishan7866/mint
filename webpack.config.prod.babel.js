import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import autoprefixer from 'autoprefixer';
import postcssReporter from 'postcss-reporter';
import MinifyPlugin from 'babel-minify-webpack-plugin';
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

import loaders from './webpack.loaders';

const extractStyles = new ExtractTextPlugin({ filename: 'css/[name].css' });

const supportedBrowsers = [
  '> 0.5%',
  'last 2 versions',
  'not ie <= 10',
];

const scssProcessors = [
  autoprefixer({
    browsers: supportedBrowsers,
    cascade: false,
  }),
  postcssReporter({ clearReportedMessages: true }),
];

loaders.push({
  test: /\.scss$/,
  use: extractStyles.extract({
    use: [
      {
        loader: "css-loader"
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: scssProcessors,
        },
      },
      {
        loader: "sass-loader",
      },
    ],
    publicPath: '../',
  }),
});

loaders.push({
  test: /\.svg$/,
  use: [
    {
      loader: 'svgo-loader',
      options: {
        plugins: [
          { removeTitle: true },
          { convertColors: { shorthex: false } },
          { convertPathData: false }
        ]
      }
    }
  ]
});

export default () => {

  return {
    context: path.resolve(__dirname, 'src'),

    entry: {
      main: './app.js',
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
    },

    watch: false,

    devtool: false,

    module: {
      loaders
    },

    plugins: [
      new webpack.DefinePlugin({
        LANG: JSON.stringify("en"),
        "process.env": { NODE_ENV: "'production'" },
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: "common",
      }),

      extractStyles,

      new ImageminPlugin({
        pngquant: {
          quality: '65-80'
        }
      }),

      new MinifyPlugin(),

      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          map: {
            inline: false,
            annotation: true,
          },
          safe: true,
          discardComments: true
        },
      })
    ]
  }
};
