<template>
  <div class="flex flex-col min-h-screen relative">
    <NuxtImg
      src="/background.jpg"
      alt=""
      class="pointer-events-none absolute inset-0 h-full w-full object-cover select-none"
    />
    <PageHeader class="relative z-10" />
    <main class="flex-1 w-full p-0 relative z-10">
      <slot />
    </main>
    <PageFooter class="relative z-10" />
  </div>
</template>
