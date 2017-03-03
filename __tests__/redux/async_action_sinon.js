import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import sinon from 'sinon';

import {
	INITIAL_STATE,
	REQUEST,
	SUCCESS,
	FAILED,
	login
} from 'redux/signin';

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
      { type: REQUEST },
      { type: SUCCESS, payload: MOCK_USERINFO }
    ];
    const store = mockStore({ signInReducer: INITIAL_STATE });

    return store.dispatch(login({}))
		.then(() => {
				const receivedActions = store.getActions();
        serviceCall.restore();
        sinon.assert.calledOnce(serviceCall);
	      expect(receivedActions.length).toBe(2);
				expect(receivedActions).toEqual(expectedActions)
    })
  });

	it('API call for signin Failed', () => {
    const serviceCall = sinon.stub(AuthenticationService, 'signin',function(){
      return new Promise(function(resolve, reject) {
          reject(MOCK_ERROR);
        });
      });

		const expectedActions = [
      { type: REQUEST },
      { type: FAILED, error: MOCK_ERROR.message }
    ];
    const store = mockStore({ signInReducer: INITIAL_STATE });

    return store.dispatch(login({}))
		.then(() => {
				const receivedActions = store.getActions();
        serviceCall.restore();
        sinon.assert.calledOnce(serviceCall);
	      expect(receivedActions.length).toBe(2);
				expect(receivedActions).toEqual(expectedActions)
    })
  });
});
