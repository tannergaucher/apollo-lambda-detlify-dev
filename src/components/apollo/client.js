import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: process.env.REACT_APP_SITE_URL + '/.netlify/functions/graphql',
  credentials: 'include',
})

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const cache = new InMemoryCache()

export const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink),
  resolvers: {
    Mutation: {},
    Query: {},
  },
  connectToDevTools: true,
})

const data = {
  isLoggedIn: !!localStorage.getItem('token'),
}

cache.writeData({ data })
