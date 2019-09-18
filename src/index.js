import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'

import { client } from './components/apollo/client'
import { App } from './components/elements'

import * as serviceWorker from './serviceWorker'

import { ApolloProvider } from '@apollo/react-hooks'

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)

serviceWorker.unregister()
