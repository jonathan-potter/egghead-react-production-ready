import React, { Component } from 'react'

export default function ErrorMessage ({ message }) {
  if (message) {
    return <div className='error-message'>{message}</div>
  } else {
    return <div />
  }
}
