import {
    GET_ALL_TEMPLATES,
    SET_TEMPLATE_ACTIVATION,
    ON_SAVE_TEMPLATE,
    ON_GET_TEMPLATE_BY_ID,
} from './actions';

const initialState = {
    templates: [],
    template: {},
    templateSaved: false,
}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case GET_ALL_TEMPLATES: {
            return { ...state, templates: action.templates, template: {}, templateSaved: false, }
        }
        case SET_TEMPLATE_ACTIVATION: {
            const { id, isActivated } = action;
            const { templates } = state;
            const { results } = templates;
            const newResults = results.map(result => {
                return result.id === id ? { ...result, active: isActivated } : { ...result };
            })
            return { ...state, templates: { ...templates, results: newResults } }

        }
        case ON_SAVE_TEMPLATE: {
            return { ...state, templateSaved: true, }
        }
        case ON_GET_TEMPLATE_BY_ID: {
            return { ...state, template: action.template, templateSaved: false, }
        }
        default: {
            return state;
        }
    }
}

export default rootReducer;
