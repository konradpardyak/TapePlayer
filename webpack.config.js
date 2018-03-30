const path = require('path');

module.exports = {
  entry: './src/tapeplayer.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'tapeplayer.js'
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }
    ]
  }
};
