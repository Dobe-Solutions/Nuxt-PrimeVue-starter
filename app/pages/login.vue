<script setup lang="ts">
import { ref } from 'vue';

const { t } = useI18n();
const { $posthog } = useNuxtApp();

useHead(() => ({
  title: t('pages.login.title'),
}));

const email = ref('');
const password = ref('');

const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const handleSubmit = async () => {
  if (isSubmitting.value) return;

  isSubmitting.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  try {
    const result = await $fetch<{ success: boolean; email?: string }>('/api/login', {
      method: 'POST',
      body: {
        email: email.value,
        password: password.value,
      },
    });

    if (!result?.success) {
      errorMessage.value = t('pages.login.form.errorMessage');
      return;
    }

    const posthog = $posthog?.();
    posthog?.set_config({
      persistence: 'localStorage+cookie',
      disable_cookie: false,
    });
    posthog?.identify(email.value, { email: email.value });

    password.value = '';
    successMessage.value = t('pages.login.form.successMessage');
  } catch {
    errorMessage.value = t('pages.login.form.errorMessage');
  } finally {
    isSubmitting.value = false;
  }
};
</script>

<template>
  <div class="max-w-md mx-auto my-10">
    <Card class="border border-surface-200">
      <template #title>
        <h1 class="text-2xl font-bold text-primary">{{ t('pages.login.title') }}</h1>
      </template>
      <template #content>
        <Message severity="info" :closable="false" class="mb-8">
          {{ t('pages.login.hint', { email: 'info@dobe-solutions.vn' }) }}
        </Message>

        <form class="space-y-8" @submit.prevent="handleSubmit">
          <FloatLabel>
            <InputText id="email" v-model="email" type="email" class="w-full" required autocomplete="email" />
            <label for="email" class="font-semibold">{{ t('pages.login.form.email') }}</label>
          </FloatLabel>

          <FloatLabel>
            <InputText
              id="password"
              v-model="password"
              type="password"
              class="w-full"
              required
              autocomplete="current-password"
            />
            <label for="password" class="font-semibold">{{ t('pages.login.form.password') }}</label>
          </FloatLabel>

          <Message v-if="successMessage" severity="success" :closable="false" class="mb-6">
            {{ successMessage }}
          </Message>
          <Message v-if="errorMessage" severity="error" :closable="false">
            {{ errorMessage }}
          </Message>

          <div class="flex justify-end">
            <Button
              type="submit"
              :label="t('pages.login.form.submitButton')"
              class="px-8 py-3 min-w-[160px]"
              :loading="isSubmitting"
            />
          </div>
        </form>
      </template>
    </Card>
  </div>
</template>
