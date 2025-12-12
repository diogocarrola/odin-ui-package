import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import { terser } from 'rollup-plugin-terser';
import pkg from './package.json';

const extensions = ['.js'];

export default [
  // UMD build for browsers
  {
    input: 'src/index.js',
    output: {
      name: 'OdinUI',
      file: pkg.unpkg,
      format: 'umd'
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions
      }),
      terser()
    ]
  },
  
  // ES module build
  {
    input: 'src/index.js',
    output: {
      file: pkg.module,
      format: 'es'
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions
      })
    ]
  },
  
  // CommonJS build
  {
    input: 'src/index.js',
    output: {
      file: pkg.main,
      format: 'cjs'
    },
    plugins: [
      resolve({ extensions }),
      commonjs(),
      babel({
        babelHelpers: 'bundled',
        exclude: 'node_modules/**',
        extensions
      })
    ]
  }
];