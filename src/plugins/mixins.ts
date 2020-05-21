import { KeyModule } from '@/store/page/key/KeyModule'

export const keybind = {
  props: {
    keybinds: {
      type: Array,
      required: true
    }
  },
  computed: {
    innerKeybinds() {
      return this.keybinds.map((keybind, i) => {
        if (!keybind.id) {
          keybind.id = `${keybind.key}-${keybind.callback}-${i}`
        }
        if (typeof keybind.callback === 'string' && this[keybind.callback]) {
          keybind.callback = this[keybind.callback]
        }

        return keybind
      })
    }
  },
  created() {
    this.initKeybinds()
  },
  beforeDestroy() {
    KeyModule.DELETE_KEYBINDS(this.innerKeybinds.map(({ id }) => id))
  },
  methods: {
    initKeybinds() {
      KeyModule.ADD_KEYBINDS(this.innerKeybinds)
      console.log({ keybinds: this.innerKeybinds })
      console.log('hello from mixin!')
    }
  }
}
