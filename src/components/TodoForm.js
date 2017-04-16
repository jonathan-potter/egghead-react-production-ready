import React from 'react'

export default function TodoForm ({ currentTodo, handleInputChange, handleSubmit }) {
  return (
    <form onSubmit={handleSubmit}>
      <input type='text' onChange={handleInputChange} value={currentTodo} />
    </form>
  )
}
