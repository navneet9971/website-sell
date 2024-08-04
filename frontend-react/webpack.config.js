const path = require('path');

module.exports = {
  entry: './src/index.js', // Entry point for your application
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'), // Output directory
  },
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader', 'postcss-loader'], // Loaders for CSS files
      },
      {
        test: /\.js$/, // Loader for JavaScript files
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react'], // Babel presets
          },
        },
      },
      {
        test: /\.js$/, // Source map loader for debugging
        enforce: 'pre',
        use: ['source-map-loader'],
      },
    ],
  },
  devtool: 'source-map', // Generate source maps for debugging
};
