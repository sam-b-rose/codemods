module.exports = {
  maintainers: [],
  targets: [],
  description: 'Codemods for Polaris',
  transforms: {},
  presets: {
    'react-rename-component-prop': require.resolve('./codemods/react-rename-component-prop/transform'),
  },
};
