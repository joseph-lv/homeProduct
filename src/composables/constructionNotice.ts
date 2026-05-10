import { ref } from 'vue'

export const DEFAULT_CONSTRUCTION_MESSAGE = 'Under construction. Please check back soon.'

const visible = ref(false)
const message = ref(DEFAULT_CONSTRUCTION_MESSAGE)

export function showConstructionNotice(customMessage?: string) {
  message.value = customMessage ?? DEFAULT_CONSTRUCTION_MESSAGE
  visible.value = true
}

export function closeConstructionNotice() {
  visible.value = false
}

export function useConstructionNoticeState() {
  return { visible, message, closeConstructionNotice }
}
