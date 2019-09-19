import React, { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { navigate } from '@reach/router'
import { LOGIN_MUTATION } from '../apollo/graphql'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION, {
    variables: {
      email,
      password,
    },
  })
  const client = useApolloClient()

  return (
    <fieldset disabled={loading}>
      {error && `Error: ${error.message}`}
      <form
        onSubmit={async e => {
          e.preventDefault()
          const { data } = await login()
          localStorage.setItem('token', data.login.token)
          client.writeData({
            data: {
              isLoggedIn: true,
              me: data.login.user,
            },
          })
          navigate('/')
        }}
        style={{
          display: `flex`,
          flexDirection: `column`,
        }}
      >
        <input
          name="email"
          type="email"
          value={email}
          placeholder="Email"
          onChange={e => setEmail(e.target.value)}
        />

        <input
          name="password"
          type="password"
          value={password}
          placeholder="Password"
          onChange={e => setPassword(e.target.value)}
        />

        <button type="submit">Log In</button>
      </form>
    </fieldset>
  )
}
