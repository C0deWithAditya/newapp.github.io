// config-overrides.js
module.exports = function override(config) {
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        querystring: require.resolve('querystring-es3')
      }
    };
    return config;
  };
  