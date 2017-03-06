/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

import AppBackground from 'components/shared/AppBackground';

export default class Profile extends Component {
  render() {
    return (
      <AppBackground>
        <View style={styles.container}>
          <Text>I'm the Profile component</Text>
        </View>
      </AppBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
