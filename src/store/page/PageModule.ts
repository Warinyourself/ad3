import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import { TAppRoute } from '@/router'
import store from '@/store'

export interface PageState {
  route: TAppRoute | undefined
}

@Module({ dynamic: true, store, name: 'page' })
class Page extends VuexModule implements PageState {
  route: TAppRoute | undefined = undefined

  @Mutation
  SET_STATE_PAGE<S extends this, K extends keyof this>({ key, value }: { key: K, value: S[K] }) {
    this[key] = value
  }

  get layout() {
    return (this.route && this.route.meta.layout) || 'default'
  }

  get isMainPage() {
    return this.route && this.route.name === 'index'
  }
}

export const PageModule = getModule(Page)
