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
      second: '#fc5095',
      third: '#91e60a',
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
  SET_THEME_STATE<T extends this, P extends keyof this>({ key, value }: { key: P, value: T[P] }) {
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
    this.SET_THEME_STATE({ key: 'theme', value: name })

    ColorModule.setTheme(colors)
  }
}

export const ThemeModule = getModule(Theme)
