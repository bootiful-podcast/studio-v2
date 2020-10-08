import requestUtils from "@/RequestUtils";

export default class LoginService {

  constructor(podcastApiUriRoot, tokenProducer) {
    this.podcastApiUrl = podcastApiUriRoot
    this.tokenProducer = tokenProducer
  }

  async getPodcasts() {
    const podcasts = await requestUtils.jsonRequest(this.podcastApiUrl, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    for (let i = 0; i < podcasts.length; i++) {
      console.log(podcasts [i])
    }
    return podcasts
  }
}
