const BASE_URL = 'http://fixiesvn.azurewebsites.net/api/';

export default class AuthenticationService {
  //Return an promise
  static signin(userCredentials) {
		const url = `${BASE_URL}trainees/login`;
    return AuthenticationService.requestData('POST', url, userCredentials);
  }

  static signup(userInfo) {
		const url = `${BASE_URL}trainees/register`;
    return AuthenticationService.requestData('POST', url, null, userInfo);
  }

  static signout(userCredentials) {
    const url = `${BASE_URL}trainees/logout`;
    return AuthenticationService.requestData('POST', url, userCredentials);
  }

	static requestData(method, url, headers, body) {
		let defaulHeaders = {'Content-Type': 'application/json',
		'charset': 'utf-8'};
    for (let key in headers) {
      if (headers.hasOwnProperty(key)) {
        defaulHeaders[key] = headers[key];
      }
    }

		let myInit = {
			method: method,
			headers: defaulHeaders
		};
    if (body) {
      myInit['body'] = JSON.stringify(body);
    }
		return fetch(url, myInit)
      .then(response => {
        if(response.ok) {
          return response.json();
        }
        let errorMessage = 'Network response was not ok.'
        throw new Error(errorMessage);
      })
      .then(jsonData => {
        if(jsonData.hasOwnProperty('error')) {
          throw new Error(jsonData['error']);
        } else {
          return jsonData;
        }
      });
	}
}
