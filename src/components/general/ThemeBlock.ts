import { Component, Vue, Prop } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'

import { ITheme } from '@/store/page/theme/ThemeModels'

@Component
export default class ThemeSelectionBlock extends Vue {
  @Prop({ type: Object, required: true }) theme!: ITheme

  render(h: CreateElement): VNode {
    return h('div', { class: 'theme-block' }, this.generateColors(h))
  }

  get innerTheme() {
    const { name, ...innerTheme } = this.theme
    return innerTheme
  }

  generateColors(h: CreateElement) {
    return Object.entries(this.innerTheme).map(([key, color]) => {
      return h('div', {
        class: 'theme-block__color',
        style: `background-color: ${color}`
      })
    })
  }
}
