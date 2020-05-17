import { Component, Vue } from 'vue-property-decorator'
import { SettingsModule } from '@/store/settings/SettingsModule'
import WidgetBlock from '@/components/block/widget/BlockWidget'
import { CreateElement, VNode } from 'vue/types'

import { BlockModule } from '@/store/page/block/BlockModule'

@Component({
  name: 'IndexPage',
  components: {
    WidgetBlock
  }
})
export default class extends Vue {
  render(h: CreateElement): VNode {
    return h('AppActiveBlock', {
      class: 'home',
      props: {
        block: {
          name: 'home',
          hasActivator: false,
          on: {
            click: () => BlockModule.CLOSE_LATEST()
          }
        }
      }
    }, [
      h('div', { class: 'container' },
        this.widgetBlocks.map((block, index) => {
          return h(WidgetBlock, { props: { block }, key: index })
        })
      )
    ])
  }

  get widgetBlocks() {
    return SettingsModule.widgetBlocks
  }
}
