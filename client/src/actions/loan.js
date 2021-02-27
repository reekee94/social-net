// import api from '../utils/api';
// import { setAlert } from './alert';
// import {
//   GET_BANKS,
//   ADD_LOAN,
//   BANK_ERROR,
//   DELETE_BANK,
//   ADD_BANK,
//   GET_BANK,
//   UPDATE_BANK
// } from './types';
//
//
// export const addLoan = (formData, history) => async (dispatch) => {
//   try {
//     const res = await api.put('/profile/education', formData);
//
//     dispatch({
//       type: UPDATE_BANK,
//       payload: res.data
//     });
//
//     dispatch(setAlert('Mortgage Added', 'success'));
//
//     history.push('/dashboard');
//   } catch (err) {
//     const errors = err.response.data.errors;
//
//     if (errors) {
//       errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
//     }
//
//     dispatch({
//       type: BANK_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };
//
// // Delete education
// export const deleteEducation = (id) => async (dispatch) => {
//   try {
//     const res = await api.delete(`/profile/education/${id}`);
//
//     dispatch({
//       type: UPDATE_PROFILE,
//       payload: res.data
//     });
//
//     dispatch(setAlert('Education Removed', 'success'));
//   } catch (err) {
//     dispatch({
//       type: PROFILE_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };
//
// export const getPosts = () => async dispatch => {
//   try {
//     const res = await api.get('/posts');
//
//     dispatch({
//       type: GET_POSTS,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };
//
// // Get post
// export const getPost = id => async dispatch => {
//   try {
//     const res = await api.get(`/posts/${id}`);
//
//     dispatch({
//       type: GET_POST,
//       payload: res.data
//     });
//   } catch (err) {
//     dispatch({
//       type: POST_ERROR,
//       payload: { msg: err.response.statusText, status: err.response.status }
//     });
//   }
// };
