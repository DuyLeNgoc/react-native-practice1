import AuthenticationService from 'network/AuthenticationService';
import {
	showLoading,
	hideLoading,
	showError,
	hideError,
	resetInput,
	saveUser
} from 'redux/sharedData';

//=============================//
//      Action Types
//=============================//
export const SUCCESS = 'SignInSuccess';
export const FAILED  = 'SignInFailed';

//=============================//
//      Action Creators
//=============================//
export function signInRequestSuccess(json) {
	return {
		type: SUCCESS,
		payload: json
	};
}

export function signInRequestFailed(error) {
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
	loading: false
};

export function signInReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
		case SUCCESS:
			return {
				...state,
				loading: false,
				error: '',
				user: action.payload
			};
		case FAILED:
			console.log(action.error);
			return {
				...state,
				loading: false,
				error: action.error
			};
		default:
			return state;
  }
};

//=============================//
//4: Load Data
//=============================//
export function signIn(userCredentials) {
  return (dispatch, getState) => {
		dispatch(showLoading());
    return AuthenticationService.signin(userCredentials)
    .then(json => {
				dispatch(hideLoading());
        dispatch(signInRequestSuccess(json));
				dispatch(saveUser(json));
    })
    .catch(error => {
      console.log('There has been a problem with your fetch operation: ' + error.message);
			dispatch(hideLoading());
      dispatch(signInRequestFailed(error));
    });
  };
}
