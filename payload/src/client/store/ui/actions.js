//@flow

import { TOGGLE_KEY, TOGGLE_SIDEBAR } from './types';

import { createAction } from 'redux-actions';

export const toggleSidebar: Function = createAction(TOGGLE_SIDEBAR);
export const toggleKey: Function = createAction(TOGGLE_KEY);
