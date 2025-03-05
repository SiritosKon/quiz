<template>
  <q-page class="flex flex-col q-pa-md">
    <!-- Изображение Бродского вверху -->

    <q-img
      src="/quiz/images/brodsky.png"
      alt="И.И. Бродский"
      class="q-transition animate-fade"
      style="height: 200px; width: 100%; left: 7px"
      fit="contain"
    />

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

.brodsky-image {
  height: 150px;
  width: 100%;
}
</style>
