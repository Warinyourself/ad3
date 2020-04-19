import * as d3 from 'd3'
import { animate } from '@/utils/animation'

interface IMargin {
  top: number
  right: number
  bottom: number
  left: number
}

interface IGridSettings {
  margin: IMargin
  width: number
  height: number
  y: d3.ScaleLinear<number, number>
  x: d3.ScaleLinear<number, number>
}

interface ILineSettings {
  position: [number | null, number | null, number | null, number | null]
  attrs: Array<[string, string]>
}

interface ILinePosition {
  x: number
  y: number
}

interface IUpdateLinePosition {
  animationCallback: (progress: number) => any,
  position: ILinePosition,
  duration: number
}

export function generateGrid(gridSettings: IGridSettings) {
  const { margin, height, width, x, y } = gridSettings

  const grid = (g: any) => g
    .attr('stroke', 'currentColor')
    .attr('stroke-opacity', 0.1)
    .call(g => g.append('g')
      .selectAll('line')
      .data(x.ticks())
      .join('line')
      .attr('x1', (d: number) => 0.5 + x(d))
      .attr('x2', (d: number) => 0.5 + x(d))
      .attr('y1', margin.top)
      .attr('y2', height - margin.bottom))
    .call(g => g.append('g')
      .selectAll('line')
      .data(y.ticks())
      .join('line')
      .attr('y1', (d: number) => 0.5 + y(d))
      .attr('y2', (d: number) => 0.5 + y(d))
      .attr('x1', margin.left)
      .attr('x2', width - margin.right))

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
    const { position } = update

    if (oldPosition.x !== position.x) {
      oldPosition = position
      animate({
        duration: 400,
        timing: (time: number) => time,
        draw: (progress: number) => {
          generateTransition('x', progress, position)
          generateTransition('y', progress, position)
        }
      })
    }
  }
}

const generateTransition = (path: 'x' | 'y', progress: number, position: ILinePosition) => {
  const line = d3.select(`#tooltip-line-${path}`)
  const start = parseInt(line.attr(`${path}1`)) || 0
  line
    .attr(`${path}1`, start + ((position[path] - start) * progress))
    .attr(`${path}2`, start + ((position[path] - start) * progress))
}
