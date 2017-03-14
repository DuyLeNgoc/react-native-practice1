import React from 'react';
import {
  Actions,
  Scene,
  ActionConst
} from 'react-native-router-flux';

import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';
import Profile from 'containers/Profile';
import About from 'containers/About';
import AccountDetail from 'containers/AccountDetail';
import AccountSummary from 'containers/AccountSummary';
import NavigationDrawer from 'navigations/NavigationDrawer';

import images from 'config/images';
import AuthenticationService from 'network/AuthenticationService';

export const handleLogout = () => {
  Alert.alert(
        'Log out',
        'Are you sure?',
        [
          {text: 'cancel', onPress: () => console.log('Cancel logout'), style: 'cancel'},
          {text: 'ok', onPress: () => signOut()},
        ]
      )
}

function signOut() {
  return AuthenticationService.signout()
	.then(json => {
    Actions.SignIn({refresh: {isLogged: false}});
  })
	.catch(error => {
    console.log(`Logout Failed: ${error.message}`);
  });
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
            hideNavBar={false}
            type={ActionConst.REPLACE} />
          <Scene
            key="SignUp"
            component={SignUp}
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
            initial={false}
            key='AccountSummary'
            component={AccountSummary}
            hideNavBar={false}
            type={ActionConst.RESET}
            onRight={handleLogout}
            rightButtonImage={images.navigationIcons.logout}
          />
          <Scene
            key='AccountDetail'
            component={AccountDetail}
            hideNavBar={false}
            type={ActionConst.PUSH}
          />
        </Scene>
      </Scene>
  </Scene>
);
