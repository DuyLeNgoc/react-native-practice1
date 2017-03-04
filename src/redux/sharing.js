//=============================//
//      Action Types
//=============================//
export const SHOW_LOADING = 'SHOW_LOADING';
export const HIDE_LOADING = 'HIDE_LOADING';
export const SHOW_ERROR   = 'SHOW_ERROR';
export const HIDE_ERROR   = 'HIDE_ERROR';
export const RESET_INPUT  = 'RESET_INPUT';

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

export function resetInput() {
	return {
		type: RESET_INPUT
	};
}

//=============================//
//      Reducer
//=============================//
export const INITIAL_STATE = {
	error: '',
	loading: false
};

export default function sharedData(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SHOW_LOADING:
			return {
				...state,
				loading: true,
				error: ''
			};
		case HIDE_LOADING:
			return {
				...state,
				loading: false,
				error: ''
			};
		case SHOW_ERROR:
			return {
				...state,
				loading: false,
				error: action.error
			};
		case HIDE_ERROR:
			console.log(action.error);
			return {
				...state,
				loading: false,
				error: ''
			};
		case RESET_INPUT:
			return {
				...state,
				loading: false,
				error: '',
				resetInput: true
			};
		default:
			return state;
  }
};
