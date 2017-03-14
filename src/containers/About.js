/* @flow */

import React, { Component } from 'react';
import {
  View,
  Text,
  ListView,
  StyleSheet,
} from 'react-native';

import AppBackground from 'components/shared/AppBackground';
import Themes from 'theme/index';

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
        <View style={styles.container}>
          <Text style={[styles.textColor, {fontSize: Themes.Fonts.size.large}]}>
            Practice React Native
          </Text>
          <Text style={[styles.textColor, {fontSize: Themes.Fonts.size.large}]}>
            Implement features as below
          </Text>
          <ListView
            style={styles.list}
            dataSource={this.state.dataSource}
            renderRow={(rowData) => <Text style={[styles.textColor, {fontSize: Themes.Fonts.size.medium}]}>- {rowData}</Text>}
          />
        </View>
      </AppBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Themes.Metrics.navBarHeight,
    paddingLeft: Themes.Metrics.paddingHorizontal,
    paddingRight: Themes.Metrics.paddingHorizontal
  },
  list: {
    backgroundColor: Themes.Colors.transparent
  },
  textColor: {
    color: Themes.Colors.white,
    backgroundColor: Themes.Colors.transparent
  }
});
