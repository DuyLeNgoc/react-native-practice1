/* @flow */
// export const a = 2;
// export const b = 3;
// const c = 4;
// export default c;

import React, { Component, PropTypes } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { signUp } from 'redux/signup';

import applicationStyles from 'config/applicationStyle';
import Metrics from 'config/metrics';
import images from 'config/images';
import Colors from 'config/colors';

import AppBackground from 'components/shared/AppBackground';
import CustomTextInput from 'components/CustomTextInput/CustomTextInput';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      birthday: ''
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignIn() {
    Actions.pop();
  }

  handleSignUp() {
    this.props.signUp({
      full_name: this.state.username,
      email: this.state.email,
      password: this.state.password,
      birthday: this.state.birthday
    });
  }

  componentDidUpdate() {
    if (this.props.isSuccess) {
      Actions.pop({refresh:
        {
          username: this.state.email,
          password: this.state.password
        }
      })
    }
  }

  checkToRenderLoading() {
    if(this.props.loading) {
      return (
        <ActivityIndicator
          style={[styles.loader]}
          color='white'
          size='large' />
        );
    }
    return (
      <TouchableOpacity
        activeOpacity={.5}
        onPress={this.handleSignUp}>
        <View style={styles.actionButton}>
          <Text style={styles.actionText}>
            Join
          </Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <AppBackground imageLink={images.background.signup}>
        <View style={applicationStyles.threeQuarterHeight}>
          <ScrollView>
            <Text style={styles.textTitle}>
              Sign Up
            </Text>
            <KeyboardAvoidingView behavior={'padding'}>
              <CustomTextInput
                height={60}
                autoCapitalize={'none'}
                onChangeText={(text) => this.setState({name: text})}
                placeholder={'Name'}
                imageIcon={images.icons.userName} />
              <CustomTextInput
                autoCapitalize={'none'}
                onChangeText={(text) => this.setState({username: text})}
                keyboardType={'email-address'}
                placeholder={'email'}
                imageIcon={images.icons.email} />
              <CustomTextInput
                onChangeText={(text) => this.setState({password: text})}
                autoCapitalize={'none'}
                secureTextEntry={true}
                placeholder={'Password'}
                imageIcon={images.icons.password} />
              <CustomTextInput
                autoCapitalize={'none'}
                onChangeText={(text) => this.setState({username: text})}
                keyboardType={'numbers-and-punctuation'}
                placeholder={'Birthday'}
                imageIcon={images.icons.birthday} />
            </KeyboardAvoidingView>
          </ScrollView>
        </View>
        <View style={[applicationStyles.quarterHeight, {justifyContent: 'flex-end'}]}>
          <Text style={styles.errorText}>
            {this.props.error}
          </Text>
          {this.checkToRenderLoading()}
          <View style={styles.signupWrap}>
            <Text style={styles.accountText}>
              Already have an account?
            </Text>
            <TouchableOpacity
              activeOpacity={.5}
              onPress={this.handleSignIn}>
              <Text style={styles.signupLinkText}>
              Sign In
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </AppBackground>
    );
  }
}

// Specifies the default values for props:
SignUp.defaultProps = {
  email: '',
  password: '',
  isSuccess: false,
  loading: false,
  error: ''
};

SignUp.propTypes = {
  signUp: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  isSuccess: PropTypes.bool
};

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    error: state.signUpReducer.error,
    loading: state.loadingInfo.loading,
    isSuccess: state.signUpReducer.isSuccess
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    signUp: (userCredentials) => dispatch(signUp(userCredentials))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignUp);

const styles = StyleSheet.create({
  textTitle: {
    fontSize: 30,
    height: 60,
    color: Colors.white,
    backgroundColor: Colors.transparent,
    marginTop: Metrics.marginNavigationBar,
    marginLeft: Metrics.marginHorizontal*2
  },
  signupWrap: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  signupLinkText: {
    color: "white",
    marginLeft: 5,
    backgroundColor: Colors.transparent
  },
  errorText: {
    color: 'red',
    backgroundColor: 'transparent',
    textAlign: 'center',
    lineHeight: 20
  },
  accountText: {
    color: "#D8D8D8",
    backgroundColor: Colors.transparent
  },
  actionButton: {
    height: 60,
    backgroundColor: Colors.radicalRed,
    alignItems: "center",
    justifyContent: "center"
  },
  actionText: {
    color: "#FFF",
    fontSize: 18
  }
});
