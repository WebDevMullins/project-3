import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react()],
	resolve: {
		alias: {
			'@': '/src/',
			'@components': '/src/components',
			'@utils': '/src/utils'
		}
	},
	server: {
		port: 3000,
		open: true,
		proxy: {
			'/graphql': {
				target: 'http://localhost:3001',
				secure: false,
				changeOrigin: true
			},
			'/api': 'http://localhost:3001'
		}
	}
})
