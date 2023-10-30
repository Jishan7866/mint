import webpack from 'webpack';
import path from 'path';
import postcssReporter from 'postcss-reporter';
import autoprefixer from 'autoprefixer';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import BrowserSyncPlugin from 'browser-sync-webpack-plugin';
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
        loader: "css-loader",
        options: {
          sourceMap: true,
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          sourceMap: true,
          plugins: scssProcessors,
        },
      },
      {
        loader: "sass-loader",
        options: {
          sourceMap: true,
        },
      },
    ],
    publicPath: '../',
  }),
});


export default env => {

  return {
    context: path.resolve(__dirname, 'src'),

    entry: {
      main: './app.js',
    },

    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'js/[name].js',
    },

    watch: env.dev,

    devtool: 'cheap-module-source-map',

    devServer: {
      contentBase: path.join(__dirname, "dist"),
      watchContentBase: true,
    },

    module: {
      loaders
    },

    plugins: [
      new webpack.DefinePlugin({
        LANG: JSON.stringify("en"),
      }),

      new webpack.optimize.CommonsChunkPlugin({
        name: "common",
      }),

      extractStyles,

      new BrowserSyncPlugin({
        files: "dist/**/*.*",
        hostname: "localhost",
        port: 3000,
        server: { baseDir: ['dist'] },
        reloadDelay: 50,
        injectChanges: false,
        reloadDebounce: 500,
        reloadOnRestart: true,
      }),
    ],
  };
}
