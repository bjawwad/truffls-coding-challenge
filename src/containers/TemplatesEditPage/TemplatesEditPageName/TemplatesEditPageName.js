import React from 'react';
import PropTypes from 'prop-types';

function TemplatesEditPageName({ value, onChange, isInvalid }) {
    return (
        <div className="edit-name">
            <label>
                Name
            </label>
            <input
                type="text"
                className={isInvalid ? "is-invalid" : ""}
                name="name"
                value={value}
                onChange={onChange}
            />
            {isInvalid && <small>Please enter name</small>}
        </div>
    );
}

TemplatesEditPageName.defaultProps = {
    isInvalid: false,
}

TemplatesEditPageName.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isInvalid: PropTypes.bool,
}

export default TemplatesEditPageName;