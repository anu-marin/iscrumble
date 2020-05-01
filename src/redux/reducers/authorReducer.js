import initialState from './initialState';
import * as types from '../actions/actionTypes';

export const authorReducer = (state = initialState.authors, action ) => {
  switch(action.type) {
    case types.LOAD_AUTHORS_SUCCESS:
      return action.authors;
    default: 
      return state;
  }
};