import { babel } from '@rollup/plugin-babel'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import commonjs from '@rollup/plugin-commonjs'
import { globby } from 'globby'

const extensions = ['.ts']
const transformPaths = await globby('./src/**/!(*.spec).ts')

/** @type {import('rollup').RollupOptions} */
export default {
  input: [...transformPaths, 'codeshift.config.ts'],
  output: {
    format: 'cjs',
    dir: 'dist',
    exports: 'auto',
    preserveModules: true,
  },
  plugins: [
    // Allows node_modules resolution
    nodeResolve({ extensions, preferBuiltins: true }),
    // Allow bundling cjs modules. Rollup doesn't understand cjs
    commonjs(),
    // Compile TypeScript/JavaScript files
    babel({
      extensions,
      presets: ['@babel/preset-env', '@babel/preset-typescript'],
      include: ['src/**/*', 'codeshift.config.ts'],
      babelHelpers: 'bundled',
      envName: 'production',
      targets: 'node 16.13',
    }),
  ],
}
