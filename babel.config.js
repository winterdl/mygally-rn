module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    ['babel-plugin-styled-components'],
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: ['.js', '.ios.js', '.android.js'],
      },
    ],
  ],
};
