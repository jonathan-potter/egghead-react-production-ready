import React from 'react'

export default function Message ({ message }) {
  if (message.length) {
    return <div className='message'>{message}</div>
  } else {
    return <div />
  }
}
