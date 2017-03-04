/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Image,
  Text,
  View,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import { connect } from 'react-redux';

import { login } from 'redux/signin';
import CircleImageView from 'components/CircleImageView/CircleImageView';
import CustomTextInput from 'components/CustomTextInput/CustomTextInput';
import applicationStyles from 'config/applicationStyle';
import Colors from 'config/colors';

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignIn() {
    this.props.login({
      email: this.state.username,
      password: this.state.password
    });
  }

  handleSignUp() {
    Actions.SignUp();
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
      <TouchableOpacity activeOpacity={.5} onPress={this.handleSignIn}>
      <View style={styles.signinButton}>
        <Text style={styles.signinText}>Sign In</Text>
      </View>
      </TouchableOpacity>
      );
  }

  render() {
    if(this.props.user) {
      Alert.alert('Login Success', `Welcome ${this.props.user.full_name}`);
    }
    return (
       <Image
          style={applicationStyles.splashScreen}
          source={require('assets/images/bg_signin.png')}>
          <View style={applicationStyles.halfHeight}>
            <CircleImageView
              height={120}
              imagelink={require('assets/images/check_red.png')}/>
          </View>
          <View style={applicationStyles.quarterHeight}>
            <CustomTextInput
              autoCapitalize={'none'}
              onChangeText={(text) => this.setState({username: text})}
              keyboardType={'email-address'}
              placeholder={'UserName'}
              imageIcon={require('assets/images/user_name.png')} />
            <CustomTextInput
              onChangeText={(text) => this.setState({password: text})}
              autoCapitalize={'none'}
              secureTextEntry={true}
              placeholder={'Password'}
              imageIcon={require('assets/images/password.png')} />
            <TouchableOpacity
              activeOpacity={.5}>
                <Text style={styles.forgotPasswordText}>
                  Forgot Password?
                </Text>
            </TouchableOpacity>
          </View>
          <View style={[applicationStyles.quarterHeight, {justifyContent: 'flex-end'}]}>
            <Text style={styles.errorText}>
              {this.props.error}
            </Text>
            {this.checkToRenderLoading()}
            <View style={styles.signupWrap}>
              <Text style={styles.accountText}>Don't have an account?</Text>
              <TouchableOpacity activeOpacity={.5} onPress={this.handleSignUp}>
                <Text style={styles.signupLinkText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
      </Image>
    );
  }
}

SignIn.propTypes = {
  login: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  user: PropTypes.object
};

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    error: state.signInReducer.error,
    loading: state.sharedData.loading,
    user: state.signInReducer.user
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    login: (userCredentials) => dispatch(login(userCredentials))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

var styles = StyleSheet.create({
  forgotPasswordText: {
    color: Colors.Alto,
    backgroundColor: Colors.transparent,
    textAlign: 'right',
    paddingRight: 15,
    paddingTop: 10
  },
  signinButton: {
    height: 60,
    backgroundColor: Colors.radicalRed,
    alignItems: "center",
    justifyContent: "center"
  },
  signinText: {
    color: "#FFF",
    fontSize: 18
  },
  signupWrap: {
    height: 60,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  accountText: {
    color: "#D8D8D8",
    backgroundColor: Colors.transparent
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
  }
});
