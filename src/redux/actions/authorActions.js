import * as types from './actionTypes';
import * as authorApi from '../../api/authorApi';

export function loadAuthorsSuccess(authors) {
  return { type: types.LOAD_AUTHORS_SUCCESS, authors };
}

export const loadauthors = () => {
  return async dispatch => {
    try {
      const authorList = await authorApi.getAuthors();
      console.log(authorList);
      dispatch(loadAuthorsSuccess(authorList));
    } catch (err) {
      throw err;
    }
  }
}
