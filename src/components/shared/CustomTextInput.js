/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  Image,
  Platform
} from 'react-native';

import Themes from 'theme';

export default class CustomTextInput extends Component {
  render() {
    return (
      <View style={styles.inputWrap}>
        <View style={styles.iconWrap}>
          <Image
            source={this.props.imageIcon}
            style={Themes.ApplicationStyles.iconInputField} />
        </View>
        <TextInput
          {...this.props}
          style={Themes.ApplicationStyles.inputField}
          underlineColorAndroid={Themes.Colors.transparent}
          placeholderTextColor={this.props.placeholderTextColor ? this.props.placeholderTextColor: Themes.Colors.Alto}
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
    paddingLeft: Themes.Metrics.paddingHorizontal,
    height: Themes.Metrics.inputFieldHeight,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "#CCC",
  },
  iconWrap: {
    padding: Themes.Metrics.padding,
    marginLeft: 2*Themes.Metrics.marginHorizontal
  }
});
