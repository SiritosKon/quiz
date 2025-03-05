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
        v-if="currentTaskIndex !== tasks.length - 1"
        :label="isBeforeLastStep ? 'Закончить' : 'Далее'"
        color="primary"
        class="col"
        @click="nextTask"
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

// Проверка, находится ли пользователь на предпоследнем шаге
const isBeforeLastStep = computed(() => {
  return currentTaskIndex.value === tasks.value.length - 2
})

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

<style scoped>
.navigation-container {
  position: sticky;
  bottom: 0px;
  left: 0;
  right: 0;
  padding: 0 16px;
  background: #f8f8f8;
  z-index: 1000;
}

.navigation-buttons {
  margin-bottom: 16px;
}
</style>
