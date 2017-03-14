import React, {
  Component,
  PropTypes
} from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native';

import Themes from 'theme/index';

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
    margin: Themes.Metrics.margin,
    color: Themes.Colors.white,
    backgroundColor: Themes.Colors.transparent
  }
});
