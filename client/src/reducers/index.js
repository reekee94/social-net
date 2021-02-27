import {combineReducers} from "redux";
import alert from './alert'
import auth from './auth'
import bank from './bank'
import loan from './loan'

export default combineReducers({alert, auth, bank, loan})
