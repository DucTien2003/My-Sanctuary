// const { override, useBabelRc } = require('customize-cra');
// eslint-disable-next-line react-hooks/rules-of-hooks
// module.exports = override(useBabelRc());
// enable legacy decorators babel plugin

const { override, useBabelRc } = require('customize-cra');
const webpack = require('webpack');

module.exports = override(
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useBabelRc(),
  (config) => {
    config.target = 'browserslist';

    const fallback = config.resolve.fallback || {};
    Object.assign(fallback, {
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      http: require.resolve('stream-http'),
      https: require.resolve('https-browserify'),
      os: require.resolve('os-browserify'),
      buffer: require.resolve('buffer'),
      timers: require.resolve('timers-browserify'),
      path: require.resolve('path-browserify'),
      fs: require.resolve('browserify-fs'),
      process: require.resolve('process/browser'),
    });
    config.resolve.fallback = fallback;
    config.plugins = (config.plugins || []).concat([
      new webpack.ProvidePlugin({
        process: 'process/browser',
        Buffer: ['buffer', 'Buffer'],
      }),
    ]);

    config.module.rules.push({
      test: /\.m?js/,
      resolve: {
        fullySpecified: false,
      },
    });

    return config;
  }
);
