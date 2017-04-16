import React from 'react'

export default function ErrorMessage ({ message }) {
  if (message.length) {
    return <div className='error-message'>{message}</div>
  } else {
    return <div />
  }
}
