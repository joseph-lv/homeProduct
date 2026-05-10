<script setup lang="ts">
import { RouterView } from 'vue-router'
import ChatWidget from '@/components/ChatWidget.vue'
import ConstructionNoticeModal from '@/components/ConstructionNoticeModal.vue'
</script>

<template>
  <RouterView />
  <ChatWidget />
  <ConstructionNoticeModal />
</template>
