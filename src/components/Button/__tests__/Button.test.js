import React from 'react';
import { mount } from 'enzyme';

import Button from '../Button';

describe('Button', () => {
    const setup = (propsToMerge) => {
        const props = {
            typeStyle: 'flat',
            variationStyle: 'normal',
            ...propsToMerge
        };

        const wrapper = mount(
            <Button {...props}>
                Label
            </Button>
        );

        return {
            props,
            wrapper
        };
    };

    it('adds class for given typeStyle', () => {
        const { wrapper } = setup({
            typeStyle: 'raised'
        });

        expect(wrapper.children().hasClass('tf-button--raised')).toBe(true);
    });

    it('adds class for given variationStyle', () => {
        const { wrapper } = setup({
            variationStyle: 'brand'
        });

        expect(wrapper.children().hasClass('tf-button--brand')).toBe(true);
    });

    it('accepts custom component as element', () => {
        const CustomComponent = () => {
            return (
                <span></span>
            );
        };

        const { wrapper } = setup({
            component: CustomComponent
        });

        expect(wrapper.children().is(CustomComponent)).toBe(true);
    });

    it('passes through unknown properties', () => {
        const { wrapper } = setup({
            'data-test': 'unknown'
        });

        expect(wrapper.children().prop('data-test')).toBe('unknown');
    });

    it('handles click', () => {
        const { props, wrapper } = setup({
            onClick: jest.fn()
        });

        expect(props.onClick).toHaveBeenCalledTimes(0);

        wrapper.children().simulate('click');

        expect(props.onClick).toHaveBeenCalledTimes(1);
    });
});