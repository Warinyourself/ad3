import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'

import { AD3, generateData } from '@/utils/d3'

@Component({
  name: 'LineWidget'
})
export default class extends Vue {
  @Prop() settings!: any;

  render(h: CreateElement): VNode {
    return h('svg', { ref: 'svgChart' })
  }

  mounted() {
    const margin = { top: 20, right: 30, bottom: 30, left: 40 }
    const node = this.$refs.svgChart as HTMLElement
    const height = node.parentElement ? node.parentElement.offsetHeight : 100
    const width = node.parentElement ? node.parentElement.offsetWidth : 100

    const chart = new AD3(node, {
      type: 'line',
      data: generateData({ max: 12 }),
      ...this.settings,
      options: {
        height,
        width,
        margin,
        ...this.settings.options
      }
    })
  }
}
