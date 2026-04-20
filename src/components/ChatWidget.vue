<script setup lang="ts">
import { ref } from 'vue'
import { useI18n } from '@/i18n'

const open = ref(false)
const message = ref('')
const { t } = useI18n()
</script>

<template>
  <div class="pointer-events-none fixed bottom-0 right-0 z-[60] flex flex-col items-end p-4 md:p-6">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="translate-y-2 opacity-0"
      enter-to-class="translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="translate-y-0 opacity-100"
      leave-to-class="translate-y-2 opacity-0"
    >
      <div
        v-show="open"
        class="pointer-events-auto mb-3 w-[min(100vw-2rem,340px)] rounded-lg border border-surface-border bg-white p-4 shadow-xl"
        role="dialog"
        :aria-label="t('chat.title')"
      >
        <p class="text-sm leading-relaxed text-text-primary">
          {{ t('chat.text') }}
          <a href="mailto:sales@lajtulipshouse.com" class="text-brand-blue underline">
            sales@lajtulipshouse.com
          </a>
          {{ t('chat.orCall') }}
          <a href="tel:+8618905209161" class="text-brand-blue underline">+86 18905209161</a>
          .
        </p>
        <label class="sr-only" for="chat-msg">{{ t('chat.message') }}</label>
        <textarea
          id="chat-msg"
          v-model="message"
          rows="3"
          :placeholder="t('chat.messagePlaceholder')"
          class="mt-3 w-full resize-none rounded border border-[#9b9b9b] px-3 py-2 text-sm outline-none"
        />
        <button
          type="button"
          class="mt-2 w-full rounded bg-brand-blue py-2 text-sm font-medium text-white hover:opacity-90"
        >
          {{ t('chat.send') }}
        </button>
      </div>
    </Transition>
    <button
      type="button"
      class="pointer-events-auto relative flex h-14 w-14 items-center justify-center rounded-full bg-brand-blue text-white shadow-lg hover:opacity-95"
      :aria-expanded="open"
      :aria-label="t('chat.open')"
      @click="open = !open"
    >
      <span class="absolute right-2 top-2 h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-brand-blue" />
      <svg class="h-7 w-7" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path
          d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"
        />
      </svg>
    </button>
  </div>
</template>
