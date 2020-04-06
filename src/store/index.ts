import Vue from 'vue'
import Vuex from 'vuex'

import { SettingsState } from './settings/SettingsModule'
import { PageState } from './page/PageModule'

Vue.use(Vuex)

export interface RootState {
  settings: SettingsState
  page: PageState
}

// // Declare empty store first, dynamically register all modules later.
export default new Vuex.Store<RootState>({})
