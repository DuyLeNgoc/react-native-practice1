import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';

//Testing: integrate with enzyme
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {
	loginRequest,
	loginRequestSuccess,
	loginRequestFailed,
	REQUEST,
	SUCCESS,
	FAILED
} from 'redux/signin';
import { INITIAL_STATE as initialState } from 'redux/signin';

const MOCK_USERINFO = {
	trainee_id: 1,
	full_name: 'test',
	email: 'test@gmail.com',
	birthday: '1986-01-20',
	token: 'abcxyzwendsjkfjdsklfjkds'
};

const ERROR = {message: 'testing failed'}

describe('SignIn Action Creators ', () => {
	it('creates a SUCCESS action', () => {
	  // You do it
	  expect(loginRequestSuccess(MOCK_USERINFO)).toEqual(
	    {
				type: SUCCESS,
				payload: MOCK_USERINFO
	    }
	  );
	  // Jest does it
	  expect(loginRequestSuccess(MOCK_USERINFO)).toMatchSnapshot();
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

	it('creates a REQUEST action', () => {
	  // You do it
	  expect(loginRequestFailed(ERROR)).toEqual(
	    {
				type: FAILED,
				error: ERROR.message
	    }
	  );
	  // Jest does it
	  expect(loginRequestFailed(ERROR)).toMatchSnapshot();
	});
});
