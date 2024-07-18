import React from 'react'
import '../styles/home.css'
import pic from '../../images/kids.jpg'

export const HomePage = () => {
  return (
    <>
    <div id="home">
      <img src={pic} alt="kids" />
      <h1>This is What We Do</h1>
    </div>
    </>
  )
}
