export default {
  transforms: {
    '9.0.0': require.resolve('./dist/codemods/9.0.0/transform.js'),
  },
  presets: {
    'v9-scss-replace-border-radius': require.resolve(
      './dist/codemods/9.0.0/v9-scss-replace-border-radius/transform.js',
    ),
    'react-rename-component-prop': require.resolve(
      './dist/codemods/presets/react-rename-component-prop/transform.js',
    ),
  },
}
