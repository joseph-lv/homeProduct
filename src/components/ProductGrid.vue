<script setup lang="ts">
import { RouterLink } from 'vue-router'
import type { ProductItem } from '@/data/products'
import { useI18n } from '@/i18n'

defineProps<{
  items: ProductItem[]
}>()

const { t } = useI18n()
</script>

<template>
  <ul
    class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
  >
    <li v-for="p in items" :key="p.id" class="flex flex-col text-center">
      <RouterLink
        :to="p.href"
        class="block overflow-hidden rounded-sm bg-surface-muted"
        :aria-label="`${t('common.readMore')} ${p.title}`"
      >
        <img
          :src="p.image"
          :alt="p.title"
          class="aspect-square w-full object-cover transition duration-300 hover:scale-[1.02]"
          loading="lazy"
          width="675"
          height="675"
        />
      </RouterLink>
      <h2 class="mt-4 text-sm font-medium leading-snug text-text-primary">
        <RouterLink :to="p.href" class="text-text-primary no-underline hover:underline">
          {{ p.title }}
        </RouterLink>
      </h2>
      <RouterLink :to="p.href" class="btn-readmore mt-3">
        {{ t('common.readMore') }}
      </RouterLink>
    </li>
  </ul>
</template>
