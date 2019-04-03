import React from 'react';
import PropTypes from 'prop-types';

import { GERMAN_LANGUAGE, ENGLISH_LANGUAGE } from '../constants';

function TemplatesEditPageLanguage({ value, onChange, isInvalid }) {
    return (
        <div className="Settings__section">
            <label htmlFor="language-field-radio-group">
                Language
            </label>
            <div
                id="language-field-radio-group"
                className="Settings__radio-group"
            >
                <label>
                    <input
                        type="radio"
                        name="languageDE"
                        value={GERMAN_LANGUAGE}
                        checked={value === GERMAN_LANGUAGE}
                        onChange={onChange}
                    />
                    German
                </label>

                <label>
                    <input
                        type="radio"
                        name="languageEN"
                        value={ENGLISH_LANGUAGE}
                        checked={value === ENGLISH_LANGUAGE}
                        onChange={onChange}
                    />
                    English
                </label>
            </div>
            {isInvalid && <small>Please select language</small>}
        </div>
    )
};

TemplatesEditPageLanguage.defaultProps = {
    isInvalid: false,
}

TemplatesEditPageLanguage.propTypes = {
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    isInvalid: PropTypes.bool,
}

export default TemplatesEditPageLanguage;