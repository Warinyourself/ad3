import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import { TAppRoute } from '@/router'
import { IActiveBlock } from '@/types'
import store from '@/store'

export interface BlockState {
  blocks: Array<IActiveBlock>,
  activeBlocks: Array<ActiveBlock>,
}

interface ActiveBlock {
  id: string
  group?: string
}

@Module({ dynamic: true, store, name: 'block' })
class Block extends VuexModule implements BlockState {
  blocks: Array<IActiveBlock> = []
  activeBlocks: Array<ActiveBlock> = []

  @Mutation
  SET_STATE_BLOCK<S extends this, K extends keyof this>({ key, value }: { key: K, value: S[K] }) {
    this[key] = value
  }

  @Mutation
  ADD_BLOCK(block: IActiveBlock) {
    this.blocks.push(block)
  }

  @Mutation
  ACTIVATE_BLOCK(id: string) {
    const block = this.blocks.find(block => id === block.id)
    if (block) {
      this.activeBlocks.push(block)
    }
  }

  @Mutation
  HIDE_BLOCK(id: string) {
    this.activeBlocks = this.activeBlocks.filter(block => block.id !== id)
  }

  @Mutation
  UPDATE_ACTIVE_BLOCK(block: IActiveBlock) {
    const { id, group } = block
    this.activeBlocks.push({ id, group })
  }

  get isActiveBlock() {
    return (id: string) => {
      return this.activeBlocks.find(block => block.id === id)
    }
  }

  get getFullActiveBlock() {
    return (id: string) => {
      return this.blocks.find(block => block.id === id)
    }
  }

  get getFullActiveBlocks() {
    return this.activeBlocks.forEach((block) => this.getFullActiveBlock(block.id))
  }

  get getActiveBlock() {
    return (options?: any) => {
      const { group } = options || {}
      const getFullBlock = (block: ActiveBlock, blocks: Array<IActiveBlock>) => {
        const { id } = block || {}

        return blocks.reverse().find(b => b.id === id)
      }

      if (group) {
        const fullBlocksArray = this.blocks.filter(block => block.group === group)
        const blocksArray = this.activeBlocks.filter(block => block.group === group)

        return getFullBlock(blocksArray[blocksArray.length - 1], fullBlocksArray)
      }
      return getFullBlock(this.activeBlocks[this.activeBlocks.length - 1], this.blocks)
    }
  }

  @Action
  toggleViewBlock(id: string) {
    if (this.isActiveBlock(id)) {
      this.HIDE_BLOCK(id)
    } else {
      this.ACTIVATE_BLOCK(id)
    }
  }
}

export const BlockModule = getModule(Block)
