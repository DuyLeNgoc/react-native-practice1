import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

//Testing: integrate with enzyme
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	INITIAL_STATE,
	signInReducer,
	loginRequest,
	signInRequestSuccess,
	signInRequestFailed,
	REQUEST,
	SUCCESS,
	FAILED
} from 'redux/signin';

const MOCK_USERINFO = {
	trainee_id: 1,
	full_name: 'test',
	email: 'test@gmail.com',
	birthday: '1986-01-20',
	token: 'abcxyzwendsjkfjdsklfjkds'
};

const MOCK_ERROR = {message: 'testing failed'}

describe('SignIn Action Creators ', () => {
	it('creates a SUCCESS action', () => {
	  // You do it
	  expect(signInRequestSuccess(MOCK_USERINFO)).toEqual(
	    {
				type: SUCCESS,
				payload: MOCK_USERINFO
	    }
	  );
	  // Jest does it
	  expect(signInRequestSuccess(MOCK_USERINFO)).toMatchSnapshot();
	});

	it('creates a REQUEST action', () => {
	  // You do it
	  expect(loginRequest()).toEqual(
	    {
				type: REQUEST
	    }
	  );
	  // Jest does it
	  expect(loginRequest()).toMatchSnapshot();
	});

	it('creates a FAILED action', () => {
	  // You do it
	  expect(signInRequestFailed(MOCK_ERROR)).toEqual(
	    {
				type: FAILED,
				error: MOCK_ERROR.message
	    }
	  );
	  // Jest does it
	  expect(signInRequestFailed(MOCK_ERROR)).toMatchSnapshot();
	});
});

//TESTING Reducer
describe('SignIn Action Creators ', () => {
	it('should initiate loading', () => {
	  const stateAfter = {
			error: '',
			loading: true
	  };
	  expect(
	    signInReducer(INITIAL_STATE, {
	      type: REQUEST
	    })
	  ).toEqual(stateAfter);
	});

	it('should success signin', () => {
	  const stateAfter = {
			error: '',
			loading: false,
			user: MOCK_USERINFO
	  };
	  expect(
	    signInReducer(INITIAL_STATE, {
	      type: SUCCESS,
				payload: MOCK_USERINFO
	    })
	  ).toEqual(stateAfter);
	});

	it('should failed signin', () => {
	  const stateAfter = {
			error: MOCK_ERROR.message,
			loading: false
	  };
	  expect(
	    signInReducer(INITIAL_STATE, {
	      type: FAILED,
				error: MOCK_ERROR.message
	    })
	  ).toEqual(stateAfter);
	});

});
