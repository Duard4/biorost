import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vuetify from 'vite-plugin-vuetify'
import prerender from '@prerenderer/rollup-plugin'

export default defineConfig(async () => {
  // On Vercel the build image lacks the system shared libraries (libnspr4.so,
  // etc.) that Puppeteer's bundled Chrome needs. Use @sparticuz/chromium, a
  // self-contained Chromium built for serverless/Lambda, and point Puppeteer
  // at it. Locally we fall back to Puppeteer's own Chrome.
  let launchOptions = {
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--disable-dev-shm-usage',
    ],
  }
  if (process.env.VERCEL) {
    const { default: chromium } = await import('@sparticuz/chromium')
    launchOptions = {
      args: [...chromium.args, '--disable-dev-shm-usage'],
      executablePath: await chromium.executablePath(),
      headless: chromium.headless,
    }
  }

  return {
    plugins: [
      vue(),
      vuetify({ autoImport: true }),
      // Prerender the SPA to static HTML at build time so crawlers and AI
      // engines (which often don't execute JS) get fully-rendered content.
      // Runs only on `vite build`; dev/preview are unaffected.
      // Skip in CI if SKIP_PRERENDER=1 (e.g. fast preview builds).
      ...(process.env.SKIP_PRERENDER !== '1'
        ? [
            prerender({
              routes: ['/', '/products', '/maps', '/about', '/news', '/contacts'],
              renderer: '@prerenderer/renderer-puppeteer',
              rendererOptions: {
                // Lazy route chunks load after mount; give them time.
                // renderAfterTime is more reliable than element-exists on slow CI.
                renderAfterTime: 5000,
                timeout: 30000,
                headless: true,
                launchOptions,
              },
            }),
          ]
        : []),
    ],
  }
})
