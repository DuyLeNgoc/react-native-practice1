import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
	Alert
} from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Metrics from 'config/metrics';
import AppBackground from 'components/shared/AppBackground';
import images from 'config/images';
import DrawerButton from 'components/shared/DrawerButton';
import DrawerHeader from 'components/shared/DrawerHeader';

class SideMenu extends Component {
  handleShowProfile = () => {
    this.props.closeDrawer();
    Actions.Profile();
  }

  handleShowAbout = () => {
    this.props.closeDrawer();
    Actions.About();
  }

	handleShowAccountSummary = () => {
    this.props.closeDrawer();
    Actions.AccountSummary();
  }

	handleLogout = () => {
		Alert.alert(
		      'Log out',
		      'Are you sure?',
		      [
		        {text: 'cancel', onPress: () => console.log('Cancel logout'), style: 'cancel'},
		        {text: 'ok', onPress: () => logout()},
		      ]
		    )
	}

	getMenuItemsLoggedIn() {
		return (
			<AppBackground>
				<DrawerHeader
					image={images.icons.userName}
					text={'User Function'}/>
				<DrawerButton
					text={'My Profile'}
					onPress={this.handleShowProfile}/>
				<DrawerButton
					text={'AccountSummary'}
					onPress={this.handleShowAccountSummary}/>
        <DrawerButton
					text={'Logout'}
					onPress={this.handleLogout}/>
				<DrawerButton
					text={'About'}
					onPress={this.handleShowAbout}/>
			</AppBackground>
		);
	}

	getMenuItemsNotLoggedIn() {
		return (
			<AppBackground>
				<View style={{marginTop: Metrics.titleBarHeight}}>
					<DrawerHeader
						image={images.icons.userName}
						text={'User Function'}/>
					<DrawerButton
						text={'About'}
						onPress={this.handleShowAbout}/>
				</View>
			</AppBackground>
		);
	}

  render() {
		if (this.props.user) {
			return this.getMenuItemsLoggedIn();
		}
    return this.getMenuItemsNotLoggedIn();
  }
}

SideMenu.propTypes = {
  user: PropTypes.object,
	closeDrawer: PropTypes.func.isRequired
};

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    user: state.userSession
  }
}

export default connect(
  mapStateToProps
)(SideMenu);
