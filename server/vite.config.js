import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const serverRoot = dirname(fileURLToPath(import.meta.url))
const workspaceRoot = resolve(serverRoot, '..')
const clientRoot = resolve(workspaceRoot, 'client')

export default defineConfig({
  root: clientRoot,
  plugins: [react()],
  resolve: {
    alias: {
      react: resolve(serverRoot, 'node_modules/react'),
      'react/jsx-runtime': resolve(serverRoot, 'node_modules/react/jsx-runtime.js'),
      'react/jsx-dev-runtime': resolve(serverRoot, 'node_modules/react/jsx-dev-runtime.js'),
      'react-dom': resolve(serverRoot, 'node_modules/react-dom'),
      'react-dom/client': resolve(serverRoot, 'node_modules/react-dom/client.js'),
      'react-router-dom': resolve(serverRoot, 'node_modules/react-router-dom'),
    },
  },
  server: {
    fs: {
      allow: [workspaceRoot],
    },
  },
  build: {
    outDir: resolve(serverRoot, 'dist'),
    emptyOutDir: true,
  },
})
