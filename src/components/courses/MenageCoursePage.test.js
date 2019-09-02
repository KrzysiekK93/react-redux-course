import React from 'react';
import { mount } from 'enzyme';
import { authors, newCOurse, courses } from '../../../tools/mockData';
import { ManageCoursesPage } from './ManageCoursePage';

function render(args) {
    const defaultPros = {
        authors,
        courses,
        history: {},
        saveCourse: jest.fn(),
        loadAuthots: jest.fn(),
        loadCourses: jest.fn(),
        course: newCOurse,
        match: {}
    };

    const props = { ...defaultPros, ...args };
    return mount(<ManageCoursesPage {...props} />)
}

it("set errot when attempting to save an empty title field", () => {
    const wrapper = render();
    wrapper.find("form").simulate("submit");
    const error = wrapper.find(".alert").first();
    expect(error.text()).toBe("Title is required.");
});