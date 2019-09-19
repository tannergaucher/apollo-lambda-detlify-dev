import React from 'react'
import { useApolloClient } from '@apollo/react-hooks'
import { navigate } from '@reach/router'

export default function Logout() {
  const client = useApolloClient()

  return (
    <button
      onClick={() => {
        localStorage.removeItem('token')
        client.writeData({
          data: {
            isLoggedIn: false,
          },
        })
        navigate('/login')
      }}
    >
      Logout
    </button>
  )
}
