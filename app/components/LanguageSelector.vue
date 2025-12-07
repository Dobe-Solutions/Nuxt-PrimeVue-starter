<script setup lang="ts">
const { locale, availableLocales } = useI18n();
const nuxtApp = useNuxtApp();

const selectedLanguage = computed<(typeof availableLocales)[number]>({
  get: () => locale.value,
  set: (newLocale) => {
    nuxtApp.$i18n.setLocale(newLocale);
  },
});

const languageOptions = computed(() =>
  availableLocales.map((languageOption) => ({
    label: languageOption.toUpperCase(),
    value: languageOption,
  })),
);
</script>

<template>
  <Select v-model="selectedLanguage" :options="languageOptions" option-label="label" option-value="value" />
</template>
