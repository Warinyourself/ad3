import * as d3 from 'd3'

import { generateData } from './data'
import { generateRadar } from './radar'
import { generateAxis, AxisOptions } from './axis'
import { generateLine, initLinePosition, generateGrid, GridOptions, IMargin } from './line'

export { generateRadar, generateAxis, generateData, generateLine, initLinePosition, generateGrid }

type ChartTypes = 'line' | 'bar' | 'area' | 'radar' | 'pie' | 'arc' | 'chord'

interface ConstructorAD3 {
  type: ChartTypes,
  data: any
  options?: {
    width?: number
    height?: number
    margin?: IMargin
    grid?: GridOptions | boolean
    axes?: {
      x?: AxisOptions
      y?: AxisOptions
    }
  }
}

export class AD3 {
  constructor(ctx: any, settings: ConstructorAD3) {
    const ctxCall = (func: (g: any) => any) => ctx.append('g').call(func)
    const { type, data, options } = settings
    let [width, height] = [ctx.clientWidth, ctx.clientHeight]
    let margin = { top: 10, right: 10, bottom: 10, left: 10 }
    let grid

    if (options) {
      grid = options.grid || false
      width = options.width || width
      height = options.height || height
      margin = options.margin || margin
    }

    ctx = d3.select(ctx as Element)
      .attr('width', width)
      .attr('height', height)
      .append('g')

    if (type === 'line') {
      console.log({ data, width, height, margin, ctx })
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

      ctxCall(xAxis)
      ctxCall(yAxis)

      if (grid === true) {
        const gridCall = generateGrid({ width, height, margin, y, yLines: yTicks })
        ctxCall(gridCall)
      }

      const path: any = d3.line()
        .x((_, i) => x(i))
        .y((d: any) => y(d.value))
        .curve(d3.curveCardinal)

      ctx.append('path')
        .datum(data)
        .attr('fill', 'none')
        .attr('stroke', 'var(--color-active)')
        .attr('stroke-width', 1.5)
        .attr('d', path)
    }
  }
}
