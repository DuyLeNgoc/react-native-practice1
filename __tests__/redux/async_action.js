import 'react-native';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import expect from 'expect';
import fetchMock from 'fetch-mock';
import fetchPonyfill from 'fetch-ponyfill';

import {
	INITIAL_STATE as initialSignInState,
	signInReducer,
	loginRequest,
	loginRequestSuccess,
	loginRequestFailed,
	SUCCESS,
	FAILED,
	login
} from 'redux/signin';

import {
	INITIAL_STATE as initialSharedState,
	SHOW_LOADING,
	HIDE_LOADING
} from 'redux/sharing';

const MOCK_USERINFO = {
	trainee_id: 1,
	full_name: 'test',
	email: 'test@gmail.com',
	birthday: '1986-01-20',
	token: 'abcxyzwendsjkfjdsklfjkds'
};
const MOCK_ERROR = {message: 'testing failed'}

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions with jest-mock', () => {
	beforeEach(() => {
		fetchMock.reset();
	});

	afterEach(() => {
		// Unmock.restore fetch() to its native implementation
		fetchMock.restore();
	});

  it('creates SUCCESS when call signin has been done', () => {
		fetchMock.setImplementations(fetchPonyfill);
		fetchMock.post('*', {body: MOCK_USERINFO});
    const expectedActions = [
      { type: SHOW_LOADING, loading: true },
      { type: SUCCESS, payload: MOCK_USERINFO },
			{ type: HIDE_LOADING, loading: false }
    ]
    const store = mockStore({
			signInReducer: initialSignInState,
			sharedData: initialSharedState });

    return store.dispatch(login({}))
      .then(() => {
				const receivedActions = store.getActions();
	      expect(receivedActions.length).toBe(3);
				expect(receivedActions).toEqual(expectedActions)
      })
  });

	it('creates FAILED when call signin has been done', () => {
		// fetchMock.setImplementations(fetchPonyfill);
		fetchMock.post('*', {body: {error: MOCK_ERROR.message}});
		const expectedActions = [
      { type: SHOW_LOADING, loading: true },
      { type: FAILED, error: MOCK_ERROR.message },
			{ type: HIDE_LOADING, loading: false }
    ];
		const store = mockStore({
			signInReducer: initialSignInState,
			sharedData: initialSharedState });

    return store.dispatch(login({}))
      .then(() => {
				const receivedActions = store.getActions();
	      expect(receivedActions.length).toBe(3);
				expect(receivedActions).toEqual(expectedActions)
      })
  });
});
