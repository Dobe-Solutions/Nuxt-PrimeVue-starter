<script setup lang="ts">
import type { NuxtError } from '#app';

defineOptions({
  name: 'AppError',
});

defineProps({
  error: {
    type: Object as () => NuxtError,
    default: () => ({ statusCode: 500, message: 'Internal server error' }),
  },
});
</script>

<template>
  <div>
    <h1>{{ error.statusCode }}</h1>
    <NuxtLink to="/">Go back home</NuxtLink>
  </div>
</template>
