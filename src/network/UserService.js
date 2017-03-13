import Api from 'network/Api';

export default class UserService {
  //Return an promise
  static getList(userCredentials) {
    return Api.requestData('GET', 'trainees', userCredentials);
  }
}
