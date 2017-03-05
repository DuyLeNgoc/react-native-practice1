import {
  Platform
} from 'react-native';

import Metrics from './metrics';
import Colors from './colors';

const ApplicationStyles = {
  splashScreen: {
    flex: 1,
    width: null,
    height: null
  },
  titleStyle: {
    color: Colors.white
  },
  navigationBarStyle: {
    backgroundColor: Colors.transparent,
    borderBottomColor: Colors.transparent
  },
  button: {
    backgroundColor: Colors.buttonBackground,
    borderColor: Colors.buttonBackground,
    borderWidth: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    borderRadius: Metrics.buttonRadius
  },
  inputField: {
    flex: 1,
    paddingHorizontal: Metrics.padding,
    color: Colors.white,
    backgroundColor: Colors.transparent
  },
  iconInputField: {
    height: Metrics.icons.small,
    width: Metrics.icons.small,
    resizeMode: 'contain'
  },
  leftNavigationItem: {
    marginLeft: Metrics.margin,
    marginTop: Metrics.margin
  },
  rightNavigationItem: {
    marginRight: Metrics.margin,
    marginTop: Metrics.margin
  },
  iconNavigationItem: {
    height: Metrics.icons.medium,
    width: Metrics.icons.small,
    resizeMode: 'contain'
  },
  halfHeight: {
    flex: .5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  quarterHeight: {
    flex: .25,
  },
  threeQuarterHeight: {
    flex: .75,
    alignItems: 'center',
    justifyContent: 'center'
  }
};

export default ApplicationStyles;
