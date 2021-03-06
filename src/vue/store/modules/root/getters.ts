import { ROOT_STORE } from "@/vue/store/constants";
import { GetterTree } from "vuex";
import { IRootGettersTypes, IRootState, IUserData } from "./../../interfaces";

export const getters: GetterTree<IRootState, IRootState> & IRootGettersTypes = {
  [ROOT_STORE.GETTERS.UPDATE_VERSION]: (state: IRootState): string => {
    return state.version;
  },
  [ROOT_STORE.GETTERS.USER_LISTS]: (state: IRootState): IUserData[] => {
    return state.userlists;
  },
  [ROOT_STORE.GETTERS.IS_MOBILE_DEVICE]: (state: IRootState): boolean => {
    return state.isMobile;
  }
};
