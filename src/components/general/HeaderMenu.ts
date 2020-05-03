import { Component, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'
import { PageModule } from '@/store/page/PageModule'
import { BlockModule } from '@/store/page/block/BlockModule'
import { ThemeModule } from '@/store/page/theme/ThemeModule'

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
        h('AppActiveBlock', {
          props: {
            block: {
              id: 'ThemeViewBlock'
            }
          }
        }, [h('h1', 'Hello')]),
        h('div', { class: ['header-menu__block'] }, [
          !PageModule.isMainPage && h('routerLink', {
            props: { to: { name: 'index' } },
            class: 'header-menu__back-link'
          }, 'go back'),
          h('h2', { class: 'header-menu__title' }, [this.currentText]),
          h('AppCheckbox', { on: { change: this.changeTheme } }),
          h('div', {
            class: 'ml-2 icon-3 icon--hover-main',
            on: { click: this.toggleThemeView }
          }, [ h('AppIcon', { props: { name: 'statistics' } }) ]),
          h('routerLink', {
            class: 'ml-2 icon-3 icon--hover-main',
            props: { to: { name: 'theme' } }
          }, [ h('AppIcon', { props: { name: 'love' } }) ])
        ])
      ]
      )
    } else {
      return h('div', { class: this.classes }, [h('p', this.currentText)])
    }
  }

  get activeBlock() {
    return BlockModule.getActiveBlock({ group: 'widget' }) || {}
  }

  get currentText(): string {
    const { name, title } = this.activeBlock
    const blockTitle = title || name
    const headerTitle = this.$route.meta.headerTitle

    return blockTitle || headerTitle || 'Default text'
  }

  toggleThemeView(event: boolean) {
    BlockModule.ACTIVATE_BLOCK('ThemeViewBlock')
  }

  changeTheme(event: boolean) {
    const theme = event ? 'light' : 'dark'
    ThemeModule.updateTheme(theme)
  }
}
