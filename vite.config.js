import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    // Força o Vite a NÃO tentar otimizar ou mexer no supabase localmente, evitando o erro de import do tslib
    exclude: ['@supabase/supabase-js']
  }
});