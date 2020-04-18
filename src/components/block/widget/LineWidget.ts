import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'

import * as d3 from 'd3'

import { generateAxis } from '@/utils/axis'
import { generateGrid } from '@/utils/grid'

@Component({
  name: 'LineWidget'
})
export default class extends Vue {
  @Prop() settings!: any;

  render(h: CreateElement): VNode {
    return h('svg', { ref: 'svgChart' })
  }

  generateChartData() {
    const amountItems = Math.floor(Math.random() * 30) + 10
    return Array.from(Array(amountItems)).map(_ => {
      return { value: Math.floor(Math.random() * 35) + 10 }
    })
  }

  mounted() {
    const that = this
    const margin = { top: 20, right: 30, bottom: 30, left: 40 }
    const node = this.$refs.svgChart as HTMLElement
    const height = node.parentElement ? node.parentElement.offsetHeight : 100
    const width = node.parentElement ? node.parentElement.offsetWidth : 100
    let svg = d3.select(node as Element)
      .attr('width', width)
      .attr('height', height)
      .append('g')

    const data = this.generateChartData()

    const [x, xAxis] = generateAxis({
      domain: [0, data.length - 1],
      range: [margin.left, width - margin.right],
      ticks: data.length < 15 ? data.length : 10,
      translate: `translate(0, ${height - margin.bottom})`
    })

    const [y, yAxis, yDomain] = generateAxis({
      domain: d3.extent(data, d => d.value) as [number, number],
      domainOffset: 0.2,
      type: 'axisLeft',
      range: [height - margin.bottom, margin.top],
      ticks: data.length < 6 ? data.length : 6,
      translate: `translate(${margin.left}, 0)`
    })

    const grid = generateGrid({ width, height, margin, y, x })
    const callSvg = (func: (g: any) => any) => svg.append('g').call(func)

    callSvg(xAxis)
    callSvg(yAxis)
    callSvg(grid)

    const path: any = d3.line()
      .x((_, i) => x(i))
      .y((d: any) => y(d.value))
      .curve(d3.curveCardinal)

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'var(--color-active)')
      .attr('stroke-width', 1.5)
      .attr('d', path)
  }
}
