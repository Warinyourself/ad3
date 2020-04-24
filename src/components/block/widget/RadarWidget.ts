import { Component, Prop, Vue } from 'vue-property-decorator'
import { IWidgetBlock } from '@/types'

import { CreateElement, VNode } from 'vue/types'
import { RadarChart } from '@/utils/d3/radar'
import * as d3 from 'd3'

@Component({
  name: 'PieWidget'
})
export default class extends Vue {
  render(h: CreateElement): VNode {
    return h('svg', { ref: 'svgChart', class: ['chart-pie'] })
  }

  mounted() {
    this.initPieChart()
  }

  async initPieChart() {
    const margin = 10
    const node = this.$refs.svgChart as HTMLElement
    const minValue = node.parentElement ? node.parentElement.offsetWidth : 100
    const radius = (minValue / 2) - margin * 2
    const svg = d3.select(node as Element)
      .attr('width', minValue)
      .attr('height', minValue)

    const data = [
      [
        // iPhone
        { axis: 'Battery Life', value: 0.22 },
        { axis: 'Brand', value: 0.28 },
        { axis: 'Contract Cost', value: 0.29 },
        { axis: 'Design And Quality', value: 0.17 },
        { axis: 'Have Internet Connectivity', value: 0.22 },
        { axis: 'Large Screen', value: 0.02 },
        { axis: 'Price Of Device', value: 0.21 },
        { axis: 'To Be A Smartphone', value: 0.5 }
      ],
      [
        // Samsung
        { axis: 'Battery Life', value: 0.27 },
        { axis: 'Brand', value: 0.16 },
        { axis: 'Contract Cost', value: 0.35 },
        { axis: 'Design And Quality', value: 0.13 },
        { axis: 'Have Internet Connectivity', value: 0.2 },
        { axis: 'Large Screen', value: 0.13 },
        { axis: 'Price Of Device', value: 0.35 },
        { axis: 'To Be A Smartphone', value: 0.38 }
      ],
      [
        // Nokia Smartphone
        { axis: 'Battery Life', value: 0.26 },
        { axis: 'Brand', value: 0.1 },
        { axis: 'Contract Cost', value: 0.3 },
        { axis: 'Design And Quality', value: 0.14 },
        { axis: 'Have Internet Connectivity', value: 0.22 },
        { axis: 'Large Screen', value: 0.04 },
        { axis: 'Price Of Device', value: 0.41 },
        { axis: 'To Be A Smartphone', value: 0.3 }
      ]
    ]

    const color = d3.scaleOrdinal().range(['var(--color-active)', 'var(--color-second)', 'var(--color-third)'])

    const radarChartOptions = {
      svg,
      w: radius * 2,
      h: radius * 2,
      maxValue: 0.5,
      levels: 5,
      roundStrokes: true,
      color: color
    }

    const radar = RadarChart(data, radarChartOptions)
    console.log({ radar })
  }
}
