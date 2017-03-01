import React from 'react';
import renderer from 'react-test-renderer';
import CustomTextInput from 'components/CustomTextInput/CustomTextInput';

it('renders correctly', () => {
  const tree = renderer.create(
		<CustomTextInput
			autoCapitalize={'none'}
			onChangeText={(text) => this.setState({username: text})}
			keyboardType={'email-address'}
			placeholder={'UserName'}
			imageIcon={require('assets/images/user_name.png')} />
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
