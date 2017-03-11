import { Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';

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
export const REQUEST = 'Request';
export const SUCCESS = 'Success';
export const FAILED  = 'Failed';

//=============================//
//      Action Creators
//=============================//
export function signInRequest() {
	return {
		type: REQUEST
	};
}

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
    case REQUEST:
			return {
				...state,
				loading: true,
				error: ''
			};
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
    // dispatch(signInRequest());
		dispatch(showLoading());
    return AuthenticationService.signin(userCredentials)
    .then(json => {
				dispatch(hideLoading());
        dispatch(signInRequestSuccess(json));
				dispatch(saveUser(json));
    })
    .catch(error => {
			dispatch(hideLoading());
      console.log('There has been a problem with your fetch operation: ' + error.message);
      dispatch(signInRequestFailed(error))
    });
  };
}

export function signOut() {
  return (dispatch, getState) => {
		dispatch(showLoading());
	  return AuthenticationService.signout({'x-access-token': getState.userSession.token})
		.then(json => {
			dispatch(hideLoading);
	    Actions.SignIn();
	  })
		.catch(error => {
			dispatch(hideLoading);
	    Alert.alert(
	      'Log out'
	      `Logout Failed: ${error.message}`,
	      [
	        {text: 'OK'},
	      ]
	    )
	  });
	};
}
