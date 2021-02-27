import api from "../utils/api";
import {setAlert} from "./alert";
import {
  DELETE_ACC,
  GET_BANK,
  GET_BANKS,
  BANK_ERROR,
  UPDATE_BANK,
  CLEAR_BANK
} from "./types";

//Get all banks
export const getBanks = () => async dispatch => {
  //dispatch({type: CLEAR_BANK})
  try {
    const res = await api.get('/bank')

    dispatch({
      type: GET_BANKS,
      payload: res.data
    })
  } catch (e) {
    dispatch({
      type: BANK_ERROR,
      payload: {msg: e.response.statusText, status: e.response.status}
    })
  }
}

//Get bank by ID
export const getBankById = (userId) => async dispatch => {
  //dispatch({type: CLEAR_BANK})
  console.log(userId, 'USER ID IN ACTIONS')
  try {
    const res = await api.get(`/bank/${userId}`)
    console.log(res.data)
    const bank = res.data

    dispatch({
      type: GET_BANK,
      payload: bank
    })
  } catch (e) {
    console.log(e);
    dispatch({
      type: BANK_ERROR,
      payload: {msg: e.response.statusText, status: e.response.status}
    })
  }
}

// Create or update bank
export const createBank = (formData, history) => async (
    dispatch
  ) => {
    try {
      const res = await api.post('/bank', formData);

      dispatch({
        type: GET_BANK,
        payload: res.data
      });

      dispatch(setAlert('Bank Created', 'success'));


      history.push('/dashboard');

    } catch (err) {
      const errors = err.response.data.errors;

      if (errors) {
        errors.forEach((error) => dispatch(setAlert(error.msg, 'danger')));
      }

      dispatch({
        type: BANK_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status }
      });
    }
  };


//DELETE ACC
export const deleteAccount = () => async dispatch => {
  if (window.confirm('Are you sure? It cant be undone!')) {
    try {
      const res = await api.delete(`/bank`)
      //dispatch({type: CLEAR_BANK})
      dispatch({type: DELETE_ACC})
      dispatch(setAlert('Your account has been delete'))
    } catch (err) {
      dispatch({
        type: BANK_ERROR,
        payload: {msg: err.response.statusText, status: err.response.status}
      });
    }
  }
}
