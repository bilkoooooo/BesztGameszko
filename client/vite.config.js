import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import * as path from "path";

const returnPath = (dir) => path.resolve(process.cwd(), dir);

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/public',
  },
  resolve: {
    alias: {
      '@': returnPath('src'),
      '@node_modules/': returnPath('node_modules'),
      '@styles': returnPath('src/assets/styles'),
      '@components': returnPath('src/components'),
      '@ui': returnPath('src/components/ui')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler' // or "modern"
      }
    }
  }
})
