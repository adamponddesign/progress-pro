import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'
import moment from 'moment'
import { Chart } from 'react-charts'
import { Link } from 'react-router-dom'



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

              <div className="title is-3">{this.state.data.name} Results</div>

              {this.state.data.exercise_items.map(item =>

                <div key={item.id}>
                  <div className="subtitle is-size-4 table-title">{item.exercise.name}</div>



                  <div
                    style={{
                      width: '100%',
                      height: '350px'
                    }}
                  >



                    <Chart
                      series={{ type: 'area' }}
                      primaryCursor
                      secondaryCursor
                      tooltip

                      data={[
                        {
                          label: item.exercise.name,
                          data: item.weights.map(x => [x.date, x.value])
                        }
                      ]}


                      axes={[
                        { primary: true, type: 'ordinal', position: 'bottom' },
                        { type: 'linear', position: 'left' }
                      ]}


                    />
                  </div>


                  <hr />

                </div>
              )}
              <Link className="buttons is-right" to="/profile">
                <button className="button is-info is-medium">Back to Home</button>
              </Link>
            </div>
          </div>
        </div>

      </section>
    )
  }
}

export default ProgrammeResults
