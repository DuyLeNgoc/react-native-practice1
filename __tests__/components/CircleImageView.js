import React from 'react';
import renderer from 'react-test-renderer';
import CircleImageView from 'components/shared/CircleImageView';

it('renders correctly', () => {
  const tree = renderer.create(
		<CircleImageView
			height={120}
			imagelink={require('assets/images/check_red.png')}/>
  ).toJSON();
  expect(tree).toMatchSnapshot();
});
