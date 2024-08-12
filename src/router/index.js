import { inject } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListVue.vue'
import EventLayout from '@/views/event/EventLayout.vue'
import EventDetails from '../views/event/EventDetails.vue'
import EventRegister from '@/views/event/EventRegister.vue'
import EventEdit from '@/views/event/EventEdit.vue'
import AboutView from '../views/AboutView.vue'
import NotFound from '../views/NotFound.vue'
import NetworkError from '@/views/NetworkError.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'EventList',
      component: EventListView,
      props: (route) => ({ page: parseInt(route.query.page) || 1 })
    },
    {
      path: '/events/:id',
      name: 'EventLayout',
      props: true,
      component: EventLayout,
      children: [
        {
          path: '',
          name: 'EventDetails',
          component: EventDetails
        },
        {
          path: 'register',
          name: 'EventRegister',
          component: EventRegister
        },
        {
          path: 'edit',
          name: 'EventEdit',
          component: EventEdit,
          meta: { requireAuth: true }
        }
      ]
    },
    {
      path: '/event/:afterEvent(.*)',
      redirect: (to) => {
        return { path: '/events/' + to.params.afterEvent }
      }
    },
    {
      path: '/about-us',
      name: 'About',
      component: AboutView,
      alias: '/about'
    },
    {
      path: '/404/:resource',
      name: '404Resource',
      component: NotFound,
      props: true
    },
    {
      path: '/network-error',
      name: 'NetworkError',
      component: NetworkError
    },
    {
      path: '/:catchAll(.*)',
      name: 'NotFound',
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

router.beforeEach((to, from) => {
  const notAuthorized = true
  const GStore = inject('GStore')

  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you must be logged in to view this page.'
    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)

    if (from.href) {
      return false
    } else {
      return { path: '/' }
    }
  }
})

export default router
