import { Component, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'

@Component({
  name: 'NotFoundPage'
})
export default class extends Vue {
  render(h: CreateElement): VNode {
    return h('div', { class: 'fullscreen-block' }, [
      h('div', { class: 'not-found-block' }, [
        h('h1', { class: 'not-found-title' }, 'Not Found Page'),
        h('routerLink', { props: { to: { name: 'index' } } }, 'go back')
      ])
    ])
  }
}
