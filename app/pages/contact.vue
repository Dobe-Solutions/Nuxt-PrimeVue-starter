<script lang="ts" setup>
const { t } = useI18n();

useHead({
  title: t('pages.contact.title'),
});
</script>

<template>
  <div class="max-w-4xl mx-auto my-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-primary mb-2">{{ t('pages.contact.title') }}</h1>
      <p class="text-600 text-lg">{{ t('pages.contact.description') }}</p>
    </div>

    <Card class="border border-surface-200">
      <template #content>
        <ContactForm />
      </template>
    </Card>
  </div>
</template>
