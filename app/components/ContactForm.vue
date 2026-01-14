<template>
  <div class="max-w-2xl mx-auto my-4">
    <form class="space-y-8" @submit.prevent="handleSubmit">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FloatLabel>
          <InputText id="name" v-model="formData.name" class="w-full" required :invalid="!!errors.name" />
          <label for="name" class="font-semibold">{{ t('pages.contact.form.name') }}</label>
        </FloatLabel>

        <FloatLabel>
          <InputText
            id="email"
            v-model="formData.email"
            type="email"
            class="w-full"
            required
            :invalid="!!errors.email"
          />
          <label for="email" class="font-semibold">{{ t('pages.contact.form.email') }}</label>
        </FloatLabel>
      </div>

      <div class="w-full">
        <FloatLabel>
          <Textarea
            id="message"
            v-model="formData.message"
            class="w-full"
            rows="5"
            required
            :invalid="!!errors.message"
            auto-resize
          />
          <label for="message" class="font-semibold">{{ t('pages.contact.form.message') }}</label>
        </FloatLabel>
      </div>

      <div v-if="errorMessage || successMessage" class="space-y-3">
        <Message v-if="errorMessage" severity="error" :closable="false">
          {{ errorMessage }}
        </Message>
        <Message v-if="successMessage" severity="success" :closable="false">
          {{ successMessage }}
        </Message>
      </div>

      <div class="flex justify-center md:justify-end pt-4">
        <Button
          type="submit"
          :label="t('pages.contact.form.submitButton')"
          class="px-8 py-3 min-w-[160px]"
          :loading="isSubmitting"
          icon="pi pi-send"
          icon-pos="right"
        />
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
const { $posthog } = useNuxtApp();

const formData = reactive({
  name: '',
  email: '',
  message: '',
});

const errors = reactive({
  name: null,
  email: null,
  message: null,
});

const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null);
const successMessage = ref<string | null>(null);

const handleSubmit = async () => {
  isSubmitting.value = true;
  errorMessage.value = null;
  successMessage.value = null;

  const payload = {
    name: formData.name,
    email: formData.email,
    message: formData.message,
  };

  const { error } = await useFetch('/api/contact', {
    method: 'POST',
    body: payload,
  });

  if (error.value) {
    errorMessage.value = t('pages.contact.form.errorMessage');
  } else {
    successMessage.value = t('pages.contact.form.successMessage');

    formData.name = '';
    formData.email = '';
    formData.message = '';

    $posthog()?.capture('Contact Request', payload);
  }

  isSubmitting.value = false;
};
</script>
