type FilterTypes = 'drop-shadow' | 'blur'

export interface GenerateFilterOptions {
  type: FilterTypes
  color?: string
  x?: number
  y?: number
  opacity?: number
  blur?: number
}

export function generateFilter(options: GenerateFilterOptions) {
  let { color, x, y, opacity, blur, type } = {
    type: options.type,
    color: options.color || 'white',
    x: options.x || 0,
    y: options.y || 0,
    opacity: options.opacity || 1,
    blur: options.blur || 10
  }

  const filter = (g: any) => {
    if (type === 'drop-shadow') {
      g.append('defs')
        .append('filter')
        .attr('id', 'drop-shadow')
        .append('feDropShadow')
        .attr('dy', y)
        .attr('dx', x)
        .attr('stdDeviation', blur)
        .attr('flood-color', color)
        .attr('flood-opacity', opacity)
    } else if (type === 'blur') {
      g.append('defs')
        .append('filter')
        .attr('id', 'blur')
        .append('feGaussianBlur')
        .attr('stdDeviation', blur)
    }
  }

  return filter
}
