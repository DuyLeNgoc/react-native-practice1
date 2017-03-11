/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Platform
} from 'react-native';

import applicationStyles from 'config/applicationStyle';
import Metrics from 'config/metrics';
import Colors from 'config/colors';

export default class CustomTextInput extends Component {
  render() {
    return (
      <View style={styles.inputWrap}>
        <View style={styles.iconWrap}>
          <Image
            source={this.props.imageIcon}
            style={applicationStyles.iconInputField} />
        </View>
        <TextInput
          {...this.props}
          style={applicationStyles.inputField}
          underlineColorAndroid={Colors.transparent}
          placeholderTextColor={this.props.placeholderTextColor ? this.props.placeholderTextColor: Colors.Alto}
        />
      </View>
    );
  }
}

CustomTextInput.propTypes = {
  imageIcon: PropTypes.number.isRequired
};

const styles = StyleSheet.create({
  inputWrap: {
    paddingLeft: Metrics.paddingLeft,
    height: Metrics.inputFieldHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#CCC",
  },
  iconWrap: {
    padding: Metrics.padding,
    marginLeft: 2*Metrics.marginHorizontal,
    // backgroundColor: 'red'
  }
});
