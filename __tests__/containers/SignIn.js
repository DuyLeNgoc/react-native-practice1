import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import ConnectedSignIn, { SignIn } from 'containers/SignIn';

//Testing: Connected component
import { shallow } from 'enzyme';
import { shallowToJson } from 'enzyme-to-json';
import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { INITIAL_STATE as intialState } from 'redux/signin';

//ConnectedSignIn: to test its interaction with Redux - wrapper component returned by connect(), not the App component itself
//SignIn: to test just the rendering of the component

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('<SignIn />', () => {

	it('renders correctly', () => {
		const tree = renderer.create(
			<SignIn />
		).toJSON();
		expect(tree).toMatchSnapshot();
	});

  it('renders with redux', () => {
    const store = mockStore({ signInReducer: intialState });
    const wrapper = shallow(
      <ConnectedSignIn store={store} />
    );
    expect(shallowToJson(wrapper)).toMatchSnapshot();
  });
});
