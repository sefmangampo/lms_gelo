const { webpackConfig, merge } = require("@rails/webpacker");
//const customConfig = require("./custom");

const customConfig = {
  resolve: {
    extensions: [".css"],
  },
};

module.exports = merge(webpackConfig, customConfig);
