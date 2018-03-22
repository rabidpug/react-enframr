# React BoilerPlate

![GitHub last commit](https://img.shields.io/github/last-commit/google/skia.svg)
[![Build Status](https://img.shields.io/travis/rabidpug/react-bp.svg?style=flat-square)](https://travis-ci.org/rabidpug/react-bp)
[![Coverage Status](https://img.shields.io/coveralls/rabidpug/react-bp.svg?style=flat-square)](https://coveralls.io/github/rabidpug/react-bp?branch=master)
![GitHub repo size in bytes](https://img.shields.io/github/repo-size/badges/shields.svg)
![license](https://img.shields.io/github/license/mashape/apistatus.svg)
[![Heroku Staging](https://heroku-badge.herokuapp.com/?app=react-bp-staging)](https://react-bp-staging.herokuapp.com/)

* [Folder Structure](#folder-structure)
* [Libraries](#libraries)

## Folder Structure

* [Client](#client)

### Client

* [Assets](#assets)
* [Components](#components)
* [Containers](#containers)
* [Scenes](#scenes)
* [Routes](#routes)
* [Store](#store)

#### Assets

File assets used by client, eg images. Webpack config will copy to /dist or convert to base64 string if <10,000 bytes

```javascript
import React from 'react';
import myImage from '../../assets/myImage.png';

const ImgComponent = () => <img src={myImage} />;
```

#### Components

Components => Simple React components not concerned by state, used by containers and scenes. Most styling will be here.

```javascript
// scr/client/components/Message/index.js
import React from 'react';
import styles from './styles.scss';

const SimpleComponent = ({ message }) => <p className={styles.message}>{message}</p>;
```

#### Containers

Containers => linking Components to state and dispatch, used by containers and scenes.

```javascript
// scr/client/containers/HelloMessage/index.js
import Message from '../../components/Message';
import { connect } from 'react-redux';
import { getGreeterMessage } from '../../store/greeter/selectors';

const mapStateToProps = state => ({ message: getGreeterMessage(state) });

const HelloMessage = connect(mapStateToProps)(Message);

export default HelloMessage;
```

#### Scenes

Scenes => combining containers and components together to make a page. Routes will generally point here.

```javascript
// scr/client/scenes/Welcome/index.js
import HelloButton from '../../containers/HelloButton';
import HelloMessage from '../../containers/HelloMessage';
import React from 'react';

const Welcome = () => (
  <div>
    <HelloMessage />
    <HelloButton />
  </div>
);

export default Welcome;
```

#### Routes

Routes are rendered from configuration objects. Any additional object properties will be passed to the rendered component.

```javascript
// src/client/routes/content.js
import { Home, Welcome } from '../loadables';

const content = [
  {
    component: Home,
    exact: true,
    path: '/',
  },
  {
    component: Welcome,
    exact: true,
    path: '/welcome',
  },
];

export default content;
```

#### Store

Configure actions and reducers for global store.

```javascript
// src/client/store/greeter/types.js
export const SAY_HELLO = 'SAY_HELLO';

// src/client/store/greeter/actions.js
import { SAY_HELLO } from './types';
import { createAction } from 'redux-actions';

export const sayHello = createAction(SAY_HELLO);

//src/client/store/greeter/reducers.js
export const sayHelloReducer = (state, action) => {
  state.message = action.payload;
};

// src/client/store/greeter/selectors.js
import { createSelector } from '@acemarke/redux-starter-kit';

export const getGreeterMessage = createSelector(['greeter.message']);

// src/client/store/greeter/index.js
import { SAY_HELLO } from './types';
import { sayHelloReducer } from './reducers';
import { createReducer } from '@acemarke/redux-starter-kit';

export const greeter = createReducer(greeterInitialState, {
  [SAY_HELLO]: sayHelloReducer,
});
```

## Libraries

* [Development Libraries](#development-libraries)
* [Client Libraries](#client-libraries)
* [Server Libraries](#server-libraries)

### Development Libraries

Development libraries

### Client Libraries

Client libraries

### Server Libraries

Server libraries
