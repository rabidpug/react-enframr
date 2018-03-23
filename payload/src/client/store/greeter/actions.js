//@flow

import 'isomorphic-fetch';

import {
  SAY_HELLO_FAILURE,
  SAY_HELLO_REQUEST,
  SAY_HELLO_SUCCESS,
} from './types';

import { createAction, } from 'redux-actions';
import { helloEndpointRoute, } from 'Shared/routes';

export const sayHelloRequest = createAction( SAY_HELLO_REQUEST );
export const sayHelloSuccess = createAction( SAY_HELLO_SUCCESS );
export const sayHelloFailure = createAction( SAY_HELLO_FAILURE );
export const sayHello: Function = ( num: number ) => ( dispatch: Function ) => {
  dispatch( sayHelloRequest() );

  return fetch(
    helloEndpointRoute( num ), { method: 'GET', }
  )
    .then( res => {
      if ( !res.ok ) throw Error( res.statusText );
      return res.json();
    } )
    .then( data => {
      if ( !data.message ) throw Error( 'No message received' );

      dispatch( sayHelloSuccess( data.message ) );
    } )
    .catch( () => {
      dispatch( sayHelloFailure() );
    } );
};
