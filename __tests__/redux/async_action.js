import 'react-native';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
// import expect from 'expect';
import fetchMock from 'fetch-mock';
import fetchPonyfill from 'fetch-ponyfill';

import {
	INITIAL_STATE,
	signInReducer,
	loginRequest,
	loginRequestSuccess,
	loginRequestFailed,
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

const middlewares = [ thunk ]
const mockStore = configureMockStore(middlewares)

describe('async actions with jest-mock', () => {
	beforeEach(() => {
		fetchMock.reset()
	});

	afterEach(() => {
		// Unmock.restore fetch() to its native implementation
		fetchMock.restore();
	});

  it('creates SUCCESS when call signin has been done', () => {
		fetchMock.setImplementations(fetchPonyfill);
		fetchMock.post('*', {body: MOCK_USERINFO});
    const expectedActions = [
      { type: REQUEST },
      { type: SUCCESS, payload: MOCK_USERINFO }
    ]
    const store = mockStore({ signInReducer: INITIAL_STATE })

    return store.dispatch(login({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  });
});
