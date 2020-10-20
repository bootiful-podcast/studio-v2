export default class LoginService {

  constructor(authUrl) {
    this.tokenUrl = authUrl;
  }

  getUserToken() {
    return JSON.parse(localStorage.getItem('user'));
  }

  async login(username, password) {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Basic ' + btoa(username + ':' + password)
      }
    };

    const result = await fetch(this.tokenUrl, requestOptions)
      .then(response => {
        if (response.status === 200) {
          return response.text()
        } else {
          return Promise.reject(`could not authenticate @  ${Date.now()}. 
              The status code returned is ${response.status} and the text was ${response.statusText}`)
        }
      })

    const user = {token: result, username: username};
    if (user.token) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    return user.token
  }

  async logout() {
    localStorage.removeItem('user');
  }

}
