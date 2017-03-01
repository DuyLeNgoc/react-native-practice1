import 'react-native';
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk'
import nock from 'nock'
import expect from 'expect'

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

describe('async actions', () => {
  afterEach(() => {
    nock.cleanAll()
  })

  it('creates SUCCESS when call signin has been done', () => {
		var scope = nock('http://fixiesvn.azurewebsites.net/api', {
						      reqheaders: {
										email: 'test@gmail.com',
	                  password: '123456'
						      }
						    })
                .post('/trainees/login')
                .reply(200, { body: MOCK_USERINFO});
    const expectedActions = [
      { type: REQUEST },
      { type: SUCCESS, body: MOCK_USERINFO }
    ]
    const store = mockStore({ signInReducer: INITIAL_STATE })

    return store.dispatch(login({}))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions)
      })
  })
})
