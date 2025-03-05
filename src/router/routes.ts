import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [{ path: '', component: () => import('pages/IndexPage.vue') }],
    beforeEnter: (to, from, next) => {
      // Динамический импорт для избежания проблем с SSR
      import('../utils/deviceDetect')
        .then(({ isDesktopDevice }) => {
          // Если устройство десктопное, перенаправляем на страницу-заглушку
          if (isDesktopDevice()) {
            next('/desktop-redirect')
          } else {
            next()
          }
        })
        .catch(() => {
          // В случае ошибки просто продолжаем
          next()
        })
    },
  },

  // Маршрут для страницы перенаправления десктопных устройств
  {
    path: '/desktop-redirect',
    component: () => import('layouts/BlankLayout.vue'),
    children: [{ path: '', component: () => import('pages/DesktopRedirect.vue') }],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue'),
  },
]

export default routes
