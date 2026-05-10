<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'
import productsBg from '@/assets/images/products.png'

const { t } = useI18n()
const props = defineProps<{
  title?: string
}>()

const heading = computed(() => props.title || t('common.allProducts'))
</script>

<template>
  <section
    class="relative flex min-h-[200px] items-center justify-center overflow-hidden bg-stone-800 md:min-h-[260px]"
    aria-label="Page heading"
  >
    <div
      class="absolute inset-0 bg-cover bg-center"
      :style="{ backgroundImage: `url(${productsBg})` }"
    />
    <div class="absolute inset-0 bg-black/35 backdrop-blur-[2px]" />
    <h1
      class="relative z-10 px-4 text-center text-3xl font-semibold tracking-wide text-white md:text-4xl"
    >
      {{ heading }}
    </h1>
  </section>
</template>
