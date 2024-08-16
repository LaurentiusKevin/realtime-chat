module.exports = {
  root: true,
  extends: '@react-native',
  settings: {
    react: {
      version: 'detect', // Automatically detect the react version
    },
  },
  rules: {
    'react/react-in-jsx-scope': 'off', // Disable the rule
  },
};
