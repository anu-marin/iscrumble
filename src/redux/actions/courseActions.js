import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';
import { beginApiCall, apiCallError } from './apiStatusActions'

export const loadCourseSuccess = courses => {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
};

export const createCourseSuccess = course => {
  return { type: types.CREATE_COURSE_SUCCESS, course };
};

export const updateCourseSuccess = course => {
  return { type: types.UPDATE_COURSE_SUCCESS, course };
};

export const deleteCourseOptimistic = course => {
  return { type: types.DELETE_COURSE_OPTIMISTIC, course };
};

export const loadCourses = () => {
  return async dispatch => {
    dispatch(beginApiCall());
    try {
      const courseList = await courseApi.getCourses();
      dispatch(loadCourseSuccess(courseList));
    } catch (err) {
      dispatch(apiCallError(err));
      throw err;
    }
  }
};

export const saveCourse = course => {
	return async dispatch => {
    dispatch(beginApiCall());
    try
    {
      const savedCourse = await courseApi.saveCourse(course);
      if (savedCourse.id) {
        dispatch(updateCourseSuccess(savedCourse));
      } else {
        dispatch(createCourseSuccess(savedCourse));
      }
    } catch (err) {
      dispatch(apiCallError(err));
			throw err;
		}
	};
};

export function deleteCourse(course) {
  return function (dispatch) {
    dispatch(deleteCourseOptimistic(course));
    return courseApi.deleteCourse(course.id);
  };
}
