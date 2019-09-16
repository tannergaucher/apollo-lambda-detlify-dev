import React from 'react'
import gql from 'graphql-tag'
import { useQuery } from '@apollo/react-hooks'
import logo from './logo.svg'
import './App.css'

const HELLO_QUERY = gql`
  query {
    hello
  }
`

export default function App() {
  const { data, loading, error } = useQuery(HELLO_QUERY)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        {loading && <h3>Loading..</h3>}
        {error && <h3>`Error ${error.message}`</h3>}
        {data && data.hello && <h3>{data.hello}</h3>}
      </header>
    </div>
  )
}
