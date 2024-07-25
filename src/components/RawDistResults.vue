<script setup lang="ts">
import { computed } from 'vue'
import ComponentTitle from './ComponentTitle.vue'
import { useSignaloidAPIStore } from '../stores/signaloidAPI'

// Best results I could get and quickly got from pinia store.
// It will update on each request
const sigAPIStore = useSignaloidAPIStore()

const isTaskOutputEmpty = computed(() => {
  const taskOutputRes = sigAPIStore.getTaskOutputRes
  return Object.keys(taskOutputRes).length === 0
})
</script>

<template>
  <ComponentTitle title="Raw Distribution Results Here" />
  <div v-if="!isTaskOutputEmpty">
    {{ sigAPIStore.getTaskOutputRes }}
  </div>
  <div v-else>No results available.</div>
</template>
