import React from 'react'
import { Link } from '@reach/router'
import { useQuery } from '@apollo/react-hooks'

import { Logout } from '../auth'

import { IS_LOGGED_IN_QUERY } from '../apollo/graphql'

export default function Header() {
  const { loading, error, data } = useQuery(IS_LOGGED_IN_QUERY)

  return (
    <header
      style={{
        padding: `var(--two)`,
        display: `flex`,
        justifyContent: `space-between`,
      }}
    >
      <Link to="/">Apollo Lambda Todo</Link>
      {loading && `Loading...`}
      {error && `Error: ${error.message}`}
      {data.isLoggedIn ? <Logout /> : <LoginLink />}
    </header>
  )
}

function LoginLink() {
  return <Link to="/login">Login</Link>
}
