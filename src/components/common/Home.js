import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <h1 className="title display is-1">Progress Pro</h1>
          <div className="subtitle display is-5">GYM Programme Creator and Results Tracker</div>

          <Link to="/register" className="button">Register</Link>
          <Link to="/login" className="button">Login</Link>
        </div>
      </div>
    </section>
  )
}

export default Home
