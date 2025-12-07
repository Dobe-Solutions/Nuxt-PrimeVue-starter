<script setup lang="ts">
const { locale } = useI18n();

const runtimeConfig = useRuntimeConfig();

useHead({
  htmlAttrs: {
    lang: locale,
  },
  titleTemplate(title) {
    return title ? `${title} - ${runtimeConfig.public.siteName}` : `${runtimeConfig.public.siteName}`;
  },
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
