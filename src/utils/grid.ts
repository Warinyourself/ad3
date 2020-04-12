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

export function generateGrid(gridSettings: IGridSettings) {
  const { margin, height, width, x, y } = gridSettings

  const grid = g => g
    .attr('stroke', 'currentColor')
    .attr('stroke-opacity', 0.1)
    .call(g => g.append('g')
      .selectAll('line')
      .data(x.ticks())
      .join('line')
      .attr('x1', d => 0.5 + x(d))
      .attr('x2', d => 0.5 + x(d))
      .attr('y1', margin.top)
      .attr('y2', height - margin.bottom))
    .call(g => g.append('g')
      .selectAll('line')
      .data(y.ticks())
      .join('line')
      .attr('y1', d => 0.5 + y(d))
      .attr('y2', d => 0.5 + y(d))
      .attr('x1', margin.left)
      .attr('x2', width - margin.right))

  return grid
}
