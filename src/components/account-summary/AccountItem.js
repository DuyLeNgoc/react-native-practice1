/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
	Image,
	TouchableOpacity,
  StyleSheet,
} from 'react-native';

import Metrics from 'config/metrics';
import images from 'config/images';
import Colors from 'config/colors';

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

var imageWidth = Metrics.images.large;
var imageHeight = Metrics.images.large;
const styles = StyleSheet.create({
	container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-start',
    backgroundColor: Colors.white,
    borderBottomColor: Colors.lightGrey,
    borderBottomWidth: 1,
    padding: 2 * Metrics.margin
  },
  subContainer: {
    width: Metrics.screenWidth - imageWidth - 2 * Metrics.margin,
    flexWrap: 'wrap',
    backgroundColor: Colors.transparent,
    alignItems: 'flex-start',
    justifyContent: 'space-between',
		padding: Metrics.margin
  },
  name: {
    color: Colors.black,
    fontSize: 20
  },
	email: {
    color: Colors.black,
    fontSize: 13
  },
  avatar: {
    width: Metrics.images.large,
    height: Metrics.images.large,
		borderRadius: Metrics.images.large/2,
		borderColor: Colors.radicalRed,
		borderWidth: 1
  }
});
