import { ConnectedRouter, routerMiddleware, } from 'react-router-redux';
import { configureStore, createDefaultMiddleware, } from '@acemarke/redux-starter-kit';
import { persistReducer, persistStore, } from 'redux-persist';

import App from 'Scenes/App';
import Loading from 'Components/Loading';
import { PersistGate, } from 'redux-persist/integration/react';
import { Provider, } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';
import createHistory from 'history/createBrowserHistory';
import rootReducer from 'Store/rootReducer';
import storage from 'redux-persist/lib/storage';

const persistConfig = { key: 'root',
                        storage, };
const reducer = persistReducer(
  persistConfig, rootReducer
);
const history = createHistory();
const routerware = routerMiddleware( history );
const middleware = createDefaultMiddleware( routerware );
const store = configureStore( {
  devTools: process.env.NODE_ENV !== 'production',
  middleware,
  reducer,
} );
const persistor = persistStore( store );

if ( process.env.NODE_ENV !== 'production' ) {
  if ( module.hot ) {
    module.hot.accept(
      './store/rootReducer', () => store.replaceReducer( require( './store/rootReducer' ).default )
    );
  }
}

ReactDOM.render(
  <Provider store={ store }>
    <PersistGate
      loading={ <Loading /> }
      persistor={ persistor }>
      <ConnectedRouter history={ history }>
        <App />
      </ConnectedRouter>
    </PersistGate>
  </Provider>,
  document.getElementById( 'root' )
);
