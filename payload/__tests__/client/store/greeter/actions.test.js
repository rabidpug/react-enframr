import {
  sayHello,
  sayHelloFailure,
  sayHelloRequest,
  sayHelloSuccess,
} from 'Store/greeter/actions';

import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';
import { helloEndpointRoute, } from 'Shared/routes';
import thunkMiddleware from 'redux-thunk';

const mockStore = configureMockStore( [ thunkMiddleware, ] );

afterEach( () => {
  fetchMock.restore();
} );

describe(
  'sayHello', () => {
    it(
      'Succeeds', () => {
        fetchMock.get(
          helloEndpointRoute( 666 ), { message: 'Async hello success', }
        );

        const store = mockStore();

        return store.dispatch( sayHello( 666 ) ).then( () => {
          expect( store.getActions() ).toEqual( [
            sayHelloRequest(),
            sayHelloSuccess( 'Async hello success' ),
          ] );
        } );
      }
    );

    it(
      '404s', () => {
        fetchMock.get(
          helloEndpointRoute( 666 ), 404
        );

        const store = mockStore();

        return store.dispatch( sayHello( 666 ) ).then( () => {
          expect( store.getActions() ).toEqual( [
            sayHelloRequest(),
            sayHelloFailure(),
          ] );
        } );
      }
    );

    it(
      'data errors', () => {
        fetchMock.get(
          helloEndpointRoute( 666 ), {}
        );

        const store = mockStore();

        return store.dispatch( sayHello( 666 ) ).then( () => {
          expect( store.getActions() ).toEqual( [
            sayHelloRequest(),
            sayHelloFailure(),
          ] );
        } );
      }
    );
  }
);
