import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import VueI18nPlugin from "@intlify/unplugin-vue-i18n/vite";
import vuetify from "vite-plugin-vuetify";
import { fileURLToPath } from "node:url";
import { resolve, dirname } from "node:path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    // this plugin is imported for treeshaking -- small chunk size for build whenever its required
    vuetify({ autoImport: true }), // Enabled by default
    // added this vueI18nPlugin to define locales
    VueI18nPlugin({
      include: resolve(
        dirname(fileURLToPath(import.meta.url)),
        "./src/locales/*.js"
      ),
    }),
  ],
  server: {
    port: 3000,
}
})
