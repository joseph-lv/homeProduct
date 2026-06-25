<script setup lang="ts">
import { computed, ref } from 'vue'
import { RouterLink } from 'vue-router'
import SiteHeader from '@/components/SiteHeader.vue'
import SiteFooter from '@/components/SiteFooter.vue'
import { useI18n } from '@/i18n'
import productsBg from '@/assets/images/products.png'

const { t } = useI18n()

const contactApiUrl = (import.meta.env.VITE_CONTACT_API_URL ?? '').trim()

const name = ref('')
const company = ref('')
const email = ref('')
const message = ref('')
const submitting = ref(false)
const status = ref<'idle' | 'success' | 'error'>('idle')

const apiConfigured = computed(() => Boolean(contactApiUrl))

async function onSubmit() {
  if (!apiConfigured.value) return
  submitting.value = true
  status.value = 'idle'
  try {
    const res = await fetch(contactApiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value.trim(),
        company: company.value.trim(),
        email: email.value.trim(),
        message: message.value.trim(),
      }),
    })
    const data = (await res.json().catch(() => ({}))) as { ok?: boolean }
    if (!res.ok || !data.ok) {
      status.value = 'error'
      return
    }
    status.value = 'success'
    name.value = ''
    company.value = ''
    email.value = ''
    message.value = ''
  } catch {
    status.value = 'error'
  } finally {
    submitting.value = false
  }
}
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

          <div class="mt-6 space-y-3 text-sm text-text-secondary">
            <p>
              <a href="mailto:cassiezhangsmile@gmail.com" class="hover:text-text-primary">
                📧 cassiezhangsmile@gmail.com
              </a>
            </p>
            <p>
              <a href="tel:+8618649914849" class="hover:text-text-primary">
                📞 +86 18649914849
              </a>
            </p>
            <p>🕒 {{ t('contact.officeHoursValue') }}</p>
          </div>
        </div>

        <div class="rounded-xl border border-surface-border bg-white p-6">
          <h2 class="text-xl font-semibold text-text-primary">{{ t('contact.formTitle') }}</h2>

          <p v-if="!apiConfigured" class="mt-3 text-sm leading-relaxed text-amber-900/90">
            {{ t('contact.formNotConfigured') }}
          </p>

          <p
            v-else-if="status === 'success'"
            class="mt-3 text-sm font-medium text-green-800"
            role="status"
          >
            {{ t('contact.sent') }}
          </p>
          <p
            v-else-if="status === 'error'"
            class="mt-3 text-sm font-medium text-red-800"
            role="alert"
          >
            {{ t('contact.sendFailed') }}
          </p>

          <form class="mt-5 grid gap-4" @submit.prevent="onSubmit">
            <div class="grid gap-4 sm:grid-cols-2">
              <label class="text-sm text-text-secondary">
                {{ t('contact.name') }}
                <input
                  v-model="name"
                  name="name"
                  type="text"
                  required
                  maxlength="200"
                  autocomplete="name"
                  :disabled="submitting || !apiConfigured"
                  :placeholder="t('contact.yourName')"
                  class="mt-1 w-full rounded border border-[#9b9b9b] px-3 py-2 text-sm outline-none disabled:opacity-60"
                />
              </label>
              <label class="text-sm text-text-secondary">
                {{ t('contact.company') }}
                <input
                  v-model="company"
                  name="company"
                  type="text"
                  maxlength="200"
                  autocomplete="organization"
                  :disabled="submitting || !apiConfigured"
                  :placeholder="t('contact.companyName')"
                  class="mt-1 w-full rounded border border-[#9b9b9b] px-3 py-2 text-sm outline-none disabled:opacity-60"
                />
              </label>
            </div>
            <label class="text-sm text-text-secondary">
              {{ t('contact.email') }}
              <input
                v-model="email"
                name="email"
                type="email"
                required
                maxlength="320"
                autocomplete="email"
                :disabled="submitting || !apiConfigured"
                :placeholder="t('contact.yourEmail')"
                class="mt-1 w-full rounded border border-[#9b9b9b] px-3 py-2 text-sm outline-none disabled:opacity-60"
              />
            </label>
            <label class="text-sm text-text-secondary">
              {{ t('contact.message') }}
              <textarea
                v-model="message"
                name="message"
                rows="6"
                required
                maxlength="20000"
                :disabled="submitting || !apiConfigured"
                :placeholder="t('contact.messagePlaceholder')"
                class="mt-1 w-full resize-y rounded border border-[#9b9b9b] px-3 py-2 text-sm outline-none disabled:opacity-60"
              />
            </label>
            <button
              type="submit"
              :disabled="submitting || !apiConfigured"
              class="inline-flex w-fit items-center rounded bg-text-primary px-6 py-2.5 text-sm font-medium text-white transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {{ submitting ? t('contact.submitting') : t('contact.submit') }}
            </button>
          </form>
        </div>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
