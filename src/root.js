/* @flow */

import React, { Component } from 'react';

import {
  Router
} from 'react-native-router-flux';
import { Provider } from 'react-redux';

import store from 'config/store';
import applicationStyles from 'config/applicationStyle';
import images from 'config/images';
import scenes from 'config/routes';

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router
          scenes={scenes}
          titleStyle={applicationStyles.titleStyle} backButtonImage={images.navigationIcons.back}
          navigationBarStyle={applicationStyles.navigationBarStyle}
          leftButtonIconStyle={applicationStyles.navigationItemIcon}
          rightButtonIconStyle={applicationStyles.navigationItemIcon}
          drawerImage={images.navigationIcons.hamburger}
        />
    </Provider>
    );
  }
}
