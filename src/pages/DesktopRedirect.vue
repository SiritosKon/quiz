<template>
  <div class="desktop-redirect-container">
    <div class="content-box">
      <q-icon name="smartphone" size="5rem" color="primary" class="q-mb-lg" />
      <h1 class="text-h4 text-weight-bold q-mb-md">Мобильная версия</h1>
      <p class="text-h6 q-mb-lg">
        Данное приложение оптимизировано для просмотра на мобильных устройствах. Пожалуйста,
        используйте телефон или планшет для лучшего опыта.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Компонент не содержит дополнительной логики
</script>

<style lang="scss" scoped>
.desktop-redirect-container {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
  background-color: #f5f5f5;
}

.content-box {
  max-width: 600px;
  padding: 3rem;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
}

.qr-section {
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
