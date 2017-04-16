import React from 'react'

export default function TodoList ({ todos, handleRemove, handleToggle }) {
  return (
    <ul>
      { todos.map(todo => <TodoItem {...todo} handleToggle={handleToggle} key={todo.id} handleRemove={handleRemove} />) }
    </ul>
  )
}

function TodoItem ({ id, isComplete, handleRemove, handleToggle, name }) {
  const onClickCheckbox = () => handleToggle(id)
  const onClickRemove = handleRemove.bind(null, id)

  return (
    <li>
      <button onClick={onClickRemove}>x</button>
      <input type='checkbox' onClick={onClickCheckbox} checked={isComplete} />
      {name}
    </li>
  )
}
