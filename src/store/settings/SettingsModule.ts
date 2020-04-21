import { Module, VuexModule, getModule } from 'vuex-module-decorators'
import store from '@/store'
import { IWidgetBlock, IWidgetBlockGeneralSettings } from '@/types'
import { UtilsModule } from '@/store/utils/UtilsModule'

export interface SettingsState {
  widgetBlocks: Array<IWidgetBlock>
}

@Module({ dynamic: true, store, name: 'settings' })
class Settings extends VuexModule implements SettingsState {
  widgetBlocks = [
    {
      id: UtilsModule.getUUID(),
      title: 'Arc Amount',
      component: 'ArcWidget',
      size: [1, 1],
      chartSettings: {
        value: {
          random: true,
          current: 10,
          min: 0,
          max: 100
        },
        pre: 'C°',
        color: 'var(--color-second)',
        title: 'Temperature'
      }
    },
    {
      id: UtilsModule.getUUID(),
      title: 'Chart widget',
      component: 'LineWidget',
      size: [3, 1]
    },
    {
      id: UtilsModule.getUUID(),
      title: 'Pie Amount',
      component: 'PieWidget',
      size: [2, 2]
    },
    {
      id: UtilsModule.getUUID(),
      title: 'Area widget',
      component: 'AreaWidget',
      size: [2, 1]
    },
    {
      id: UtilsModule.getUUID(),
      title: 'Chord widget',
      component: 'ChordWidget',
      size: [2, 2]
    }
  ]
}

export const SettingsModule = getModule(Settings)
