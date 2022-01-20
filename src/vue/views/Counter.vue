<template>
  <div>
    {{ mobileDevice }}
  </div>
  
  <div>
    {{ counter }}
  </div>
  
  <div>
    {{ counterTemp }}
  </div>
  
  <div>
    {{ doubledCounter }}
  </div>
  
  <div>
    {{ isRootDispatchSet }}
  </div>
  
  <app-button @click="resetCounter">
    resetCounter
  </app-button>
  
  <app-button @click="setRootDispatch">
    setRootDispatch
  </app-button>
  
  <app-button @click="setCounter">
    setCounter 100
  </app-button>
</template>

<script lang="ts">
import {computed, defineComponent} from 'vue'
import {COUNTER_STORE, ROOT_STORE} from "@/vue/store/constants";
import {useStore} from "@/vue/store";
import {CounterStateTypes} from "@/vue/store/interfaces";
import AppButton from "@/vue/components/AppButton.vue";

export default defineComponent({
  name: "Counter",
  components: {AppButton},
  setup() {
    const store = useStore();

    const mobileDevice = store.getters[COUNTER_STORE.GETTERS.COUNTER_VALUE]

    const counter = computed(() => store.getters[COUNTER_STORE.GETTERS.COUNTER_VALUE]);
    const counterTemp = computed(() => (store.state.counterModule as CounterStateTypes).counter);
    const doubledCounter = computed(() => store.getters[COUNTER_STORE.GETTERS.DOUBLED_COUNTER]);
    const isRootDispatchSet = computed(() => store.getters[COUNTER_STORE.GETTERS.GET_ROOT_DISPATCH]);

    function resetCounter() {
      store.commit(COUNTER_STORE.MUTATIONS.RESET_COUNTER);
    }

    function setRootDispatch() {
      store.dispatch(ROOT_STORE.ACTIONS.COUNTER_CHECK, !isRootDispatchSet.value);
    }

    async function setCounter() {
      await store.dispatch(COUNTER_STORE.ACTIONS.GET_COUNTER, 100);
    }

    return {
      mobileDevice,
      counter,
      doubledCounter,
      resetCounter,
      setCounter,
      setRootDispatch,
      isRootDispatchSet,
      counterTemp
    };
  }
})
</script>

<style scoped>
button {
  display: block;
  padding: 20px;
  border: 1px solid black;
}
</style>