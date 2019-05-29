import React from 'react'
import ReactDOM from 'react-dom'
import { HashRouter as Router, Switch, Route } from 'react-router-dom'

import 'bulma'
import './style.scss'

// import SecureRoute from './components/common/SecureRoute'
import FlashMessages from './components/common/FlashMessages'
import Navbar from './components/common/Navbar'
import Home from './components/common/Home'
import Login from './components/auth/Login'
import Register from './components/auth/Register'

class App extends React.Component {

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <FlashMessages />
          <Switch>

          </Switch>

          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/" component={Home} />


        </div>
      </Router>
    )
  }
}









ReactDOM.render(
  <App />,
  document.getElementById('root')
)
