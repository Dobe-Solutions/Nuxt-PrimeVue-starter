<script lang="ts" setup>
const { t } = useI18n();

function normalizePhone(raw: string) {
  return raw.replace(/[\s\-()]/g, '');
}

useHead({ title: t('pages.legal.title') });

const counterStore = useCounterStore();

onMounted(() => {
  counterStore.incrementLegalVisits();
});
</script>

<template>
  <div class="max-w-4xl mx-auto my-8">
    <div class="text-center mb-8">
      <h1 class="text-4xl font-bold text-primary mb-2">{{ t('pages.legal.title') }}</h1>
      <i18n-t keypath="pages.legal.visitCount" tag="p" scope="global" class="text-sm text-gray-500">
        <template #count>
          <span class="font-bold text-primary">{{ counterStore.legalPageVisits }}</span>
        </template>
      </i18n-t>
    </div>

    <div class="flex items-center gap-3 mb-6 p-4 border-l-4 rounded-md border-primary">
      <i class="pi pi-info-circle text-xl" />
      <div>
        <h3 class="font-semibold text-900 mb-1">{{ t('pages.legal.sections.lastUpdated') }}</h3>
        <p class="text-600 text-sm">{{ t('pages.legal.sections.lastUpdatedDate') }}</p>
      </div>
    </div>

    <Card class="mb-6 border border-surface-200">
      <template #content>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
          <!-- Company Name -->
          <div class="flex items-start gap-3">
            <i class="pi pi-tag text-primary mt-1" />
            <div>
              <label class="font-semibold text-900 block mb-1">{{ t('pages.legal.fields.companyName') }}</label>
              <p class="text-700">{{ t('pages.legal.values.companyName') }}</p>
            </div>
          </div>

          <!-- Address -->
          <div class="flex items-start gap-3">
            <i class="pi pi-map-marker text-primary mt-1" />
            <div>
              <label class="font-semibold text-900 block mb-1">{{ t('pages.legal.fields.address') }}</label>
              <p class="text-700 whitespace-pre-line">{{ t('pages.legal.values.address') }}</p>
            </div>
          </div>

          <!-- Phone Numbers -->
          <div class="flex items-start gap-3">
            <i class="pi pi-phone text-primary mt-1" />
            <div>
              <label class="font-semibold text-900 block mb-1">{{ t('pages.legal.fields.phone') }}</label>
              <div class="space-y-1">
                <template v-for="(phone, i) in t('pages.legal.values.phones').split('\n')" :key="i">
                  <a
                    :href="`tel:${normalizePhone(phone)}`"
                    class="text-primary hover:underline transition-colors block"
                    >{{ phone }}</a
                  >
                </template>
              </div>
            </div>
          </div>

          <!-- Email -->
          <div class="flex items-start gap-3">
            <i class="pi pi-envelope text-primary mt-1" />
            <div>
              <label class="font-semibold text-900 block mb-1">{{ t('pages.legal.fields.email') }}</label>
              <a
                :href="`mailto:${t('pages.legal.values.email')}`"
                class="text-primary hover:underline transition-colors"
              >
                {{ t('pages.legal.values.email') }}
              </a>
            </div>
          </div>

          <!-- Website -->
          <div class="flex items-start gap-3">
            <i class="pi pi-globe text-primary mt-1" />
            <div>
              <label class="font-semibold text-900 block mb-1">{{ t('pages.legal.fields.website') }}</label>
              <a
                :href="t('pages.legal.values.website')"
                target="_blank"
                rel="noopener noreferrer"
                class="text-primary hover:underline transition-colors"
              >
                {{ t('pages.legal.values.website') }}
                <i class="pi pi-external-link text-xs ml-1" />
              </a>
            </div>
          </div>

          <!-- Tax Code -->
          <div class="flex items-start gap-3">
            <i class="pi pi-id-card text-primary mt-1" />
            <div>
              <label class="font-semibold text-900 block mb-1">{{ t('pages.legal.fields.taxCode') }}</label>
              <p class="text-700">{{ t('pages.legal.values.taxCode') }}</p>
            </div>
          </div>

          <!-- Legal Representative -->
          <div class="flex items-start gap-3 md:col-span-2">
            <i class="pi pi-user text-primary mt-1" />
            <div>
              <label class="font-semibold text-900 block mb-1">{{ t('pages.legal.fields.legalRepresentative') }}</label>
              <p class="text-700">{{ t('pages.legal.values.legalRepresentative') }}</p>
            </div>
          </div>
        </div>
      </template>
    </Card>
  </div>
</template>
