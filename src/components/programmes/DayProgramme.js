import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import { Link } from 'react-router-dom'
import ExerciseItem from './ExerciseItem'

// import { Link } from 'react-router-dom'


class DayProgramme extends React.Component {

  constructor() {
    super()

    this.state = {
      data: null
    }

    // this.increaseValue = this.increaseValue.bind(this)

    // this.decreaseValue = this.decreaseValue.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)

  }

  componentDidMount() {
    // console.log(this.props)
    const token = Auth.getToken()
    axios.get(`/api/programmes/${this.props.match.params.id}/exercise-items${this.props.location.search}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => this.setState({ data: res.data }))
  }










  handleSubmit(e) {
    e.preventDefault()

    let today = new Date()
    const dd = String(today.getDate()).padStart(2, '0')
    const mm = String(today.getMonth() + 1).padStart(2, '0')
    const yyyy = today.getFullYear()

    today = yyyy + '-' + mm + '-' + dd






    console.log('handle submit click event', today)

  }





  render() {
    if(!this.state.data) return null
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half-desktop is-two-thirds-tablet">

              <div className="title is-4">{this.state.data[0].day}</div>

              <form>

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
                  <div className="button is-info">Session Completed</div>
                </Link>

              </form>

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default DayProgramme
