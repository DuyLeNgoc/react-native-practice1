import 'react-native';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
const { Response } = require('fetch-ponyfill')(Response);

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
const MOCK_ERROR = {message: 'testing failed'}

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);
const mockResponse = (status, response) => {
	return Response(response,
	{
		ok: true,
		status: status
	});
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
	});
});
