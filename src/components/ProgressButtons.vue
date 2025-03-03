<template>
  <div class="navigation-container">
    <!-- Индикатор прогресса -->
    <div class="progress-indicator q-mb-md">
      <div class="text-caption text-center q-mt-xs">
        {{ currentTaskIndex + 1 }} из {{ tasks.length }}
      </div>
      <q-linear-progress
        :value="(currentTaskIndex + 1) / tasks.length"
        color="orange-8"
        class="q-mt-sm"
      />
    </div>

    <!-- Кнопки навигации -->
    <div class="navigation-buttons row q-transition animate-fade q-gutter-x-md">
      <q-btn
        label="Назад"
        color="grey"
        outline
        class="col"
        @click="prevTask"
        :disable="currentTaskIndex === 0"
      />

      <q-btn
        label="Далее"
        color="primary"
        class="col"
        @click="nextTask"
        :disable="currentTaskIndex === tasks.length - 1"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTaskStore } from 'src/stores/task-store'
import { computed } from 'vue'
const taskStore = useTaskStore()

const currentTaskIndex = computed(() => taskStore.currentTaskIndex)
const tasks = computed(() => taskStore.tasks)

// Методы
function nextTask() {
  taskStore.nextTask()
  taskStore.resetLocalState()
}

function prevTask() {
  taskStore.prevTask()
  taskStore.resetLocalState()
}
</script>
