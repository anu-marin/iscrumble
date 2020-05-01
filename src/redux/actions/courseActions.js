import * as types from './actionTypes';
import * as courseApi from '../../api/courseApi';

export const createCourse = (course) => {
  return { type: types.CREATE_COURSE, course };
};

export function loadCourseSuccess(courses) {
  return { type: types.LOAD_COURSES_SUCCESS, courses };
}

export const loadCourses = () => {
  return async dispatch => {
    try {
      const courseList = await courseApi.getCourses();
      console.log(courseList);
      dispatch(loadCourseSuccess(courseList));
    } catch (err) {
      throw err;
    }
  }
}
