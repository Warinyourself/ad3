import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'

import { IActiveBlock } from '@/types'
import { BlockModule } from '@/store/page/block/BlockModule'

@Component
export default class AppActiveBlock extends Vue {
  @Prop({ type: Object, required: true }) block!: IActiveBlock

  get classes() {
    const classes: { [key: string]: boolean } = {
      'app-block': true
    }

    if (this.isActive) {
      classes['app-block--active'] = true
    }

    return classes
  }

  render(h: CreateElement): VNode {
    return h('div', {
      class: this.classes,
      on: {
        click: this.onClick
      }
    }, [
      this.isActive && h('div', this.$slots.default)
    ])
  }

  get isActive() {
    return BlockModule.isActiveBlock(this.block.id)
  }

  mounted() {
    BlockModule.ADD_BLOCK(this.block)
  }

  onClick() {
    console.log('Click on active block')
  }
}
