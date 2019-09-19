import React, { useState } from 'react'
import { useQuery, useMutation } from 'react-apollo'
import {
  CURRENT_USER_QUERY,
  IS_LOGGED_IN_QUERY,
  CREATE_TODO_MUTATION,
  DELETE_TODO_MUTATION,
} from '../apollo/graphql'

export default function HomePage() {
  const { data, loading, error } = useQuery(IS_LOGGED_IN_QUERY)

  return (
    <div>
      {loading && `Loading...`}
      {error && `Error: ${error.message}`}
      {data && data.isLoggedIn ? <AuthedHomepage /> : 'Please log in'}
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
    refetchQueries: ['CURRENT_USER_QUERY'],
  })

  return (
    <fieldset disabled={loading}>
      {error && `Error: ${error.message}`}
      <form
        onSubmit={async e => {
          e.preventDefault()
          await createTodo()
          setText('')
        }}
      >
        <input
          value={text}
          required={true}
          onChange={e => setText(e.target.value)}
        />
        <button type="submit">Add Todo</button>
      </form>
    </fieldset>
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
        data.me.todos.map(todo => <Todo key={todo.id} todo={todo} />)}
    </>
  )
}

function Todo({ todo }) {
  const [deleteTodo, { loading }] = useMutation(DELETE_TODO_MUTATION, {
    variables: {
      id: todo.id,
    },
    refetchQueries: ['CURRENT_USER_QUERY'],
  })

  return (
    <div style={{ marginBottom: `var(--three)` }}>
      {todo.text}
      <button
        disabled={loading}
        onClick={async e => {
          const res = await deleteTodo()
          console.log(res)
        }}
      >
        x
      </button>
    </div>
  )
}
