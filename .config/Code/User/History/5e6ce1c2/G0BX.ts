import swc from 'unplugin-swc';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    root: './',
    reporters: ['tap'],
  },
  plugins: [
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
});