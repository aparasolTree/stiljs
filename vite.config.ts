import { defineConfig } from "vite";

export default defineConfig({
    build: {
        lib: {
            entry: "./src/main.ts",
            formats: ['iife', "umd"],
            name: 'bundle.js'
        }
    }
})