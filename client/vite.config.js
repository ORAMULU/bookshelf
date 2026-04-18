import {
  defineConfig
} from 'vite'
import react from '@vitejs/plugin-react'
import {
  VitePWA
} from 'vite-plugin-pwa'

export default defineConfig( {
  base: "./",

  plugins: [
    react( {
      babel: {
        plugins: [
          [
            'babel-plugin-react-compiler',
            {
              target: '19',
            }]
        ]
      }
    }),

    VitePWA( {
      registerType: 'prompt',
      devOptions: {
        enabled: false
      },

      includeAssets: [
        'favicon.ico',
        'robots.txt',
        'apple-touch-icon.png'
      ],

      manifest: {
        name: 'BookShelf App',
        short_name: 'BookShelf',
        description: 'Your personal digital bookshelf — browse, read, and manage books even offline',

        theme_color: '#1a1210',
        background_color: '#f5e6d3',

        display: 'standalone',

        scope: '/bookshelf-app/',
        start_url: '/bookshelf-app/',

        orientation: 'portrait-primary',

        icons: [{
          src: '/bookshelf-app/logo192.png',
          sizes: '192x192',
          type: 'image/png'
        },
          {
            src: '/bookshelf-app/badge-icon.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any maskable'
          }]
      },

      workbox: {
        globPatterns: [
          '**/*.{js,css,html,ico,png,jpg,jpeg,svg,webp,json}'
        ],

        runtimeCaching: [{
          urlPattern: /\.(png|jpg|jpeg|webp|svg)$/,
          handler: 'CacheFirst',
          options: {
            cacheName: 'book-images',
            expiration: {
              maxEntries: 300,
              maxAgeSeconds: 60 * 60 * 24 * 60
            }
          }
        },
          {
            urlPattern: /\/api/,
            handler: 'NetworkFirst',
            options: {
              cacheName: 'api-cache',
              networkTimeoutSeconds: 10,
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 60 * 60 * 24 * 7
              }
            }
          }]
      }
    })
  ],

  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      '/images': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})