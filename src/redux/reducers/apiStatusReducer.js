import * as types from '../actions/actionTypes';
import initialState from './initialState';

const actionTypeEndsInSuccess = type => {
  return type.substring(type.length - 8) === 'SUCCESS';
};

export const apiCallStatusReducer = (
  state = initialState.apiCallsInProgress, action) => {
  if (action.types === types.BEGIN_API_CALL) {
    return state++;
  } else if (
    action.type === types.API_CALL_ERROR ||
    actionTypeEndsInSuccess(action.type)
  ) {
    return state--;
  }
  return state;
};

