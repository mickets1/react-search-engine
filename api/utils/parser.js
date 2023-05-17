/* eslint-disable jsdoc/require-jsdoc */
import { readFile, readdir } from 'fs/promises'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'
import { Page } from './page.js'
import { PageDb } from './pageDb.js'

export async function readFiles () {
  try {
    const pageDb = new PageDb()
    const directoryFullName = dirname(fileURLToPath(import.meta.url))

    const wordsPath = join(directoryFullName, '..', 'datasets', 'wikipedia', 'Words')
    const linksPath = join(directoryFullName, '..', 'datasets', 'wikipedia', 'Links')
    const wikiSubjectWordsPath = await getFileLists(wordsPath)
    const wikiSubjectLinksPath = await getFileLists(linksPath)

    // Subjects: ex Games, Programming
    for (let i = 0; i < wikiSubjectLinksPath.length; i++) {
      if (wikiSubjectWordsPath[i] !== wikiSubjectLinksPath[i]) {
        throw new Error('Words or Links file structure is incorrect')
      }

      const linkFiles = await getFileLists(join(linksPath, wikiSubjectLinksPath[i]))
      const wordFiles = await getFileLists(join(wordsPath, wikiSubjectWordsPath[i]))

      // Ensure Links and Words folders have the same amount of files.
      if (wordFiles.length !== linkFiles.length) {
        throw new Error('Missing files')
      }

      // Split words and links and create new pages.
      for (let j = 0; j < linkFiles.length; j++) {
        const url = linkFiles[j]
        const readWords = await readFile(join(wordsPath, wikiSubjectWordsPath[i], wordFiles[j]), 'utf-8')
        const readLinks = await readFile(join(linksPath, wikiSubjectLinksPath[i], url), 'utf-8')

        const words = readWords.trim().split(' ')
        const links = readLinks.trim().split(/\r?\n/)
        await createPage(pageDb, links, words, url)
      }
    }

    return pageDb
  } catch (e) {
    console.error(e)
  }
}

async function createPage (pageDb, links, words, url) {
  const page = new Page(url, links)

  for (const word of words) {
    const wordToId = await pageDb.getIdForWord(word)
    page.addWordId(wordToId)
  }

  pageDb.addPage(page)
}

async function getFileLists (path) {
  const fileFolders = await readdir(path)
  return fileFolders
}
