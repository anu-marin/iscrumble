import React from 'react';
import { shallow } from 'enzyme';
import CourseForm from '../CourseForm';

function renderCourseForm(args) {
  const defaultProps = {
    course: {},
    authors: [],
    onSave: () => {},
    onChange: () => {},
    saving: false,
    errors: {}
  };
  const props = { ...defaultProps, ...args };
  return shallow(<CourseForm {...props} />);
}

it('should render a form and header', () => {
  const wrapper = renderCourseForm();
  expect(wrapper.find('form').length).toBe(1);
  expect(wrapper.find('h2').text()).toEqual('Add Course');
});

it('should display "Save" button when saving is false', () => {
	const wrapper = renderCourseForm();
	expect(wrapper.find('button').text()).toEqual('Save');
});

it('should display "Saving..." button when saving is true', () => {
	const wrapper = renderCourseForm({ saving: true });
	expect(wrapper.find('button').text()).toEqual('Saving...');
});