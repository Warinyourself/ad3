import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import { TAppRoute } from '@/router'
import { IActiveBlock } from '@/types'
import store from '@/store'

export interface PageState {
  route: TAppRoute | undefined
  activeBlocks: Array<IActiveBlock>,
  activeBlockLinks: Array<String>
}

@Module({ dynamic: true, store, name: 'page' })
class Page extends VuexModule implements PageState {
  route: TAppRoute | undefined = undefined
  activeBlocks: Array<IActiveBlock> = []
  activeBlockLinks: Array<string> = []

  @Mutation
  SET_PAGE_STATE<T extends this, P extends keyof this>({ key, value }: { key: P, value: T[P] }) {
    this[key] = value
  }

  @Mutation
  UPDATE_ACTIVE_BLOCK(block: IActiveBlock) {
    this.activeBlocks = [ block ]
    this.activeBlockLinks = [ block.id ]
  }

  get layout() {
    return (this.route && this.route.meta.layout) || 'default'
  }

  get onMainPage() {
    return this.route && this.route.name === 'index'
  }

  get getActiveBlock() {
    const findById = (array: Array<IActiveBlock>, id: string) => array.find(block => block.id === id)
    let currentBlock: IActiveBlock | undefined
    let isExist: Boolean = true

    this.activeBlockLinks.forEach((link, index) => {
      if (isExist) {
        let findingBlocks = index === 0 ? this.activeBlocks : currentBlock ? currentBlock.children : undefined
        currentBlock = findingBlocks ? findById(findingBlocks, link) : undefined && (isExist = false)
      }
    })

    return currentBlock
  }
}

export const PageModule = getModule(Page)
