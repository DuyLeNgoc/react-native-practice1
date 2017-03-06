/* @flow */
// export const a = 2;
// export const b = 3;
// const c = 4;
// export default c;

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet
} from 'react-native';

import applicationStyles from 'config/applicationStyle';
import images from 'config/images';
import AppBackground from 'components/shared/AppBackground';

export default class SignUp extends Component {
  render() {
    return (
      <AppBackground imageLink={images.background.signup}>
        <View style={styles.container}>
          <Text>I'm the SignUp screen</Text>
        </View>
      </AppBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
});
