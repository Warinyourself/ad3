type FilterTypes = 'drop-shadow' | 'drop-shadow-native' | 'blur'

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
    switch (type) {
      case 'drop-shadow': {
        const filter = g.append('defs')
          .append('filter')
          .attr('id', 'drop-shadow')

        filter
          .append('feGaussianBlur')
          .attr('in', 'SourceAlpha')
          .attr('stdDeviation', blur)

        filter
          .append('feOffset')
          .attr('dy', y)
          .attr('dx', x)

        const merge = filter
          .append('feMerge')

        merge
          .append('feMergeNode')

        merge
          .append('feMergeNode')
          .attr('in', 'SourceGraphic')
        break
      }
      case 'drop-shadow-native':
        g.append('defs')
          .append('filter')
          .attr('id', 'drop-shadow-native')
          .append('feDropShadow')
          .attr('dy', y)
          .attr('dx', x)
          .attr('stdDeviation', blur)
          .attr('flood-color', color)
          .attr('flood-opacity', opacity)
        break
      case 'blur':
        g.append('defs')
          .append('filter')
          .attr('id', 'blur')
          .append('feGaussianBlur')
          .attr('stdDeviation', blur)
        break
    }
  }

  return filter
}
