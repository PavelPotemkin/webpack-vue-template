import { Store } from 'vuex'
import axios from "@/plugins/axios";

declare module '*.vue' {
  // @ts-ignore
  import { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module '@vue/runtime-core' {
  interface State {
    count: number
  }

  // eslint-disable-next-line no-unused-vars
  interface ComponentCustomProperties {
    $store: Store<State>
    $http: typeof axios
  }
}
