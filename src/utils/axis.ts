import * as d3 from 'd3'

interface IAxisSettings {
  domain: [number, number]
  range: [number, number]
  ticks: number
  translate: string
  type?: 'axisBottom' | 'axisLeft'
  domainOffset?: number
}

export function generateAxis(axiosSettings: IAxisSettings): [d3.ScaleLinear<number, number>, (g: any) => any, [number, number]] {
  let { domain, range, ticks, translate, domainOffset, type } = axiosSettings

  if (domainOffset) {
    domain = [domain[0] - domain[1] * domainOffset, domain[1] + domain[1] * domainOffset]
  }

  const line = d3.scaleLinear()
    .domain(domain)
    .range(range)

  const axis = (g: any) => g
    .attr('transform', translate)
    .call(
      d3[type || 'axisBottom'](line)
        .ticks(ticks)
        .tickPadding(6)
    )
    .call(g => g.selectAll('.domain, .tick line').remove())

  return [line, axis, domain]
}
