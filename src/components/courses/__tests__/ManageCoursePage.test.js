import React from 'react';
import { mount } from 'enzyme';
import { ManageCoursePage } from '../ManageCoursePage';
import { authors, newCourse, courses } from '.././../../../tools/mockData';

const render = args => {
  const defaultProps = {
    authors,
    courses,
    course: newCourse,
    loadCourses: jest.fn(),
    loadAuthors: jest.fn(),
    saveCourse: jest.fn(),
    history: {}
  };
  const props = { ...defaultProps, ...args };
  return mount(<ManageCoursePage {...props} />);
};

it('should error when attempting to save an empty Title', () => {
  const wrapper = render();
  wrapper.find('form').simulate('submit');
  const error = wrapper.find('.alert').first();
  expect(error.text()).toBe('Title is required.');
});
