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
      name: '177866',
      active: '#cae8d5',
      second: '#84a9ac',
      third: '#3b6978',
      bg: '#204051'
    },
    {
      name: '155',
      active: '#8ecccc',
      second: '#50717b',
      third: '#3a4042',
      bg: '#212121'
    },
    {
      name: '8025',
      active: '#73f7dd',
      second: '#2cc4cb',
      third: '#1972a4',
      bg: '#2e3a87'
    },
    {
      name: '135960',
      active: '#69779b',
      second: '#9692af',
      third: '#acdbdf',
      bg: '#d7eaea'
    },
    {
      name: '180361',
      active: '#f6acc8',
      second: '#af8baf',
      third: '#584153',
      bg: '#26191b'
    },
    {
      name: '65474',
      active: '#511e78',
      second: '#8b2f97',
      third: '#cf56a1',
      bg: '#fcb2bf'
    },
    {
      name: '172856',
      active: '#4f3961',
      second: '#ea728c',
      third: '#fc9d9d',
      bg: '#f3d4d4'
    },
    {
      name: '172856',
      active: '#4f3961',
      second: '#ea728c',
      third: '#fc9d9d',
      bg: '#f3d4d4'
    },
    {
      name: '121460',
      active: '#fdadc7',
      second: '#ea4c88',
      third: '#993399',
      bg: '#424153'
    },
    {
      name: '70476',
      active: '#fafafa',
      second: '#ff6699',
      third: '#c54c82',
      bg: '#512e67'
    },
    {
      name: 'I70476',
      active: '#512e67',
      second: '#ff6699',
      third: '#c54c82',
      bg: '#fafafa'
    },
    {
      name: '203',
      active: '#dbedf3',
      second: '#da0463',
      third: '#404b69',
      bg: '#283149'
    },
    {
      name: '6053',
      active: '#9dfdc7',
      second: '#61d2b4',
      third: '#367591',
      bg: '#152744'
    },
    {
      name: '42254',
      active: '#f4f7ed',
      second: '#86ee60',
      third: '#2e6e65',
      bg: '#2b3752'
    },
    {
      name: '38961',
      active: '#9effa9',
      second: '#36485e',
      third: '#333146',
      bg: '#29252c'
    },
    {
      name: '97771',
      active: '#dddddd',
      second: '#3f7b70',
      third: '#265a5c',
      bg: '#113c4a'
    },
    {
      name: '18916',
      active: '#e9f679',
      second: '#9bdf46',
      third: '#25a55f',
      bg: '#346473'
    },
    {
      name: '174976',
      active: '#4ae3b5',
      second: '#eeeeee',
      third: '#2a5d67',
      bg: '#171332'
    },
    {
      name: '26949',
      active: '#f4eeff',
      second: '#dcd6f7',
      third: '#a6b1e1',
      bg: '#424874'
    },
    {
      name: '74886',
      active: '#fffcea',
      second: '#a5f2e7',
      third: '#8983f3',
      bg: '#3a0077'
    },
    {
      name: '38824',
      active: '#4993fa',
      second: '#9dc6ff',
      third: '#a0e4f1',
      bg: '#f1fafb'
    },
    {
      name: '10953',
      active: '#a561ff',
      second: '#fd72ad',
      third: '#fcce9e',
      bg: '#cfe3ff'
    },
    {
      name: '182040',
      active: '#ffdcb4',
      second: '#c060a1',
      third: '#6a097d',
      bg: '#00005c'
    },
    {
      name: '180289',
      active: '#00909e',
      second: '#27496d',
      third: '#dae1e7',
      bg: '#142850'
    },
    {
      name: '109078',
      active: '#00a8cc',
      second: '#ff1c76',
      third: '#91e60a',
      bg: '#142850'
    },
    {
      name: '171392',
      active: '#ffc300',
      second: '#ec610a',
      third: '#a40a3c',
      bg: '#6b0848'
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
