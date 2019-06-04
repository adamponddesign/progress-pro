import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <h1 className="title display is-1">Progress Pro</h1>
          <div className="subtitle display is-4">GYM Programme Creator and Results Tracker</div>


          <div className="buttons is-left">

            <Link to="/register" className="button is-white is-large is-outlined level-item save-weight-buttons">Register</Link>
            <Link to="/login" className="button is-white is-large is-outlined level-item save-weight-buttons">Login</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Home
