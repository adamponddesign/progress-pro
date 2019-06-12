import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
// import { FilePond } from 'react-filepond'
// import 'filepond/dist/filepond.min.css'

class UserHome extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      error: '',
      programmeName: '',
      user: {}
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
    const id = parseInt(e.target.id)
    axios.delete(`/api/programmes/${id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => {
        // find the index of the programme that has been deleted, set it to `index`
        const index = this.state.user.programmes.findIndex(programme => programme.id === id)

        // spread the programmes that are currently on state
        // take two slices either side of the programme `index`
        // set the two slices back on to the variable `programmes`
        const programmes = [
          ...this.state.user.programmes.slice(0, index),
          ...this.state.user.programmes.slice(index+1)
        ]

        // spread the user object that is currently on state, and add to it the new `programmes`
        const user = { ...this.state.user, programmes }

        // set the updated `user` object back on to state
        this.setState({ user })
      })
  }


  handleSubmit(e) {
    e.preventDefault()
    const token = Auth.getToken()

    axios.post('/api/programmes', this.state.data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.props.history.push(`/programmes/${res.data.id}`))
      .catch(() => this.setState({ error: 'Please enter a name for the new programme' }))
  }


  render() {
    if(!this.state.user.programmes) return null
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-two-thirds-desktop is-two-thirds-tablet">
              <div className="title is-size-3 is-centered">Home</div>

              <form onSubmit={this.handleSubmit}>
                <div className="field">
                  <div className="control">
                    <input
                      className="input"
                      name="name"
                      placeholder="Enter New Programme Name"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.error && <div className="help is-danger">{this.state.error}</div>}
                </div>
                <button className="button is-medium is-success">Create a New Programme</button>
              </form>

              <hr />

              <div className="subtitle is-size-3">Saved Programmes</div>

              {this.state.user.programmes.map((programme) =>

                <div className="programme-block" key={programme.id}>
                  <div className="is-size-4 programme-headings">{programme.name}</div>
                  <div>
                    {programme.days.map(day =>
                      <Link to={`/programmes/${programme.id}/exercise-items?day=${day}`} key={day}>
                        <div className="button is-medium programme-home-buttons">{day} Train</div>
                      </Link>
                    )}
                  </div>
                  <div className="buttons">
                    <Link to={`/programmes/${programme.id}`}>
                      <div className="button is-medium is-info edit-del-buttons">Edit Programme</div></Link>
                    <div id={programme.id} onClick={this.handleDelete} className="button is-medium is-danger edit-del-buttons">Delete Programme</div>
                  </div>

                </div> // programme id closing wrapper
              )}
              <hr />
              <div className="subtitle is-size-3">Results</div>

              {this.state.user.programmes.map((programme) =>
                <Link
                  key={programme.id}
                  to={`/programmes/${programme.id}/results`}
                  className="button is-medium"
                >{programme.name}
                </Link>
              )}

              {/*  <hr />
              <div className="subtitle">Images</div>
              <FilePond allowMultiple={true}/>  */}

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default UserHome
