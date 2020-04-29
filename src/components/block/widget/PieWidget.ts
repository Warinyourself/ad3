import { Component, Prop, Vue } from 'vue-property-decorator'

import { CreateElement, VNode } from 'vue/types'
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
    let svg = d3.select(node as Element)
      .attr('width', minValue)
      .attr('height', minValue)
      .append('g')
      .attr('transform', `translate(${minValue / 2}, ${minValue / 2})`)

    const radialProgress = d3.scaleLinear()
      .domain([0, Math.PI * 2])
      .range([0, 100])
    const data = [
      {
        name: 'ADA',
        amount: '32000',
        amountInUsd: '824',
        color: '--color-active'
      },
      {
        name: 'BTC',
        amount: '0.58',
        amountInUsd: '3892',
        color: '--color-second'
      },
      {
        name: 'IOTA',
        amount: '5058',
        amountInUsd: '1802',
        color: '--color-third'
      }
    ]

    const innerRaiusWidth = 60

    const pie = d3.pie()
      .value((d: any) => d.amountInUsd)
      // .startAngle(-0.5 * Math.PI)
      // .endAngle(0.5 * Math.PI)

    let arcs: any = pie(data as any)
    const arc = d3.arc()
      .outerRadius(radius)
      .innerRadius(radius * (1 - innerRaiusWidth / 100))
      .cornerRadius(radius * 0.05)
      .padAngle(0.03)

    svg.selectAll('path')
      .data(arcs)
      .enter().append('path')
      .attr('fill', (d: any) => `var(${d.data.color})`)
      .attr('d', arc as any)

    svg.append('defs')
      .selectAll('linearGradient')
      .data(arcs)
      .enter().append('linearGradient')
      .attr('id', (_, i) => `gradient-${i}`)
      .each((d: any, nodes, i) => {
        const node = d3.select(nodes[i])
        // console.log({ d, nodes, i, node })

        node.append('stop')
          .attr('stop-color', (d, i) => `var(${d.data.color})`)
          .attr('offset', `0%`)

        node.append('stop')
          .attr('stop-color', (d, i) => `var(${d.data.color}-dark)`)
          .attr('offset', `100%`)
      })
  }
}
