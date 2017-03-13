/* @flow */

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  Image,
  ListView,
  RefreshControl,
  StyleSheet,
} from 'react-native';
import {
	Actions
} from 'react-native-router-flux';
import { connect } from 'react-redux';

import { getList } from 'redux/account-summary';

import Metrics from 'config/metrics';
import images from 'config/images';
import Colors from 'config/colors';
import AppBackground from 'components/shared/AppBackground';
import AccountItem from 'components/account-summary/AccountItem';

import Constants from 'utils/constants';
import MemCache from 'utils/MemCache';

export class AccountSummary extends Component {
  constructor(props) {
    super(props);
    this.lastTimeRefresh = Date().now;
    this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      refreshing: false,
      dataSource: this.ds.cloneWithRows([
        {
      		full_name: 'Default Name1',
        	email: 'default1@gmail.com',
        	birthday: '01/01/1990'
      	},
        {
      		full_name: 'Default Name2',
        	email: 'default2@gmail.com',
        	birthday: '01/01/1990'
      	},
        {
      		full_name: 'Default Name3',
        	email: 'default3@gmail.com',
        	birthday: '01/01/1990'
      	}
      ])
    };
  }

  onRefresh = () => {
    const currentTime = Date().now;
    if (currentTime - this.lastTimeRefresh >= Constants.minimumIntervalRefresh*1000) {
      this.lastTimeRefresh = Date().now;
      this.setState({refreshing: true});
      this.props.getList();
    }
  }

  render() {
    return (
			<AppBackground>
        <Image
          style={styles.header}
          source={images.background.header}>
          <Text style={styles.name}>
            {this.props.user.full_name}
          </Text>
        </Image>
        <ListView
          style={{backgroundColor: Colors.transparent}}
          dataSource={this.state.dataSource}
          renderRow={(item) => <AccountItem item={item} didSelectedItem={this.didSelectedItem} />}
          enableEmptySections={true}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing} onRefresh={this.onRefresh}
              tintColor={Colors.white}
              colors={[Colors.white]}
            /> }
        />
			</AppBackground>
    );
  }

  didSelectedItem = (item) => {
		Actions.AccountDetail({user: item});
  }

	componentDidMount() {
    const accessToken = Constants.memcacheKeys.accessToken;
    let userCredentials = {};
    userCredentials[accessToken] = MemCache.get(accessToken);
		this.props.getList(userCredentials);
	}

  componentWillReceiveProps(nextProps) {
    if (nextProps.accountList) {
      this.setState({
        refreshing: false,
        dataSource: this.ds.cloneWithRows(nextProps.accountList)
      });
    }
  }
}

// Specifies the default values for props:
AccountSummary.defaultProps = {
  error: '',
  loading: false,
  user: null,
  accountList: []
};

AccountSummary.propTypes = {
  getList: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  user: PropTypes.object,
  accountList: PropTypes.array
};

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    error: state.signInReducer.error,
    loading: state.loadingInfo.loading,
    user: state.signInReducer.user,
    accountList: state.accountListReducer.accountList
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    getList: (userCredentials) => dispatch(getList(userCredentials))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountSummary);

// Specifies the default values for props:
AccountSummary.defaultProps = {
  user: {
		full_name: 'Default Name',
  	email: 'default@gmail.com',
  	birthday: '01/01/1990'
	},
  loading: false,
  error: ''
};

AccountSummary.propTypes = {
  user: PropTypes.object.isRequired,
  error: PropTypes.string,
  loading: PropTypes.bool
};

const styles = StyleSheet.create({
  header: {
    height: 195,
    width: Metrics.screenWidth,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    color: Colors.white,
    fontSize: 24,
    backgroundColor: Colors.transparent
  }
});
