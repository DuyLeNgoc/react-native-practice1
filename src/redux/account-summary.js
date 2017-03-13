import {
	showLoading,
	hideLoading
} from 'redux/sharedData';

import UserService from 'network/UserService';

//=============================//
//      Action Types
//=============================//
export const SUCCESS = 'AccountSummarySuccess';
export const FAILED  = 'AccountSummaryFailed';

//=============================//
//      Action Creators
//=============================//
export function accountSummaryRequestSuccess(json) {
	return {
		type: SUCCESS,
		accountList: json
	};
}

export function accountSummaryRequestFailed(error) {
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
	isSuccess: false,
	accountList: []
};

export function accountListReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
		case SUCCESS:
			console.log('### accountListReducer SUCCESS ');
			return {
				...state,
				error: '',
				isSuccess: true,
				accountList: action.accountList
			};
		case FAILED:
		console.log('### accountListReducer FAILED ');
			return {
				...state,
				error: action.error,
				isSuccess: false,
				accountList: []
			};
		default:
			return state;
  }
};

//=============================//
//4: Load Data
//=============================//
export function getList(userCredentials) {
  return (dispatch, getState) => {
		dispatch(showLoading());
    return UserService.getList(userCredentials)
    .then(json => {
				dispatch(hideLoading());
        dispatch(accountSummaryRequestSuccess(json));
    })
    .catch(error => {
			dispatch(hideLoading());
      dispatch(accountSummaryRequestFailed(error))
    });
  };
}
