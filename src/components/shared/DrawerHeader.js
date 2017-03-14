import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Themes from 'theme/index';

export default class DrawerHeader extends Component {
  render() {
    return (
        <View style={styles.header}>
          <Image
            style={styles.headerImage}
            source={this.props.image}
          />
          <Text style={styles.item}>
            {this.props.text}
          </Text>
        </View>
    );
  }
}

DrawerHeader.propTypes = {
  text: PropTypes.string.isRequired
};

const styles = StyleSheet.create({
  header: {
    padding: Themes.Metrics.padding,
    backgroundColor: Themes.Colors.radicalRed,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  item: {
    marginLeft: Themes.Metrics.marginHorizontal,
    color: Themes.Colors.white
  },
  headerImage: {
    width: Themes.Metrics.images.small,
    height: Themes.Metrics.images.small
  }
});
