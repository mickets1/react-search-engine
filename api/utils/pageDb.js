/* eslint-disable jsdoc/require-jsdoc */
export class PageDb {
  constructor () {
    this.wordToId = new Map()
    this.pages = []
  }

  async getIdForWord (word) {
    if (this.wordToId.has(word)) {
      // found
      return this.wordToId.get(word)
    } else {
      const id = this.wordToId.size
      // Add
      this.wordToId.set(word, id)
      return id
    }
  }

  async addPage (page) {
    this.pages.push(page)
  }
}
