const withReactSvg = require("next-react-svg");
const path = require("path");
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(
  withReactSvg({
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
  })
);

module.exports = withBundleAnalyzer({
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
});

const withAssetsImport = require("next-assets-import");
module.exports = withBundleAnalyzer(
  withAssetsImport({
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
  })
);

const withTM = require("next-transpile-modules")(["gsap"]);

module.exports = withBundleAnalyzer(withTM({}));

const withImages = require("next-images");
module.exports = withBundleAnalyzer(
  withImages({
    inlineImageLimit: false,
  })
);
