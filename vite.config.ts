import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig(({  mode }) => {
  // Load env file based on mode
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [tailwindcss(), react()],
    
    resolve: {
      alias: {
        '@': resolve(__dirname, 'src')
      }
    },
    
    // Server configuration
    server: {
      port: 5173,
      open: true,
      host: true,
    },
    
    // Build configuration
    build: {
      outDir: `dist-${mode}`,
      sourcemap: mode !== 'production',
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom'],
            query: ['@tanstack/react-query'],
            ui: ['lucide-react'],
          },
        },
      },
    },
    
    // Preview configuration
    preview: {
      port: 4173,
      host: true,
    },
    
// Define environment variables
define: {
      __APP_ENV__: JSON.stringify(env.VITE_APP_ENV),
    },
  }
})