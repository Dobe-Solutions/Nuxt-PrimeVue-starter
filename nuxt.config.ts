import Aura from '@primeuix/themes/aura';
import { definePreset, palette } from '@primeuix/themes';
import theme from 'tailwindcss/defaultTheme';

const appDomain = process.env.APP_DOMAIN || 'localhost:3000';

// color and theming setup
const mainColor = '#0075BC';
const colorPalette = palette(mainColor);
const primeVueThemePreset = definePreset(Aura, {
  semantic: {
    primary: colorPalette,
  },
});

export default defineNuxtConfig({
  compatibilityDate: 'latest',
  devtools: { enabled: process.env.NODE_ENV === 'development' },
  runtimeConfig: {
    public: {
      siteName: process.env.SITE_NAME || 'Nuxt PrimeVue Starter',
    },
  },
  app: {
    head: {
      meta: [{ name: 'viewport', content: 'width=device-width, initial-scale=1' }],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },
  sourcemap: {
    client: 'hidden',
  },
  nitro: {
    rollupConfig: {
      output: {
        sourcemapExcludeSources: false,
      },
    },
  },
  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@primevue/nuxt-module',
    '@nuxtjs/tailwindcss',
    '@nuxtjs/i18n',
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@vueuse/nuxt',
    '@posthog/nuxt',
    '@pinia/nuxt',
  ],
  image: {
    quality: 100,
    format: ['webp'],
    // screens options is defaulted to the same sizes as TailwindCSS is using
  },
  primevue: {
    options: {
      theme: {
        preset: primeVueThemePreset,
        options: {
          darkModeSelector: 'none',
        },
      },
    },
  },
  css: ['primeicons/primeicons.css'],
  tailwindcss: {
    config: {
      content: {
        files: ['app/**/*.{vue,js,ts}'],
      },
      theme: {
        extend: {
          colors: {
            primary: {
              DEFAULT: mainColor,
              light: colorPalette[100]!,
              dark: colorPalette[900]!,
              accent: '#E25C5C',
            },
          },
        },
        fontFamily: {
          sans: ['Roboto', ...theme.fontFamily.sans],
          serif: ['Newsreader', ...theme.fontFamily.serif],
        },
      },
    },
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', iso: 'en', name: 'English', file: 'en.json' },
      { code: 'de', iso: 'de', name: 'Deutsch', file: 'de.json' },
    ],
  },
  site: {
    url: `https://${appDomain}`,
    name: process.env.SITE_NAME || 'Nuxt PrimeVue Starter',
  },
  robots: {
    blockNonSeoBots: true,
  },
  posthogConfig: {
    publicKey: process.env.POSTHOG_PUBLIC_KEY || '',
    host: 'https://eu.i.posthog.com',
    clientConfig: {
      capture_exceptions: true,
    },
    serverConfig: {
      enableExceptionAutocapture: true,
    },
    sourcemaps: {
      enabled: true,
      envId: process.env.POSTHOG_ENV_ID || '',
      personalApiKey: process.env.POSTHOG_PRIVATE_API_KEY || '',
    },
  },
});
