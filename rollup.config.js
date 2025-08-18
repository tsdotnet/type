import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import resolve from '@rollup/plugin-node-resolve';

export default defineConfig({
  input: 'src/type.ts', // Just use the main entry point
  output: {
    dir: 'dist/esm',
    format: 'es',
    preserveModules: true, // This will automatically include all imported files!
    preserveModulesRoot: 'src',
    entryFileNames: '[name].js',
    sourcemap: true
  },
  external: [
    // Don't bundle ANY dependencies - keep all imports external
    (id) => !id.startsWith('.') && !id.startsWith('/') && !id.startsWith('\0')
  ],
  plugins: [
    resolve({
      preferBuiltins: false
    }),
    typescript({
      tsconfig: './tsconfig.esm.json',
      declaration: false, // Keep your existing types build
      declarationMap: false,
      sourceMap: true,
      removeComments: true // Explicitly remove source comments
    })
  ]
});
