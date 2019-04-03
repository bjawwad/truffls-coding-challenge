import React from 'react';
import PropTypes from 'prop-types';
// React Redux
import { connect } from 'react-redux';
// CSS
import './TemplatesEditPage.style.css';
// Components
import TemplatesEditPageLanguage from './TemplatesEditPageLanguage';
import TemplatesEditPageName from './TemplatesEditPageName';
import TemplatesEditPageContent from './TemplatesEditPageContent';
import TemplatesEditPageActions from './TemplatesEditPageActions';
// Redux Actions
import { saveTemplateDispatch, getTemplateByIdDispatch, updateTemplateDispatch } from '../../store/actions';

class SettingsTemplateEditPage extends React.Component {
    state = {
        id: 0,
        updated: null,
        language: '',
        name: '',
        content: '',
        canSave: '',
        isSavingTemplate: '',
        invalidForm: {
            language: false,
            name: false,
            content: false,
        }
    }

    componentDidMount() {
        const { type } = this.props;
        if (type === 'edit') {
            const { location, getTemplate } = this.props;
            const paths = location.pathname.split('/');
            const templateId = paths[paths.length - 1];
            getTemplate(templateId);
        }
    }

    componentDidUpdate(prevProps) {
        const { templateSaved, template } = this.props;
        if (templateSaved) {
            const { history } = this.props;
            history.push('/');
        }
        if (template.id !== prevProps.template.id) {
            this.setState({
                id: template.id,
                updated: template.updated,
                language: template.lang,
                name: template.title,
                content: template.content,
            })
        }
    }

    handleChange = e => {
        const { name, value } = e.target;
        this.setState(prevState => {
            const _name = name === 'languageDE' || name === 'languageEN' ? 'language' : name;
            const { invalidForm } = prevState;
            invalidForm[_name] = value ? false : true;
            return {
                ...prevState,
                [_name]: value,
                invalidForm,
            }
        });
    }

    handleSaveTemplate = e => {
        e.preventDefault();
        const isValid = this.validateForm();
        if (isValid) {
            console.log(this.state);
            const { saveTemplate, updateTemplate, type } = this.props;
            const { name, content, language, id } = this.state;
            if(type === 'add'){
                saveTemplate({
                    title: name,
                    lang: language,
                    content,
                })
            }
            else {
                updateTemplate(id, {
                    title: name,
                    lang: language,
                    content,
                })
            }
            
        }
    }

    handleCancelButtonClick() {
        const { history } = this.props;
        history.push('/');
    }

    handleResetButtonClick() { }

    validateForm = () => {
        let isValid = true;
        const keys = Object.keys(this.state);
        let inValidKeys = [];
        keys.forEach(key => {
            if (key !== 'canSave' && key !== 'isSavingTemplate' && key !== 'id' && key !== 'updated') {
                if (!this.state[key]) {
                    inValidKeys.push(key);
                    isValid = false;
                }
            }
        })

        this.setState(prevState => {
            const { invalidForm } = prevState;
            inValidKeys.forEach(invalidKey => {
                invalidForm[invalidKey] = true;
            })
            return {
                ...prevState,
                invalidForm,
            }
        })

        return isValid;
    }

    render() {
        const { type } = this.props;
        const { name, language, content, canSave, isSavingTemplate, invalidForm } = this.state;
        return (
            <div className="edit-page">
                <div className="edit-page-header">
                    <h1>
                        {type === "add" ? 'Add Template' : "Edit Template"}
                    </h1>
                    <p>
                        You can use templates to pre-defined text to send to candidates directly in the Messenger.
                    </p>
                </div>

                <form onSubmit={e => { this.handleSaveTemplate(e) }} className="edit-form-card">
                    <h3>
                        General information
                    </h3>

                    <TemplatesEditPageLanguage
                        value={language}
                        onChange={e => this.handleChange(e)}
                        isInvalid={invalidForm.language}
                    />

                    <TemplatesEditPageName
                        value={name}
                        onChange={e => this.handleChange(e)}
                        isInvalid={invalidForm.name}
                    />

                    <TemplatesEditPageContent
                        value={content}
                        onChange={e => this.handleChange(e)}
                        isInvalid={invalidForm.content}
                    />

                    <TemplatesEditPageActions
                        isSavingTemplate={isSavingTemplate}
                        canSave={canSave}
                        onCancelButtonClick={() => this.handleCancelButtonClick()}
                        onResetButtonClick={this.handleResetButtonClick}
                    />
                </form>
            </div>
        );
    }
}

SettingsTemplateEditPage.defaultProps = {
    type: "edit",
    template: {},
    templateSaved: false,
}

SettingsTemplateEditPage.propTypes = {
    type: PropTypes.string,
    history: PropTypes.object.isRequired,
    location: PropTypes.object.isRequired,
    template: PropTypes.object,
    templateSaved: PropTypes.bool,
    getTemplate: PropTypes.func,
}

function mapStateToProps(state) {
    return {
        template: state.template,
        templateSaved: state.templateSaved,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        saveTemplate: template => dispatch(saveTemplateDispatch(template)),
        getTemplate: id => dispatch(getTemplateByIdDispatch(id)),
        updateTemplate: (id, template) => dispatch(updateTemplateDispatch(id, template)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsTemplateEditPage);