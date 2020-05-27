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
      name: '65474',
      active: '#fcb2bf',
      second: '#cf56a1',
      third: '#8b2f97',
      bg: '#511e78'
    },
    {
      name: '42191',
      active: '#e3fdfd',
      second: '#cbf1f5',
      third: '#a6e3e9',
      bg: '#71c9ce'
    },
    {
      name: '36394',
      active: '#f3fbf1',
      second: '#d1e4d1',
      third: '#98b4a6',
      bg: '#64868e'
    },
    {
      name: '43560',
      active: '#f1f2eb',
      second: '#b9e3c6',
      third: '#1c7293',
      bg: '#272932'
    },
    {
      name: '42214',
      active: '#f5f5f5',
      second: '#a9c52f',
      third: '#2c5d63',
      bg: '#283739'
    },
    {
      name: '34781',
      active: '#f0efe2',
      second: '#e3e2c3',
      third: '#5fbdb0',
      bg: '#3c9099'
    },
    {
      name: '18612',
      active: '#e0e7e9',
      second: '#a3c6c4',
      third: '#6c7a89',
      bg: '#354649'
    },
    {
      name: '18612',
      active: '#6fe7dd',
      second: '#3490de',
      third: '#6639a6',
      bg: '#521262'
    },
    {
      name: '78589',
      active: '#e1f5f2',
      second: '#6bc5d2',
      third: '#5a5d9d',
      bg: '#390050'
    },
    {
      name: '62241',
      active: '#eff0f4',
      second: '#d3d6db',
      third: '#415f9d',
      bg: '#233b6e'
    },
    {
      name: '2499',
      active: '#f2be8d',
      second: '#ba6c65',
      third: '#394359',
      bg: '#303242'
    },
    {
      name: '76698',
      active: '#e8f79a',
      second: '#49d292',
      third: '#3b445b',
      bg: '#383746'
    },
    {
      name: '131306',
      active: '#f2f4b2',
      second: '#cce490',
      third: '#0c907d',
      bg: '#0d627a'
    },
    {
      name: '116599',
      active: '#fef2bf',
      second: '#429ffd',
      third: '#0960bd',
      bg: '#011f3f'
    },
    {
      name: '36477',
      active: '#e8ffe8',
      second: '#74f9ff',
      third: '#a6fff2',
      bg: '#00e0ff'
    },
    {
      name: '19775',
      active: '#7bc74d',
      second: '#eeeeee',
      third: '#393e46',
      bg: '#222831'
    },
    {
      name: '117534',
      active: '#fafaf6',
      second: '#00fff0',
      third: '#00d1ff',
      bg: '#3d6cb9'
    },
    {
      name: '114174',
      active: '#f73859',
      second: '#dbedf3',
      third: '#404b69',
      bg: '#283149'
    },
    {
      name: '107618',
      active: '#dbedf3',
      second: '#da0463',
      third: '#404b69',
      bg: '#283149'
    },
    {
      name: '117448',
      active: '#f8b595',
      second: '#f67280',
      third: '#c06c84',
      bg: '#6c5b7c'
    },
    {
      name: '181988',
      active: '#fee2b3',
      second: '#ffa299',
      third: '#ad6989',
      bg: '#562349'
    },
    {
      name: '180361',
      active: '#f6acc8',
      second: '#af8baf',
      third: '#584153',
      bg: '#26191b'
    },
    {
      name: '79451',
      active: '#a9eee6',
      second: '#fefaec',
      third: '#f38181',
      bg: '#625772'
    },
    {
      name: '70782',
      active: '#f4f4ec',
      second: '#76e2f4',
      third: '#615dec',
      bg: '#301781'
    },
    {
      name: '192',
      active: '#e2eff1',
      second: '#b6d5e1',
      third: '#65799b',
      bg: '#555273'
    },
    {
      name: '12508',
      active: '#e5f6c6',
      second: '#abd4c1',
      third: '#7e858b',
      bg: '#5d414d'
    },
    {
      name: '92306',
      active: '#a1eafb',
      second: '#ffcef3',
      third: '#cabbe9',
      bg: '#fdfdfd'
    },
    {
      name: '3063',
      active: '#c2ffff',
      second: '#8bdeff',
      third: '#a888ff',
      bg: '#26466f'
    },
    {
      name: '15473',
      active: '#febe7e',
      second: '#ec7263',
      third: '#a75265',
      bg: '#57385c'
    },
    {
      name: '13136',
      active: '#f7fdb6',
      second: '#a4d792',
      third: '#21825c',
      bg: '#424141'
    },
    {
      name: '233',
      active: '#a6f2db',
      second: '#7bcace',
      third: '#678eb4',
      bg: '#4f4e79'
    },
    {
      name: '121977',
      active: '#f3d7ca',
      second: '#e6a4b4',
      third: '#c86b85',
      bg: '#f5eee6'
    },
    {
      name: '15830',
      active: '#f5f5f5',
      second: '#fc5185',
      third: '#3fc1c9',
      bg: '#364f6b'
    },
    {
      name: '2763',
      active: '#eeeeee',
      second: '#00adb5',
      third: '#393e46',
      bg: '#222831'
    },
    {
      name: '8015',
      active: '#5fc9f3',
      second: '#2e79ba',
      third: '#1e549f',
      bg: '#081f37'
    },
    {
      name: '137170',
      active: '#ff8484',
      second: '#d84c73',
      third: '#5c3b6f',
      bg: '#35234b'
    },
    {
      name: '125408',
      active: '#efecec',
      second: '#62929a',
      third: '#5c5757',
      bg: '#363434'
    },
    {
      name: '158',
      active: '#d789d7',
      second: '#9d65c9',
      third: '#5d54a4',
      bg: '#2a3d66'
    },
    {
      name: '70512',
      active: '#f02a71',
      second: '#7ec0e4',
      third: '#6789ba',
      bg: '#14103b'
    },
    {
      name: '40156',
      active: '#d01257',
      second: '#fb90b7',
      third: '#ffcee4',
      bg: '#0f1021'
    },
    {
      name: '27158',
      active: '#00eaff',
      second: '#1f8ea3',
      third: '#284184',
      bg: '#020438'
    },
    {
      name: '3061',
      active: '#d3f689',
      second: '#8cca6e',
      third: '#41a186',
      bg: '#1f3a52'
    },
    {
      name: '177866',
      active: '#91f3fc',
      second: '#c9fbff',
      third: '#3b939b',
      bg: '#2f8189'
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
      name: '95352',
      active: '#f1bbd5',
      second: '#a12559',
      third: '#5f1854',
      bg: '#3b0944'
    },
    {
      name: '20605',
      active: '#fef8dd',
      second: '#f6dec4',
      third: '#aa3763',
      bg: '#300532'
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
      name: '34002',
      active: '#f5ffae',
      second: '#79f8bb',
      third: '#60beb3',
      bg: '#155674'
    },
    {
      name: '34002',
      active: '#48f3db',
      second: '#51c4e9',
      third: '#6150c1',
      bg: '#4a3764'
    },
    {
      name: '160',
      active: '#9ae17b',
      second: '#6bba62',
      third: '#307470',
      bg: '#42476d'
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
      name: '134927',
      active: '#070d59',
      second: '#1f3c88',
      third: '#5893d4',
      bg: '#ceddef'
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
    const theme = this.themes.find(theme => theme.name === themeName) || this.themes[0]
    const { name, ...colors } = theme

    localStorage.setItem('theme', name)
    this.SET_STATE_THEME({ key: 'theme', value: name })

    ColorModule.setTheme(colors)
  }
}

export const ThemeModule = getModule(Theme)
