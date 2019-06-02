import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

// import { Link } from 'react-router-dom'


class DayProgramme extends React.Component {

  constructor() {
    super()

    this.state = {
      data: null
      // liveWeightInput: null
    }

    this.increaseValue = this.increaseValue.bind(this)
    // this.decreaseValue = this.decreaseValue.bind(this)

  }

  componentDidMount() {
    const token = Auth.getToken()
    // console.log(this.props.location.search)
    axios.get(`/api/programmes/${this.props.match.params.id}/exercise-items${this.props.location.search}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

      .then(res => {
        // console.log(res)
        this.setState({
          data: res.data


        })
      })
  }



  increaseValue(e) {
    console.log(e.target)
    let value = parseInt(e.target.id)
    // value={item.weights[item.weights.length-1.].value}
    // get the value from the form input field

    //create value variable = save to it the value from the number input field..
    //
    value = isNaN(value) ? 0 : value // handle if value is NaN
    //
    value++   // increase the value by one
    console.log(value)

    const data ={ ...this.state.data}
    console.log(data)
    // this.setState({ liveWeightInput: value })
    // console.log(this.state.liveWeightInput)

  }
  //
  // document.getElementById('number').value = value   //post the value back to the number input field



  //
  // decreaseValue(e) {
  //   let value = parseInt(document.getElementById('number').value, 10)
  //   value = isNaN(value) ? 0 : value
  //   value < 1 ? value = 1 : ''
  //   value--
  //   document.getElementById('number').value = value
  // }
  //



  // handleChange(e) {
  //   const data = { ...this.state.data, [e.target.name]: e.target.value }
  //   this.setState({ data })
  // }








  render() {
    if(!this.state.data) return null
    console.log(this.state.data)
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half-desktop is-two-thirds-tablet">

              <div className="title is-4">{this.state.data[0].day}</div>


              {this.state.data.map((item, i) =>
                <form key={item.id} id="weight-up-down">

                  <div>{item.exercise.name}</div>
                  <div> Last session you lifted
                    <span className="is-size-4">
                      {item.weights[item.weights.length-1.].value}
                    </span> kg
                  </div>




                  <div
                    className="value-button is-danger"
                    id="decrease"
                    // onClick={this.decreaseValue}
                    value="Decrease Value"
                  >-
                  </div>



                  <input
                    className="is-size-4"
                    type="number"
                    id={'update value field id ' + i}
                    value={item.weights[item.weights.length-1.].value}
                  />




                  <div
                    className="value-button is-success"
                    id={item.weights[item.weights.length-1.].value}
                    onClick={this.increaseValue}

                  >+
                  </div>
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
