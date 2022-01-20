import { ActionContext, DispatchOptions } from "vuex";
import { COUNTER_STORE, ROOT_STORE } from "./constants";

export interface IUserData {
  id: number;
  userId: number;
  title: string;
  body: string;
}
export interface IRootState {
  root: boolean;
  version: string;
  userlists: any[];
  isMobile: boolean;
}

export interface IMergedState extends IRootState {
  counterModule: CounterStateTypes;
}

export interface IRootGettersTypes {
  [ROOT_STORE.GETTERS.UPDATE_VERSION](state: IRootState): string;
  [ROOT_STORE.GETTERS.USER_LISTS](state: IRootState): IUserData[];
  [ROOT_STORE.GETTERS.IS_MOBILE_DEVICE](state: IRootState): boolean;
}

export type RootMutationsTypes<S = IRootState> = {
  [ROOT_STORE.MUTATIONS.UPDATE_VERSION](state: S, payload: string): void;
  [ROOT_STORE.MUTATIONS.USER_LISTS](state: S, payload: IUserData[]): void;
  [ROOT_STORE.MUTATIONS.IS_MOBILE_DEVICE](
    state: IRootState,
    payload: boolean
  ): void;
};

/**
 * probably this can be moved inside individual module
 * as counterTypes.ts and then can be imported here
 */
type AugmentedActionContextRoot = {
  commit<K extends keyof RootMutationsTypes>(
    key: K,
    payload: Parameters<RootMutationsTypes[K]>[1]
  ): ReturnType<RootMutationsTypes[K]>;
} & Omit<ActionContext<IRootState, IRootState>, "commit"> & {
    dispatch<K extends keyof StoreActions>(
      key: K,
      payload?: Parameters<StoreActions[K]>[1],
      options?: DispatchOptions
    ): ReturnType<StoreActions[K]>;
  };

export interface RootActionsTypes {
  [ROOT_STORE.ACTIONS.UPDATE_VERSION](
    { commit }: AugmentedActionContextRoot,
    payload: string
  ): void;
  [ROOT_STORE.ACTIONS.COUNTER_CHECK](
    { dispatch }: AugmentedActionContextRoot,
    payload: boolean
  ): void;
  [ROOT_STORE.ACTIONS.USER_LISTS](
    { dispatch }: AugmentedActionContextRoot,
    payload: IUserData[]
  ): void;
  [ROOT_STORE.ACTIONS.IS_MOBILE_DEVICE](
    { dispatch }: AugmentedActionContextRoot,
    payload: boolean
  ): void;
}

/*********************** COUNTER MODULE TYPES  ***********************/
export interface CounterStateTypes {
  counter?: number;
  rootDispatch?: boolean;
}

export interface CounterGettersTypes {
  [COUNTER_STORE.GETTERS.DOUBLED_COUNTER](state: CounterStateTypes): number;
  [COUNTER_STORE.GETTERS.COUNTER_VALUE](state: CounterStateTypes): number;
  [COUNTER_STORE.GETTERS.GET_ROOT_DISPATCH](state: CounterStateTypes): boolean;
}

export type CounterMutationsTypes<S = CounterStateTypes> = {
  [COUNTER_STORE.MUTATIONS.SET_COUNTER](state: S, payload: number): void;
  [COUNTER_STORE.MUTATIONS.RESET_COUNTER](state: S): void;
  [COUNTER_STORE.MUTATIONS.SET_ROOT_DISPATCH](
    state: S,
    payload?: boolean
  ): void;
};

export type AugmentedActionContext = {
  commit<K extends keyof CounterMutationsTypes>(
    key: K,
    payload: Parameters<CounterMutationsTypes[K]>[1]
  ): ReturnType<CounterMutationsTypes[K]>;
} & Omit<ActionContext<CounterStateTypes, IRootState>, "commit">;

export interface CounterActionsTypes {
  [COUNTER_STORE.ACTIONS.GET_COUNTER](
    { commit }: AugmentedActionContext,
    payload: number
  ): void;
  [COUNTER_STORE.ACTIONS.SET_ROOT_DISPATCH](
    { commit }: AugmentedActionContext,
    payload: boolean
  ): void;
  [COUNTER_STORE.ACTIONS.CALL_COUNTER](
    { commit }: AugmentedActionContext,
    payload: boolean
  ): void;
}

export interface StoreActions
  extends RootActionsTypes,
    CounterActionsTypes {}

export interface StoreGetters
  extends IRootGettersTypes,
    CounterGettersTypes {}
