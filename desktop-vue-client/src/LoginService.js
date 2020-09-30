export default class LoginService {

  constructor(authUrl) {
    this.tokenUrl = authUrl;
  }

  _handleResponse(response) {
    return response
      .text()
      .then(text => {
        const data = text && JSON.parse(text);
        if (!response.ok) {
          if (response.status === 401) {
            // auto logout if 401 response returned from api
            this.logout();
            location.reload();
          }

          const error = (data && data.message) || response.statusText;
          return Promise.reject(error);
        }

        return data;
      });
  }

  getUserToken() {
    return localStorage.getItem('user');
  }

  attemptLogin() {
    const token = this.getUserToken();
    if (token && token.length > 0) {
      return Promise.resolve(JSON.parse(token))
    }
    return Promise.reject('there is not existing token; you will need to authenticate.')
  }

  login(username, password) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      }
    };

    return fetch(this.tokenUrl, requestOptions)
      .then(response => {
        if (response.status === 200) {
          return response
            .text()
            .then(text => {
              const user = {token: text};
              if (user.token) {
                localStorage.setItem('user', JSON.stringify(user));
              }
              return user
            })
        }
        else {
          return Promise.reject(`could not authenticate @  ${Date.now()}. 
                                        The status code returned is ${response.status}
                                        and the text was ${response.statusText}`)
        }
      })


  }

  logout() {
    return new Promise((resolve, reject) => {
        localStorage.removeItem('user');
        try {
          resolve();
        } catch (e) {
          reject(e);
        }
      }
    );
  }

}

