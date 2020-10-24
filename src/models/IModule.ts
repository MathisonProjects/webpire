import {GetterTree, MutationTree, ActionTree} from "vuex"

interface IJson {
	[index: string]: string
}

interface IModule {
  [index: string]: Module<any, unknown>;
}

interface Module<S, R> {
  namespaced?: boolean
  state?: S | (() => S)
  getters?: GetterTree<S, R>
  actions?: ActionTree<S, R>
  mutations?: MutationTree<S>
}


interface Getter<S, R> {}
interface Action<S, R> {}
interface Mutation<S> {}
interface ModuleItem<R> {}

export {
	IJson,
	IModule
}