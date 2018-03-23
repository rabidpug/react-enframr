import Message from 'Components/Message';
import React from 'react';
import { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';

describe(
  'Message', () => {
    it(
      'Should render the Message', () => {
        const wrapper = shallow( <Message /> );

        expect( shallowToJson( wrapper ) ).toMatchSnapshot();
      }
    );
  }
);
