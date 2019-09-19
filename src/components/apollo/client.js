import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink } from 'apollo-link-http'
import { setContext } from 'apollo-link-context'
import { onError } from 'apollo-link-error'

const httpLink = createHttpLink({
  uri: '/.netlify/functions/graphql',
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

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.map(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    )
  if (networkError) console.log(`[Network error]: ${networkError}`)
})

const cache = new InMemoryCache()

export const client = new ApolloClient({
  cache,
  link: authLink.concat(httpLink, errorLink),
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
