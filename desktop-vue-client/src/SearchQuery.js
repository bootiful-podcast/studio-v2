export default class SearchQuery {

  constructor(query, errors, startDate, stopDate) {
    this.query = query
    this.errors = errors
    this.start = startDate
    this.stop = stopDate
  }
}