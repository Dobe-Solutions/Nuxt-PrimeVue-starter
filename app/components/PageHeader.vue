<script setup lang="ts">
const { t } = useI18n();
const { locale, availableLocales } = useI18n();
const switchLocalePath = useSwitchLocalePath();
const localePath = useLocalePath();
const config = useRuntimeConfig();

const isMobileMenuOpen = ref(false);

const siteName = computed(() => config.public.siteName);

const menuItems = computed(() => [
  { label: t('pages.index.menu'), to: localePath('/') },
  { label: t('pages.contact.menu'), to: localePath('/contact') },
  { label: t('pages.legal.menu'), to: localePath('/legal') },
]);

const mobileMenuLabels = computed(() => ({
  menu: t('common.navigation.menu'),
  language: t('common.navigation.language'),
  toggleMenu: t('common.navigation.toggleMenu'),
  closeMenu: t('common.navigation.closeMenu'),
}));
</script>

<template>
  <header class="bg-primary-dark mb-auto text-white z-50">
    <div class="container mx-auto p-5 flex justify-between items-center">
      <NuxtLink to="/" class="text-2xl font-bold hover:text-primary-400 transition-colors">{{ siteName }}</NuxtLink>

      <nav class="hidden md:flex items-center space-x-6">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.label"
          :to="item.to"
          class="px-3 py-2 rounded-md text-sm font-medium hover:bg-primary-dark/70 hover:text-primary-accent transition-colors"
          active-class="bg-primary-light text-primary-dark"
        >
          {{ item.label }}
        </NuxtLink>
        <div class="text-white">
          <LanguageSelector />
        </div>
      </nav>

      <div class="md:hidden">
        <Button
          :icon="isMobileMenuOpen ? 'pi pi-times' : 'pi pi-bars'"
          text
          rounded
          :aria-label="isMobileMenuOpen ? mobileMenuLabels.closeMenu : mobileMenuLabels.toggleMenu"
          class="text-white hover:bg-gray-700"
          @click="isMobileMenuOpen = !isMobileMenuOpen"
        />
      </div>
    </div>

    <Drawer
      v-model:visible="isMobileMenuOpen"
      position="right"
      class="w-full bg-primary-dark text-white !border-0"
      :header="mobileMenuLabels.menu"
    >
      <nav class="flex flex-col space-y-3 mb-6">
        <NuxtLink
          v-for="item in menuItems"
          :key="item.label"
          :to="item.to"
          class="block px-3 py-2 text-base font-medium"
          active-class="bg-primary-light text-primary-dark"
          @click="isMobileMenuOpen = false"
        >
          {{ item.label }}
        </NuxtLink>
      </nav>

      <div>
        <h4 class="text-lg font-medium mb-3 text-white">{{ mobileMenuLabels.language }}</h4>
        <div class="flex flex-wrap gap-2">
          <button
            v-for="code in availableLocales"
            :key="code"
            type="button"
            :aria-label="t('common.navigation.language') + ' ' + code"
            :class="[
              'px-3 py-1.5 rounded-full text-sm font-medium transition-colors border',
              locale === code
                ? 'bg-primary-light text-primary-dark border-primary-light'
                : 'bg-primary-dark text-white border-primary-dark',
            ]"
            @click="
              navigateTo(switchLocalePath(code));
              isMobileMenuOpen = false;
            "
          >
            {{ code.toUpperCase() }}
          </button>
        </div>
      </div>
    </Drawer>
  </header>
</template>
