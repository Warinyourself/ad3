import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'

import * as d3 from 'd3'

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

    const x = d3.scaleLinear()
      .domain([0, data.length - 1])
      .range([margin.left, width - margin.right])

    const xAxis = (g: any) => g
      .attr('transform', `translate(0,${height - margin.bottom})`)
      .call(
        d3.axisBottom(x)
          .ticks(data.length < 15 ? data.length : 10)
          .tickPadding(6)
      )

    const yDomain: [number, number] = d3.extent(data, d => d.value) as [number, number]
    yDomain[0] = yDomain[0] - yDomain[1] * 0.2
    yDomain[1] = yDomain[1] + yDomain[1] * 0.2

    const y = d3.scaleLinear()
      .domain(yDomain)
      .range([height - margin.bottom, margin.top])

    const yAxis = (g: any) => g
      .attr('transform', `translate(${margin.left},0)`)
      .call(
        d3.axisLeft(y)
          .ticks(data.length < 10 ? data.length : 10)
          .tickPadding(6)
      )

    svg.append('g')
      .call(xAxis)

    svg.append('g')
      .call(yAxis)

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
