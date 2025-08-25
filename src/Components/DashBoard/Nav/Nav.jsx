import React from 'react'
import './Nav.css'

const Nav = ({ handleToogle }) => {
  return (
    <nav className="nav">
      <button className="toogle" onClick={handleToogle}>=</button>
      <p>Eevent</p>
    </nav>
  )
}


export default Nav