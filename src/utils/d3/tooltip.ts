import { generateLine, initLinePosition, generateGrid, GridOptions, IMargin } from './line'

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

  return { lineY, lineX, picker }
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
      .attr('id', 'pointer')
  }
}
