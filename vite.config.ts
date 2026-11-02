import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// base: './' — чтобы собранный сайт открывался из любой папки (в т.ч. GitHub Pages)
export default defineConfig({
  plugins: [react()],
  base: './',
});
