export default [
  {
    test: /\.js$/,
    exclude: /node_modules\/(?!(dom7|ssr-window|swiper)\/).*/,
    use: [
      {
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          plugins: ['transform-runtime'],
        },
      },
      {
        loader: 'eslint-loader',
        options: {
          cache: true,
          emitWarning: true,
          configFile: '.eslintrc',
        },
      },
    ],
  },
  {
    test: /.*\.(gif|png|jpe?g|svg)$/i,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
    ],
  },
  {
    test: /\.(woff2?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
    use: [
      {
        loader: 'file-loader',
        options: {
          name: 'assets/[name].[ext]',
        },
      },
    ],
  },
]