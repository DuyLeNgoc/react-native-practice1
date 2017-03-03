import AuthenticationService from 'network/AuthenticationService';

//=============================//
//      Action Types
//=============================//
export const REQUEST = 'Request';
export const SUCCESS = 'Success';
export const FAILED  = 'Failed';

//=============================//
//      Action Creators
//=============================//
export function loginRequest() {
	return {
		type: REQUEST
	};
}

export function loginRequestSuccess(json) {
	return {
		type: SUCCESS,
		payload: json
	};
}

export function loginRequestFailed(error) {
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
  }
};

//=============================//
//4: Load Data
//=============================//
export function login(userCredentials) {
  return (dispatch, getState) => {
    dispatch(loginRequest());
    return AuthenticationService.signin(userCredentials)
    .then(json => {
        dispatch(loginRequestSuccess(json));
    })
    .catch(error => {
      console.log('There has been a problem with your fetch operation: ' + error.message);
      dispatch(loginRequestFailed(error))
    });
  };
}
