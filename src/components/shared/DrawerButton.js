import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import Metrics from 'config/metrics';
import Colors from 'config/colors';

export default class DrawerButton extends Component {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <Text style={styles.item}>
          {this.props.text}
        </Text>
      </TouchableOpacity>
    );
  }
}

DrawerButton.propTypes = {
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  item: {
    margin: Metrics.margin,
    color: Colors.white,
    backgroundColor: Colors.transparent
  }
});
