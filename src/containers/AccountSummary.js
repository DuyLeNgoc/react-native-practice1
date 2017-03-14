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
import images from 'config/images';
import Themes from 'theme';
import AppBackground from 'components/shared/AppBackground';
import AccountItem from 'components/account-summary/AccountItem';
import Constants from 'utils/constants';

export class AccountSummary extends Component {
  constructor(props) {
    super(props);
    this.lastTimeRefresh = Date().now;
    this.ds = new ListView.DataSource({
      rowHasChanged: (r1, r2) => r1 !== r2,
      sectionHeaderHasChanged: (s1, s2) => s1 !== s2
    });
    this.state = {
      refreshing: false,
      dataSource: this.ds.cloneWithRowsAndSections(this.convertArrayToMap(this.props.accountList))
    };
  }

  convertArrayToMap = (listItems) => {
    let groups = {};
    for (var i = 0; i < listItems.length; i++) {
      const item = listItems[i];
      if (i%2 == 0) {
        if (!groups.hasOwnProperty('Manager')) {
          groups['Manager'] = [];
        }
        groups['Manager'].push(item);
      } else {
        if (!groups.hasOwnProperty('Employee')) {
          groups['Employee'] = [];
        }
        groups['Employee'].push(item);
      }
    }
    return groups;
  }

  onRefresh = () => {
    const currentTime = Date().now;
    if (currentTime - this.lastTimeRefresh >= Constants.minimumIntervalRefresh*1000) {
      this.lastTimeRefresh = Date().now;
      this.setState({refreshing: true});
      this.props.getList();
    }
  }

  renderSectionHeader = (item, sectionID) => {
    console.log(item.description);
    return (
      <View style={styles.containerSection}>
        <Text style={styles.headerSection}>
          {sectionID}
        </Text>
      </View>
    );
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
          style={styles.list}
          enableEmptySections={true}
          dataSource={this.state.dataSource}
          renderRow={(item) => <AccountItem item={item} didSelectedItem={this.didSelectedItem} />}
          renderSectionHeader={this.renderSectionHeader}
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing} onRefresh={this.onRefresh}
              tintColor={Themes.Colors.white}
              colors={[Themes.Colors.white]}
            /> }
        />
			</AppBackground>
    );
  }

  didSelectedItem = (item) => {
		Actions.AccountDetail({user: item});
  }

	componentDidMount() {
		this.props.getList();
	}

  componentWillReceiveProps(nextProps) {
    if (nextProps.accountList) {
      this.setState({
        refreshing: false,
        dataSource: this.ds.cloneWithRowsAndSections(this.convertArrayToMap(nextProps.accountList))
      });
    }
  }
}

// Specifies the default values for props:
AccountSummary.defaultProps = {
  error: '',
  loading: false,
  user: null,
  accountList: [{
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
  }]
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
    getList: () => dispatch(getList())
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
  list: {
    backgroundColor: Themes.Colors.transparent
  },
  header: {
    height: 195,
    width: Themes.Metrics.screenWidth,
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center'
  },
  name: {
    color: Themes.Colors.white,
    fontSize: 24,
    backgroundColor: Themes.Colors.transparent
  },
  containerSection: {
    height: Themes.Metrics.headerSectionHeight,
    backgroundColor: Themes.Colors.lightGrey,
    padding: Themes.Metrics.padding,
    justifyContent: 'center'
  },
  headerSection: {
    fontSize: Themes.Fonts.size.large,
    color: Themes.Colors.white,
    backgroundColor: Themes.Colors.transparent
  }
});
