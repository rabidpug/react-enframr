import { getGreeterButton, getGreeterMessage, } from 'Store/greeter/selectors';

import { greeterInitialState, } from 'Store/greeter';

describe(
  'getGreeterButton', () => {
    it(
      'should get the required fields for the Greeter Button', () => {
        const state = { greeter: greeterInitialState, };
        const expectedAction = { children : greeterInitialState.label,
                                 loading  : greeterInitialState.isLoading, };

        expect( getGreeterButton( state ) ).toEqual( expectedAction );
      }
    );
  }
);

describe(
  'getGreeterMessage', () => {
    it(
      'should get the greeter message', () => {
        const state = { greeter: greeterInitialState, };
        const expectedAction = greeterInitialState.message;

        expect( getGreeterMessage( state ) ).toEqual( expectedAction );
      }
    );
  }
);
