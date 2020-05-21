import { Component, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'

import { ThemeModule } from '@/store/page/theme/ThemeModule'

import ThemeBlock from '@/components/general/ThemeBlock'
import { keybind } from '@/plugins/mixins'

@Component({
  components: {
    ThemeBlock
  },
  mixins: [keybind]
})
export default class ThemeSelectionBlock extends Vue {
  render(h: CreateElement): VNode {
    return h('div', { class: 'theme-selection-block', ref: 'theme' }, this.generateThemeBlocks(h))
  }

  generateThemeBlocks(h: CreateElement) {
    return ThemeModule.themes.map((theme) => {
      return h(ThemeBlock, {
        props: { theme },
        class: {
          'active': true
        },
        nativeOn: { click: () => ThemeModule.updateTheme(theme.name) } })
    })
  }

  ScrollRight() {
    this.$refs.theme.scroll(Math.ceil(Math.random() * 10) * 100, 0)
  }
}
