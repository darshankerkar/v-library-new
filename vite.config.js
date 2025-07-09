import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite'; 

export default defineConfig({
  base: '/v-library-new/', // <-- Add this line for GitHub Pages
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    historyApiFallback: true,
  },
});

