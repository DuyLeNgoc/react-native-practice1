import Api from 'network/Api';

export default class AuthenticationService {
  //Return an promise
  static signin(userCredentials) {
    return Api.requestData('POST', 'trainees/login', userCredentials);
  }

  static signup(userInfo) {
    return Api.requestData('POST', 'trainees/register', null, userInfo);
  }

  static signout(userCredentials) {
    return Api.requestData('POST', 'trainees/logout', userCredentials);
  }
}
