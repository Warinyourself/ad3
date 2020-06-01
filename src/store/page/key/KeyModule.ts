import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import { BlockModule } from '@/store/page/block/BlockModule'

import { IKeybindEvent, IKeybind } from '@/types'

import store from '@/store'
import { Prop } from 'vue-property-decorator'

export interface KeyState {
  keybinds: Array<IKeybind>
  lastEvent: IKeybindEvent
}

@Module({ dynamic: true, store, name: 'key' })
class Key extends VuexModule implements KeyState {
  keybinds: Array<IKeybind> = []
  lastEvent = {} as IKeybindEvent

  get parseKey() {
    return (key: string) => {
      return key.split('|').map(key => key.trim())
    }
  }

  @Mutation
  SET_STATE_KEY<S extends this, K extends keyof this>({ key, value }: { key: K, value: S[K] }) {
    this[key] = value
  }

  @Mutation
  ADD_KEYBINDS(keybinds: Array<IKeybind>) {
    this.keybinds.push(...keybinds)
  }

  @Mutation
  DELETE_KEYBINDS(ids: Array<string>) {
    this.keybinds = this.keybinds.filter((key) => !ids.includes(key.id))
  }

  @Action
  handleKeypress(event: KeyboardEvent) {
    const { key, keyCode, shiftKey } = event
    const { blocks } = BlockModule

    const block = blocks.find(block => block.activator === key)
    const isEscape = event.which === 27 || event.key === 'Escape'

    this.SET_STATE_KEY({ key: 'lastEvent', value: { key, code: keyCode, shiftKey } })

    if (this.keybinds.length) {
      this.keybinds.forEach(keybind => {
        const keys = this.parseKey(keybind.key)

        if (keys.includes(key)) {
          keybind.callback()
        }
      })
    }

    if (isEscape) {
      BlockModule.CLOSE_LATEST()
    } else if (block) {
      BlockModule.toggleViewBlock(block.id)
    }
  }
}

export const KeyModule = getModule(Key)
