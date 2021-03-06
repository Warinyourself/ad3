import * as d3 from 'd3'

export function generateRadar(data, options) {
  function wrap(text, width) {
    text.each(function() {
      let text = d3.select(this)
      let words = text
        .text()
        .split(/\s+/)
        .reverse()
      let word
      let line = []
      let lineNumber = 0
      let lineHeight = 1.4 // ems
      let y = text.attr('y')
      let x = text.attr('x')
      let dy = parseFloat(text.attr('dy'))
      let tspan = text
        .text(null)
        .append('tspan')
        .attr('x', x)
        .attr('y', y)
        .attr('fill', 'var(--color-fg)')
        .attr('dy', dy + 'em')

      while ((word = words.pop())) {
        line.push(word)
        tspan.text(line.join(' '))
        if (tspan.node().getComputedTextLength() > width) {
          line.pop()
          tspan.text(line.join(' '))
          line = [word]
          tspan = text
            .append('tspan')
            .attr('x', x)
            .attr('y', y)
            .attr('dy', ++lineNumber * lineHeight + dy + 'em')
            .text(word)
        }
      }
    })
  }

  const cfg = {
    w: 600, // Width of the circle
    h: 600, // Height of the circle
    margin: { top: 20, right: 20, bottom: 20, left: 20 }, // The margins of the SVG
    levels: 3, // How many levels or inner circles should there be drawn
    maxValue: 0, // What is the value that the biggest circle will represent
    labelFactor: 1.25, // How much farther than the radius of the outer circle should the labels be placed
    wrapWidth: 60, // The number of pixels after which a label needs to be given a new line
    opacityArea: 0.15, // The opacity of the area of the blob
    dotRadius: 4, // The size of the colored circles of each blog
    opacityCircles: 0.035, // The opacity of the circles of each blob
    strokeWidth: 2, // The width of the stroke around each blob
    roundStrokes: false, // If true the area and stroke will follow a round path (cardinal-closed)
    indicating: false, // Text indicating at what % each level is
    color: d3.scaleOrdinal(d3.schemeCategory10) // Color function
  }

  // Put all of the options into a variable called cfg
  if (typeof options !== 'undefined') {
    for (let i in options) {
      if (typeof options[i] !== 'undefined') {
        cfg[i] = options[i]
      }
    }
  }

  // If the supplied maxValue is smaller than the actual one, replace by the max in the data
  let maxValue = Math.max(
    cfg.maxValue,
    d3.max(data, (i) => d3.max(i.map((o) => o.value)))
  )

  const allAxis = data[0].map((i) => i.axis) // Names of each axis
  const total = allAxis.length // The number of different axes
  const radius = Math.min(cfg.w / 2.6, cfg.h / 2.6) // Radius of the outermost circle
  const Format = d3.format('%') // Percentage formatting
  const angleSlice = (Math.PI * 2) / total // The width in radians of each "slice"

  // Scale for the radius
  let rScale = d3
    .scaleLinear()
    .range([0, radius])
    .domain([0, maxValue])

  // Create the container SVG and g

  // Calculate width and height
  const height = cfg.h + cfg.margin.top + cfg.margin.bottom
  const width = cfg.w + cfg.margin.left + cfg.margin.right

  // Initiate the radar chart SVG
  const { svg } = options

  // Append a g element
  const g = svg
    .append('g')
    .attr('transform', `translate(${(cfg.w / 2 + cfg.margin.left)}, ${(cfg.h / 2 + cfg.margin.top)})`)

  // Glow filter for some extra pizzazz
  // Filter for the outside glow
  const filter = g
    .append('defs')
    .append('filter')
    .attr('id', 'glow')
  const feGaussianBlur = filter
    .append('feGaussianBlur')
    .attr('stdDeviation', '2.5')
    .attr('result', 'coloredBlur')
  const feMerge = filter.append('feMerge')
  const feMergeNode1 = feMerge.append('feMergeNode').attr('in', 'coloredBlur')
  const feMergeNode2 = feMerge.append('feMergeNode').attr('in', 'SourceGraphic')

  // Draw the Circular grid
  // Wrapper for the grid & axes
  const axisGrid = g.append('g').attr('class', 'axisWrapper')

  // Draw the background circles
  axisGrid
    .selectAll('.levels')
    .data(d3.range(1, cfg.levels + 1).reverse())
    .enter()
    .append('circle')
    .attr('class', 'gridCircle')
    .attr('r', (d) => (radius / cfg.levels) * d)
    .style('fill', 'var(--color-active)')
    .style('stroke', 'var(--color-active)')
    .style('fill-opacity', cfg.opacityCircles)
    .style('stroke-opacity', '0.3')
    .style('filter', 'url(#glow)')

  // Text indicating at what % each level is
  if (cfg.indicating) {
    axisGrid
      .selectAll('.axisLabel')
      .data(d3.range(1, cfg.levels + 1).reverse())
      .enter()
      .append('text')
      .attr('class', 'axisLabel')
      .attr('x', 4)
      .attr('y', (d) => (-d * radius) / cfg.levels)
      .attr('dy', '0.4em')
      .style('font-size', '10px')
      .attr('fill', 'var(--color-fg)')
      .text((d) => Format((maxValue * d) / cfg.levels))
  }

  // Draw the axes
  // Create the straight lines radiating outward from the center
  const axis = axisGrid
    .selectAll('.axis')
    .data(allAxis)
    .enter()
    .append('g')
    .attr('class', 'axis')

  // Append the lines
  axis
    .append('line')
    .attr('x1', 0)
    .attr('y1', 0)
    .attr('x2', (_, i) => rScale(maxValue * 1.1) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('y2', (_, i) => rScale(maxValue * 1.1) * Math.sin(angleSlice * i - Math.PI / 2))
    .attr('class', 'line')
    .style('stroke', 'var(--color-active)')
    .style('stroke-opacity', '0.45')
    .style('stroke-width', '1px')

  // Append the labels at each axis
  axis
    .append('text')
    .attr('class', 'legend')
    .style('font-size', '11px')
    .attr('text-anchor', 'middle')
    .attr('fill', 'var(--color-fg)')
    .attr('dy', '0.35em')
    .attr('x', (_, i) => rScale(maxValue * cfg.labelFactor) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('y', (_, i) => rScale(maxValue * cfg.labelFactor) * Math.sin(angleSlice * i - Math.PI / 2))
    .text((d) => d)
    .call(wrap, cfg.wrapWidth)
    .attr('fill', 'var(--color-fg)')

  // Draw the radar chart blobs
  // The radial line function
  const radarLine = d3
    .lineRadial()
    .curve(d3.curveBasisClosed)
    .radius((d) => rScale(d.value))
    .angle((d, i) => i * angleSlice)

  if (cfg.roundStrokes) {
    radarLine.curve(d3.curveCardinalClosed)
  }

  // Create a wrapper for the blobs
  const blobWrapper = g
    .selectAll('.radarWrapper')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'radarWrapper')

  // Append the backgrounds
  blobWrapper
    .append('path')
    .attr('class', 'radarArea')
    .attr('d', (d, i) => radarLine(d))
    .style('fill', (d, i) => cfg.color(i))
    .style('fill-opacity', cfg.opacityArea)
    .on('mouseover', (d, i) => {
      // Dim all blobs
      d3.selectAll('.radarArea')
        .transition()
        .duration(200)
        .style('fill-opacity', 0.1)
      // Bring back the hovered over blob
      d3.select(this)
        .transition()
        .duration(200)
        .style('fill-opacity', 0.7)
    })
    .on('mouseout', () => {
      // Bring back all blobs
      d3.selectAll('.radarArea')
        .transition()
        .duration(200)
        .style('fill-opacity', cfg.opacityArea)
    })

  // Create the outlines
  blobWrapper
    .append('path')
    .attr('class', 'radarStroke')
    .attr('d', (d, _) => radarLine(d))
    .style('stroke-width', cfg.strokeWidth + 'px')
    .style('stroke', (_, i) => cfg.color(i))
    .style('fill', 'none')
    .style('filter', 'url(#glow)')

  // Append the circles
  blobWrapper
    .selectAll('.radarCircle')
    .data((d) => d)
    .enter()
    .append('circle')
    .attr('class', 'radarCircle')
    .attr('r', cfg.dotRadius)
    .attr('cx', (d, i) => rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2))
    .attr('cy', (d, i) => rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2))
    .style('fill', (d) => 'var(--color-active)')
    .style('fill-opacity', 0.75)

  // Append invisible circles for tooltip
  // Wrapper for the invisible circles on top
  const blobCircleWrapper = g
    .selectAll('.radarCircleWrapper')
    .data(data)
    .enter()
    .append('g')
    .attr('class', 'radarCircleWrapper')
    .style('fill', (d, i) => cfg.color(i))

  // Append a set of invisible circles on top for the mouseover pop-up
  blobCircleWrapper
    .selectAll('.radarInvisibleCircle')
    .data((d) => d)
    .enter()
    .append('circle')
    .attr('class', 'radarInvisibleCircle')
    .attr('r', cfg.dotRadius)
    .attr('cx', (d, i) => {
      return rScale(d.value) * Math.cos(angleSlice * i - Math.PI / 2)
    })
    .attr('cy', (d, i) => {
      return rScale(d.value) * Math.sin(angleSlice * i - Math.PI / 2)
    })
    .style('pointer-events', 'all')
    .on('mouseover', (d, i) => {
      const newX = parseFloat(d3.select(this).attr('cx')) - 10
      const newY = parseFloat(d3.select(this).attr('cy')) - 10

      tooltip
        .attr('x', newX)
        .attr('y', newY)
        .attr('fill', 'white')
        .text(Format(d.value))
        .transition()
        .duration(200)
        .style('opacity', 1)
    })
    .on('mouseout', () => {
      tooltip
        .transition()
        .duration(200)
        .style('opacity', 0)
    })

  // Set up the small tooltip for when you hover over a circle
  const tooltip = g
    .append('text')
    .attr('class', 'tooltip')
    .style('opacity', 0)

  return svg.node()
}
