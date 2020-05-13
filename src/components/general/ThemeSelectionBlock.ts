import { Component, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'

import { ThemeModule } from '@/store/page/theme/ThemeModule'

import ThemeBlock from '@/components/general/ThemeBlock'

@Component({
  components: {
    ThemeBlock
  }
})
export default class ThemeSelectionBlock extends Vue {
  render(h: CreateElement): VNode {
    return h('div', { class: 'theme-selection-block' }, this.generateThemesBlock(h))
  }

  generateThemesBlock(h: CreateElement) {
    return ThemeModule.themes.map((theme) => {
      return h(ThemeBlock, { props: { theme }, nativeOn: { click: () => ThemeModule.updateTheme(theme.name) } })
    })
  }

  handle(event) {
    console.log({ event })
  }
}
