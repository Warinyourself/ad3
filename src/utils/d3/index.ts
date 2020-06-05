import * as d3 from 'd3'

import { generateData } from './data'
import { generateRadar } from './radar'
import { generateAxis, AxisOptions } from './axis'
import { generateLine, initLinePosition, generateGrid, GridOptions, IMargin } from './line'
import { generateTooltip } from './tooltip'

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

      if (grid) {
        const gridCall = generateGrid({ width, height, margin, y, yLines: yTicks })
        ctxCall(gridCall)
      }

      const line = d3.line()
        .x((_, i) => x(i))
        .y((d: any) => y(d.value))
        .curve(d3.curveCardinal)

      const pathSeg = ctx.append('path')
        .datum(data)
        .attr('id', 'path-seg-sine')
        .attr('fill', 'none')
        .attr('stroke-width', 2)
        .attr('stroke', 'none')

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

      const { lineY, lineX, picker: pickerGroup } = generateTooltip({ width, height, margin })
      let marker = {}

      ctxCall(lineY)
      ctxCall(lineX)

      if (pickerGroup) {
        marker = ctxCall(pickerGroup)
      }

      const body = ctx.append('rect')
        .attr('width', width - margin.left - margin.right)
        .attr('height', height - margin.top - margin.bottom)
        .attr('x', margin.left)
        .attr('y', margin.top)
        .attr('opacity', 0)

      const updateLinePosition = initLinePosition()

      body.on('mouseenter', () => {
        ctx.selectAll('#pointer, #tooltip-line-x, #tooltip-line-y')
          // .transition()
          .style('opacity', 1)
          // .duration(200)
      }).on('mousemove', () => {
        const centerIndex = Math.round(x.invert(d3.event.offsetX))
        const { index, value } = data[centerIndex]
        const position = { x: x(index), y: y(value) }

        updateLinePosition({
          position,
          duration: 400,
          svg: ctx
        })

        update({ data, line, pathSeg, marker, position: index })
        // ctx.select('#pointer')
        //   .attr('transform', `translate(${position.x}, ${position.y})`)
      }).on('mouseleave', () => {
        ctx.selectAll('#pointer, #tooltip-line-x, #tooltip-line-y')
          // .transition()
          .style('opacity', 0)
          // .duration(200)
      })
    }
  }
}

let point = -2 * Math.PI

// Updates position of marker.
function update({ data, line, pathSeg, marker, position: nextPoint }) {
  // Only include points between existing and new point.
  console.log({ point, nextPoint })

  if (point === nextPoint) {
    return
  }

  line.defined((d, i) =>
    // eslint-disable-next-line no-mixed-operators
    i <= nextPoint && i >= point || i <= point && i >= nextPoint
  )

  // Update path.
  pathSeg.attr('d', line)
  // Transition marker from point to nextPoint.
  marker.transition().duration(1500)
    .attrTween('transform', nextPoint > point ? translateRight(pathSeg.node()) : translateLeft(pathSeg.node()))
    .on('end', () => { point = nextPoint })
}

// Tween function for moving to right.
function translateRight(node) {
  const l = node.getTotalLength()
  return () => {
    return (t) => {
      const p = node.getPointAtLength(t * l)
      return 'translate(' + p.x + ',' + p.y + ')'
    }
  }
}
// Tween function for moving to left.
function translateLeft(node) {
  const l = node.getTotalLength()
  return () => {
    return (t) => {
      const p = node.getPointAtLength((1 - t) * l)
      return 'translate(' + p.x + ',' + p.y + ')'
    }
  }
}
