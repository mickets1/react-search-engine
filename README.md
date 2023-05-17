# A3 - Search Engine

Installation instructions:
cd api \ npm i \ npm start

cd ui \ npm i \ npm start

## Description
A basic React search engine for Wikipedia articles.

## Submission instructions

See the [Deadlines and Submissions](https://coursepress.lnu.se/courses/web-intelligence/study-guide/deadlines-and-submissions) page.

## Requirements

<table>
  <tr>
    <td>
      <ul>
        <li>A basic search engine that index all pages in the <em>Wikipedia</em> dataset</li>
        <li>Search queries shall only contain single words.</li>
        <li>Results shall be ranked using the word frequency metric.</li>
        <li>The user shall input the search queries in a web client, and display the search results returned from the server.</li>
        <li>Display the top 5 search results with page and rank score.</li>
        <li>Implement the system using a REST web service where:
          <ol>
            <li>client sends a request to a server.</li>
            <li>the server responds with <em>JSON</em> data.</li>
            <li>the <em>json</em> data is decoded and presented in a client GUI.</li>
          </ol>
        </li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
    <ul>
      <li>It shall be possible to use search queries of more than one word.</li>
      <li>Results shall be ranked using:<br /><code>score = word_frequency + 0.8 * document_location</code></li>
      <li>Display the top five search results with page and rank score.</li>
      </ul>
    </td>
  </tr>
  <tr>
    <td>
      <ul>
        <li>Implement the PageRank algorithm and use it to rank the search results.</li>
        <li>Run the algorithm for 20 iterations.</li>
        <li>Results shall be ranked using:<br /><code>score = word_frequency + 0.8 * document_location + 0.5 * pagerank</code></li>
        <li>Display the top five search results with page and rank score.</li>
      </ul>
    </td>
  </tr>
</table>
