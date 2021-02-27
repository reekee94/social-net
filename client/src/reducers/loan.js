// import {
//   GET_LOANS,
//   LOAN_ERROR,
//   DELETE_LOAN,
//   ADD_LOAN,
//   GET_LOAN
// } from '../actions/types';
//
// const initialState = {
//   loans: [],
//   loan: null,
//   loading: true,
//   error: {}
// };
//
// function loanReducer(state = initialState, action) {
//   const { type, payload } = action;
//
//   switch (type) {
//     case GET_LOANS:
//       return {
//         ...state,
//         posts: payload,
//         loading: false
//       };
//     case GET_LOAN:
//       return {
//         ...state,
//         post: payload,
//         loading: false
//       };
//     case ADD_LOAN:
//       return {
//         ...state,
//         posts: [payload, ...state.posts],
//         loading: false
//       };
//     case DELETE_LOAN:
//       return {
//         ...state,
//         posts: state.posts.filter((post) => post._id !== payload),
//         loading: false
//       };
//     case LOAN_ERROR:
//       return {
//         ...state,
//         error: payload,
//         loading: false
//       };
//     default:
//       return state;
//   }
// }
//
// export default loanReducer;
