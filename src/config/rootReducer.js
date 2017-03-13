/**
 * # reducers
 * This class combines all the reducers into one
 */
import { signInReducer } from 'redux/signin';
import { signUpReducer } from 'redux/signup';
import { accountListReducer } from 'redux/account-summary';
import {
  errorMessage,
  userSession,
  loadingInfo
} from 'redux/sharedData';
import { combineReducers } from 'redux';

const reducers = {
  signUpReducer,
  signInReducer,
  errorMessage,
  userSession,
  loadingInfo,
  accountListReducer
}

const rootReducer = combineReducers(reducers)
export default rootReducer;
