<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { useI18n } from '@/i18n'
import productsBg from '@/assets/images/products.png'
import aboutUs from '@/assets/images/aboutUs.png'

const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-white">
    <SiteHeader />

    <section class="relative min-h-[220px] overflow-hidden md:min-h-[280px]">
      <div
        class="absolute inset-0 bg-cover bg-center"
        :style="{ backgroundImage: `url(${productsBg})` }"
      />
      <div class="absolute inset-0 bg-black/45" />
      <div class="relative mx-auto flex h-full min-h-[220px] max-w-7xl items-center px-4 md:min-h-[280px] md:px-6 lg:px-8">
        <div>
          <p class="text-sm tracking-[0.2em] text-white/85">{{ t('about.heroTag') }}</p>
          <h1 class="mt-2 text-3xl font-semibold text-white md:text-5xl">{{ t('about.title') }}</h1>
        </div>
      </div>
    </section>

    <main id="main" class="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
      <nav class="mb-10 text-sm text-text-secondary" aria-label="Breadcrumb">
        <RouterLink to="/" class="text-text-secondary no-underline hover:text-text-primary">{{ t('common.home') }}</RouterLink>
        <span class="mx-1">/</span>
        <span class="text-text-primary">{{ t('common.aboutUs') }}</span>
      </nav>

      <section class="max-w-3xl">
        <h2 class="text-2xl font-semibold text-text-primary md:text-3xl">{{ t('about.heading') }}</h2>
        <p class="mt-4 leading-relaxed text-text-secondary">
          {{ t('about.p1') }}
        </p>
        <p class="mt-4 leading-relaxed text-text-secondary">
          {{ t('about.p2') }}
        </p>
        <p class="mt-4 leading-relaxed text-text-secondary">
          {{ t('about.p3') }}
        </p>
        <p class="mt-4 leading-relaxed text-text-secondary">
          {{ t('about.p4') }}
        </p>
      </section>
      <div :style="{ backgroundImage: `url(${aboutUs})` }"> </div>
    </main>

    <SiteFooter />
  </div>
</template>
