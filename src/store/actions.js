import { getAllTemplates, createTemplate, getTemplate, updateTemplate } from '../services/templates';

export const GET_ALL_TEMPLATES = 'GET_ALL_TEMPLATES';
export const SET_TEMPLATE_ACTIVATION = 'SET_TEMPLATE_ACTIVATION';
export const ON_GET_TEMPLATE_BY_ID = 'ON_GET_TEMPLATE_BY_ID';
export const ON_SAVE_TEMPLATE = 'ON_SAVE_TEMPLATE';

export function getTemplates(templates) {
    return {
        type: GET_ALL_TEMPLATES,
        templates,
    }
}

export function setTemplateActivation(id, isActivated) {
    return {
        type: SET_TEMPLATE_ACTIVATION,
        id,
        isActivated
    }
}

export function onSaveTemplate(savedTemplate) {
    return {
        type: ON_SAVE_TEMPLATE,
        savedTemplate,
    }
}

export function onGetTemplateById(template) {
    return {
        type: ON_GET_TEMPLATE_BY_ID,
        template,
    }
}

export const getTemplatesDispatch = () => dispatch => {
    const templates = getAllTemplates();
    dispatch(getTemplates(templates));
}

export const saveTemplateDispatch = template => dispatch => {
    const response = createTemplate(template);
    if (response) {
        dispatch(onSaveTemplate(response));
    }
}

export const getTemplateByIdDispatch = id => dispatch => {
    const template = getTemplate(id);
    if(template){
        dispatch(onGetTemplateById(template));
    }
}

export const updateTemplateDispatch = (id, template) => dispatch => {
    const response = updateTemplate(id, template);
    if(response){
        dispatch(onSaveTemplate(response));
    }
}