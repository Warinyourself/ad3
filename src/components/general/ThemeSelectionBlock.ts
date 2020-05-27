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
  activeTheme = 0

  render(h: CreateElement): VNode {
    return h('div', { class: 'theme-selection-block', ref: 'theme' }, this.generateThemeBlocks(h))
  }

  generateThemeBlocks(h: CreateElement) {
    return ThemeModule.themes.map((theme, i) => {
      return h(ThemeBlock, {
        props: { theme },
        class: {
          'active': this.activeTheme === i
        },
        nativeOn: { click: () => ThemeModule.updateTheme(theme.name) } })
    })
  }

  mounted() {
    this.activeTheme = ThemeModule.themes.findIndex(({ name }) => name === ThemeModule.theme)
    this.$refs.theme.scroll((this.activeTheme - 4) * 100, 0)
  }

  ScrollRight() {
    if (this.activeTheme < ThemeModule.themes.length - 1) {
      this.activeTheme++
    }
    const nodeSize = 103
    this.$refs.theme.scroll((this.activeTheme - 4) * 100, 0)
  }

  ScrollLeft() {
    if (this.activeTheme > 0) {
      this.activeTheme--
    }
    this.$refs.theme.scroll((this.activeTheme - 4) * 100, 0)
  }

  SelectTheme() {
    ThemeModule.updateTheme(ThemeModule.themes[this.activeTheme].name)
  }
}
