/**
 * # reducers
 * This class combines all the reducers into one
 */
import { signInReducer } from 'redux/signin';
import sharedData from 'redux/sharing';
import { combineReducers } from 'redux';

const RESET_ERROR_MESSAGE = 'Reset Error Message';
/**
 * ## CombineReducers
 * the rootReducer will call each and every reducer with the state and action
 * EVERY TIME there is a basic action
 */

function errorMessage(state = null, action) {
  const {type, error} = action;
  if (type === RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return action.error;
  }
  return state;
}

const reducers = {
  errorMessage,
  signInReducer,
  sharedData
}

const rootReducer = combineReducers(reducers)
export default rootReducer;
