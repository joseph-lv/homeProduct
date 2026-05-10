<script setup lang="ts">
import { RouterLink } from 'vue-router'

withDefaults(
  defineProps<{
    variant?: 'header' | 'footer'
  }>(),
  { variant: 'header' },
)
</script>

<template>
  <RouterLink
    to="/"
    class="brand-wordmark-link inline-flex max-w-full flex-wrap items-baseline gap-x-1.5 gap-y-0.5 no-underline transition-[opacity,filter] hover:opacity-90 focus-visible:rounded-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2"
    aria-label="CassieHome Tools — Home"
  >
    <span
      class="font-brand-wordmark bg-gradient-to-br from-stone-900 via-stone-800 to-amber-900 bg-clip-text font-semibold italic leading-none tracking-tight text-transparent drop-shadow-sm"
      :class="
        variant === 'footer'
          ? 'text-[2rem] sm:text-[2.25rem]'
          : 'text-[1.6rem] md:text-[1.85rem]'
      "
    >
      CassieHome
    </span>
    <span
      class="font-sans font-bold uppercase leading-none tracking-[0.22em] text-stone-700"
      :class="variant === 'footer' ? 'text-xs sm:text-sm' : 'text-[0.68rem] md:text-[0.72rem]'"
    >
      Tools
    </span>
  </RouterLink>
</template>
