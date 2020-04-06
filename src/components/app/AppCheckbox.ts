import { Component, Prop, Vue } from 'vue-property-decorator'
import { CreateElement, VNode } from 'vue/types'

@Component({
  name: 'AppCheckbox'
})
export default class extends Vue {
  isActive = false

  get classes() {
    const classes: { [key: string]: boolean } = {
      'app-checkbox': true
    }

    if (this.isActive) {
      classes['app-checkbox--active'] = true
    }

    return classes
  }

  render(h: CreateElement): VNode {
    return h('div', {
      class: this.classes,
      on: {
        click: this.toggleCheckbox
      }
    }, [
      h('div', { class: 'app-checkbox__toggle' })
    ])
  }

  toggleCheckbox() {
    this.isActive = !this.isActive
    this.$emit('change', this.isActive)
  }
}
