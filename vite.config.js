import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import prerender from '@prerenderer/rollup-plugin'

export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }),
    // Prerender the SPA to static HTML at build time so crawlers and AI
    // engines (which often don't execute JS) get fully-rendered content.
    // Runs only on `vite build`; dev/preview are unaffected.
    // Prerender the SPA to static HTML at build time so crawlers and AI
    // engines (which often don't execute JS) get fully-rendered content.
    // Skip in CI if SKIP_PRERENDER=1 (e.g. fast preview builds).
    ...(process.env.SKIP_PRERENDER !== "1"
      ? [
          prerender({
            routes: ["/"],
            renderer: "@prerenderer/renderer-puppeteer",
            rendererOptions: {
              // defineAsyncComponent chunks load after mount; give them time.
              // renderAfterTime is more reliable than element-exists on slow CI.
              renderAfterTime: 5000,
              timeout: 30000,
              headless: true,
              launchOptions: {
                args: [
                  "--no-sandbox",
                  "--disable-setuid-sandbox",
                  "--disable-dev-shm-usage",
                ],
              },
            },
          }),
        ]
      : []),
  ],
})
