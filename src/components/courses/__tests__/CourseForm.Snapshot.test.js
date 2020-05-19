import React from 'react';
import renderer from 'react-test-renderer';
import CourseForm from '../CourseForm';
import { courses, authors } from '../../../../tools/mockData';

it('should set Save button text to Saving... when saving prop is true', () => {
  const tree = renderer.create(<CourseForm course={courses[0]}
    authors={authors}
    onChange={jest.fn()}
    onSave={jest.fn()}
    saving
  />
  );
  expect(tree).toMatchSnapshot();
});

it('should set Save button text to Save when saving prop is false', () => {
  const tree = renderer.create(
    <CourseForm
      course={courses[0]}
      authors={authors}
      onChange={jest.fn()}
      onSave={jest.fn()}
      saving={false}
		/>
	);
	expect(tree).toMatchSnapshot();
});
