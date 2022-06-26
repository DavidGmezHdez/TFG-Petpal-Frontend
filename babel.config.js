module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['.'],
        extensions: ['.ios.js', '.android.js', '.js', '.ts', '.tsx', '.json'],
        alias: {
          tests: ['./tests/'],
          '@components': './src/components',
          '@redux': './src/redux',
          '@screens': './src/screens',
          '@navigation': './src/navigation',
          '@modals': './src/modals',
          '@utils': './src/utils',
          '@config': './config',
          '@services': './src/services',
        },
      },
    ],
    [
      'transform-inline-environment-variables',
      {
        include: ['NODE_ENV'],
      },
    ],
  ],
};
