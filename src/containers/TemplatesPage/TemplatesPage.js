import React from 'react';
import PropTypes from 'prop-types'
// React Redux
import { connect } from 'react-redux';
// CSS
import './TemplatesPage.style.css';
// Components
import Button from '../../components/Button';
import TemplatePageList from './TemplatesPageList';
// Actions
import { getTemplatesDispatch, setTemplateActivation } from '../../store/actions';

class TemplatesPage extends React.Component {
    state = {
        templates: [],
    }
    componentDidMount() {
        const { getAllTemplates } = this.props;
        getAllTemplates();

    }
    componentDidUpdate(prevProps) {
        const { templates } = this.props;
        if (this.props.templates !== prevProps.templates) {
            this.setState({ templates: templates.results });
        }
    }

    render() {
        const { templates } = this.state;
        const { activateTemplate, history } = this.props;
        return (
            <div className="templates-page">
                <div className="templates-header">
                    <h1>Message templates</h1>
                    <p>You can use templates to pre-defined text to send to candidates directly in the Messenger. </p>
                </div>
                <div className="templates-card">
                    <div className="card-title">
                        <h3>YOUR TEMPLATES</h3>
                        <p>Here you can find ready-to-use templates and set up your own. Remember to <strong>switch the visiblity</strong> on
                            to find your templates in the Messenger bar and start using them to communicate with your
                            candidates in a fast, personalized way.</p>
                    </div>
                    <div className="card-content">
                        <div className="content-toolbar">
                            <Button typeStyle="outlined" variationStyle="normal" onClick={() => {
                                history.push('/add')
                            }}>Add Template</Button>
                        </div>
                        <div className="content-list">
                            <TemplatePageList
                                templates={templates}
                                activateTemplate={activateTemplate}
                                onTemplateEditing={id => {
                                    history.push(`/edit/${id}`);
                                }}
                            />
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

TemplatesPage.defaultProps = {
    templates: {},
}

TemplatesPage.propTypes = {
    templates: PropTypes.object.isRequired,
    getAllTemplates: PropTypes.func.isRequired,
    activateTemplate: PropTypes.func,
    history: PropTypes.object.isRequired,

}

function mapStateToProps(state) {
    return {
        templates: state.templates,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        getAllTemplates: () => dispatch(getTemplatesDispatch()),
        activateTemplate: (id, isActivated) => dispatch(setTemplateActivation(id, isActivated))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(TemplatesPage);