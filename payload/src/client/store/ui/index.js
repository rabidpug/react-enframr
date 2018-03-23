// @flow

import { TOGGLE_KEY, TOGGLE_SIDEBAR } from './types';
import { toggleKeyReducer, toggleSidebarReducer } from './reducers';

import { createReducer } from '@acemarke/redux-starter-kit';

export const uiInitialState = {
  isSidebarCollapsed: true,
  openKeys: [],
};

export const ui = createReducer(uiInitialState, {
  [TOGGLE_KEY]: toggleKeyReducer,
  [TOGGLE_SIDEBAR]: toggleSidebarReducer,
});
