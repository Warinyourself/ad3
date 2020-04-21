import { Component, Prop, Vue } from 'vue-property-decorator'
import { IWidgetBlock } from '@/types'

import { CreateElement, VNode } from 'vue/types'
import * as d3 from 'd3'

@Component({
  name: 'PieWidget'
})
export default class PieWidget extends Vue {
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
    let svg = d3.select(node as Element)
      .attr('width', minValue)
      .attr('height', minValue)
      .append('g')
      .attr('transform', `translate(${minValue / 2}, ${minValue / 2})`)

    const data = [
      {
        name: 'ADA',
        amount: '32000',
        amountInUsd: '824',
        color: 'var(--color-active)'
      },
      {
        name: 'BTC',
        amount: '0.58',
        amountInUsd: '3892',
        color: 'var(--color-second)'
      },
      {
        name: 'IOTA',
        amount: '5058',
        amountInUsd: '1802',
        color: 'var(--color-third)'
      }
    ]

    const innerRaiusWidth = 60

    const pie = d3.pie().value((d: any) => d.amountInUsd)
    let arcs: any = pie(data as any)
    const arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius * (1 - innerRaiusWidth / 100))
      .cornerRadius(radius * 0.05)
      .padAngle(0.03)

    svg.selectAll('path')
      .data(arcs)
      .enter().append('path')
      .attr('fill', (d: any) => d.data.color)
      .attr('d', arc as any)
  }
}
