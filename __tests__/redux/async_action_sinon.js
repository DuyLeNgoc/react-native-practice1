import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import {
	INITIAL_STATE as initialSignInState,
	signInReducer,
	signInRequestSuccess,
	signInRequestFailed,
	SUCCESS,
	FAILED,
	signIn
} from 'redux/signin';

import {
	initialStateLoading as initialSharedState,
	SHOW_LOADING,
	HIDE_LOADING,
	SAVE_USER_SESSION
} from 'redux/sharedData';

import AuthenticationService from 'network/AuthenticationService';

const MOCK_USERINFO = {
	trainee_id: 1,
	full_name: 'test',
	email: 'test@gmail.com',
	birthday: '1986-01-20',
	token: 'abcxyzwendsjkfjdsklfjkds'
};
const MOCK_ERROR = {message: 'testing failed'};

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe('SignIn Action', () => {
  it('API call for signin success', () => {
    const serviceCall = sinon.stub(AuthenticationService, 'signin',function(){
      return new Promise(function(resolve, reject) {
          resolve(MOCK_USERINFO);
        });
      });

		const expectedActions = [
      { type: SHOW_LOADING, loading: true },
			{ type: HIDE_LOADING, loading: false },
      { type: SUCCESS, payload: MOCK_USERINFO },
			{ type: SAVE_USER_SESSION, user: MOCK_USERINFO }
    ];
		const store = mockStore({
			signInReducer: initialSignInState,
			sharedData: initialSharedState });

    return store.dispatch(signIn({}))
		.then(() => {
				const receivedActions = store.getActions();
        sinon.assert.calledOnce(serviceCall);
	      expect(receivedActions.length).toBe(4);
				expect(receivedActions).toEqual(expectedActions)
				serviceCall.restore();
    })
  });

	it('API call for signin Failed', () => {
    const serviceCall = sinon.stub(AuthenticationService, 'signin', function(){
      return new Promise(function(resolve, reject) {
          reject(MOCK_ERROR);
        });
      });

		const expectedActions = [
			{ type: SHOW_LOADING, loading: true },
			{ type: HIDE_LOADING, loading: false },
			{ type: FAILED, error: MOCK_ERROR.message }
		];
		const store = mockStore({
			signInReducer: initialSignInState,
			sharedData: initialSharedState });

    return store.dispatch(signIn({}))
		.then(() => {
				const receivedActions = store.getActions();
        sinon.assert.calledOnce(serviceCall);
	      expect(receivedActions.length).toBe(3);
				expect(receivedActions).toEqual(expectedActions)
				serviceCall.restore();
    })
  });
});
