export type TColor = 'active' | 'second' | 'third' | 'bg' | 'fg'

export interface ITheme {
  name: string
  active: string
  second: string
  third: string
  bg: string
  fg?: string
}
