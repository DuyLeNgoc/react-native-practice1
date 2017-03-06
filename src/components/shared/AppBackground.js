import React, { Component, PropTypes } from 'react';
import { Image } from 'react-native';

import applicationStyles from 'config/applicationStyle';
import images from 'config/images';

export default class AppBackground extends Component {
  render() {
    return (
      <Image
          source={this.props.imageLink ? this.props.imageLink : images.background.default}
          style={ applicationStyles.splashScreen }>
        {this.props.children}
      </Image>
    );
  }
}

AppBackground.propTypes = {
  children: PropTypes.any.isRequired,
  imageLink: PropTypes.number
};
