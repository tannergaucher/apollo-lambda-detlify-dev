import React from 'react'
import { Link } from '@reach/router'
import { Login } from '../auth'

export default function LoginPage() {
  return (
    <>
      <Login />
      <Link to="/signup">Sign up for an account</Link>
    </>
  )
}
