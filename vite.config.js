// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, "index.html"),
                addStory: resolve(__dirname, "add-story.html"),
                profile: resolve(__dirname, "profile.html"),
            },
        },
    },
});
