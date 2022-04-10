import { defineConfig } from "vite";
import { version } from './package.json'
import banner from 'vite-plugin-banner'

export default defineConfig({
    build: {
        lib: {
            entry: "./src/main.ts",
            formats: ['iife'],
            name: 'bundle.js'
        }
    },
    plugins: [
        banner(`/*!\n * Stil.js v${version}\n * Copyright (c) 2022 aparasolTree(Xu Le)\n * Released under the MIT License.\n*/`)
    ]
})