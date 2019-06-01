import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'

class UserHome extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      errors: {},
      programmeName: '',
      user: {}
      // programmes: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

  }


  componentDidMount() {
    const token = Auth.getToken()
    axios.get('/api/profile', {
      headers: { 'Authorization': `Bearer ${token}` }
    })

      .then(res => {
        res.data.programmes = res.data.programmes.map(programme => {
          let days = programme.exercise_items.map(exercise => exercise.day)
          days = Array.from(new Set(days))
          programme.days = days
          // console.log(days)
          return programme
        })

        this.setState({ user: res.data })
      })
  }




  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
  }







  handleDelete(e) {
    const token = Auth.getToken()
    axios.delete(`/api/programmes/${e.target.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.props.history.push(`/programmes/${res.data.id}`))
  }







  handleSubmit(e) {
    e.preventDefault()

    const token = Auth.getToken()

    axios.post('/api/programmes', this.state.data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.props.history.push(`/programmes/${res.data.id}`))
  }



  render() {
    console.log(this.state.user)
    if(!this.state.user.programmes) return null
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half-desktop is-two-thirds-tablet">
              <div className="title is-4">User Homepage</div>



              <form onSubmit={this.handleSubmit}>

                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      name="name"
                      placeholder="eg: Enter New Programme Name Here"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.name && <div className="help is-danger">{this.state.errors.name}</div>}
                </div>


                <button className="button is-success">Create a New Programme</button>
              </form>

              <hr />
              <div className="subtitle">Saved Programmes</div>
              {this.state.user.programmes.map((programme) =>

                <div key={programme.id}>



                  <div>{programme.name}</div>

                  {programme.days.map(day =>
                    <Link to={`/programmes/${programme.id}/exercise-items?day=${day}`} key={day}>
                      <div className="button">{day} Train</div>
                    </Link>
                  )}



                  <Link to={`/programmes/${programme.id}`} className="button is-warning">Edit Programme</Link>


                  <div id={programme.id} onClick={this.handleDelete} className="button is-danger">Delete Programme</div>

                  <hr />

                </div> // programme id closing wrapper

              )}





              <div className="subtitle">Results</div>

              {this.state.user.programmes.map((programme) =>

                <Link key={programme.id} to={`/programmes/${programme.id}/results`} className="button">{programme.name}</Link>

              )}

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default UserHome
