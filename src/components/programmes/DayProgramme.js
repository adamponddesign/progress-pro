import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
import ExerciseItem from './ExerciseItem'

class DayProgramme extends React.Component {

  constructor() {
    super()

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    // console.log(this.props)
    const token = Auth.getToken()
    axios.get(`/api/programmes/${this.props.match.params.id}/exercise-items${this.props.location.search}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.setState({ data: res.data }))
  }

  render() {
    if(!this.state.data) return null
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half-desktop is-two-thirds-tablet">
              <div className="title is-3">{this.state.data[0].day}</div>
              {this.state.data.map(item =>
                <div key={item.id}>
                  <ExerciseItem
                    item={item}
                    match={this.props.match}
                  />
                  <hr />
                </div>
              )}
              <Link className="buttons is-right" to="/profile">
                <div className="button is-info is-medium">Session Completed</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default DayProgramme
