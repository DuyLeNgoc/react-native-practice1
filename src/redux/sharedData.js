import { combineReducers } from 'redux';

//=============================//
//      Action Types
//=============================//
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';

export const SHOW_ERROR   = 'SHOW_ERROR';
export const HIDE_ERROR   = 'HIDE_ERROR';

export const SAVE_USER_SESSION  = 'SAVE_USER_SESSION';
export const CLEAR_USER_SESSION = 'CLEAR_USER_SESSION';

//=============================//
//      Action Creators
//=============================//
export function showLoading() {
	return {
		type: SHOW_LOADING,
		loading: true
	};
}

export function hideLoading(json) {
	return {
		type: HIDE_LOADING,
		loading: false
	};
}

export function showError(error) {
	return {
		type: SHOW_ERROR,
		error: error.message
	};
}

export function hideError() {
	return {
		type: HIDE_ERROR,
		error: ''
	};
}

export function saveUser(user) {
	return {
		type: SAVE_USER_SESSION,
		user: user
	};
}

export function clearUser() {
	return {
		type: CLEAR_USER_SESSION,
		user: null
	};
}

//=============================//
//      Reducer
//=============================//
//reducer for loading
export const initialSateLoading = {
	loading: false,
	message: ''
};

export function loadingInfo(state = initialSateLoading, action) {
  switch (action.type) {
    case SHOW_LOADING:
			return {
				...state,
				loading: true,
				message: action.message
			};
		case HIDE_LOADING:
			return {
				...state,
				loading: false,
				message: ''
			};
	}
	return state;
};

//reducer for error
export function errorMessage(state = null, action) {
  switch (action.type) {
    case SHOW_ERROR:
			return action.message;
		case HIDE_ERROR:
			return null;
	}
	return state;
};

//reducer for user session
export function userSession(state = null, action) {
  switch (action.type) {
    case SAVE_USER_SESSION:
			return action.user;
		case CLEAR_USER_SESSION:
			return null;
	}
	return state;
};

//combineReducers
const reducers = {
  errorMessage,
  userSession,
  loadingInfo
}
export default combineReducers(reducers);
