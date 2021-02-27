import {GET_BANK, BANK_ERROR, CLEAR_BANK, UPDATE_BANK, GET_BANKS} from "../actions/types";

const initialState = {
  bank: null,
  banks: [],
  loading: true,
  error: {}
}

export default function (state = initialState, action) {
  const {type, payload} = action

  switch (type) {
    case GET_BANK:
    case UPDATE_BANK:
      console.log(payload, "PAaYLOAD")
      return {
        ...state,
        bank: {payload},
        // profile: payload,
        loading: false
      }
    case GET_BANKS:
      return {
        ...state,
        banks: payload,
        loading: false
      };
    case BANK_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      }
    case CLEAR_BANK:
      return {
        ...state,
        repos: [],
        loading: false
      }
    default:
      return state
  }
}
