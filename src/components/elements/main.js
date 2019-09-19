import React from 'react'
import { Router } from '@reach/router'

import { Home, Login, Signup } from '../pages'

export default function Main() {
  return (
    <main
      style={{
        height: `100vh`,
        padding: `var(--two)`,
        background: `var(--light-2)`,
      }}
    >
      <Router>
        <Home path="/" />
        <Login path="/login" />
        <Signup path="/signup" />
      </Router>
    </main>
  )
}
