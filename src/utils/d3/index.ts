import * as d3 from 'd3'

import { generateData } from './data'
import { generateRadar } from './radar'
import { generateAxis, AxisOptions } from './axis'
import { generateLine, initLinePosition, generateGrid, GridOptions, IMargin } from './line'
import { generateTooltip } from './tooltip'
import { Line } from 'd3'

export { generateRadar, generateAxis, generateData, generateLine, initLinePosition, generateGrid }

type ChartTypes = 'line' | 'bar' | 'area' | 'radar' | 'pie' | 'arc' | 'chord'

type CurveLine = 'curveCardinal' | 'curveCardinalClosed' | 'curveCardinalOpen' | 'curveCatmullRom' | 'curveCatmullRomClosed' | 'curveCatmullRomOpen' | 'curveLinear' | 'curveLinearClosed' | 'curveMonotoneX' | 'curveMonotoneY' | 'curveStep' | 'curveStepAfter' | 'curveStepBefore'

interface LineOption {
  color?: string
  width?: number | string
  curve?: CurveLine
  attrs?: Array<[string, string]>
}

interface ConstructorAD3 {
  type: ChartTypes,
  data: any
  options?: {
    width?: number
    height?: number
    margin?: IMargin
    grid?: GridOptions | boolean
    line: LineOption | Array<LineOption>
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
      const isDeepStructure = Array.isArray(data[0])

      console.log({ isDeepStructure, data, width, height, margin, ctx })

      const dataLength = isDeepStructure ? data[0].length : data.length
      const [x, xAxis] = generateAxis({
        ticks: dataLength < 15 ? dataLength : 10,
        domain: [0, dataLength - 1],
        range: [margin.left, width - margin.right],
        translate: `translate(0, ${height - margin.bottom})`
      })

      const yTicks = dataLength < 6 ? dataLength : 6

      const [y, yAxis] = generateAxis({
        type: 'axisLeft',
        ticks: yTicks,
        domain: d3.extent(isDeepStructure ? data.flat() : data, d => d.value) as [number, number],
        domainOffset: 0.2,
        range: [height - margin.bottom, margin.top],
        translate: `translate(${margin.left}, 0)`
      })

      ctxCall(xAxis)
      ctxCall(yAxis)

      if (grid) {
        const gridCall = generateGrid({ width, height, margin, y, yLines: yTicks })
        ctxCall(gridCall)
      }

      if (isDeepStructure) {
        data.forEach((element: any, i: number) => {
          const isSeveralLines = Array.isArray(options?.line)
          const lineMain: LineOption = isSeveralLines ? (options?.line as LineOption[])[i] || {} : (options?.line as LineOption) || {}
          const lineOptions = {
            color: lineMain.color || 'var(--color-active)',
            width: lineMain.width || 1.5,
            curve: lineMain.curve || 'curveCardinal'
          }

          const line = d3.line()
            .x((_, i) => x(i))
            .y((d: any) => y(d.value))
            .curve(d3[lineOptions.curve])

          const path = ctx.append('path')
            .datum(element)
            .attr('fill', 'none')
            .attr('stroke', lineOptions.color)
            .attr('stroke-width', lineOptions.width)
            .attr('d', line)

          // Animation path view
          let length = path.node().getTotalLength()

          path.attr('stroke-dasharray', length + ' ' + length)
            .attr('stroke-dashoffset', length)
            .transition()
            .ease(d3.easeLinear)
            .attr('stroke-dashoffset', 0)
            .duration(2000)
        })
      } else {
        const line = d3.line()
          .x((_, i) => x(i))
          .y((d: any) => y(d.value))
          .curve(d3.curveCardinal)

        const path = ctx.append('path')
          .datum(data)
          .attr('fill', 'none')
          .attr('stroke', 'var(--color-active)')
          .attr('stroke-width', 1.5)
          .attr('d', line)

        // Animation path view
        let length = path.node().getTotalLength()

        path.attr('stroke-dasharray', length + ' ' + length)
          .attr('stroke-dashoffset', length)
          .transition()
          .ease(d3.easeLinear)
          .attr('stroke-dashoffset', 0)
          .duration(2000)
      }

      const { lineY, lineX, picker: pickerGroup, animate } = generateTooltip({ width, height, margin })
      let marker = {}

      ctxCall(lineY)
      ctxCall(lineX)

      if (pickerGroup) {
        ctxCall(pickerGroup)
        marker = ctx.select('#pointer').node()
      }

      const body = ctx.append('rect')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr('x', margin.left)
        .attr('y', margin.top)
        .attr('opacity', 0)

      body.on('mouseenter', () => {
        ctx.selectAll('#pointer, #tooltip-line-x, #tooltip-line-y')
          .style('opacity', 1)
      }).on('mousemove', () => {
        const centerIndex = Math.round(x.invert(d3.event.offsetX))
        const { index, value } = data[0][centerIndex]
        const position = { x: x(index), y: y(value) }

        marker.style.transform = `translate(${position.x}px, ${position.y}px)`

        animate({
          position,
          duration: 400,
          svg: ctx
        })
      }).on('mouseleave', () => {
        // ctx.selectAll('#pointer, #tooltip-line-x, #tooltip-line-y')
        // .transition()
        // .style('opacity', 0)
        // .duration(200)
      })
    }
  }
}
