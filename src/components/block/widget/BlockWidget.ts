import { Component, Prop, Vue } from 'vue-property-decorator'
import { IWidgetBlock } from '@/types'
import { CreateElement, VNode } from 'vue/types'

import LineWidget from '@/components/block/widget/LineWidget'
import AreaWidget from '@/components/block/widget/AreaWidget'
import ArcWidget from '@/components/block/widget/ArcWidget'
import PieWidget from '@/components/block/widget/PieWidget'
import RadarWidget from '@/components/block/widget/RadarWidget'
import ChordWidget from '@/components/block/widget/ChordWidget'
import HistogramWidget from '@/components/block/widget/HistogramWidget'

import { PageModule } from '@/store/page/PageModule'
import { ThemeModule } from '@/store/page/theme/ThemeModule'

let isDoubleClick: any = false

@Component({
  name: 'WidgetBlock',
  components: {
    PieWidget,
    ArcWidget,
    LineWidget,
    AreaWidget,
    RadarWidget,
    ChordWidget,
    HistogramWidget
  }
})
export default class extends Vue {
  @Prop({ type: Object, required: true }) block!: IWidgetBlock;
  @Prop({ type: Boolean, default: false }) needRedirect!: boolean;

  render(h: CreateElement): VNode {
    let child: VNode | string
    child = h('component', {
      is: this.block.component,
      key: ThemeModule.theme,
      props: {
        settings: this.block
      }
    })
    if ((child as any).tag === this.block.component) {
      child = 'Component not found'
    }

    return h('div',
      {
        style: (this.isActiveBlock ? `box-shadow: 0 0 7px 0px var(${this.block.color || '--color-active'});` : ''),
        on: { click: this.handleClick },
        class: this.classes
      }, [ child ])
  }

  get classes() {
    const classes: any = {}
    const pre = 'widget-block'
    classes[pre] = true
    classes[`${pre}-width-${this.block.size[0]}`] = true
    classes[`${pre}-height-${this.block.size[1]}`] = true
    return classes
  }

  get isActiveBlock(): Boolean {
    const block = PageModule.getActiveBlock
    return block ? block.id === this.block.id : !!block
  }

  handleClick(event: Event) {
    const activeBlockId = PageModule.getActiveBlock && PageModule.getActiveBlock.id
    const canRoute = !this.block.noRedirect || isDoubleClick

    isDoubleClick = setTimeout(() => { isDoubleClick = false }, 250)

    if (this.block.id === activeBlockId && canRoute) {
      if (this.block.url) {
        this.$router.push(this.block.url)
      }
      return
    }

    PageModule.UPDATE_ACTIVE_BLOCK({
      id: this.block.id,
      title: this.block.title
    })
  }
}
