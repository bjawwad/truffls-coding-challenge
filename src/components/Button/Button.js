import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export const TYPES = ['flat', 'outlined', 'raised'];
export const VARIATIONS = ['normal', 'brand', 'destructive'];

function Button (props) {
    const {
        children,
        typeStyle,
        variationStyle,

        component: Component,
        className,

        ...restProps
    } = props;

    const computedClassName = classNames(
        'tf-button',
        `tf-button--${typeStyle}`,
        `tf-button--${variationStyle}`,
        className
    );

    return (
        <Component
            {...restProps}
            className={computedClassName}
        >
            {children}
        </Component>
    );
}

Button.defaultProps = {
    component: 'button'
};

Button.propTypes = {
    typeStyle: PropTypes.oneOf(TYPES).isRequired,
    variationStyle: PropTypes.oneOf(VARIATIONS).isRequired,

    children: PropTypes.node.isRequired,

    component: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.elementType
    ]).isRequired,
    className: PropTypes.string
};

export default Button;
