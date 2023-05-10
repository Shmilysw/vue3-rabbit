import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue()],
    resolve: {
        // 实际的路径转化 @ -> src  alias : 别名虚拟
        alias: {
            '@': fileURLToPath(new URL('./src', import.meta.url))
        }
    }
})
