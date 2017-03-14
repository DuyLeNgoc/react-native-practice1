import Api from 'network/Api';
import Constants from 'utils/constants';
import MemCache from 'utils/MemCache';

export default class AuthenticationService {
  //Return an promise
  static signin(userCredentials) {
    return Api.requestData('POST', 'trainees/login', userCredentials)
    .then(json => {
      MemCache.set(Constants.memcacheKeys.accessToken ,json.token);
      return json;
    });
  }

  static signup(userInfo) {
    return Api.requestData('POST', 'trainees/register', null, userInfo);
  }

  static signout() {
    const accessToken = Constants.memcacheKeys.accessToken;
    let userCredentials = {};
    userCredentials[accessToken] = MemCache.get(accessToken);
    return Api.requestData('POST', 'trainees/logout', userCredentials)
    .then(json => {
      MemCache.remove(Constants.memcacheKeys.accessToken);
    });
  }
}
