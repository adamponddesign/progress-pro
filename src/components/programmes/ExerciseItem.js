import React from 'react'
import moment from 'moment'
import Auth from '../../lib/Auth'
import axios from 'axios'

class ExerciseItem extends React.Component {

  constructor(props) {
    super(props)

    // if this.lastweight has any items in it's array (e.g. has length)
    // then return the last item in the array to the 'lastweight' variable
    // if not the return {value: 0 }

    this.state = {
      data: props.item,
      currentWeight: { value: 0, data: this.getDate() }
    }

    this.increaseValue = this.increaseValue.bind(this)
    this.decreaseValue = this.decreaseValue.bind(this)
    this.handleSave=this.handleSave.bind(this)

  }

  componentDidMount() {
    this.setState({ currentWeight: { ...this.getLastWeight(), date: this.getDate() } })
  }

  getLastWeight() {
    return this.state.data.weights.length ? this.state.data.weights[this.state.data.weights.length-1] : { value: 0 }
  }

  increaseValue() {
    const { date, value } = this.state.currentWeight
    const currentWeight = { date, value: value + 1 }
    this.setState({ currentWeight })
  }

  decreaseValue() {
    const { date, value } = this.state.currentWeight
    const currentWeight = { date, value: value - 1 }
    this.setState({ currentWeight })
  }


  getDate() {
    return moment().format('YYYY-MM-DD')
  }


  duplicateDateCheck() {
    const todaysDate = this.getDate()
    const lastEntry = this.getLastWeight().date
    return todaysDate === lastEntry
  }



  handleSave() {
    // // make a copy of the data object on state (using spread)
    const data = { ...this.state.data }

    // push the currentWeight into the new data.weight array
    data.weights.push(this.state.currentWeight)

    //create a new item within the data object called `exercise_id`
    // and set onto it the nested data of the exercise id... which sit within the exercise object
    data.exercise_id = data.exercise.id
    // now data.exercise_id hold the exercise id only, which is what we want, so we can delete the old data.exercise object entry
    delete data.exercise

    // make an axios request to UPDATE the exercise item
    // first arg = where to
    // second arg = what you're sending
    // third arg = any header to include
    axios.put(`/api/programmes/${this.props.match.params.id}/exercise-items/${this.state.data.id}`, data, {
      headers: { 'Authorization': `Bearer ${Auth.getToken()}` }
    })
      .then(() => this.setState({ data }))
  }


  render() {
    console.log(this)
    // if(!this.getLastWeight()) return null
    return (
      <div id="weight-up-down">
        <div className="is-size-4 has-text-weight-bold">{this.props.item.exercise.name}</div>
        <div className="has-text-white">{'Last session you lifted '}
          <span className="is-size-4 has-text-white">{this.getLastWeight().value}</span> kg
        </div>


        <div className="has-text-centered level is-mobile">


          <button
            className='button is-danger level-item'
            onClick={this.decreaseValue}
            disabled={this.duplicateDateCheck()}
          >
            <span className="plus-minus">-</span>
          </button>

          <input
            className="trainFields is-size-4 level-item"
            type="number"
            value={this.state.currentWeight.value}
            disabled
          />


          <button
            className="button is-success level-item"
            onClick={this.increaseValue}
            disabled={this.duplicateDateCheck()}
          >
            <span className="plus-minus">+</span>
          </button>


          <button
            onClick={this.handleSave}
            className="button is-white is-medium is-outlined level-item save-weight-buttons"
            disabled={this.duplicateDateCheck()}>

            Save New Weight
          </button>
        </div>

      </div>
    )
  }
}

export default  ExerciseItem
