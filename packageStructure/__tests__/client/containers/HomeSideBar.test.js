import { TOGGLE_KEY, TOGGLE_SIDEBAR, } from 'Store/ui/types';

import HomeSideBar from 'Containers/HomeSideBar';
import React from 'react';
import configureStore from 'redux-mock-store';
import navMenu from 'Routes/navMenu';
import { shallow, } from 'enzyme';
import { uiInitialState, } from 'Store/ui';

const mockStore = configureStore();

describe(
  'HomeSideBar Container', () => {
    let store,
      wrapper;
    const ownProps = { location : { pathname: '/', },
                       route    : navMenu[0], };

    beforeEach( () => {
      store = mockStore( { ui: uiInitialState, } );

      store.dispatch = jest.fn();

      wrapper = shallow( <HomeSideBar
        store={ store }
        { ...ownProps } /> );
    } );

    it(
      'maps state and dispatch to props', () => {
        const expectedAction = expect.objectContaining( {
          currentPath   : ownProps.location.pathname,
          goToPath      : expect.any( Function ),
          menuItems     : ownProps.route.menuItems,
          toggleKey     : expect.any( Function ),
          toggleSideBar : expect.any( Function ),
        } );

        expect( wrapper.props() ).toEqual( expectedAction );
      }
    );

    describe(
      'toggleKey', () => {
        it(
          'maps TOGGLE_KEY to dispatch action', () => {
            const expectedAction = { type: TOGGLE_KEY, };

            wrapper.props().toggleKey();

            expect( store.dispatch ).toHaveBeenCalledWith( expectedAction );
          }
        );
      }
    );

    describe(
      'toggleSideBar', () => {
        it(
          'maps TOGGLE_SIDEBAR to dispatch action', () => {
            const expectedAction = { type: TOGGLE_SIDEBAR, };

            wrapper.props().toggleSideBar();

            expect( store.dispatch ).toHaveBeenCalledWith( expectedAction );
          }
        );
      }
    );

    describe(
      'goToPath', () => {
        it(
          'maps push to dispatch action', () => {
            const path = '/';

            const expectedAction = { payload: { args   : [ path, ],
                                                method : 'push', },
                                     type: '@@router/CALL_HISTORY_METHOD', };

            wrapper.props().goToPath( path );

            expect( store.dispatch ).toHaveBeenCalledWith( expectedAction );
          }
        );
      }
    );
  }
);
