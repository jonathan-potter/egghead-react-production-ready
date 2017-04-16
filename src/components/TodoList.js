import React from 'react'

export default function TodoList ({ todos }) {
  return (
    <ul>
      { todos.map(todo => <TodoItem {...todo} key={todo.id} />) }
    </ul>
  )
}

function TodoItem ({ isComplete, name }) {
  return (
    <li>
      <input type='checkbox' defaultChecked={isComplete} />
      {name}
    </li>
  )
}
