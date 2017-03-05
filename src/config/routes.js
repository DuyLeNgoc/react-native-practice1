import React from 'react';
import SignIn from 'containers/SignIn';
import SignUp from 'containers/SignUp';

import {
  Actions,
  Scene,
  ActionConst
} from 'react-native-router-flux';

export default scenes = Actions.create(
  <Scene key="root">
    <Scene
      key="SignIn"
      component={SignIn}
      initial={true}
      hideNavBar={true} />
    <Scene
      key="SignUp"
      component={SignUp}
      title="Sign Up"
      hideNavBar={false}
      type={ActionConst.PUSH}
    />
  </Scene>
);
