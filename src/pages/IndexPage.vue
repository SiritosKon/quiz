<template>
  <q-page class="flex flex-col q-pa-md">
    <!-- Изображение Бродского вверху -->
    <div class="brodsky-image q-mb-md">
      <q-img src="/images/brodsky.jpg" alt="И.И. Бродский" class="q-transition animate-fade" />
    </div>

    <!-- Основной контент -->
    <task-component />

    <!-- Кнопки навигации -->
    <progress-buttons />
  </q-page>
</template>

<script setup lang="ts">
import TaskComponent from 'components/TaskComponent.vue'
import ProgressButtons from 'components/ProgressButtons.vue'
</script>

<style>
.q-page {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.flex-grow-1 {
  flex-grow: 1;
}
</style>
