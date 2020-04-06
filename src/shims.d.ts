import Vue, { VNode } from 'vue'

declare var MediaRecorder: any

declare module '*.vue' {
  export default Vue
}

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
}
