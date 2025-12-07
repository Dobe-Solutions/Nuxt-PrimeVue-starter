<script setup lang="ts">
const { t } = useI18n();

const currentYear = new Date().getFullYear();
const companyName = computed(() => t('common.companyName'));
const copyrightText = computed(() =>
  t('common.footer.copyright', {
    year: currentYear,
    company: companyName.value,
  }),
);
</script>

<template>
  <footer class="bg-primary-dark mt-auto text-white">
    <div class="mx-auto p-4 text-center text-primary-light">{{ copyrightText }}</div>
  </footer>
</template>
