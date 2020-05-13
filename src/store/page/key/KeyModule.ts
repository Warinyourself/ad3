import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import { BlockModule } from '@/store/page/block/BlockModule'
import { TAppRoute } from '@/router'
import store from '@/store'

export interface KeyState {
  keybinds: Array<String>
}

@Module({ dynamic: true, store, name: 'key' })
class Key extends VuexModule implements KeyState {
  keybinds = []

  @Mutation
  SET_STATE_KEY<S extends this, K extends keyof this>({ key, value }: { key: K, value: S[K] }) {
    this[key] = value
  }

  @Action
  handleKeypress(event) {
    const { key, keyCode, shiftKey } = event
    const { blocks } = BlockModule
    const block = blocks.find(block => block.activator === key)
    const isEscape = event.which === 27 || event.key === 'Escape'

    if (isEscape) {
      BlockModule.DELETE_LATEST()
    } else if (block) {
      BlockModule.toggleViewBlock(block.id)
    }
  }
}

export const KeyModule = getModule(Key)
