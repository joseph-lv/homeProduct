<script setup lang="ts">
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import ProductsHero from '@/components/ProductsHero.vue'
import { RouterLink } from 'vue-router'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-white">
    <SiteHeader />
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
    <SiteFooter />
  </div>
</template>
