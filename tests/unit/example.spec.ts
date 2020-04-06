import { shallowMount } from '@vue/test-utils'
import PieWidget from '@/components/block/widget/PieWidget'

describe('PieWidget.vue', () => {
  it('renders text widget', () => {
    const msg = 'PieWidget'
    const wrapper = shallowMount(PieWidget)
    expect(wrapper.text()).toMatch(msg)
  })
})
