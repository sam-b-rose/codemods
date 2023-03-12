module.exports = {
  transforms: {
    'v9-scss-replace-border-radius': require.resolve(
      './codemods/v9-scss-replace-border-radius/transform.ts',
    ),
  },
  presets: {
    'react-rename-component-prop': require.resolve(
      './codemods/react-rename-component-prop/transform.ts',
    ),
  },
}
