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
    this.onChangeHandler = this.onChangeHandler.bind(this)
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

    // get the index of the exercise item
    const indexOfClickedExcise = e.target.id
    console.log('index of the exercise item from e.target.id', indexOfClickedExcise)



    // get index of the last weight entry
    const indexOfLastWeightEntry = (this.state.data[indexOfClickedExcise].weights.length-1)
    console.log('index of the last weight entry', indexOfLastWeightEntry)


    // Save last weight entry value to the variable 'value'
    let value = (this.state.data[indexOfClickedExcise].weights[indexOfLastWeightEntry].value)
    console.log('the value of the last weight entry was', value)

    // add one to the last weight entry
    value ++

    console.log('the value increased by 1 equals', value)



    // update state to reflect the change to the last weight last weight entry, of the clicked exercise only

    // so on re render the figure in the input field of that exercise will be updated


  }

  onChangeHandler(){
    console.log('onChangeHandler Activated')
  }





  render() {
    if(!this.state.data) return null
    // console.log(this.state.data)
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half-desktop is-two-thirds-tablet">

              <div className="title is-4">{this.state.data[0].day}</div>


              {this.state.data.map((item, i) =>
                <form key={item.id} id="weight-up-down" >

                  <div>{item.exercise.name}</div>
                  <div> Last session you lifted
                    <span className="is-size-4">
                      {item.weights[item.weights.length-1.].value}
                    </span> kg
                  </div>




                  <div
                    className='button is-danger'


                  >DECREASE BY 1
                  </div>



                  <input
                    className="is-size-4"
                    type="number"
                    id={'update value field id ' + i}
                    value={item.weights[item.weights.length-1.].value}
                    onChange={this.onChangeHandler}
                  />




                  <div
                    className="button is-success"
                    id={i}
                    onClick={this.increaseValue}


                  >INCREASE BY 1
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
