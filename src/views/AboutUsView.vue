<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()
</script>

<template>
  <div class="min-h-screen bg-white">
    <SiteHeader />

    <section class="relative min-h-[220px] overflow-hidden md:min-h-[280px]">
      <div
        class="absolute inset-0 bg-cover bg-center"
        style="
          background-image: url('https://images.unsplash.com/photo-1604335399105-a0c585fd81a1?auto=format&fit=crop&w=1920&q=80');
        "
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

      <section class="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <h2 class="text-2xl font-semibold text-text-primary md:text-3xl">{{ t('about.heading') }}</h2>
          <p class="mt-4 leading-relaxed text-text-secondary">
            {{ t('about.p1') }}
          </p>
          <p class="mt-4 leading-relaxed text-text-secondary">
            {{ t('about.p2') }}
          </p>
        </div>

        <div class="rounded-xl border border-surface-border bg-[#fafafa] p-6">
          <h3 class="text-lg font-semibold text-text-primary">{{ t('about.factsTitle') }}</h3>
          <ul class="mt-4 m-0 list-none space-y-3 p-0 text-sm text-text-secondary">
            <li class="flex items-start gap-2"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-text-primary" />{{ t('about.fact1') }}</li>
            <li class="flex items-start gap-2"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-text-primary" />{{ t('about.fact2') }}</li>
            <li class="flex items-start gap-2"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-text-primary" />{{ t('about.fact3') }}</li>
            <li class="flex items-start gap-2"><span class="mt-1 h-1.5 w-1.5 rounded-full bg-text-primary" />{{ t('about.fact4') }}</li>
          </ul>
        </div>
      </section>

      <section class="mt-14 grid gap-6 md:grid-cols-3">
        <article class="rounded-lg border border-surface-border p-5">
          <h3 class="text-base font-semibold text-text-primary">{{ t('about.missionTitle') }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-text-secondary">
            {{ t('about.missionBody') }}
          </p>
        </article>
        <article class="rounded-lg border border-surface-border p-5">
          <h3 class="text-base font-semibold text-text-primary">{{ t('about.visionTitle') }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-text-secondary">
            {{ t('about.visionBody') }}
          </p>
        </article>
        <article class="rounded-lg border border-surface-border p-5">
          <h3 class="text-base font-semibold text-text-primary">{{ t('about.promiseTitle') }}</h3>
          <p class="mt-2 text-sm leading-relaxed text-text-secondary">
            {{ t('about.promiseBody') }}
          </p>
        </article>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
