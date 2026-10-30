import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import { bunny } from 'laravel-vite-plugin/fonts';
//import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: './',
    build: {
            chunkSizeWarningLimit: 3000,
            rollupOptions: {
                output: {
                    // Set fixed names for entry files, chunks, and general assets
                    entryFileNames: `assets/[name].[hash].js`,
                    chunkFileNames: `assets/[name]-chunk.[hash].js`,
                    assetFileNames: `assets/[name].[hash].[ext]`,
                }
            }
    },
    plugins: [
        laravel({
            input: ['resources/css/app.css', 'resources/js/app.jsx'],
            refresh: true,
            fonts: [
                bunny('Instrument Sans', {
                    weights: [400, 500, 600],
                }),
            ],
        }),
        react(),
        //tailwindcss(),
    ],
    server: {
        cors: true, // This is equivalent to origin: '*'
        host: '0.0.0.0', //allow all network interfaces
        //https: true,
        //host: 'untrumpeted-charmingly-freddy.ngrok-free.dev',
        allowedHosts: ['untrumpeted-charmingly-freddy.ngrok-free.dev','jemosistemas-domain.com'],
        watch: {
            ignored: ['**/storage/framework/views/**'],
        },
        hmr:{
           //port:80,
           //clientPort:80,
           host: ['jemosistemas-domain.com'], //allow listen by this domains
        }
        // hmr: {
        //      host: ['jemosistemas-domain.com'], //allow listem by this domains
        // },
    },
});
