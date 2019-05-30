import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import Promise from 'bluebird'

// const userid = Auth.getPayload().sub


class Show extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      errors: {},
      exercises: []
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleSelect = this.handleSelect.bind(this)

  }

  componentDidMount() {
    Promise.props({
      exercises: axios.get('/api/exercises') .then(res => res.data),
      data: axios.get(`/api/programmes/${this.props.match.params.id}`).then(res => res.data)
    })
      .then(res => {
        this.setState({ exercises: res.exercises, data: res.data })
      })

    // .catch(err => this.setState({ errors: err.response.data.errors }))
  }






  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: (e.target.value) }
    this.setState({ data })
    console.log(this.state)
  }



  handleSelect(e){
    const data = { ...this.state.data, [e.target.name]: parseInt(e.target.value) }
    this.setState({ data })
    console.log(this.state)
  }


  handleSubmit(e) {
    e.preventDefault()

    // const token = Auth.getToken()
    //
    // axios.post(`/api/programmes/${userid}/exercise-items`, this.state.data, {
    //   headers: { 'Authorization': `Bearer ${token}` }
    // })
    //   .then(() => this.props.history.push('/userhome'))
    //   .catch(err => this.setState({ errors: err.response.data.errors }))
  }


  render() {
  
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half-desktop is-two-thirds-tablet">
              <div className="title is-4">{this.state.data.name}</div>



              <form onSubmit={this.handleSubmit}>

                <div className="field">
                  <label className="label">Day</label>
                  <div className="control">
                    <input
                      className="input"
                      name="day"
                      placeholder="eg: Monday"
                      onChange={this.handleChange}
                    />
                  </div>
                  {/*  {this.state.errors.day && <div className="help is-danger">{this.state.errors.day}</div>} */}
                </div>


                <div className="field">
                  <label className="label">Exercise</label>
                  <div className="control">
                    <div className="select">

                      <select name="exercise_id"onChange={this.handleSelect}>
                        <option>Select dropdown</option>
                        {this.state.exercises.map(exercise =>

                          <option
                            key={exercise.id}
                            value={exercise.id}
                            name={exercise.id}

                          >{exercise.name}</option>
                        )}
                      </select>
                    </div>
                  </div>

                </div>





                <button className="button is-primary">Submit</button>
              </form>






            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default Show












// <div className="buttons" onClick={this.handleclick}>
// {this.state.exercises.map(exercise =>
//   <span
//   key={exercise.id}
//   className="button"
//   value={exercise.name}
//   name={exercise.name}
//
//   >{exercise.name}
//
//   </span>
// )}
//
// </div>
