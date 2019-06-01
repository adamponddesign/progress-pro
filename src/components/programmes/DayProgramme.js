import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

// import { Link } from 'react-router-dom'


class DayProgramme extends React.Component {

  constructor() {
    super()

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    const token = Auth.getToken()
    // console.log(this.props.location.search)
    axios.get(`/api/programmes/${this.props.match.params.id}/exercise-items${this.props.location.search}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

      .then(res => {
        this.setState({ data: res.data })
      })
  }



  render() {
    console.log(this.state.data)
    if(!this.state.data) return null
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half-desktop is-two-thirds-tablet">

              <div className="title is-4">{this.state.data[0].day}</div>


              {this.state.data.map(item =>
                <div key={item.id}>



                  <div>{item.exercise.name}</div>

                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default DayProgramme
