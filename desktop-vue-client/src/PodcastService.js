import requestUtils from "@/RequestUtils";

export default class LoginService {

  constructor(podcastApiUriRoot, tokenProducer) {
    this.podcastApiUrl = podcastApiUriRoot
    this.tokenProducer = tokenProducer
  }

  async searchPodcasts(query) {
    return await requestUtils.jsonRequest(this.podcastApiUrl + '/search?query=' + query, {
      method: 'GET'
    })
  }

  async getPodcasts() {
    const p = await requestUtils.jsonRequest(this.podcastApiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    return p
  }
}
