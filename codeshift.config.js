module.exports = {
  transforms: {
    '9.0.0': require.resolve('./src/codemods/9.0.0/transform.ts')
  },
  presets: {
    'v9-scss-replace-border-radius': require.resolve(
      './src/codemods/9.0.0/v9-scss-replace-border-radius/transform.ts',
    ),
    'react-rename-component-prop': require.resolve(
      './src/codemods/presets/react-rename-component-prop/transform.ts',
    ),
  },
}
