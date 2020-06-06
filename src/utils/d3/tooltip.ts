import { generateLine, IUpdateLinePosition, IMargin, ILinePosition } from './line'
import * as d3 from 'd3'

interface TooltipOptions {
  width: number
  height: number
  margin: IMargin
  showPicker?: boolean
}

export function generateTooltip(options: TooltipOptions) {
  let { width, height, margin, showPicker } = options
  showPicker = showPicker === undefined ? true : showPicker

  const lineX = generateLine({
    position: [margin.left, margin.left, margin.top, height - margin.bottom],
    attrs: [['id', 'tooltip-line-x'], ['stroke', 'var(--color-active)'], ['stroke-opacity', '0.6'], ['opacity', '0']]
  })

  const lineY = generateLine({
    position: [margin.left, width - margin.right, margin.top, margin.top],
    attrs: [['id', 'tooltip-line-y'], ['stroke', 'var(--color-active)'], ['stroke-opacity', '0.6'], ['opacity', '0']]
  })

  const picker = showPicker ? generatePicker() : undefined

  const animate = initLinePosition()

  return { lineY, lineX, picker, animate }
}

export function generatePicker() {
  return (g: any) => {
    const size = 8

    g.append('rect')
      .attr('width', size)
      .attr('height', size)
      .attr('x', (size / 2) * -1)
      .attr('y', (size / 2) * -1)
      .attr('fill', 'var(--color-active)')
      .attr('rx', size)
      .attr('translate', '1s')
      .attr('id', 'pointer')
  }
}

export function initLinePosition() {
  let oldPosition: ILinePosition = { x: 0, y: 0 }

  return (update: IUpdateLinePosition) => {
    const { position, svg } = update

    if (oldPosition.x !== position.x) {
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

let point = -2 * Math.PI
let prePoint = 0

// Updates position of marker.
function update({ data, line, path, marker, position: nextPoint }) {
  if (point === nextPoint || nextPoint === prePoint) {
    return
  }

  line.defined((d, i) => {
    // eslint-disable-next-line no-mixed-operators
    return i <= nextPoint && i >= point || i <= point && i >= nextPoint
  })

  // Update path.
  path.attr('d', line)

  // Transition marker from point to nextPoint.
  marker.transition().duration(1500)
    .attrTween('transform', nextPoint > point ? translateRight(path.node()) : translateLeft(path.node()))
    .on('end', () => { point = nextPoint; prePoint = 0 })
}

function translateRight(node: SVGPathElement) {
  const l = node.getTotalLength()
  return () => {
    return (t: number) => {
      const p = node.getPointAtLength(t * l)
      return `translate(${p.x}, ${p.y})`
    }
  }
}

function translateLeft(node: SVGPathElement) {
  const l = node.getTotalLength()
  return () => {
    return (t: Event) => {
      const p = node.getPointAtLength((1 - t) * l)
      return `translate(${p.x}, ${p.y})`
    }
  }
}
