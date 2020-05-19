import * as types from './actionTypes';
import * as authorApi from '../../api/authorApi';
import { beginApiCall, apiCallError } from './apiStatusActions';

export const loadAuthorsSuccess = authors => {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
};

export const loadAuthors = () => {
  return async dispatch => {
    dispatch(beginApiCall());
    try {
      const authorList = await authorApi.getAuthors();
      console.log(authorList);
      dispatch(loadAuthorsSuccess(authorList));
    } catch (err) {
      dispatch(apiCallError(err));
      throw err;
    }
  }
};
