import 'bootstrap/dist/css/bootstrap.min.css'
import Table from 'react-bootstrap/Table'
import Form from 'react-bootstrap/Form'
import React, { useEffect, useState } from "react"
import Button from 'react-bootstrap/Button'
import axios from 'axios'

function Search() {
  const [result, setResult] = useState(null)
  const [message, setMessage] = useState('')
  const [execTime, setExecTime] = useState(null)
  const [numberOfResults, setnumberOfResults] = useState(null)

  function handleChange (event) {
    setMessage(event.target.value)
  }

  function handleInputSubmit() {
    const data = JSON.stringify({
      input: message
    })

    axios({
      method: 'post',
      url: 'http://localhost:8000/',
      headers: {'Content-Type': 'application/json'},
      data: data
    }).then((response) => {
      const queryInfo = response.data.shift()
      setExecTime(queryInfo.ExecTimeSec)
      setnumberOfResults(queryInfo.numberOfResults)

      setResult(response.data)
      console.log(response.data)
    })
  }

  return (
    <div style={{paddingLeft: "700px"}}>
    <div style={{ display: "flex", padding: '50px', width: "35%"}}>
    <Form.Control className="name-input" type="text" placeholder="Input" name="input" onChange={handleChange}></Form.Control>
     <Button className="submit-button" value="submit" type="submit" onClick={handleInputSubmit}>submit</Button>
    
     {result &&
    <div style={{ display: "block", position: "absolute", "marginTop": "60px" }}>
      <div style={{display: "block", position: "absolute", "marginTop": "30px"}}>
        <h3>Results</h3>
          <p className="text-start">Found {numberOfResults} results in {execTime} sec</p>
      </div>

      <div style={{"marginTop": "100px" }}>
        <Table striped bordered hover size="lg">
        <thead>
          <tr>
            <th>Link</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {result.map(d => (<tr><a href={"https://en.wikipedia.org/wiki/" + d.url}>{d.url}</a> <td>{d.score}</td></tr>))}
        </tbody>
      </Table> 
      </div> 
      </div>
      }
    </div>
    
    </div>
  )
}

export default Search;
