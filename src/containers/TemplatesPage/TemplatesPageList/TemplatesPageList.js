import React from 'react';
import PropTypes from 'prop-types'
// CSS
import '../../../components/Table/Table.style.css'
// Components
import TemplateListRow from './TemplatesListRow';

const TemplatePageList = ({ templates, activateTemplate, onTemplateEditing }) => {
    return (
        <div className="Table">
            <table>
                <thead className="TableHeaders">
                    <tr>
                        <th></th>
                        <th>Name</th>
                        <th>Visiblity</th>
                        <th>Last update</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody className="TableBody">
                    {
                        templates.length > 0 && templates.map(template => {
                            return (
                                <TemplateListRow 
                                    key={template.id} 
                                    template={template}
                                    activateTemplate={activateTemplate} 
                                    onTemplateEditing={onTemplateEditing}
                                />
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    )
}

TemplatePageList.propTypes = {
    templates: PropTypes.array.isRequired,
    activateTemplate: PropTypes.func.isRequired,
    onTemplateEditing: PropTypes.func.isRequired,
}

export default TemplatePageList;