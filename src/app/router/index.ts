import { createRouter, createWebHistory } from 'vue-router'

const routers = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/pages/spaceships').then(({ PageSpaceships }) => PageSpaceships)
    },
    {
      path: '/spaceship/:spaceshipId',
      component: () => import('@/pages/spaceship').then(({ PageSpaceship }) => PageSpaceship)
    }
  ]
})

export default routers
