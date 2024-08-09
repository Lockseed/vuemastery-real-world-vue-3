import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '../views/EventListVue.vue'
import EventLayout from '@/views/event/EventLayout.vue'
import EventDetails from '../views/event/EventDetails.vue'
import EventRegister from '@/views/event/EventRegister.vue'
import EventEdit from '@/views/event/EventEdit.vue'
import AboutView from '../views/AboutView.vue'

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
          component: EventEdit
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
    }
  ]
})

export default router
