/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component, PropTypes } from 'react';
import {
  Image,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  StyleSheet
} from 'react-native';
import {
  Actions
} from 'react-native-router-flux';
import { connect } from 'react-redux';

import MemCache from 'utils/MemCache';
import { signIn } from 'redux/signin';
import Themes from 'theme';
import images from 'config/images';

import AppBackground from 'components/shared/AppBackground';
import CircleImageView from 'components/shared/CircleImageView';
import CustomTextInput from 'components/shared/CustomTextInput';
import ActionLink from 'components/shared/ActionLink';

export class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: this.props.username,
      password: ''
    };
    this.handleSignIn = this.handleSignIn.bind(this);
    this.handleSignUp = this.handleSignUp.bind(this);
  }

  handleSignIn() {
    this.props.signIn({
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
      <TouchableOpacity
        activeOpacity={.5}
        onPress={this.handleSignIn}>
        <View style={styles.signinButton}>
          <Text style={styles.signinText}>Sign In</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <AppBackground imageLink={images.background.signin}>
        <View style={Themes.ApplicationStyles.halfHeight}>
          <CircleImageView
            height={120}
            imagelink={images.icons.redChecked}/>
        </View>
        <KeyboardAvoidingView behavior={'padding'} style={Themes.ApplicationStyles.quarterHeight}>
          <CustomTextInput
            autoCapitalize={'none'}
            onChangeText={(text) => this.setState({username: text})}
            keyboardType={'email-address'}
            placeholder={'UserName'}
            imageIcon={images.icons.userName} />
          <CustomTextInput
            onChangeText={(text) => this.setState({password: text})}
            autoCapitalize={'none'}
            secureTextEntry={true}
            placeholder={'Password'}
            imageIcon={images.icons.password} />
          <TouchableOpacity
            activeOpacity={.5}>
              <Text style={styles.forgotPasswordText}>
                Forgot Password?
              </Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
        <View style={[Themes.ApplicationStyles.quarterHeight, {justifyContent: 'flex-end'}]}>
          <Text style={styles.errorText}>
            {this.props.error}
          </Text>
          {this.checkToRenderLoading()}
          <ActionLink
            questionText={"Don't have an account?"}
            actionText={'Sign Up'}
            handleAction={this.handleSignUp}
           />
        </View>
      </AppBackground>
    );
  }

  componentDidUpdate(prevProps, prevState) {
    if(this.props.user) {
      if (MemCache.isLogged()) {
        Actions.AccountSummary({user: this.props.user});
      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.username) {
      this.setState({username: nextProps.username})
    }
    if (!nextProps.isLogged) {
      console.log('### User was logged');
    }
  }

}

// Specifies the default values for props:
SignIn.defaultProps = {
  username: '',
  error: '',
  loading: false,
  user: null
};

SignIn.propTypes = {
  signIn: PropTypes.func,
  error: PropTypes.string,
  loading: PropTypes.bool,
  user: PropTypes.object,
  username: PropTypes.string
};

// Map Redux state to component props
function mapStateToProps(state) {
  return {
    error: state.signInReducer.error,
    loading: state.loadingInfo.loading,
    user: state.userSession
  }
}

// Map Redux actions to component props
function mapDispatchToProps(dispatch) {
  return {
    signIn: (userCredentials) => dispatch(signIn(userCredentials))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignIn);

var styles = StyleSheet.create({
  forgotPasswordText: {
    color: Themes.Colors.Alto,
    backgroundColor: Themes.Colors.transparent,
    textAlign: 'right',
    paddingRight: 15,
    paddingTop: 10
  },
  signinButton: {
    height: 60,
    backgroundColor: Themes.Colors.radicalRed,
    alignItems: "center",
    justifyContent: "center"
  },
  signinText: {
    color: "#FFF",
    fontSize: 18
  },
  errorText: {
    color: 'red',
    backgroundColor: Themes.Colors.transparent,
    textAlign: 'center',
    lineHeight: 20
  },
  loader: {
    alignSelf: 'center'
  }
});
