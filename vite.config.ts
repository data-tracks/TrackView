import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import tailwindcss from "@tailwindcss/vite";
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        tailwindcss(),
        vue(),
        vueDevTools()
    ],
    resolve: {
        alias: {
            '@protocol': path.resolve(__dirname, 'external/flatbuffers/generated/ts/src'), // Ensure this line is correct
            '@': path.resolve(__dirname, 'src')
        },
    },
})
