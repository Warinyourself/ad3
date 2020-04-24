import Vue from 'vue'
import VueRouter, { RouteConfig, Route } from 'vue-router'

import IndexPage from '@/views/IndexPage'
import ThemePage from '@/views/ThemePage'
import NotFoundPage from '@/views/NotFoundPage'

import { PageModule } from '@/store/page/PageModule'

Vue.use(VueRouter)

interface IRouterMeta {
  meta: {
    headerTitle: string
    layout?: string
  }
}

const routes: Array<RouteConfig & IRouterMeta> = [
  {
    path: '/',
    name: 'index',
    component: IndexPage,
    meta: {
      headerTitle: 'Main Page'
    }
  },
  {
    path: '/theme',
    name: 'theme',
    component: ThemePage,
    meta: {
      headerTitle: 'Themes'
    }
  },
  {
    path: '*',
    name: 'notFoundPage',
    component: NotFoundPage,
    meta: {
      headerTitle: 'Page not found',
      layout: 'none'
    }
  }
]

const router: VueRouter = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to: Route, from: Route, next: Function) => {
  const layout = to.meta.layout || 'default'
  document.title = to.meta.headerTitle

  if (PageModule.layout !== layout) {
    PageModule.SET_PAGE_STATE({ key: 'layout', value: layout })
  }

  next()
})

export default router
