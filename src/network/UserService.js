import Api from 'network/Api';
import Constants from 'utils/constants';
import MemCache from 'utils/MemCache';

export default class UserService {
  //Return an promise
  static getList() {
    const accessToken = Constants.memcacheKeys.accessToken;
    let userCredentials = {};
    userCredentials[accessToken] = MemCache.get(accessToken);
    return Api.requestData('GET', 'trainees', userCredentials);
  }
}
