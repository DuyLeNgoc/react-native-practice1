import 'react-native';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';

import {
	INITIAL_STATE,
	signInReducer,
	REQUEST,
	SUCCESS,
	FAILED,
	login
} from 'redux/signin';

const MOCK_USERINFO = {
	trainee_id: 1,
	full_name: 'test',
	email: 'test@gmail.com',
	birthday: '1986-01-20',
	token: 'abcxyzwendsjkfjdsklfjkds'
};

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const mockResponse = (status, response) => {
	return {
		ok: status,
		body: response
	};
};

describe('async actions with jest', () => {
	it('calls request and success actions if the fetch response was successful', () => {

	  window.fetch = jest.fn().mockImplementation(() =>
	    Promise.resolve(mockResponse(200, MOCK_USERINFO)));

		const expectedActions = [
      { type: REQUEST },
      { type: SUCCESS, payload: MOCK_USERINFO }
    ];
    const store = mockStore({ signInReducer: INITIAL_STATE });

	  store.dispatch(login({}))
			.then(() => {
				const receivedActions = store.getActions();
	      expect(receivedActions.length).toBe(2);
				expect(receivedActions).toEqual(expectedActions)
	    });

  	store.dispatch(login({})); // Different id
		expect(window.fetch).toBeCalled();
	});
});
