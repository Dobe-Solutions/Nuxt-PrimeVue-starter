<template>
  <div class="flex flex-col min-h-screen" style="--header-height: 64px; --footer-height: 56px">
    <PageHeader />
    <main class="flex-1 w-full max-w-7xl mx-auto p-4">
      <slot />
    </main>
    <PageFooter />
  </div>
</template>
