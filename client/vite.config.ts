import {defineConfig} from 'vite'
import react from '@vitejs/plugin-react'
import svgx from "@svgx/vite-plugin-react";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(), svgx()],
    resolve: {
        alias: {
            "@": "/src",

            "@styles": "/src/app/styles",

            "@app": "/src/app",

            "@pages": "/src/pages",

            "@shared": "/src/shared",

            "@assets": "/src/shared/assets",

            "@widgets": "/src/widgets",


            "@features": "/src/features",

            "@entities": "/src/entities",
        }
    }
})
