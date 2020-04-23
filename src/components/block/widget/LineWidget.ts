import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'

import * as d3 from 'd3'
import { generateAxis } from '@/utils/d3/axis'
import { generateGrid, generateLine, initLinePosition } from '@/utils/d3/line'

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

    const generatePicker = (g: any) => {
      const size = 8

      g.append('rect')
        .attr('width', size)
        .attr('height', size)
        .attr('x', (size / 2) * -1)
        .attr('y', (size / 2) * -1)
        .attr('fill', 'var(--color-active)')
        .attr('rx', size)
        .attr('id', 'pointer')
    }

    svg.call(generatePicker)

    const lineX = generateLine({
      position: [margin.left, margin.left, margin.top, height - margin.bottom],
      attrs: [['id', 'tooltip-line-x'], ['stroke', 'var(--color-active)'], ['stroke-opacity', '0.6'], ['opacity', '0']]
    })
    const lineY = generateLine({
      position: [margin.left, width - margin.right, margin.top, margin.top],
      attrs: [['id', 'tooltip-line-y'], ['stroke', 'var(--color-active)'], ['stroke-opacity', '0.6'], ['opacity', '0']]
    })

    svg.call(lineX)
    svg.call(lineY)

    svg.append('path')
      .datum(data)
      .attr('fill', 'none')
      .attr('stroke', 'var(--color-active)')
      .attr('stroke-width', 1.5)
      .attr('d', path)

    const bisect = (() => {
      const bisect = d3.bisector((d: any) => d.index).right

      return (mx: any) => {
        const value = x.invert(mx)
        const index = bisect(data, value, 1)

        const a = data[index - 1]
        const b = data[index]
        return value - a.value > b.value - value ? b : a
      }
    })()

    const updateLinePosition = initLinePosition()
    const body = svg.append('rect')
      .attr('width', width - margin.left - margin.right)
      .attr('height', height - margin.top - margin.bottom)
      .attr('x', margin.left)
      .attr('y', margin.top)
      .attr('opacity', 0)

    body.on('mouseenter', () => {
      svg.selectAll('#pointer, #tooltip-line-x, #tooltip-line-y')
        .transition()
        .duration(200)
        .style('opacity', 1)
    }).on('mousemove', () => {
      const { index, value } = bisect(d3.event.offsetX)
      const position = { x: x(index), y: y(value) }

      updateLinePosition({
        animationCallback: (progress: number) => console.log({ progress }),
        position,
        duration: 400,
        svg
      })

      svg.select('#pointer')
        .attr('transform', `translate(${position.x}, ${position.y})`)
    }).on('mouseleave', () => {
      svg.selectAll('#pointer, #tooltip-line-x, #tooltip-line-y')
        .transition()
        .duration(200)
        .style('opacity', 0)
    })
  }
}
