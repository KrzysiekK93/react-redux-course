import React from 'react';
import CourseForm from './CourseForm';
import { shallow } from 'enzyme';

function renderCourseForm(args) {
    const defaultPros = {
        authors: [],
        course: {},
        saving: false,
        errors: {},
        onSave: () => {},
        onChange: () => {}
    };

    const props = { ...defaultPros, ...args };
    return shallow(<CourseForm {...props} />)
}

it('render form and header', () => {
    const wrapper = renderCourseForm();
    expect(wrapper.find('form').length).toBe(1);
    expect(wrapper.find('h2').text()).toEqual("Add Course");
})

it('Save button save as "Save" when not saving', () => {
    const wrapper = renderCourseForm();
    expect(wrapper.find('button').text()).toBe("Save");
})

it('labels save button as "Saving..." when saving', () => {
    const wrapper = renderCourseForm({ saving: true });
    expect(wrapper.find('button').text()).toBe("Saving...");
})