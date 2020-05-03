import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'

import { ColorModule } from '@/store/color/ColorModule'

import * as d3 from 'd3'

const random = [10, 10, 25, 45, 15, 40, 15, 55, 10, 5, 10, 10, 5, 15, 35, 10, 20, 30, 25, 50]

function getGradID(d) {
  return 'linkGrad-' + d.source.index + '-' + d.target.index
}

function reorderChord(chord) {
  for (var i = 0; i < 15; i++) {
    let obj = chord[i]

    if (obj.source.index > obj.target.index) {
      let a = obj.source
      let b = obj.target

      obj.source = b
      obj.target = a
    }
  }
}

function updateMatrix() {
  let arr = []
  for (var i = 0; i < 6; i++) {
    arr[i] = []
    for (var j = 0; j < 6; j++) {
      let num = random[Math.floor(Math.random() * random.length)]
      if (j !== i) {
        arr[i].push(num)
      } else {
        arr[i].push(0)
      }
    }
  }
  return arr
}

@Component({
  name: 'ChordWidget'
})
export default class extends Vue {
  @Prop() settings!: any;

  render(h: CreateElement): VNode {
    return h('svg', { ref: 'svgChart' })
  }

  generateChartData() {
    const amountItems = Math.floor(Math.random() * 30) + 10
    return Array.from(Array(amountItems)).map(_ => {
      return { value: Math.floor(Math.random() * 35) + 10 }
    })
  }

  mounted() {
    const that = this
    const margin = { top: 20, right: 30, bottom: 30, left: 40 }
    const node = this.$refs.svgChart as HTMLElement
    const height = node.parentElement ? node.parentElement.offsetHeight : 100
    const width = node.parentElement ? node.parentElement.offsetWidth : 100
    let svg = d3.select(node as Element)
      .attr('width', width)
      .attr('height', height)
      .append('g')

    const colors = [ColorModule.active, ColorModule.second, '#ffe579', '#baf2a9', '#15bde8', '#b29de6']

    const wrapper = svg.append('g')
      .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ') rotate(75)')

    const outerRadius = Math.min(width, height) * 0.5 - 55
    const innerRadius = outerRadius - 25
    const arcs = d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(outerRadius)

    const chordGenerator = d3.chord()
      .padAngle(0.1)

    let matrix = updateMatrix()
    let chord = chordGenerator(matrix)
    reorderChord(chord)

    const color = d3.scaleOrdinal()
      .domain(d3.range(6))
      .range(colors)

    const ribbon = d3.ribbon()
      .radius(180)

    const grads = svg.append('defs')
      .selectAll('linearGradient')
      .data(chord)
      .enter()
      .append('linearGradient')
      .attr('id', getGradID)
      .attr('gradientUnits', 'userSpaceOnUse')
      .attr('x1', function(d, i) { return innerRadius * Math.cos((d.source.endAngle - d.source.startAngle) / 2 + d.source.startAngle - Math.PI / 2) })
      .attr('y1', function(d, i) { return innerRadius * Math.sin((d.source.endAngle - d.source.startAngle) / 2 + d.source.startAngle - Math.PI / 2) })
      .attr('x2', function(d, i) { return innerRadius * Math.cos((d.target.endAngle - d.target.startAngle) / 2 + d.target.startAngle - Math.PI / 2) })
      .attr('y2', function(d, i) { return innerRadius * Math.sin((d.target.endAngle - d.target.startAngle) / 2 + d.target.startAngle - Math.PI / 2) })

    // set the starting color (at 0%)
    grads.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', function(d) { return color(d.source.index) })

    // set the ending color (at 100%)
    grads.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', function(d) { return color(d.target.index) })

    // make ribbons
    const chords = wrapper.selectAll('path')
      .data(chord)
      .enter()
      .append('path')
      .attr('class', function(d) {
        return 'chord chord-' + d.source.index + ' chord-' + d.target.index
      })
      .style('fill', function(d) { return 'url(#' + getGradID(d) + ')' })
      .transition()
      .duration(2000)
      .attr('d', ribbon)

    // make arcs
    const g = wrapper.selectAll('g')
      .data(chord.groups)
      .enter()
      .append('g')
      .attr('class', 'group')

    g.append('path')
      .style('fill', function(d) { return color(d.index) })
      .attr('class', 'arc')
      .style('opacity', 1)
      .transition()
      .duration(2000)
      .attr('d', arcs)

    // while (true) {
    //   matrix = updateMatrix()
    //   chord = chordGenerator(matrix)
    //   reorderChord(chord)

    //   svg.selectAll('linearGradient')
    //     .data(chord)
    //     .transition()
    //     .duration(2000)
    //     .attr('x1', function(d, i) { return innerRadius * Math.cos((d.source.endAngle - d.source.startAngle) / 2 + d.source.startAngle - Math.PI / 2) })
    //     .attr('y1', function(d, i) { return innerRadius * Math.sin((d.source.endAngle - d.source.startAngle) / 2 + d.source.startAngle - Math.PI / 2) })
    //     .attr('x2', function(d, i) { return innerRadius * Math.cos((d.target.endAngle - d.target.startAngle) / 2 + d.target.startAngle - Math.PI / 2) })
    //     .attr('y2', function(d, i) { return innerRadius * Math.sin((d.target.endAngle - d.target.startAngle) / 2 + d.target.startAngle - Math.PI / 2) })

    //   svg.selectAll('.chord')
    //     .data(chord)
    //     .transition()
    //     .duration(2000)
    //     .attr('d', ribbon)

    //   svg.selectAll('.arc')
    //     .data(chord.groups)
    //     .transition()
    //     .duration(2000)
    //     .attr('d', arcs)

    //   yield svg.node()
    //   await Promises.tick(2000)
    // }
  }
}
