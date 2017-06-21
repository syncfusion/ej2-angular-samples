const UglifyJsPlugin = require('webpack/lib/optimize/UglifyJsPlugin');

module.exports = {
  target: 'web',
  entry: {
    main: './src/main.js',
  },
  output: {
    path: __dirname + '/dist/',
    filename: '[name].bundle.js'
  },
  plugins: [
    new UglifyJsPlugin({
      beautify: false, //prod
      output: {
        comments: false
      }, //prod
      mangle: {
        screw_ie8: true
      }, //prod
      compress: {
        screw_ie8: true,
        warnings: false,
        conditionals: true,
        unused: true,
        comparisons: true,
        sequences: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        negate_iife: false // we need this for lazy v8
      }
    })
  ]
};