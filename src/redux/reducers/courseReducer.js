import initialState from './initialState';
import * as types from '../actions/actionTypes';

export const courseReducer = (state = initialState.courses, action ) => {
  switch (action.type) {
		case types.CREATE_COURSE_SUCCESS:
			return [...state, { ...action.course }];
    case types.UPDATE_COURSE_SUCCESS:
      return state.map(course =>
        course.id = action.course.id ? action.course : course);
		case types.LOAD_COURSES_SUCCESS:
			return action.courses;
		case types.DELETE_COURSE_OPTIMISTIC:
			return state.filter(course => course.id !== action.course.id);
		default:
			return state;
	}
};

export const getCourseBySlug = (courses, slug) => {
  return courses.find(course => course.slug === slug) || null;
};