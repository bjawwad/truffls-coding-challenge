
let getTemplates;
let createTemplate;
let getTemplate;
let updateTemplate;
let deleteTemplate;

let originalDateNow;

beforeEach(() => {
    jest.resetModules();

    const templatesService = require('../templates');

    getTemplates = templatesService.getTemplates;
    createTemplate = templatesService.createTemplate;
    getTemplate = templatesService.getTemplate;
    updateTemplate = templatesService.updateTemplate;
    deleteTemplate = templatesService.deleteTemplate;

    originalDateNow = Date.now;
    Date.now = jest.fn(() => 1553138927010);
});

afterEach(() => {
    Date.now = originalDateNow;
});

describe('getTemplates', () => {
    it('returns list of templates', () => {
        const data = getTemplates();

        expect(typeof data.count).toBe('number');
        expect(data.results).toBeInstanceOf(Array);
    });
});

describe('createTemplate', () => {
    it('returns created template in response data if template could be created', () => {
        const newTemplate = {
            title: 'Template title',
            content: 'Template content',
            lang: 'en'
        };

        const data = createTemplate(newTemplate);

        expect(typeof data.id).toBe('number');
        expect(typeof data.updated).toBe('number');
        expect(data.title).toBe(newTemplate.title);
        expect(data.content).toBe(newTemplate.content);
        expect(data.lang).toBe(newTemplate.lang);
        expect(data.active).toBe(true);
    });

    it('returns created template in reponse data if template could be created with active flag', () => {
        const newTemplate = {
            title: 'Template title',
            content: 'Template content',
            lang: 'en',
            active: false
        };

        const data = createTemplate(newTemplate);


        expect(typeof data.id).toBe('number');
        expect(typeof data.updated).toBe('number');
        expect(data.title).toBe(newTemplate.title);
        expect(data.content).toBe(newTemplate.content);
        expect(data.lang).toBe(newTemplate.lang);
        expect(data.active).toBe(newTemplate.active);
    });

    it('returns errors in response data if title is missing', () => {
        const newTemplate = {
            content: 'Template content',
            lang: 'en'
        };

        const data = createTemplate(newTemplate);


        expect(data.errors).toBeInstanceOf(Array);
        expect(data.errors).toHaveLength(1);

        const error = data.errors[0];
        expect(error.code).toBe('32100');
        expect(error.source.pointer).toBe('/title');
    });

    it('returns errors in response data if title is too short', () => {
        const newTemplate = {
            title: '',
            content: 'Template content',
            lang: 'en'
        };

        const data = createTemplate(newTemplate);


        expect(data.errors).toBeInstanceOf(Array);
        expect(data.errors).toHaveLength(1);

        const error = data.errors[0];
        expect(error.code).toBe('32100');
        expect(error.source.pointer).toBe('/title');
    });

    it('returns errors in response data if content is missing', () => {
        const newTemplate = {
            title: 'Template title',
            lang: 'en'
        };

        const data = createTemplate(newTemplate);


        expect(data.errors).toBeInstanceOf(Array);
        expect(data.errors).toHaveLength(1);

        const error = data.errors[0];
        expect(error.code).toBe('32100');
        expect(error.source.pointer).toBe('/content');
    });

    it('returns errors in response data if content is too short', () => {
        const newTemplate = {
            title: 'Template title',
            content: '',
            lang: 'en'
        };

        const data = createTemplate(newTemplate);


        expect(data.errors).toBeInstanceOf(Array);
        expect(data.errors).toHaveLength(1);

        const error = data.errors[0];
        expect(error.code).toBe('32100');
        expect(error.source.pointer).toBe('/content');
    });

    it('returns errors in response data if lang is missing', () => {
        const newTemplate = {
            title: 'Template title',
            content: 'Template content'
        };

        const data = createTemplate(newTemplate);


        expect(data.errors).toBeInstanceOf(Array);
        expect(data.errors).toHaveLength(1);

        const error = data.errors[0];
        expect(error.code).toBe('32100');
        expect(error.source.pointer).toBe('/lang');
    });

    it('returns errors in response data if lang is not a valid choice', () => {
        const newTemplate = {
            title: 'Template title',
            content: 'Template content',
            lang: 'invalid'
        };

        const data = createTemplate(newTemplate);

        expect(data.errors).toBeInstanceOf(Array);
        expect(data.errors).toHaveLength(1);

        const error = data.errors[0];
        expect(error.code).toBe('32100');
        expect(error.source.pointer).toBe('/lang');
    });

    it('returns errors in response data if active is not a valid choice', () => {
        const newTemplate = {
            title: 'Template title',
            content: 'Template content',
            lang: 'en',
            active: 'invalid'
        };

        const data = createTemplate(newTemplate);

        expect(data.errors).toBeInstanceOf(Array);
        expect(data.errors).toHaveLength(1);

        const error = data.errors[0];
        expect(error.code).toBe('32100');
        expect(error.source.pointer).toBe('/active');
    });

});

