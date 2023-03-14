export default {
  transforms: {
    'v9-scss-replace-border-radius': require.resolve(
      './src/codemods/v9-scss-replace-border-radius/transform',
    ),
  },
  presets: {
    'react-rename-component-prop': require.resolve(
      './src/codemods/react-rename-component-prop/transform',
    ),
  },
}
