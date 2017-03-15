/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
	Image,
	TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Themes from 'theme/index';
import images from 'config/images';

export default class AccountItem extends Component {
	renderItem() {
		let { item } = this.props;
		item.avatar = 'https://freeiconshop.com/wp-content/uploads/edd/person-flat.png';
		return (
      <View style={styles.container}>
        <Image source={{uri: item.avatar}} style={styles.avatar}/>
          <TouchableOpacity
						onPress={this.onShowDetail}>
            <View style={ styles.subContainer}>
              <Text style={styles.name}>
                {item.full_name}
              </Text>
              <Text style={styles.email}>
                {item.email}
              </Text>
            </View>
          </TouchableOpacity>
      </View>
    );
		// return null;
	}

  render() {
		return this.renderItem();
  }

	onShowDetail = () => {
		this.props.didSelectedItem(this.props.item);
  }
}

// Specifies the default values for props:
AccountItem.defaultProps = {
  item: {
		full_name: 'Default Name',
  	email: 'default@gmail.com',
  	birthday: '01/01/1990'
	}
};

AccountItem.propTypes = {
	didSelectedItem: PropTypes.func,
  item: PropTypes.object.isRequired
};

var imageWidth = Themes.Metrics.images.large;
var imageHeight = Themes.Metrics.images.large;
const styles = StyleSheet.create({
	container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Themes.Colors.white,
    borderBottomColor: Themes.Colors.lightGrey,
    borderBottomWidth: 1,
    padding: 2 * Themes.Metrics.margin
  },
  subContainer: {
    width: Themes.Metrics.screenWidth - imageWidth - 2 * Themes.Metrics.margin,
    backgroundColor: Themes.Colors.transparent,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
		padding: Themes.Metrics.margin
  },
  name: {
    color: Themes.Colors.black,
    fontSize: 20
  },
	email: {
    color: Themes.Colors.black,
    fontSize: 13
  },
  avatar: {
    width: imageWidth,
    aspectRatio: 1,
		borderRadius: imageHeight/2,
		borderColor: Themes.Colors.radicalRed,
		borderWidth: 1
  }
});
