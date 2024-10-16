import { defineConfig } from "vitepress";
import { fileURLToPath, URL } from "node:url";

export default defineConfig({
  vite: {
    resolve: {
      alias: {
        "vue-lib-starter": fileURLToPath(new URL("../../src", import.meta.url)),
      },
    },
  },
});
