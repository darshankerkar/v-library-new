import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; 

export default defineConfig({
  base: '/', // <-- Add this line for GitHub Pages
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    historyApiFallback: true,
  },
});

