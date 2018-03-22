import { greeter, greeterInitialState, } from 'Store/greeter';
import {
  sayHelloFailure,
  sayHelloRequest,
  sayHelloSuccess,
} from 'Store/greeter/actions';

describe(
  'greeter', () => {
    it(
      'should handle a hello request', () => {
        const expectedAction = {
          isLoading : true,
          label     : 'Loading...',
          message   : 'Loading...',
        };

        expect( greeter(
          greeterInitialState, sayHelloRequest()
        ) ).toEqual( expectedAction );
      }
    );

    it(
      'should handle a hello failure', () => {
        const expectedAction = {
          isLoading : false,
          label     : 'Try saying hi again!',
          message   : 'No message received, please check your connection and try again',
        };

        expect( greeter(
          greeterInitialState, sayHelloFailure()
        ) ).toEqual( expectedAction );
      }
    );

    it(
      'should handle a hello success', () => {
        const message = 'Hai :3';
        const expectedAction = {
          isLoading : false,
          label     : 'Say it again!',
          message,
        };

        expect( greeter(
          greeterInitialState, sayHelloSuccess( message )
        ) ).toEqual( expectedAction );
      }
    );
  }
);
