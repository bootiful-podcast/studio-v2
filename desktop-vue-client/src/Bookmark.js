export default class Bookmark {

  constructor(bookmarkId, href, description, extended,
                 hash, tags, date, edited ) {
    this.href = href;
    this.edited = edited ;
    this.bookmarkId = bookmarkId;
    this.description = description;
    this.extended = extended;
    this.hash = hash;
    this.tags = tags;
    this.date = date;
  }

}