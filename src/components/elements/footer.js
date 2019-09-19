import React from 'react'
import { Link } from '@reach/router'

export default function Footer() {
  return (
    <footer
      style={{
        padding: `var(--two)`,
      }}
    >
      <Link to="/">Apollo Lambda Todo</Link>
    </footer>
  )
}