describe('getTemplate', () => {
    it('returns template in response data if template could be found', () => {
        const data = getTemplate(1);

        expect(typeof data).toBe('object');
        expect(data.id).toBe(1);
    });

    it('returns errors in response data if template could not be found', () => {
        const data = getTemplate(10000000000000);

        expect(data.errors).toBeInstanceOf(Array);

        const error = data.errors[0];
        expect(error.code).toBe('18000');
    });
});

describe('updateTemplate', () => {
    let template;

    beforeEach(() => {
        Date.now.mockImplementation(() => 1553238927010);

        template = createTemplate({
            title: 'Template title',
            content: 'Template content',
            lang: 'en'
        });

        Date.now.mockImplementation(() => 1553239927010);
    });

    it('returns template in response with updated updated date', () => {
        const partialTemplate = {};

        const data = updateTemplate(template.id, partialTemplate);

        expect(data.updated > template.updated).toBe(true);
    });

    it('returns updated template in response data if only title was passed', () => {
        const partialTemplate = {
            title: 'Updated template title'
        };

        const data = updateTemplate(template.id, partialTemplate);


        expect(data.id).toBe(template.id);
        expect(data.title).toBe(partialTemplate.title);
        expect(data.content).toBe(template.content);
        expect(data.lang).toBe(template.lang);
        expect(data.active).toBe(template.active);
    });

    it('returns updated template in response data if only content was passed', () => {
        const partialTemplate = {
            content: 'Updated template content'
        };

        const data = updateTemplate(template.id, partialTemplate);


        expect(data.id).toBe(template.id);
        expect(data.title).toBe(template.title);
        expect(data.content).toBe(partialTemplate.content);
        expect(data.lang).toBe(template.lang);
        expect(data.active).toBe(template.active);
    });

    it('returns updated template in response data if only lang was passed', () => {
        const partialTemplate = {
            lang: 'de'
        };

        const data = updateTemplate(template.id, partialTemplate);


        expect(data.id).toBe(template.id);
        expect(data.updated > template.updated).toBe(true);
        expect(data.title).toBe(template.title);
        expect(data.content).toBe(template.content);
        expect(data.lang).toBe(partialTemplate.lang);
        expect(data.active).toBe(template.active);
    });

    it('returns updated template in response data if only active was passed', () => {
        const partialTemplate = {
            active: !template.active
        };

        const data = updateTemplate(template.id, partialTemplate);


        expect(data.id).toBe(template.id);
        expect(data.title).toBe(template.title);
        expect(data.content).toBe(template.content);
        expect(data.lang).toBe(template.lang);
        expect(data.active).toBe(partialTemplate.active);
    });

    it('returns errors in response data if title is too short', () => {
        const newTemplate = {
            title: ''
        };

        const data = updateTemplate(template.id, newTemplate);


        expect(data.errors).toBeInstanceOf(Array);
        expect(data.errors).toHaveLength(1);

        const error = data.errors[0];
        expect(error.code).toBe('32100');
        expect(error.source.pointer).toBe('/title');
    });

    it('returns errors in response data if content is too short', () => {
        const newTemplate = {
            content: ''
        };

        const data = updateTemplate(template.id, newTemplate);


        expect(data.errors).toBeInstanceOf(Array);
        expect(data.errors).toHaveLength(1);

        const error = data.errors[0];
        expect(error.code).toBe('32100');
        expect(error.source.pointer).toBe('/content');
    });

    it('returns errors in response data if lang is not a valid choice', () => {
        const newTemplate = {
            lang: 'invalid'
        };

        const data = updateTemplate(template.id, newTemplate);

        expect(data.errors).toBeInstanceOf(Array);
        expect(data.errors).toHaveLength(1);

        const error = data.errors[0];
        expect(error.code).toBe('32100');
        expect(error.source.pointer).toBe('/lang');
    });

    it('returns errors in response data if active is not a valid choice', () => {
        const newTemplate = {
            active: 'invalid'
        };

        const data = updateTemplate(template.id, newTemplate);

        expect(data.errors).toBeInstanceOf(Array);
        expect(data.errors).toHaveLength(1);

        const error = data.errors[0];
        expect(error.code).toBe('32100');
        expect(error.source.pointer).toBe('/active');
    });
});

describe('deleteTemplate', () => {
    let template;

    beforeEach(() => {
        template = createTemplate({
            title: 'Template title',
            content: 'Template content',
            lang: 'en'
        });
    });

    it('returns success response if template could be found', () => {
        const data = deleteTemplate(template.id);

        expect(data).toBe(null);
    });

    it('returns errors in response data if template could not be found', () => {
        const data = deleteTemplate(10000000000000);

        expect(data.errors).toBeInstanceOf(Array);

        const error = data.errors[0];
        expect(error.code).toBe('18000');
    });
});
