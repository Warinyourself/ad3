import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'

import * as d3 from 'd3'
import { generateAxis } from '@/utils/d3/axis'
import { generateGrid, generateLine, initLinePosition } from '@/utils/d3/line'

@Component({
  name: 'HistogramWidget'
})
export default class extends Vue {
  @Prop() settings!: any;

  render(h: CreateElement): VNode {
    return h('svg', { ref: 'svgChart' })
  }

  generateChartData() {
    const amountItems = Math.floor(Math.random() * 10) + 5
    return Array.from(Array(amountItems)).map((_, index) => {
      return {
        value: Math.floor(Math.random() * 35) + 10,
        index
      }
    })
  }

  mounted() {
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
      ticks: data.length < 15 ? data.length : 10,
      domain: [0, data.length - 1],
      range: [margin.left, width - margin.right],
      translate: `translate(0, ${height - margin.bottom})`
    })

    const yTicks = data.length < 6 ? data.length : 6
    const [y, yAxis] = generateAxis({
      type: 'axisLeft',
      ticks: yTicks,
      domain: d3.extent(data, d => d.value) as [number, number],
      domainOffset: 0.2,
      range: [height - margin.bottom, margin.top],
      translate: `translate(${margin.left}, 0)`
    })

    const grid = generateGrid({ width, height, margin, y, yLines: yTicks })
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

    const bar = svg.append('g')
      .attr('fill', 'var(--color-active-dark)')
      .selectAll('rect')
      .data(data)
      .enter().append('rect')
      .attr('x', d => x(d.index))
      .attr('opacity', '0.7')
      .attr('width', '5')
      .attr('y', d => y(d.value))
      .attr('height', d => y(0) - y(d.value) - margin.top)

    bar.on('mouseenter', (d, i, nodes) => {
      console.log({ d, i, nodes })
      d3.select(nodes[i])
        .transition()
        .duration(200)
        .style('opacity', 1)
    }).on('mouseleave', (d, i, nodes) => {
      d3.select(nodes[i])
        .transition()
        .duration(200)
        .style('opacity', '0.8')
    })
  }
}
