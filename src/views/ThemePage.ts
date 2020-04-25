import { Component, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'
import { ThemeModule } from '@/store/theme/ThemeModule'
import { ColorModule } from '@/store/color/ColorModule'

@Component({
  name: 'ThemePage'
})
export default class extends Vue {
  render(h: CreateElement): VNode {
    return h('div', { class: 'home' }, this.colors.map(([color, value]) => {
      return h('div', {
        class: 'theme-page-block',
        style: `background-image: ${this.generateGradient(color)}`
      }, [
        h('h5', { class: 'theme-page-block__title' }, [
          h('p', `${color} is ${value}`),
          h('p', `${ColorModule.convertToHsl(value)}`),
          h('p', `${ColorModule.getColorName(value)}`)
        ])
      ])
    }))
  }

  get generateGradient() {
    return (color: string) => {
      return `linear-gradient(90deg, var(--color-${color}-dark) 33%, var(--color-${color}) 33%, var(--color-${color}) 66%, var(--color-${color}-light) 66%)`
    }
  }

  get colors() {
    const theme = ThemeModule.currentTheme
    const colors = Object.entries(theme).filter(([key, _]) => key !== 'name')
    return colors
  }
}
