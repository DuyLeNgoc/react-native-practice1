const BASE_URL = 'http://fixiesvn.azurewebsites.net/api/';

export default class Api {
	static requestData(method, subDomain, headers, body) {
		const url = `${BASE_URL}${subDomain}`;
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
