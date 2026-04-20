<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from '@/i18n'

const { t } = useI18n()

const props = defineProps<{
  currentPage: number
  totalPages: number
}>()

const emit = defineEmits<{
  change: [page: number]
}>()

const pageItems = computed<(number | 'dots')[]>(() => {
  const total = props.totalPages
  const current = props.currentPage

  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1)

  const pages = new Set<number>([1, total, current - 1, current, current + 1])
  if (current <= 3) pages.add(2), pages.add(3), pages.add(4)
  if (current >= total - 2) pages.add(total - 1), pages.add(total - 2), pages.add(total - 3)

  const sorted = Array.from(pages).filter((n) => n >= 1 && n <= total).sort((a, b) => a - b)
  const result: (number | 'dots')[] = []
  sorted.forEach((n, idx) => {
    if (idx > 0 && n - sorted[idx - 1] > 1) result.push('dots')
    result.push(n)
  })
  return result
})

function go(page: number) {
  if (page < 1 || page > props.totalPages || page === props.currentPage) return
  emit('change', page)
}
</script>

<template>
  <nav class="flex flex-wrap items-center justify-center gap-1" aria-label="Product pagination">
    <button
      type="button"
      class="mr-1 inline-flex items-center justify-center rounded border border-transparent p-1.5 text-text-secondary hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
      :disabled="currentPage === 1"
      @click="go(currentPage - 1)"
    >
      <svg class="h-5 w-5 rotate-180" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.41 6L5 7.41 9.58 12 5 16.59 6.41 18l6-6-6-6zm5 0L10 7.41 14.58 12 10 16.59 11.41 18l6-6-6-6z" />
      </svg>
    </button>
    <button
      v-for="(n, idx) in pageItems"
      :key="`${n}-${idx}`"
      type="button"
      :aria-current="n === currentPage ? 'page' : undefined"
      :class="
        n === 'dots'
          ? 'cursor-default border-transparent text-text-secondary'
          : n === currentPage
            ? 'border-surface-border bg-white text-text-primary'
            : 'border-transparent text-text-secondary hover:border-surface-border hover:bg-surface-muted'
      "
      class="inline-flex min-w-[2.25rem] items-center justify-center rounded border px-2 py-1.5 text-sm"
      :disabled="n === 'dots'"
      @click="typeof n === 'number' && go(n)"
    >
      {{ n === 'dots' ? '…' : n }}
    </button>
    <button
      type="button"
      class="ml-1 inline-flex items-center justify-center rounded border border-transparent p-1.5 text-text-secondary hover:bg-surface-muted disabled:cursor-not-allowed disabled:opacity-40"
      :aria-label="t('productsPage.nextPage')"
      :disabled="currentPage >= totalPages"
      @click="go(currentPage + 1)"
    >
      <svg class="h-5 w-5" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M6.41 6L5 7.41 9.58 12 5 16.59 6.41 18l6-6-6-6zm5 0L10 7.41 14.58 12 10 16.59 11.41 18l6-6-6-6z" />
      </svg>
    </button>
  </nav>
</template>
