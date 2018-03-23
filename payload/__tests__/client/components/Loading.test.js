import Loading from 'Components/Loading';
import React from 'react';
import { shallow, } from 'enzyme';
import { shallowToJson, } from 'enzyme-to-json';

describe(
  'Loading', () => {
    it(
      'Should render the Loading', () => {
        const wrapper = shallow( <Loading /> );

        expect( shallowToJson( wrapper ) ).toMatchSnapshot();
      }
    );
  }
);
