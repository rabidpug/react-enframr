import App from 'Scenes/App';
import React from 'react';
import { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';

describe(
  'App', () => {
    it(
      'Should render the App', () => {
        const wrapper = shallow( <App /> );

        expect( shallowToJson( wrapper ) ).toMatchSnapshot();
      }
    );
  }
);
