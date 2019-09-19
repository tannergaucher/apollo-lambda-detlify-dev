import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'

import { client } from '../apollo/client'
import { Header, Footer, Main } from '.'

export default function App() {
  return (
    <ApolloProvider client={client}>
      <Header />
      <Main />
      <Footer />
    </ApolloProvider>
  )
}
