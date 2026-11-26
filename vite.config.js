import { cpSync } from 'node:fs';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'copy-legacy-app-assets',
      apply: 'build',
      closeBundle() {
        const outputDirectory = resolve(process.cwd(), 'dist');
        cpSync(resolve(process.cwd(), 'js'), resolve(outputDirectory, 'js'), { recursive: true });
        cpSync(resolve(process.cwd(), 'assets'), resolve(outputDirectory, 'assets'), { recursive: true });
      }
    }
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), 'index.html'),
        login: resolve(process.cwd(), 'login.html'),
        dashboard: resolve(process.cwd(), 'dashboard.html')
      }
    }
  }
});
