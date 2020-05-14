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
    return h('div', { class: this.classes }, [
      h('transition', {
        props: { name: 'expand' },
        on: {
          enter: this.enter,
          afterEnter: this.afterEnter,
          leave: this.leave
        }
      }, [
        this.isActive && h('div', {
          on: {
            click: this.onClick
          },
          directives: [
            {
              name: 'click-outside',
              value: this.clickOutside
            }
          ]
        }, this.$slots.default)
      ])
    ])
  }

  get isActive() {
    return BlockModule.isActiveBlock(this.block.id)
  }

  clickOutside() {
    BlockModule.CLOSE_LATEST()
  }

  mounted() {
    BlockModule.ADD_BLOCK(this.block)
  }

  onClick() {
    console.log('Handle click on active block')
  }

  enter(element) {
    const { width } = getComputedStyle(element)

    element.style.width = width
    element.style.position = 'absolute'
    element.style.visibility = 'hidden'
    element.style.height = 'auto'

    let { height } = getComputedStyle(element)

    element.style.width = null
    element.style.position = null
    element.style.visibility = null
    element.style.height = 0

    // Trigger the animation.
    // We use `requestAnimationFrame` because we need
    // to make sure the browser has finished
    // painting after setting the `height`
    // to `0` in the line above.
    requestAnimationFrame(() => {
      element.style.height = height
    })
  }

  afterEnter(element) {
    element.style.height = 'auto'
  }

  leave(element) {
    let height = getComputedStyle(element).height

    element.style.height = height

    requestAnimationFrame(() => {
      element.style.height = 0
    })
  }
}
