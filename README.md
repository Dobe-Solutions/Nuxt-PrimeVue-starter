# Nuxt PrimeVue Starter

A basic Nuxt 4 starter focused on accessibility, internationalization, theming, and rapid UI development with PrimeVue.

## Core Application Libraries
| Library / Module | Purpose | Notes |
|------------------|---------|-------|
| **TailwindCSS** (`@nuxtjs/tailwindcss`) | Utility-first CSS styling | Extended with custom primary + accent colors and fonts. |
| **Fonts Module** (`@nuxt/fonts`) | Efficient font loading & preloading | Supplies Roboto & Newsreader families. |
| **Nuxt Image** (`@nuxt/image`) | Optimized responsive images | Automatic format conversion + size hints. |
| **vue-i18n / Nuxt i18n** (`@nuxtjs/i18n`) | Localization & translation management | Locale files in `i18n/locales/`. Dynamic route generation. |
| **PostHog Analytics** (`@posthog/nuxt`) | Product analytics & error tracking | Event tracking, session replay, and feature flags. |
| **Sitemap** (`@nuxtjs/sitemap`) | Automated sitemap generation | Uses `site.url` & localized routes. |
| **Robots** (`@nuxtjs/robots`) | robots.txt management + bot filtering | Non‑SEO bots optionally blocked. |
| **VueUse** (`@vueuse/nuxt`) | Utility composables (debounce, device, etc.) | Add reactive helpers without boilerplate. |
| **Pinia** (`pinia`) | State management | For global stores and state management. |
| **ESLint / Prettier** | Code quality & formatting | Configured via `@nuxt/eslint`, Prettier synergy. |
| **Wrangler** (`wrangler`) | Cloudflare Workers tooling (deploy target) | Enables edge/serverless deploy strategies. |

## Theming & Design System
PrimeVue theme generation combines `@primeuix/themes` palette utilities and Tailwind’s extended color scale:
- Set base primary color and automatically generates color palette based on it
- TailwindCSS as base extended with `primary.light`, `primary.dark`, and `primary.accent`

Global fonts are injected via `@nuxt/fonts` (Roboto sans + Newsreader serif). Aura preset dark mode is disabled by default (`darkModeSelector: 'none'`).

## Internationalization (i18n)
Configured in `nuxt.config.ts`:
- Default locale: `en`
- Locale files location: `i18n/locales/`

Usage patterns:
```vue
const { t, locale, availableLocales } = useI18n();
t('pages.index.hero.headline');
```
Active locale selection is exposed via drawer language pills in `PageHeader.vue`.

## Images
All images use Nuxt Image for optimization (webp formats, quality=100). Use `<NuxtImg>` with local providers for automatic sizing.

## Analytics (PostHog)
Example for custom events:
```ts
const { $posthog } = useNuxtApp();
$posthog()?.capture('contact_form_submit', { status: 'success' });
```
Configured with autocapture and exception tracking enabled.

## SEO & Meta
- `@nuxtjs/sitemap` auto-generates sitemap from routes & locales.
- `@nuxtjs/robots` produces a dynamic robots.txt and can block non-SEO bots.
- Head tags managed via Nuxt app config (`app.head`) and Unhead integration.

## State Management (Optional)
Create stores under `app/stores/` and import via:
```ts
const counterStore = useCounterStore();
counterStore.incrementLegalVisits();
```
A default `counter` store is included in `app/stores/counter.ts` tracking legal page visits.

## Utility Composables
`@vueuse/nuxt` gives access to hundreds of helpers (e.g., `useDark`, `useWindowSize`, `useDebounceFn`). Import on demand to keep bundle lean (Nuxt handles auto-treeshaking).

## Environment Variables
| Variable | Purpose |
|----------|---------|
| `APP_DOMAIN` | Public domain used for `site.url`, analytics domain matching |
| `SITE_NAME` | Branding name surfaced in header & meta config |
| `POSTHOG_PUBLIC_KEY` | PostHog public API key |
| `POSTHOG_ENV_ID` | PostHog environment ID for sourcemaps |
| `POSTHOG_PRIVATE_API_KEY` | PostHog private API key for sourcemaps |

## Development Scripts
```fish
npm install          # Install dependencies
npm run dev          # Start local dev server
npm run build        # Production build
npm run preview      # Preview production build locally
npm run generate     # Static site generation (hybrid pages)
```

## Quality & Formatting
ESLint + Prettier ensure consistent style. Run `npx eslint .` to lint. Format via `npx prettier . --write`.

## Deployment Notes
Nuxt (Nitro) can target many platforms (Node, Edge, Workers). `wrangler` is available if deploying to Cloudflare Workers. Adjust `site.url` + environment values per environment.
