import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  plugins: [
    nodeResolve({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    commonjs()
  ]
}
