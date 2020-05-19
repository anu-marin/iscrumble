import * as courseActions from '../courseActions';
import * as types from '../actionTypes';
import { courses } from '../../../../tools/mockData';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import fetchMock from 'fetch-mock';

// Test an async action 
const middleware = [thunk];
const mockStore = configureMockStore(middleware);

describe('Async Actions', () => {
  afterEach(() => {
    fetchMock.restore();
  });
});

xit('should loadCourses create BEGIN_API_CALL and LOAD_COURSES_SUCCESS',
  async () => {
  fetchMock.mock('*', {
    body: courses,
    headers: { 'content-type': 'application/json' },
  });
  const store = mockStore({ courses: [] });

  const expectedActions = [
    { type: types.BEGIN_API_CALL },
    { type: types.LOAD_COURSES_SUCCESS, courses },
  ];

  return store.dispatch(courseActions.loadCourses()).then(() => {
    expect(store.getActions()).toEqual(expectedActions);
  });
});

describe('Testing Action Creators', () => {
  it('should create a CREATE_COURSE_SUCCESS action', () => {
    const course = courses[0];
    const expectedAction = {
      type: types.CREATE_COURSE_SUCCESS,
      course
    };
    const action = courseActions.createCourseSuccess(course);
    expect(action).toEqual(expectedAction);
  });

  it('should create a LOAD_COURSES_SUCCESS action', () => {
		const expectedAction = {
			type: types.LOAD_COURSES_SUCCESS,
			courses,
		};
		const action = courseActions.loadCourseSuccess(courses);
		expect(action).toEqual(expectedAction);
  });
  
  it('should create a UPDATE_COURSE_SUCCESS action', () => {
		const course = courses[0];
		const expectedAction = {
			type: types.UPDATE_COURSE_SUCCESS,
			course,
		};
		const action = courseActions.updateCourseSuccess(course);
		expect(action).toEqual(expectedAction);
	});
  
  it('should create a DELETE_COURSE_OPTIMISTIC action', () => {
		const course = courses[0];
		const expectedAction = {
			type: types.DELETE_COURSE_OPTIMISTIC,
			course,
		};
		const action = courseActions.deleteCourseOptimistic(course);
		expect(action).toEqual(expectedAction);
	});
});
