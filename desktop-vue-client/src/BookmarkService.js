export default class BookmarkService {


  constructor(bookmarkUri) {
    this.validateAuthentication = function (request) {
      return request.then(r => {
        if (r.status === 401) {
          return Promise.reject()
        } else {
          return r
        }
      })
    };
    this.bookmarkUri = bookmarkUri
    this.user = {token: null};
  }

  setAuthentication(user) {
    this.user = user;
    console.assert(this.user.token && this.user.token.length > 0);
    return Promise.resolve()
  }


  buildSearchResultsUrl(path, searchQuery) {

    const params = {};
    if (searchQuery.query !== null && searchQuery.query.trim() !== '') {
      params ['query'] = searchQuery.query
    }

    if (searchQuery.errors !== null) {
      params ['errors'] = searchQuery.errors
    }

    if (searchQuery.start !== null) {
      params['start'] = searchQuery.start.getTime()
    }

    if (searchQuery.stop !== null) {
      params['stop'] = searchQuery.stop.getTime()
    }

    const queryParams = []
    for (let k in params) {
      queryParams.push(k + '=' + params [k])
    }

    return this.bookmarkUri + `bookmarks/${path}?${queryParams.join('&')}`
  }

  exportResults(searchQuery) {
    const searchResultsUrl = this.buildSearchResultsUrl('export', searchQuery)
    window.open(searchResultsUrl)
  }


  search(searchQuery) {

    const context = {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.user.token
      }
    };
    const searchResultsUrl = this.buildSearchResultsUrl('search', searchQuery)
    return this.validateAuthentication(fetch(searchResultsUrl, context))
      .then(response => {
        const json = response.json();
        console.debug(json)
        return json;
      })
  }

  delete(id) {
    const context = {
      method: 'DELETE',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.user.token
      }
    };
    return this.validateAuthentication(fetch(this.bookmarkUri + 'bookmarks/' + id, context))
    //  .catch(() => console.error('something went wrong when deleting a request.'));
  }

  save(bookmark) {

    const encodedBookmarkId = bookmark.bookmarkId; /*encodeURIComponent*/

    const json = {
      command: 'update',
      href: bookmark.href,
      description: bookmark.description.trim(),
      tags: bookmark.tags.join(',')
    };

    const context = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Authorization': 'Bearer ' + this.user.token
      },
      body: JSON.stringify(json)
    };
    return this.validateAuthentication(
      fetch(this.bookmarkUri + 'bookmarks/' + encodedBookmarkId, context));

  }
}