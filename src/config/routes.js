import React from 'react';
import { Alert } from 'react-native';
import {
  Actions,
  Scene,
  ActionConst
} from 'react-native-router-flux';

import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import Profile from 'containers/Profile';
import About from 'containers/About';
import AccountSummary from 'containers/AccountSummary';
import NavigationDrawer from 'navigations/NavigationDrawer';
import { logout } from 'redux/signin';
import images from 'config/images';

export const handleLogout = () => {
  Alert.alert(
        'Log out',
        'Are you sure?',
        [
          {text: 'cancel', onPress: () => console.log('Cancel logout'), style: 'cancel'},
          {text: 'ok', onPress: () => logout()},
        ]
      )
}

export default scenes = Actions.create(
    <Scene key="root">
      <Scene
        key="drawer"
        component={NavigationDrawer}
        open={false}>
        <Scene key="Main">
          <Scene
            key="SignIn"
            component={SignIn}
            initial={true}
            hideNavBar={false} />
          <Scene
            key="SignUp"
            component={SignUp}
            title="Sign Up"
            hideNavBar={false}
            type={ActionConst.PUSH}
          />
          <Scene
            key="Profile"
            component={Profile}
            title="My Profile"
            hideNavBar={false}
            type={ActionConst.REPLACE}
          />
          <Scene
            key="About"
            component={About}
            title="About"
            hideNavBar={false}
            type={ActionConst.REPLACE}
          />
          <Scene
            key='AccountSummary'
            component={AccountSummary}
            hideNavBar={false}
            type={ActionConst.RESET}
            onRight={handleLogout}
            rightButtonImage={images.navigationIcons.logout}
          />
        </Scene>
      </Scene>
  </Scene>
);
