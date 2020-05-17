import Vue from 'vue'

import '@/styles/index.styl'

import App from '@/App.ts'
import store from '@/store'
import router from '@/router'
import i18n from '@/locales'

import './registerServiceWorker'

import AppIcon from '@/components/app/AppIcon'
import AppCheckbox from '@/components/app/AppCheckbox'
import AppActiveBlock from '@/components/app/AppActiveBlock'

Vue.component('AppIcon', AppIcon)
Vue.component('AppCheckbox', AppCheckbox)
Vue.component('AppActiveBlock', AppActiveBlock)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  i18n,
  render: (h) => h(App)
}).$mount('#app')
