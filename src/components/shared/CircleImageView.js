/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image
} from 'react-native';

export default class CircleImageView extends Component {
  render() {
    const { height, iconRatio } = this.props;
    const iconHeight = height * iconRatio;
    return (
      <View
        style={[styles.container, { height: height, borderRadius: this.props.height/2}]}>
        <Image
          style={[styles.icon, {height: iconHeight}]}
          source={this.props.imagelink}
        />
      </View>
    );
  }
}

CircleImageView.defaultProps = {
  height: 90,
  iconRatio: 0.5
};

CircleImageView.propTypes = {
  height: PropTypes.number,
  iconRatio: PropTypes.number
};

const styles = StyleSheet.create({
  container: {
    aspectRatio: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    aspectRatio: 1
  }
});
