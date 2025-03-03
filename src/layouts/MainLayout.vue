<template>
  <q-layout view="lHh Lpr lFf">
    <q-header class="bg-orange-8">
      <q-toolbar>
        <q-toolbar-title class="text-center"> Исаак Бродский </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
// Пустой скрипт, так как нам не нужны дополнительные функции
</script>

<style lang="scss">
// Стили для мобильного приложения
body {
  background-color: #f8f8f8; // Слегка не белый фон для контраста с заданиями
}
</style>
