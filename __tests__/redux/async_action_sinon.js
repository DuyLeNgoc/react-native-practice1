import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

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
      { type: SUCCESS, payload: MOCK_USERINFO },
			{ type: HIDE_LOADING, loading: false }
    ];
		const store = mockStore({
			signInReducer: initialSignInState,
			sharedData: initialSharedState });

    return store.dispatch(login({}))
		.then(() => {
				const receivedActions = store.getActions();
        serviceCall.restore();
        sinon.assert.calledOnce(serviceCall);
	      expect(receivedActions.length).toBe(3);
				expect(receivedActions).toEqual(expectedActions)
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
			{ type: FAILED, error: MOCK_ERROR.message },
			{ type: HIDE_LOADING, loading: false }
		];
		const store = mockStore({
			signInReducer: initialSignInState,
			sharedData: initialSharedState });

    return store.dispatch(login({}))
		.then(() => {
				const receivedActions = store.getActions();
        serviceCall.restore();
        sinon.assert.calledOnce(serviceCall);
	      expect(receivedActions.length).toBe(3);
				expect(receivedActions).toEqual(expectedActions)
    })
  });
});
