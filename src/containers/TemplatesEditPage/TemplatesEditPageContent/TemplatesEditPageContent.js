import * as React from 'react';
import PropTypes from 'prop-types';

function TemplatesEditPageContent({ value, onChange, isInvalid }) {
    return (
        <div className="edit-content">
            <label>
                Message text
            </label>
            <textarea
                className={isInvalid ? "is-invalid" : ""}
                name="content"
                value={value}
                onChange={onChange}
            ></textarea>
            {isInvalid && <small>Please enter content</small>}
        </div>
    );
}

TemplatesEditPageContent.defaultProps = {
    isInvalid: false,
}

TemplatesEditPageContent.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isInvalid: PropTypes.bool,
}

export default TemplatesEditPageContent;