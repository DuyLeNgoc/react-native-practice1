/* @flow */

import React, { Component } from 'react';

import {
  Router
} from 'react-native-router-flux';
import { Provider } from 'react-redux';

import store from 'config/store';
import Themes from 'theme/index';
import images from 'config/images';
import scenes from 'config/routes';

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router
          scenes={scenes}
          titleStyle={Themes.ApplicationStyles.titleStyle} backButtonImage={images.navigationIcons.back}
          navigationBarStyle={Themes.ApplicationStyles.navigationBarStyle}
          leftButtonIconStyle={Themes.ApplicationStyles.navigationItemIcon}
          rightButtonIconStyle={Themes.ApplicationStyles.navigationItemIcon}
          drawerImage={images.navigationIcons.hamburger}
        />
    </Provider>
    );
  }
}
