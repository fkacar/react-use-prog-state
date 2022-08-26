const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin')

module.exports = {
  module: {
    rules: [
      {
        test: /\.(js|jsx|ts|tsx)$/,
        exclude: /(node_modules|browser_components)/,
        use: {
          loader: 'babel-loader'
        }
      }
    ]
  },

  resolve: {
    plugins: [new TsconfigPathsPlugin({})]
  },

  output: {
    path: './dist',
    filename: 'index.js',
    libraryTarget: 'umd'
  }
}
