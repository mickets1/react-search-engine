/* eslint-disable jsdoc/require-jsdoc */
export class Page {
  constructor (url, links) {
    this.url = url
    this.links = links
    this.words = []
    // All the links for a subject
    // console.log(links)
  }

  async addWordId (wordId) {
    this.words.push(wordId)
  }

  async getUrl () {
    return this.url
  }
}
