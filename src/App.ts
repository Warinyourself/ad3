import { Component, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'
import { PageModule } from '@/store/page/PageModule'

import noneLayout from '@/layout/none.ts'
import defaultLayout from '@/layout/default.ts'

import { ThemeModule } from '@/store/page/theme/ThemeModule'

@Component({
  name: 'App',
  components: {
    noneLayout,
    defaultLayout
  }
})
export default class extends Vue {
  get layout() {
    return PageModule.layout
  }

  render(h: CreateElement): VNode {
    return h('component', { is: this.layout + 'Layout', attrs: { id: 'app' } }, [h('router-view')])
  }

  beforeMount() {
    const theme = localStorage.getItem('theme') || 'dark'
    ThemeModule.updateTheme(theme)
  }
}
