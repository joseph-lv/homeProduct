<script setup lang="ts">
import { RouterLink } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { useI18n } from '@/i18n'
import productsBg from '@/assets/images/products.png'

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
          <p class="text-sm tracking-[0.2em] text-white/85">{{ t('contact.heroTag') }}</p>
          <h1 class="mt-2 text-3xl font-semibold text-white md:text-5xl">{{ t('contact.title') }}</h1>
        </div>
      </div>
    </section>

    <main id="main" class="mx-auto max-w-7xl px-4 py-12 md:px-6 lg:px-8">
      <nav class="mb-10 text-sm text-text-secondary" aria-label="Breadcrumb">
        <RouterLink to="/" class="text-text-secondary no-underline hover:text-text-primary">{{ t('common.home') }}</RouterLink>
        <span class="mx-1">/</span>
        <span class="text-text-primary">{{ t('common.contactUs') }}</span>
      </nav>

      <section class="grid gap-8 lg:grid-cols-[1fr_1.1fr]">
        <div class="rounded-xl border border-surface-border bg-[#fafafa] p-6">
          <h2 class="text-xl font-semibold text-text-primary">{{ t('contact.getInTouch') }}</h2>
          <p class="mt-3 text-sm leading-relaxed text-text-secondary">
            {{ t('contact.intro') }}
          </p>

          <div class="mt-6 space-y-4 text-sm text-text-secondary">
            <div>
              <p class="text-xs uppercase tracking-wide text-text-primary">{{ t('contact.email') }}</p>
              <a href="mailto:cassiezhangsmile@gmail.com" class="mt-1 inline-block hover:text-text-primary">
                cassiezhangsmile@gmail.com
              </a>
            </div>
            <!-- Phone / WhatsApp — enable when ready
            <div>
              <p class="text-xs uppercase tracking-wide text-text-primary">{{ t('contact.phone') }}</p>
              <a href="tel:+8618905209161" class="mt-1 inline-block hover:text-text-primary">+86 18905209161</a>
            </div>
            -->
            <div>
              <p class="text-xs uppercase tracking-wide text-text-primary">{{ t('contact.officeHours') }}</p>
              <p class="mt-1">{{ t('contact.officeHoursValue') }}</p>
            </div>
          </div>
        </div>

        <div class="rounded-xl border border-surface-border bg-white p-6">
          <h2 class="text-xl font-semibold text-text-primary">{{ t('contact.formTitle') }}</h2>
          <form class="mt-5 grid gap-4" @submit.prevent>
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="text-sm text-text-secondary">
                {{ t('contact.name') }}
                <input
                  type="text"
                  :placeholder="t('contact.yourName')"
                  class="mt-1 w-full rounded border border-[#9b9b9b] px-3 py-2 text-sm outline-none"
                />
              </label>
              <label class="text-sm text-text-secondary">
                {{ t('contact.company') }}
                <input
                  type="text"
                  :placeholder="t('contact.companyName')"
                  class="mt-1 w-full rounded border border-[#9b9b9b] px-3 py-2 text-sm outline-none"
                />
              </label>
            </div>
            <label class="text-sm text-text-secondary">
              {{ t('contact.email') }}
              <input
                type="email"
                :placeholder="t('contact.yourEmail')"
                class="mt-1 w-full rounded border border-[#9b9b9b] px-3 py-2 text-sm outline-none"
              />
            </label>
            <label class="text-sm text-text-secondary">
              {{ t('contact.message') }}
              <textarea
                rows="6"
                :placeholder="t('contact.messagePlaceholder')"
                class="mt-1 w-full resize-y rounded border border-[#9b9b9b] px-3 py-2 text-sm outline-none"
              />
            </label>
            <button
              type="submit"
              class="inline-flex w-fit items-center rounded bg-text-primary px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90"
            >
              {{ t('contact.submit') }}
            </button>
          </form>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
