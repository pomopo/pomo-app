import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom', // DOM操作を伴うテストのために必要
    globals: true, // describe, it などを import なしで使える
    setupFiles: './vitest.setup.ts', // 任意（後述）
    include: ['src/**/*.{test,spec}.{ts,tsx}'], // テストファイルの場所
    coverage: {
      reporter: ['text', 'html'], // カバレッジ出力形式
      exclude: ['node_modules/', 'src/vite-env.d.ts'],
    },
  },
});
