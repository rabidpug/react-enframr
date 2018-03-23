import * as reducers from './index';

import { combineReducers, } from '@acemarke/redux-starter-kit';
import { routerReducer, } from 'react-router-redux';

const rootReducer = combineReducers( { ...reducers,
                                       routing: routerReducer, } );

export default rootReducer;
