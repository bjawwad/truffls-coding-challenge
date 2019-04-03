import React from 'react';
import PropTypes from 'prop-types';

function Toggle (props) {
    const {
        id,
        required,
        checked,
        onChange,
        title,
        ...rest
    } = props;

    return (
        <span className="tf-toggle" title={title}>
            <input
                {...rest}
                type="checkbox"
                id={id}
                required={required}
                checked={checked}
                onChange={onChange}
            />
            <label
                htmlFor={id}
                className="tf-toggle__faux"
            />
        </span>
    );
}

Toggle.propTypes = {
    id: PropTypes.string.isRequired,
    required: PropTypes.bool,
    checked: PropTypes.bool,
    onChange: PropTypes.func,
    title: PropTypes.string
};

export default Toggle;