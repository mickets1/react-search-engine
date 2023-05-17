/* eslint-disable jsdoc/require-jsdoc */
export class SearchQuery {
  constructor (pageDb) {
    this.pageDb = pageDb
  }

  // User input query.
  async query (query) {
    const results = []
    const scores = []

    const pages = this.pageDb.pages
    for (let i = 0; i < pages.length; i++) {
      scores[i] = await this.getFrequencyScore(pages[i], query)
    }

    await this.normalize(scores, false)

    for (let i = 0; i < pages.length; i++) {
      if (scores[i] > 0) {
        results.push({
          url: await pages[i].getUrl(),
          score: (scores[i]).toFixed(2)
        })
      }
    }

    const sortedResults = await this.sortResults(results)
    return sortedResults
  }

  async sortResults (results) {
    results.sort(function (a, b) {
      return b.score - a.score
    })

    return results
  }

  async getFrequencyScore (page, query) {
    let score = 0

    const queryToId = await this.pageDb.getIdForWord(query)

    for (const word of page.words) {
      if (word === queryToId) {
        score++
      }
    }

    return score
  }

  // Normalizes score to 0 or 1
  // modifies the original array.
  async normalize (scores, smallIsBetter) {
    if (smallIsBetter) {
      const min = Math.min(...scores)

      for (let i = 0; i < scores.length; i++) {
        scores[i] = min / Math.max(scores[i], 0.00001)
      }
    } else {
      const max = Math.max(...scores, 0.00001)

      for (let i = 0; i < scores.length; i++) {
        scores[i] = scores[i] / max
      }
    }

    return scores
  }
}
