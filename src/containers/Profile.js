/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import AppBackground from 'components/shared/AppBackground';
import AccountDetail from 'containers/AccountDetail';

export default class Profile extends Component {
  render() {
    return (
      <AccountDetail {...this.props} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
