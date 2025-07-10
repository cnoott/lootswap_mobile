module.exports = {
  presets: ['module:@react-native/babel-preset'],
  plugins: [
  ['module:react-native-dotenv', {
        moduleName: '@env',
        path: '.env',
        blacklist: null,
        whitelist: null,
        safe: false,
        allowUndefined: true,
      }],
    'react-native-reanimated/plugin',
    [
      'module-resolver',
      {
        alias: {
          custom_top_alert: './src/utility/dropdownAlert/index.ts',
          localsvgimages: './src/assets/images/svgs/index.ts',
          custom_enums: './src/enums/index.ts',
        },
      },
    ],
  ],
};
