import React, { useState } from 'react'

import { SIGNUP_MUTATION } from '../apollo/graphql'

export default function signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <fieldset>
      <form
        onSubmit={e => {
          e.preventDefault()
        }}
      >
        <label htmlFor="name">
          Name
          <input
            name="name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            name="email"
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </label>
        <label htmlFor="password">
          <input
            name="password"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </fieldset>
  )
}
