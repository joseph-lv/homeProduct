<script setup lang="ts">
import { watch, nextTick, ref, onMounted, onUnmounted } from 'vue'
import { useConstructionNoticeState } from '@/composables/constructionNotice'

const { visible, message, closeConstructionNotice } = useConstructionNoticeState()
const okButtonRef = ref<HTMLButtonElement | null>(null)

function lockScroll(on: boolean) {
  document.body.style.overflow = on ? 'hidden' : ''
}

watch(visible, (v) => {
  lockScroll(v)
  if (v) {
    nextTick(() => okButtonRef.value?.focus())
  }
})

function onDocumentKeydown(e: KeyboardEvent) {
  if (visible.value && e.key === 'Escape') {
    e.preventDefault()
    closeConstructionNotice()
  }
}

onMounted(() => document.addEventListener('keydown', onDocumentKeydown))
onUnmounted(() => {
  document.removeEventListener('keydown', onDocumentKeydown)
  lockScroll(false)
})
</script>

<template>
  <Teleport to="body">
    <Transition
      enter-active-class="transition duration-200 ease-out"
      leave-active-class="transition duration-150 ease-in"
      enter-from-class="opacity-0"
      leave-to-class="opacity-0"
    >
      <div
        v-if="visible"
        class="fixed inset-0 z-[300] flex items-center justify-center bg-black/45 p-4 backdrop-blur-[1px]"
      >
        <div
          class="absolute inset-0"
          aria-hidden="true"
          @click="closeConstructionNotice"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="construction-notice-title"
          class="relative z-10 w-full max-w-md rounded-lg border border-surface-border bg-white px-6 py-5 shadow-xl"
          @click.stop
        >
          <h2 id="construction-notice-title" class="text-base font-semibold text-text-primary">
            Notice
          </h2>
          <p class="mt-3 text-sm leading-relaxed text-text-secondary">
            {{ message }}
          </p>
          <div class="mt-6 flex justify-end">
            <button
              ref="okButtonRef"
              type="button"
              class="rounded bg-text-primary px-5 py-2 text-sm font-medium text-white outline-none transition hover:opacity-90 focus-visible:ring-2 focus-visible:ring-stone-400 focus-visible:ring-offset-2"
              @click="closeConstructionNotice"
            >
              OK
            </button>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
