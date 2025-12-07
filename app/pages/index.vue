<script lang="ts" setup>
definePageMeta({ layout: 'home' });
const { t } = useI18n();
const { x, y } = useMouse();
const { width, height } = useWindowSize();

// parallax effect
const logoStyle = computed(() => {
  if (width.value === 0 || height.value === 0) return {};

  const dx = (x.value - width.value / 2) / width.value;
  const dy = (y.value - height.value / 2) / height.value;

  return {
    transform: `translate(${dx * 50}px, ${dy * 50}px)`,
    transition: 'transform 0.2s ease-out',
  };
});

useHead({
  title: t('pages.index.title'),
});
</script>

<template>
  <section class="relative overflow-hidden min-h-[calc(100vh-var(--header-height)-var(--footer-height))]">
    <div class="relative mx-auto max-w-6xl px-4 py-8 md:py-16">
      <div class="text-center mb-16">
        <div class="flex items-center justify-center flex-col gap-6 mb-16" :style="logoStyle">
          <NuxtImg src="/nuxt.svg" alt="Nuxt" class="h-12 w-auto" />
          <span class="text-3xl font-light text-primary-dark/40">+</span>
          <NuxtImg src="/primevue.svg" alt="PrimeVue" class="h-12 w-auto" />
        </div>
        <p class="uppercase tracking-wider text-sm font-semibold text-primary-accent mb-3">
          {{ t('pages.index.hero.eyebrow') }}
        </p>
        <h1 class="text-4xl md:text-5xl font-extrabold leading-tight text-primary-dark mb-6 whitespace-pre-line">
          {{ t('pages.index.hero.headline') }}
        </h1>
        <p class="max-w-3xl mx-auto text-lg md:text-xl text-primary-dark/80 mb-8">
          {{ t('pages.index.hero.subheadline') }}
        </p>
      </div>
      <h2 class="text-2xl font-bold text-center text-primary-dark mb-8">
        {{ t('pages.index.hero.features.headline') }}
      </h2>

      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        <div
          v-for="featureKey in ['tailwind', 'i18n', 'pinia', 'seo', 'fonts', 'image', 'posthog', 'vueuse']"
          :key="featureKey"
          class="p-5 rounded-lg border border-primary-light/60 bg-white shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 class="font-semibold text-primary-dark mb-2 text-lg">
            {{ t(`pages.index.hero.features.${featureKey}.title`) }}
          </h3>
          <p class="text-sm text-primary-dark/70">
            {{ t(`pages.index.hero.features.${featureKey}.desc`) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
