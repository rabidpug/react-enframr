import { createSelector, } from '@acemarke/redux-starter-kit';

export const getGreeterButton = createSelector( { children : 'greeter.label',
                                                  loading  : 'greeter.isLoading', } );
export const getGreeterMessage = createSelector( [ 'greeter.message', ] );
