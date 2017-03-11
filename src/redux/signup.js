import {
	showLoading,
	hideLoading
} from 'redux/sharedData';

import AuthenticationService from 'network/AuthenticationService';

//=============================//
//      Action Types
//=============================//
export const SUCCESS = 'Success';
export const FAILED  = 'Failed';

//=============================//
//      Action Creators
//=============================//
export function signUpRequestSuccess() {
	return {
		type: SUCCESS
	};
}

export function signUpRequestFailed(error) {
	return {
		type: FAILED,
		error: error.message
	};
}

//=============================//
//      Reducer
//=============================//
export const INITIAL_STATE = {
	error: '',
	isSuccess: false
};

export function signUpReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
		case SUCCESS:
			return {
				...state,
				error: '',
				isSuccess: true
			};
		case FAILED:
			return {
				...state,
				error: action.error,
				isSuccess: false
			};
		default:
			return state;
  }
};

//=============================//
//4: Load Data
//=============================//
export function signUp(userCredentials) {
  return (dispatch, getState) => {
		dispatch(showLoading());
    return AuthenticationService.signup(userCredentials)
    .then(json => {
				dispatch(hideLoading());
        dispatch(signUpRequestSuccess());
    })
    .catch(error => {
			dispatch(hideLoading());
      dispatch(signUpRequestFailed(error))
    });
  };
}
