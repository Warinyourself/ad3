import * as d3 from 'd3'
import { animate } from '@/utils/animation'

export interface IMargin {
  top: number
  right: number
  bottom: number
  left: number
}

export interface GridOptions {
  margin: IMargin
  width: number
  height: number
  y?: d3.ScaleLinear<number, number>
  x?: d3.ScaleLinear<number, number>
  yLines?: number
  xLines?: number
  opacity?: number
  color?: string
}

export interface ILineSettings {
  position: [number | null, number | null, number | null, number | null]
  attrs: Array<[string, string]>
}

export interface ILinePosition {
  x: number
  y: number
}

export interface IUpdateLinePosition {
  animationCallback?: (progress: number) => any,
  position: ILinePosition,
  svg: any
  duration: number
}

export function generateGrid(gridSettings: GridOptions) {
  const { margin, height, width, x, y, opacity, color, xLines, yLines } = gridSettings

  const grid = (g: any) => {
    const grid = g
      .attr('stroke', color || 'currentColor')
      .attr('stroke-opacity', opacity || 0.1)

    const generateLines = (axis: d3.ScaleLinear<number, number>, amount?: number) => {
      let linesArray = axis.ticks()

      if (amount) {
        const max = axis.ticks().pop() as number
        const avg = max / amount
        linesArray = Array.from(Array(max / avg)).map((_, index) => (index + 1) * avg)
      }

      return linesArray
    }

    if (x) {
      let xLinesArray = generateLines(x, xLines)

      grid.call(g => g.append('g')
        .selectAll('line')
        .data(xLinesArray)
        .join('line')
        .attr('x1', (d: number) => 0.5 + x(d))
        .attr('x2', (d: number) => 0.5 + x(d))
        .attr('y1', margin.top)
        .attr('y2', height - margin.bottom))
    }

    if (y) {
      let yLinesArray = generateLines(y, yLines)

      grid.call(g => g.append('g')
        .selectAll('line')
        .data(yLinesArray)
        .join('line')
        .attr('y1', (d: number) => 0.5 + y(d))
        .attr('y2', (d: number) => 0.5 + y(d))
        .attr('x1', margin.left)
        .attr('x2', width - margin.right))
    }
  }

  return grid
}

export function generateLine(lineSettings: ILineSettings) {
  const { position, attrs } = lineSettings
  const positionIndex = ['x1', 'x2', 'y1', 'y2']

  const line = (g: any) => {
    const line = g
      .append('line')

    position.forEach((value, index) => {
      line.attr(positionIndex[index], value)
    })

    attrs.forEach(([option, value]) => {
      line.attr(option, value)
    })
  }

  return line
}

export function initLinePosition() {
  let oldPosition: ILinePosition = { x: 0, y: 0 }

  return (update: IUpdateLinePosition) => {
    const { position, svg } = update

    if (oldPosition.x !== position.x) {
      oldPosition = position

      // animate({
      //   duration: 400,
      //   timing: (time: number) => time,
      //   draw: (progress: number) => {
      //     generateTransition('x', progress, position, svg)
      //     generateTransition('y', progress, position, svg)
      //   }
      // })

      generateTransition('y', position, svg)
      generateTransition('x', position, svg)
    }
  }
}

const generateTransition = (path: 'x' | 'y', position: ILinePosition, svg: any) => {
  const line = svg.select(`#tooltip-line-${path}`)
  const start = parseInt(line.attr(`${path}1`)) || 0

  line
    .transition()
    .attr(`${path}1`, start)
    .attr(`${path}2`, start)
    .ease(d3.easeLinear)
    .attr(`${path}1`, position[path])
    .attr(`${path}2`, position[path])
    .duration(300)
}

const generateTransitionOld = (path: 'x' | 'y', progress: number, position: ILinePosition, svg: any) => {
  const line = svg.select(`#tooltip-line-${path}`)
  const start = parseInt(line.attr(`${path}1`)) || 0
  line
    .attr(`${path}1`, start + ((position[path] - start) * progress))
    .attr(`${path}2`, start + ((position[path] - start) * progress))
}
