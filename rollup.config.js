import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import typescript from 'rollup-plugin-typescript2'

import pkg from './package.json'


/** @type {import('rollup').RollupOptions} */
const config = {
    input: 'src/index.ts',
    output: [
        {
            file: pkg.main,
            format: 'cjs',
            sourcemap: false,
            exports: "auto",
        },
        {
            file: pkg.module,
            format: 'esm',
            sourcemap: false,
        },
    ],
    plugins: [
        peerDepsExternal(),
        resolve(),
        typescript(),
    ],
}

export default config
