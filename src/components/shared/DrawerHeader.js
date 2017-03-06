import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

import Metrics from 'config/metrics';
import Colors from 'config/colors';
import Fonts from 'config/fonts';

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
    padding: Metrics.padding,
    backgroundColor: Colors.radicalRed,
    flexDirection: 'row',
    alignItems: 'flex-end'
  },
  item: {
    marginLeft: Metrics.marginHorizontal,
    color: Colors.white
  },
  headerImage: {
    width: Metrics.images.small,
    height: Metrics.images.small
  }
});
