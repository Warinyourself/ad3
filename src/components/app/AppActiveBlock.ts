import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'

import { IActiveBlock, IKeybind } from '@/types'
import { BlockModule } from '@/store/page/block/BlockModule'

@Component
export default class AppActiveBlock extends Vue {
  @Prop({ type: Object, required: true }) block!: IActiveBlock
  @Prop({ type: Array }) keybinds!: Array<IKeybind>

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
          }
        }, this.$slots.default)
      ])
    ])
  }

  get isActive() {
    return BlockModule.isActiveBlock(this.block.id) || this.block.hasActivator === false
  }

  mounted() {
    if (this.block.hasActivator !== false) {
      BlockModule.ADD_BLOCK(this.block)
    }
  }

  onClick() {
    this.block.on && this.block.on.click && this.block.on.click()
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
