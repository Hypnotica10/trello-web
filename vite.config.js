import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: [
      { find: '~', replacement: '/src' },
      { find: '@boards', replacement: '/src/pages/boards' },
      { find: '@components', replacement: '/src/components' },
      { find: '@auth', replacement: '/src/pages/auth' },
      { find: '@utils', replacement: '/src/utils' },
      { find: '@assets', replacement: '/src/assets' },
      { find: '@apis', replacement: '/src/apis' },
    ]
  }
})
