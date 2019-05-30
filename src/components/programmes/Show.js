import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Promise from 'bluebird'

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
    // .then(() => this.props.history.push('/userhome'))
    // .catch(err => this.setState({ errors: err.response.data.errors }))
  }


  render() {
    if(!this.state.programme) return null
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half-desktop is-two-thirds-tablet">
              <div className="title is-4">{this.state.data.name}</div>



              <form onSubmit={this.handleSubmit}>

                <div className="field is-horizontal">
                  <label className="label">Day</label>
                  <div className="control is-expanded">
                    <div className="field-body">
                      <div className="select">

                        <select name="day" onChange={this.handleChange}>
                          <option>Select dropdown</option>


                          <option value="monday" name="monday">Monday</option>
                          <option value="tuesday" name="tuesday">Tuesday</option>
                          <option value="wednesday" name="wednesday">Wednesday</option>
                          <option value="thursday" name="thursday">Thursday</option>
                          <option value="friday" name="friday">Friday</option>
                          <option value="saturday" name="saturday">Saturday</option>
                          <option value="sunday" name="sunday">Sunday</option>

                        </select>
                      </div>
                    </div>
                    {/*  {this.state.errors.day && <div className="help is-danger">{this.state.errors.day}</div>} */}
                  </div>


                  <div className="field is-horizontal">
                    <label className="label">Exercise</label>
                    <div className="control is-expanded">
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



                <button className="button is-primary">Add Exercise</button>
              </form>


              {this.state.programme.exercise_items.map(exercise =>
                <div key={exercise.id}>{exercise.day}</div>
              )}



            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Show
