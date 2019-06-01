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

    this.increaseValue = this.increaseValue.bind(this)
    this.decreaseValue = this.decreaseValue.bind(this)

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



  increaseValue() {
    let value = parseInt(document.getElementById('number').value, 10)
    value = isNaN(value) ? 0 : value
    value++
    document.getElementById('number').value = value
  }

  decreaseValue() {
    var value = parseInt(document.getElementById('number').value, 10)
    value = isNaN(value) ? 0 : value
    value < 1 ? value = 1 : ''
    value--
    document.getElementById('number').value = value
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
                <form key={item.id} id="weight-up-down">

                  <div>{item.exercise.name}</div>
                  <div> Last session you lifted <span className="is-size-4">{item.weights[item.weights.length-1.].value}</span> kg</div>




                  <div className="value-button" id="decrease" onClick={this.decreaseValue} value="Decrease Value">-</div>
                  <input className="is-size-4" type="number" id="number" value={item.weights[item.weights.length-1.].value} />
                  <div className="value-button" id="increase" onClick={this.increaseValue} value="Increase Value">+</div>
                </form>






              )}

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default DayProgramme
