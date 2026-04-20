<script setup lang="ts">
import { computed } from 'vue'
import { useI18n, type Locale, setLocale } from '@/i18n'

const { locale, t } = useI18n()

const currentLabel = computed(() => (locale.value === 'zh' ? t('common.chinese') : t('common.english')))

function choose(value: Locale) {
  setLocale(value)
}
</script>

<template>
  <div class="group relative">
    <div class="flex items-center gap-0.5">
      <span class="nav-link">{{ currentLabel }}</span>
      <button
        type="button"
        class="flex h-6 w-6 items-center justify-center rounded border-0 bg-transparent p-0 text-text-primary outline-none ring-0 hover:text-black focus-visible:ring-1 focus-visible:ring-surface-border"
        :aria-label="t('common.language')"
        aria-expanded="false"
        tabindex="-1"
      >
        <svg class="h-3 w-3 transition group-hover:rotate-180" viewBox="0 0 12 12" fill="none" aria-hidden="true">
          <path d="M1.5 4L6 8L10.5 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </button>
    </div>

    <div
      class="pointer-events-none invisible absolute right-0 top-full z-[120] w-56 pt-3 opacity-0 transition-all duration-180 group-hover:pointer-events-auto group-hover:visible group-hover:opacity-100"
    >
      <div class="rounded-xl border border-surface-border bg-white p-5 shadow-[0_20px_45px_rgba(0,0,0,0.14)]">
        <div class="mb-3 border-b border-surface-border pb-2 text-sm font-semibold tracking-wide text-text-primary">
          {{ t('common.language') }}
        </div>
        <ul class="m-0 list-none p-0">
          <li>
            <button
              type="button"
              class="flex w-full items-center justify-between rounded px-2.5 py-2 text-left text-sm transition"
              :class="
                locale === 'en'
                  ? 'bg-text-primary text-white'
                  : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
              "
              @click="choose('en')"
            >
              <span>{{ t('common.english') }}</span>
              <span v-if="locale === 'en'" class="text-xs">✓</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              class="mt-1 flex w-full items-center justify-between rounded px-2.5 py-2 text-left text-sm transition"
              :class="
                locale === 'zh'
                  ? 'bg-text-primary text-white'
                  : 'text-text-secondary hover:bg-surface-muted hover:text-text-primary'
              "
              @click="choose('zh')"
            >
              <span>{{ t('common.chinese') }}</span>
              <span v-if="locale === 'zh'" class="text-xs">✓</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
