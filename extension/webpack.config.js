const path = require('path');

module.exports = {
  entry: './background.js', // Path to your background script
  output: {
    filename: 'background.bundle.js',   // Output bundled file
    path: path.resolve(__dirname, 'dist'),  // Output directory
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      "http": require.resolve("stream-http"),
      "https": require.resolve("https-browserify"),
      "stream": require.resolve("stream-browserify"),
      "url": require.resolve("url/"),
      "zlib": require.resolve("browserify-zlib"),
    },
  },
  mode: 'production', // or 'development' depending on your needs
};
