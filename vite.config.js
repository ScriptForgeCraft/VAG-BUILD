import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  appType: "mpa",
  build: {
    rollupOptions: {
      input: {
        home: resolve(__dirname, "index.html"),
        am: resolve(__dirname, "am/index.html"),
        ru: resolve(__dirname, "ru/index.html"),
        en: resolve(__dirname, "en/index.html"),
      },
    },
  },
});
