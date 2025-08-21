import tailwindcss from '@tailwindcss/vite';
import fs from 'fs'
import react from '@vitejs/plugin-react';
import path from 'path';
import laravel from 'laravel-vite-plugin';
import { resolve } from 'node:path';
import { defineConfig } from 'vite';

export default defineConfig({
    // server: {
    //     host: '0.0.0.0',
    //     port: 5173,
    //     strictPort: true,
    //     // JANGAN pakai `https: {...}` di sini
    //     hmr: {
    //       host: '192.168.101.242', // IP LAN kamu
    //       port: 5173,
    //       protocol: 'ws'
    //     }
    //   },
    plugins: [
        laravel({
            input: ['resources/js/app.tsx', 'resources/css/app.css'],
            ssr: 'resources/js/ssr.tsx',
            refresh: true,
        }),
        react(),
        tailwindcss(),
    ],
    esbuild: {
        jsx: 'automatic',
    },
    resolve: {
        alias: {
            'ziggy-js': resolve(__dirname, 'vendor/tightenco/ziggy'),
            // '@': path.resolve(__dirname, 'resources/js'),
        },
    },
    server: {
        host: '0.0.0.0',
        port: 5173,
        hmr: { host: '192.168.101.242' } // ganti IP LAN kamu
    }
});
