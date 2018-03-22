// @flow

import {
  SAY_HELLO_FAILURE,
  SAY_HELLO_REQUEST,
  SAY_HELLO_SUCCESS,
} from './types';
import {
  sayHelloFailureReducer,
  sayHelloRequestReducer,
  sayHelloSuccessReducer,
} from './reducers';

import { createReducer, } from '@acemarke/redux-starter-kit';

export const greeterInitialState = {
  isLoading : false,
  label     : 'Say hi!',
  message   : 'Do you want to say hi?',
};

export const greeter = createReducer(
  greeterInitialState, {
    [SAY_HELLO_FAILURE] : sayHelloFailureReducer,
    [SAY_HELLO_REQUEST] : sayHelloRequestReducer,
    [SAY_HELLO_SUCCESS] : sayHelloSuccessReducer,
  }
);
