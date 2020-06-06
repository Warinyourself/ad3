import { Component, Vue } from 'vue-property-decorator'
import { SettingsModule } from '@/store/settings/SettingsModule'
import WidgetBlock from '@/components/block/widget/BlockWidget'
import { CreateElement, VNode } from 'vue/types'

import { BlockModule } from '@/store/page/block/BlockModule'

import { generateData } from '@/utils/d3'

@Component({
  components: {
    WidgetBlock
  }
})
export default class ChartPage extends Vue {
  chart = {
    id: 1,
    title: 'Chart widget',
    component: 'LineWidget',
    size: [3, 1],
    url: '/chart',
    chartSettings: {
      data: generateData({ max: 12 }),
      options: {
        grid: true
      }
    }
  }

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
      h('div', { class: 'container' }, [
        h('pre', JSON.stringify(this.chart.chartSettings.options, null, 2)),

        h('div', { class: 'container' },
          [h(WidgetBlock, { props: { block: this.chart } })]
        )
      ])
    ])
  }
}
