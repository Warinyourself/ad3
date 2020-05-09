import { Component, Vue } from 'vue-property-decorator'
import HeaderMenu from '@/components/general/HeaderMenu.ts'
import { CreateElement, VNode } from 'vue/types'
import { KeyModule } from '@/store/page/key/KeyModule'

@Component({
  name: 'LayoutDefault',
  components: {
    HeaderMenu
  }
})
export default class extends Vue {
  render(h: CreateElement): VNode {
    return h('div', { class: 'wrapper' }, [ h(HeaderMenu), this.$slots.default ])
  }

  mounted() {
    document.documentElement.addEventListener('keypress', KeyModule.handleKeypress)
  }
}
