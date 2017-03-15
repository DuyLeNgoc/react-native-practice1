/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import images from 'config/images';
import Themes from 'theme/index';

import AppBackground from 'components/shared/AppBackground';
import CustomTextInput from 'components/shared/CustomTextInput';

export default class AccountDetail extends Component {
  render() {
    const { user } = this.props;
    const birthday = new Date(user.birthday).toLocaleDateString();
    return (
      <AppBackground>
        <ScrollView>
          <Text style={styles.textTitle}>
            Hello {user.full_name}
          </Text>
          <CustomTextInput
            height={60}
            autoCapitalize={'none'}
            editable={false}
            value={user.full_name}
            placeholder={'Name'}
            imageIcon={images.icons.userName} />
          <CustomTextInput
            autoCapitalize={'none'}
            editable={false}
            value={user.email}
            keyboardType={'email-address'}
            placeholder={'email'}
            imageIcon={images.icons.email} />
          <CustomTextInput
            autoCapitalize={'none'}
            editable={false}
            value={birthday}
            keyboardType={'numbers-and-punctuation'}
            placeholder={'Birthday'}
            imageIcon={images.icons.birthday} />
        </ScrollView>
      </AppBackground>
    );
  }
}

AccountDetail.defaultProps = {
  user: {
		full_name: 'Default Name',
  	email: 'default@gmail.com',
  	birthday: '01/01/1990'
	},
  loading: false,
  error: ''
};

AccountDetail.propTypes = {
  user: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textTitle: {
    fontSize: 30,
    height: 60,
    color: Themes.Colors.white,
    backgroundColor: Themes.Colors.transparent,
    marginTop: Themes.Metrics.marginNavigationBar,
    marginLeft: Themes.Metrics.marginHorizontal*2
  }
});
