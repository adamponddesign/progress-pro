import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import moment from 'moment'

// import { Link } from 'react-router-dom'



class ProgrammeResults extends React.Component {

  constructor() {
    super()

    this.state = {
      data: null
    }
  }

  componentDidMount() {
    const token = Auth.getToken()
    axios.get(`/api/programmes/${this.props.match.params.id}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })

      .then(res => {
        this.setState({ data: res.data })
      })
  }



  render() {
    // console.log(this.state.data)
    if(!this.state.data) return null
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half-desktop is-two-thirds-tablet">

              <div className="title is-4">{this.state.data.name} Results</div>

              {this.state.data.exercise_items.map(item =>

                <div key={item.id}>
                  <div>{item.exercise.name}</div>
                  {item.weights.map(entry =>
                    <div key={entry.date}>
                      <span>{moment(entry.date).format('D MMM YYYY')}</span>
                      <span>     {entry.value} kg</span>



                    </div>
                  )}
                  <hr />
                </div>
              )}

            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default ProgrammeResults
