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
                register: resolve(__dirname, "register.html"),
                login: resolve(__dirname, "login.html"),
                logout: resolve(__dirname, "logout.html"),
            },
        },
    },
});
