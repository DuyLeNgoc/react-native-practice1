import React, { Component } from 'react';
import Drawer from 'react-native-drawer';
import {
	Actions,
	DefaultRenderer
} from 'react-native-router-flux';
import { connect } from 'react-redux';

import SideMenu from 'containers/SideMenu';

class NavigationDrawer extends Component {
	openDrawer = () => {
		Actions.refresh({key: 'drawer', open: true});
	}

	closeDrawer = () => {
		Actions.refresh({key: 'drawer', open: false});
	}

	render(){
    const state = this.props.navigationState;
    const children = state.children;
		const content = <SideMenu closeDrawer={this.closeDrawer} />;
    return (
        <Drawer
            ref="navigation"
						type="displace"
            open={state.open}
            onOpen={this.openDrawer}
            onClose={this.closeDrawer}
            content={content}
            tapToClose={true}
            openDrawerOffset={0.2}
            panCloseMask={0.2}
            negotiatePan={true}
            tweenHandler={(ratio) => ({
             main: { opacity:Math.max(0.54,1-ratio) }
        })}>
            <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
        </Drawer>
    );
  }
}

function mapStateToProps(state) {
  return {
    user: state.userSession
  }
}
export default connect(mapStateToProps)(NavigationDrawer);
