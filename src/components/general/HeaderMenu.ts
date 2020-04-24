import { Component, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'
import { PageModule } from '@/store/page/PageModule'
import { ThemeModule } from '@/store/theme/ThemeModule'

@Component({
  name: 'Header'
})
export default class extends Vue {
  get classes() {
    const classes: any = {}
    const pre = 'header-menu'
    classes[pre] = true
    return classes
  }

  render(h: CreateElement): VNode {
    if (this.$route.meta.headerTitle) {
      return h('header', { class: this.classes }, [
        h('div', { class: ['header-menu__active'] }, [
          !PageModule.onMainPage && h('routerLink', {
            props: { to: { name: 'index' } },
            class: 'header-menu__back-link'
          }, 'go back'),
          h('h2', { class: 'header-menu__title' }, [this.currentText]),
          h('AppCheckbox', { on: { change: this.changeTheme } }),
          h('routerLink', { props: { to: { name: 'theme' } } }, [
            h('AppIcon', {
              class: 'ml-2 icon-3 icon--hover-main', props: { name: 'love' }
            })
          ])
        ])
      ]
      )
    } else {
      return h('div', { class: this.classes }, [h('p', this.currentText)])
    }
  }

  get currentText(): string {
    const block = PageModule.getActiveBlock
    const headerTitle = this.$route.meta.headerTitle
    if (block) {
      return block.title || block.id
    } else if (headerTitle) {
      return headerTitle
    }
    return 'Default text'
  }

  changeTheme(event: boolean) {
    const theme = event ? 'light' : 'dark'
    ThemeModule.updateTheme(theme)
  }
}
