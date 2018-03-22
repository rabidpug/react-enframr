import HelloButton from 'Containers/HelloButton';
import React from 'react';
import configureStore from 'redux-mock-store';
import { greeterInitialState, } from 'Store/greeter';
import { shallow, } from 'enzyme';

const mockStore = configureStore();

describe(
  'HelloButton Container', () => {
    let store,
      wrapper;

    beforeEach( () => {
      store = mockStore( { greeter: greeterInitialState, } );

      store.dispatch = jest.fn();

      wrapper = shallow( <HelloButton store={ store } /> );
    } );

    it(
      'maps state and dispatch to props', () => {
        const expectedAction = expect.objectContaining( {
          children : greeterInitialState.label,
          loading  : greeterInitialState.isLoading,
          onClick  : expect.any( Function ),
        } );

        expect( wrapper.props() ).toEqual( expectedAction );
      }
    );

    describe(
      'onClick', () => {
        it(
          'maps SAY_HELLO_REQUEST to dispatch action', () => {
            wrapper.props().onClick();

            expect( store.dispatch ).toHaveBeenCalledWith( expect.any( Function ) );
          }
        );
      }
    );
  }
);
