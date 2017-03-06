/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native';

import AppBackground from 'components/shared/AppBackground';
import Colors from 'config/colors';
import Metrics from 'config/metrics';

export default class About extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([
        'Custom Components',
        'Style and layout (flexBox)',
        'Touch Handling',
        'Using base Navigator',
        'Using react-native-router-flux to supporting navigation',
        'Using react-native-drawer as sidemenu',
        'NetWorking',
        'Redux',
        'Unit test'
      ])
    };
  }

  render() {
    return (
      <AppBackground>
        <View style={{flex: 1, paddingTop: Metrics.navBarHeight, paddingLeft: 10, paddingRight: 10}}>
          <Text style={[styles.textColor, {fontSize: 26}]}>
            Practice React Native
          </Text>
          <Text style={[styles.textColor, {fontSize: 23}]}>
            Implement features as below
          </Text>
          <ListView
            style={{backgroundColor: Colors.transparent}}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text style={[styles.textColor, {fontSize: 20}]}>- {rowData}</Text>}
          />
        </View>
      </AppBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textColor: {
    color: Colors.white,
    backgroundColor: Colors.transparent
  }
});
