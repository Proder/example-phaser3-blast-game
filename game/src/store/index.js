import Store from './store';
import GameFunc from './function/gameFunc';
import DefaultFunc from './function/defaultFunc';

export const store = new Store();

store.gameFunc = new GameFunc();
store.gameFunc.store = store;

store.defaultFunc = new DefaultFunc();
store.defaultFunc.store = store;
