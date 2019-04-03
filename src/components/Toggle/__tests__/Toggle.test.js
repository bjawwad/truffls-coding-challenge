import React from 'react';
import { mount } from 'enzyme';

import Toggle from '../Toggle';

describe('Toggle', () => {
    const setup = (propsToMerge = {}) => {
        const props = {
            id: 'toggle-id',
            ...propsToMerge
        };

        const wrapper = mount(
            <Toggle {...props} />
        );

        return {
            props,
            wrapper
        };
    };

    it('renders correctly without props', () => {
        const { props, wrapper } = setup({
            id: 'some-id'
        });
        const inputWrapper = wrapper.find('input');
        const labelWrapper = wrapper.find('label');

        expect(inputWrapper.length).toBe(1);
        expect(inputWrapper.prop('id')).toBe(props.id);
        expect(labelWrapper.length).toBe(1);
        expect(labelWrapper.prop('htmlFor')).toBe(props.id);
    });

    it('renders correctly with checked', () => {
        const { props, wrapper } = setup({
            checked: true,
            onChange: jest.fn()
        });
        const inputWrapper = wrapper.find('input');

        expect(inputWrapper.prop('checked')).toBe(props.checked);
    });

    it('renders correctly with required', () => {
        const { props, wrapper } = setup({
            required: true
        });
        const inputWrapper = wrapper.find('input');

        expect(inputWrapper.prop('required')).toBe(props.required);
    });

    it('triggers onChange handler', () => {
        const { props, wrapper } = setup({
            checked: true,
            onChange: jest.fn()
        });
        const inputWrapper = wrapper.find('input');

        inputWrapper.find('input').simulate('change');
        expect(props.onChange).toHaveBeenCalledTimes(1);
    });
});