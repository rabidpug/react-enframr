import React from 'react';
import Welcome from 'Scenes/Welcome';
import { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';

describe(
  'TopBar', () => {
    it(
      'Should render the TopBar', () => {
        const wrapper = shallow( <Welcome /> );

        expect( shallowToJson( wrapper ) ).toMatchSnapshot();
      }
    );
  }
);
