import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Promise from 'bluebird'
import { Link } from 'react-router-dom'

// const userid = Auth.getPayload().sub

class Show extends React.Component {

  constructor() {
    super()

    this.state = {
      programme: null,
      data: {},
      errors: {},
      exercises: []
    }

    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

  }


  componentDidMount() {
    Promise.props({
      exercises: axios.get('/api/exercises') .then(res => res.data),
      programme: axios.get(`/api/programmes/${this.props.match.params.id}`).then(res => res.data)
    })
      .then(res => {
        this.setState({ exercises: res.exercises, programme: res.programme })
      })

    // .catch(err => this.setState({ errors: err.response.data.errors }))
  }


  handleDelete(e) {
    console.log(e.target.id)
    const token = Auth.getToken()
    axios.delete(`/api/programmes/${this.props.match.params.id}/exercise-items/${e.target.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        this.setState({ programme: res.data })
      })
  }



  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: (e.target.value) }
    this.setState({ data })
  }


  handleSubmit(e) {
    e.preventDefault()
    console.log('clicked')

    const token = Auth.getToken()

    axios.post(`/api/programmes/${this.props.match.params.id}/exercise-items`, this.state.data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => {
        this.setState({ programme: res.data })
      })
    // .catch(err => this.setState({ errors: err.response.data.errors }))

  }


  render() {
    console.log(this.state)
    if(!this.state.programme) return null
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half-desktop is-two-thirds-tablet">
              <div className="title is-4">{this.state.programme.name}</div>



              <form onSubmit={this.handleSubmit}>

                <div className="field">
                  <label className="label">Day</label>
                  <div className="control">
                    <div className="field-body">
                      <div className="select">

                        <select name="day" onChange={this.handleChange}>
                          <option>Select dropdown</option>


                          <option value="Monday" name="monday">Monday</option>
                          <option value="Tuesday" name="tuesday">Tuesday</option>
                          <option value="Wednesday" name="wednesday">Wednesday</option>
                          <option value="Thursday" name="thursday">Thursday</option>
                          <option value="Friday" name="friday">Friday</option>
                          <option value="Saturday" name="saturday">Saturday</option>
                          <option value="Sunday" name="sunday">Sunday</option>

                        </select>
                      </div>
                    </div>
                    {/*  {this.state.errors.day && <div className="help is-danger">{this.state.errors.day}</div>} */}
                  </div>


                  <div className="field">
                    <label className="label">Exercise</label>
                    <div className="control">
                      <div className="select">

                        <select name="exercise_id" onChange={this.handleChange}>
                          <option>Select dropdown</option>
                          {this.state.exercises.map(exercise =>

                            <option
                              key={exercise.id}
                              value={exercise.id}

                            >{exercise.name}</option>
                          )}
                        </select>
                      </div>
                    </div>

                  </div>

                </div> {/*field body closing tag*/}



                <button className="button is-success">Add Exercise</button>
              </form>



              <table className="table is-fullwidth">
                <thead>
                  <tr>

                    <th className="has-text-centered">Day</th>
                    <th className="has-text-centered">Exercises</th>
                    <th className="has-text-centered"></th>

                  </tr>

                </thead>
                <tbody>
                  {this.state.programme.exercise_items.map(exercise =>
                    <tr key={exercise.id} >


                      <td> {exercise.day} </td>
                      <td> {exercise.exercise.name} </td>
                      <td className="has-text-centered">
                        <div
                          className="is-centered button is-danger del"
                          onClick={this.handleDelete}
                          value={exercise.id}
                          id={exercise.id}
                        >Delete
                        </div>
                      </td>


                    </tr>

                  )}

                </tbody>
              </table>


              <Link className="buttons is-right" to="/profile">
                <div className="button is-info">Save Programme</div>
              </Link>
            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Show
