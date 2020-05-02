import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'

import { ITheme } from './ThemeModels'
import { ColorModule } from '@/store/color/ColorModule'
import { TColorArray } from '@/store/color/ColorModels'

export interface ThemeState {
  theme: String
  themes: Array<ITheme>
}

@Module({ dynamic: true, store, name: 'page/themes' })
class Theme extends VuexModule implements ThemeState {
  theme = 'dark'
  themes: Array<ITheme> = [
    {
      name: 'dark',
      active: '#04ded4',
      second: '#ff1c76',
      third: '#91e60a',
      bg: '#19102e'
    },
    {
      name: 'light',
      active: '#fc5185',
      second: '#ffcf7c',
      third: '#6886c5',
      bg: '#f4eeff'
    }
  ]

  get currentTheme() {
    return this.themes.find(theme => theme.name === this.theme) || this.themes[0]
  }

  get isDarkTheme() {
    const HSL = ColorModule.convertToHsl(this.currentTheme.bg, { view: 'array' }) as TColorArray
    return HSL[2] < 50
  }

  @Mutation
  SET_STATE_THEME<S extends this, K extends keyof this>({ key, value }: { key: K, value: S[K] }) {
    this[key] = value
  }

  @Action
  updateTheme(themeName: string) {
    const theme = this.themes.find(theme => theme.name === themeName)
    if (!theme) {
      console.error('Not found theme')
      return null
    }
    const { name, ...colors } = theme
    this.SET_STATE_THEME({ key: 'theme', value: name })

    ColorModule.setTheme(colors)
  }
}

export const ThemeModule = getModule(Theme)
