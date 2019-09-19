import React, { useState } from 'react'
import { useMutation, useApolloClient } from '@apollo/react-hooks'
import { SIGNUP_MUTATION } from '../apollo/graphql'

export default function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [signup, { loading, error }] = useMutation(SIGNUP_MUTATION, {
    variables: {
      name,
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
          const { data } = await signup()
          localStorage.setItem('token', data.signup.token)

          client.writeData({
            data: {
              isLoggedIn: true,
              me: data.signup.user,
            },
          })
        }}
        style={{
          display: `flex`,
          flexDirection: `column`,
        }}
      >
        <input
          name="name"
          value={name}
          placeholder="Name"
          onChange={e => setName(e.target.value)}
        />

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

        <button type="submit">Sign Up</button>
      </form>
    </fieldset>
  )
}
