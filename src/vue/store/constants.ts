import {
  RootGetters,
  RootMutations,
  RootActions,
  CounterGetters,
  CounterMutations,
  CounterActions,
} from "./enums";

export const ROOT_STORE = {
  GETTERS: RootGetters,
  MUTATIONS: RootMutations,
  ACTIONS: RootActions
};

export const COUNTER_STORE = {
  GETTERS: CounterGetters,
  MUTATIONS: CounterMutations,
  ACTIONS: CounterActions
};
