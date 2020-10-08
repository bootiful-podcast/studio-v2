/**
 * provides common infrastructure for making calls
 */
export default {

  async jsonRequest(url, ops) {

    return fetch(url, ops)
      .then(response => {
        if (response.status === 200) {
          return response.json()
        } else {
          return Promise.reject(`could not authenticate @  ${Date.now()}. 
                                        The status code returned is ${response.status}
                                        and the text was ${response.statusText}`)
        }
      })
  }

}
