const withReactSvg = require("next-react-svg");
const path = require("path");

module.exports = withReactSvg({
  include: path.resolve(__dirname, "src/assets/svg"),
  webpack(config, options) {
    config.module.rules.push({
      test: /\.svg$/,
      issuer: {
        test: /\.(js|ts)x?$/,
      },
      use: ["@svgr/webpack"],
    });

    return config;
  },
});

module.exports = {
  webpack(config) {
    conf.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: "@svgr/webpack",
          options: {
            svgoConfig: {
              plugins: [
                {
                  removeRasterImages: false,
                  removeStyleElement: false,
                  removeUnknownsAndDefaults: false,
                },
              ],
            },
          },
        },
      ],
    });

    return config;
  },
};

const withAssetsImport = require("next-assets-import");
module.exports = withAssetsImport({
  urlLoaderOptions: {
    rules: [
      {
        test: /\.(png|jpg|gif|mp4|svg)$/i,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
            },
          },
        ],
      },
    ],
  },
});

const withTM = require("next-transpile-modules")(["gsap"]);

module.exports = withTM({});

const withImages = require("next-images");
module.exports = withImages({
  inlineImageLimit: false,
});

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
  .BundleAnalyzerPlugin;
module.exports = {
  plugins: [new BundleAnalyzerPlugin()],
};
