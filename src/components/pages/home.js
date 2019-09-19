import React, { useState } from 'react'

import {
  CURRENT_USER_QUERY,
  IS_LOGGED_IN_QUERY,
  CREATE_TODO_MUTATION,
} from '../apollo/graphql'
import { useQuery, useMutation } from 'react-apollo'

export default function HomePage() {
  const { data, loading, error } = useQuery(IS_LOGGED_IN_QUERY)

  return (
    <div>
      {loading && `Loading...`}
      {error && `Error: ${error.message}`}
      {data && data.isLoggedIn ? <AuthedHomepage /> : 'please log in'}
    </div>
  )
}

function AuthedHomepage() {
  return (
    <>
      <CreateTodo />
      <TodosList />
    </>
  )
}

function CreateTodo() {
  const [text, setText] = useState('')
  const [createTodo, { loading, error }] = useMutation(CREATE_TODO_MUTATION, {
    variables: {
      text,
    },
  })

  return (
    <form
      onSubmit={async e => {
        e.preventDefault()
        console.log('create a todo')
        const res = await createTodo()
        console.log(res)
      }}
    >
      <input value={text} onChange={e => setText(e.target.value)} />
      <button type="submit">Add Todo</button>
    </form>
  )
}

function TodosList() {
  const { data, loading, error } = useQuery(CURRENT_USER_QUERY)

  return (
    <>
      {loading && `Loading...`}
      {error && `Error: ${error.message}`}
      {data &&
        data.me &&
        data.me.todos.map(todo => (
          <div key={todo.id}>
            <h3>{todo.text}</h3>
          </div>
        ))}
    </>
  )
}
