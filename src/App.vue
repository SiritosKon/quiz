<template>
  <router-view />
</template>

<script setup lang="ts">
import { onMounted, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { isDesktopDevice, isScreenMobile } from './utils/deviceDetect'

const router = useRouter()

// Функция для проверки типа устройства и перенаправления
function checkDeviceAndRedirect() {
  const isDesktop = isDesktopDevice()
  const isMobileScreen = isScreenMobile()

  // Если устройство десктопное и не в режиме мобильного экрана
  if (isDesktop && !isMobileScreen && router.currentRoute.value.path !== '/desktop-redirect') {
    void router.push('/desktop-redirect').catch((error) => {
      console.error('Failed to redirect to desktop view:', error)
    })
  }
  // Если мобильное устройство и мы на странице перенаправления
  else if (
    (isMobileScreen || !isDesktop) &&
    router.currentRoute.value.path === '/desktop-redirect'
  ) {
    void router.push('/').catch((error) => {
      console.error('Failed to redirect to mobile view:', error)
    })
  }
}

// Проверка при монтировании компонента
onMounted(() => {
  checkDeviceAndRedirect()
  // Добавляем обработчик изменения размера окна
  window.addEventListener('resize', checkDeviceAndRedirect)
})

// Удаляем обработчик при размонтировании компонента
onBeforeUnmount(() => {
  window.removeEventListener('resize', checkDeviceAndRedirect)
})
</script>
