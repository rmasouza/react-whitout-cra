import React from 'react';
import {shallow} from 'enzyme';
import App from './App';

describe('CommonSignUpInput', () => {
    it('renders the checkbox with correct label', () => {
        const wrapper = shallow(<App />);
        expect(wrapper.find('#username').children().length == 1);
    });
});