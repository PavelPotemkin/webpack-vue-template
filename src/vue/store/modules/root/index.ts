import { Module, ModuleTree } from "vuex";
import { IRootState } from "@/vue/store/interfaces";
import { getters } from "./getters";
import { actions } from "./actions";
import { mutations } from "./mutations";
import { state } from "./state";
import counterModule from "../counter";

// Modules
const modules: ModuleTree<IRootState> = {
  counterModule
};

const root: Module<IRootState, IRootState> = {
  state,
  getters,
  mutations,
  actions,
  modules
};

export default root;
