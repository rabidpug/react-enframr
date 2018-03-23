import Home from 'Scenes/Home';
import React from 'react';
import { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';

describe(
  'TopBar', () => {
    it(
      'Should render the TopBar', () => {
        const wrapper = shallow( <Home /> );

        expect( shallowToJson( wrapper ) ).toMatchSnapshot();
      }
    );
  }
);
