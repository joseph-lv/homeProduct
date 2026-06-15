<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import ProductsHero from '@/components/ProductsHero.vue'
import home3 from '@/assets/images/home3.png'
import home4 from '@/assets/images/home4.png'
import { RouterLink } from 'vue-router'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const heroImages = [home3, home4]
const activeIndex = ref(0)

let timer: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  timer = setInterval(() => {
    activeIndex.value = (activeIndex.value + 1) % heroImages.length
  }, 5000)
})

onUnmounted(() => {
  if (timer) clearInterval(timer)
})
</script>

<template>
  <div class="min-h-screen bg-white">
    <SiteHeader />
    <div class="relative overflow-hidden">
      <div class="pointer-events-none absolute inset-0" aria-hidden="true">
        <div
          v-for="(image, index) in heroImages"
          :key="index"
          class="absolute inset-0 transition-opacity duration-1000 ease-in-out"
          :class="index === activeIndex ? 'opacity-100' : 'opacity-0'"
          :style="{
            backgroundImage: `url(${image})`,
            backgroundSize: '100% 100%',
            backgroundRepeat: 'no-repeat',
          }"
        />
      </div>
      <div class="relative">
        <ProductsHero />
        <main id="main" class="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
          <p class="text-center text-lg text-text-secondary">
            {{ t('home.intro') }}
          </p>
          <div class="mt-8 flex justify-center">
            <RouterLink
              to="/products"
              class="inline-flex rounded bg-text-primary px-6 py-3 text-sm font-medium text-white no-underline hover:opacity-90"
            >
              {{ t('home.cta') }}
            </RouterLink>
          </div>
        </main>
      </div>
    </div>
    <SiteFooter />
  </div>
</template>
