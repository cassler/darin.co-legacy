// .storybook/main.js
/* eslint-disable import/no-extraneous-dependencies */
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

const path = require('path');

// Export a function. Accept the base config as the only param.
module.exports = {
  stories: ['../../**/*.stories.tsx', '../../**/*.stories.mdx'],
  addons: [
    '@storybook/addon-docs',
    '@storybook/addon-jsx',
    '@storybook/addon-controls',
    '@storybook/addon-backgrounds',

  ],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    config.module.rules.push({
      test: /\.scss$/,
      use: ['style-loader', 'css-loader', 'sass-loader'],
      include: path.resolve(__dirname, '../../'),
    });

    // use @babel/preset-react for JSX and env (instead of staged presets)
    config.module.rules[0].use[0].options.presets = [
      require.resolve("@babel/preset-react"),
      require.resolve("@babel/preset-env"),
      require.resolve("@emotion/babel-preset-css-prop")
    ];

    // Add Webpack rules for TypeScript
    // ========================================================
    config.module.rules.push({
      test: /\.(ts|tsx)$/,
      loader: require.resolve("babel-loader"),
      options: {
        presets: [
          ["react-app", { flow: false, typescript: true }],
          require.resolve("@emotion/babel-preset-css-prop")
        ]
        // ... other configs
      }
    });
    // config.module.rules.push({ test: /\.tsx?$/, loader: "ts-loader" })


    // config.resolve.extensions = [...config.resolve.extensions, ".ts", ".tsx", ".js"]
    config.resolve.plugins = [...config.resolve.plugins, new TsconfigPathsPlugin()]

    // Return the altered config
    return config;
  },
};
