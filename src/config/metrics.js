import {
  Dimensions,
  Platform
} from 'react-native';

const {width, height} = Dimensions.get('window');

const Metrics = {
  //Device specific contants
  screenWidth: width < height ? width : height,
  screenHeight: width < height ? height : width,
  navBarHeight: (Platform.OS === 'ios') ? 64 : 54,
  titleBarHeight: (Platform.OS === 'ios') ? 20 : 24,
  //specific margins
  margin: 10,
  marginVertical: 10,
  marginHorizontal: 10,
  padding: 10,
  paddingHorizontal: 10,
  paddingVertical: 10,
  section: 25,
  marginNavigationBar: ((Platform.OS === 'ios') ? 64 : 54) + 10,
  marginTitleBar: ((Platform.OS === 'ios') ? 20 : 24) + 10,
  //Button specific contants
  inputFieldHeight: 60,
  buttonHeight: 40,
  buttonRadius: 6,
  buttonBorderRadius: 2,
  icons: {
    tiny: 15,
    small: 20,
    medium: 30,
    large: 45,
    xl: 60
  },
  images: {
    small: 20,
    medium: 40,
    large: 60,
    logo: 300
  },
  opacity: 0.3,
  //ListView
  headerSectionHeight: 60
};

export default Metrics;
