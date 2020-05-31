import { generateData } from './data'
import { generateRadar } from './radar'
import { generateAxis, AxisOptions } from './axis'
import { generateLine, initLinePosition, generateGrid, GridOptions } from './line'

export { generateRadar, generateAxis, generateData, generateLine, initLinePosition, generateGrid }

type ChartTypes = 'line' | 'bar' | 'area' | 'radar' | 'pie' | 'arc' | 'chord'

interface ConstructorAD3 {
  type: ChartTypes,
  data: any
  options: {
    grid?: GridOptions
    axes: {
      x: AxisOptions
      y: AxisOptions
    }
  }
}

export class ad3 {
  constructor(ctx: any, options: ConstructorAD3) {
    console.log('asdf')
  }
}
