import { KeyModule } from '@/store/page/key/KeyModule'
import { UtilsModule } from '@/store/utils/UtilsModule'

export const keybind = {
  props: {
    keybinds: {
      type: Array,
      required: true
    }
  },
  computed: {
    innerKeybinds() {
      return this.keybinds.map(keybind => {
        if (!keybind.id) {
          keybind.id = UtilsModule.getUUID()
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
  methods: {
    initKeybinds() {
      KeyModule.ADD_KEYBIND(this.innerKeybinds)
      // alert('hello')
      console.log(this)
      console.log({ keybinds: this.innerKeybinds })
      console.log('hello from mixin!')
    }
  }
}
