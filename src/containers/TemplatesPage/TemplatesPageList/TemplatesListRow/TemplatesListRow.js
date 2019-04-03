import React from 'react';
import PropTypes from 'prop-types';
// CSS
import './TemplateListRow.style.css';
// assets
import englishFlag from '../../../../assets/flag-english.jpg';
import germanFlag from '../../../../assets/flag-german.jpg';
import editPencil from '../../../../assets/ic-pencil-1-bold.svg';
// Components
import Toggle from '../../../../components/Toggle';

const TemplatesListRow = ({ template, activateTemplate, onTemplateEditing}) => {
    const [toggleChecked, setToggleChecked] = React.useState(template.active);
    return (
        <tr>
            <td>
                <img
                    src={template.lang === 'en' ? englishFlag : germanFlag}
                    className="flag-image"
                    alt="country flag" />
            </td>
            <td>
                <div className="template-name">
                    <div className="title">{template.title}</div>
                </div>
            </td>
            <td>
                <Toggle
                    id={`${template.id}`}
                    onChange={() => {
                        setToggleChecked(!toggleChecked);
                        activateTemplate(template.id, !toggleChecked);
                    }}
                    checked={toggleChecked}
                />
            </td>
            <td>{new Date(template.updated).toLocaleDateString()}</td>
            <td>
                <img className="edit-icon" src={editPencil} alt="edit template" onClick={() => {
                    onTemplateEditing(template.id);
                }}/>
            </td>
        </tr>
    )
}

TemplatesListRow.propTypes = {
    template: PropTypes.object.isRequired,
    activateTemplate: PropTypes.func.isRequired,
    onTemplateEditing: PropTypes.func.isRequired,
}

export default TemplatesListRow;