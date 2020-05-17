import { Module, VuexModule, getModule, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'

import { ITheme } from '@/store/page/theme/ThemeModels'
import { ColorModule } from '@/store/color/ColorModule'
import { TColorArray } from '@/store/color/ColorModels'

export interface ThemeState {
  theme: String
  mode: String
  themes: Array<ITheme>
}

@Module({ dynamic: true, store, name: 'themes' })
class Theme extends VuexModule implements ThemeState {
  theme = 'dark'
  mode = 'light'
  themes: Array<ITheme> = [
    {
      name: 'dark',
      active: '#04ded4',
      second: '#ff1c76',
      third: '#91e60a',
      bg: '#19102e'
    },
    {
      name: '171392',
      active: '#00a8cc',
      second: '#ff1c76',
      third: '#91e60a',
      bg: '#142850'
    },
    {
      name: '177866',
      active: '#cae8d5',
      second: '#84a9ac',
      third: '#3b6978',
      bg: '#204051'
    },
    {
      name: 'light',
      active: '#fc5185',
      second: '#ffcf7c',
      third: '#6886c5',
      bg: '#f4eeff'
    },
    {
      name: '174976',
      active: '#424874',
      second: '#ffcf7c',
      third: '#6886c5',
      bg: '#f4eeff'
    },
    {
      name: '1749761',
      active: '#43dde6',
      second: '#fc5185',
      third: '#6886c5',
      fg: '#f0f0f0',
      bg: '#364f6b'
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
