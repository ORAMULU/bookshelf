import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'
import {
  VitePWA
} from 'vite-plugin-pwa'

export default defineConfig( {
  plugins: [
    react( {
      babel: {
        plugins: [
          ['babel-plugin-react-compiler', {
            // Optional config (recommended for most apps)
            target: '19', // or '18' if you're not on React 19 yet
            // compilationMode: 'annotation', // Use this if you want to opt-in per component with /* @react.compiler */
          }]
        ]
      }
    }),
    VitePWA( {
      registerType: 'prompt',
      devOptions: {
        enabled: false
      },

      includeAssets: ['favicon.ico', 'robots.txt', 'apple-touch-icon.png'],

      manifest: {
        name: 'BookShelf App',
        short_name: 'BookShelf',
        description: 'Your personal digital bookshelf — browse, read, and manage books even offline',
        theme_color: '#1f2937',
        background_color: '#f8fafc',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        orientation: 'portrait-primary',
        icons: [{
          src: '/pwa-192x192.png', sizes: '192x192', type: 'image/png'
        },
          {
            src: '/pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable'
          }]
      },

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,json}'],

        runtimeCaching: [{
          urlPattern: /\.(png|jpg|jpeg|webp|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'book-images',
            expiration: {
              maxEntries: 300, maxAgeSeconds: 5184000
            } // \~60 days
          }
        },
          {
            urlPattern: /^\/api/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 100, maxAgeSeconds: 604800
              } // 7 days
            }
          }],

        //navigateFallback: '/offline.html',
        //navigateFallbackDenylist: [/^\/api/]
      }
    })
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000', changeOrigin: true
      },
      '/images': {
        target: 'http://localhost:3000', changeOrigin: true
      }
    }
  }
});