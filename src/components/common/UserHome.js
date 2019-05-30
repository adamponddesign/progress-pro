import React from 'react'
import axios from 'axios'
import Auth from '../../lib/Auth'

class UserHome extends React.Component {

  constructor() {
    super()

    this.state = {
      data: {},
      errors: {}
    }
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }


  handleChange(e) {
    const data = { ...this.state.data, [e.target.name]: e.target.value }
    this.setState({ data })
    console.log(this.state.data)
  }




  handleSubmit(e) {
    e.preventDefault()

    const token = Auth.getToken()

    axios.post('/api/programmes', this.state.data, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(() => this.props.history.push('/programmes/new'),
        console.log('programme created'))
  }



  render() {
    return (
      <section className="section">
        <div className="container">
          <div className="columns is-centered">
            <div className="column is-half-desktop is-two-thirds-tablet">
              <div className="title is-4">User Homepage</div>



              <form onSubmit={this.handleSubmit}>

                <div className="field">
                  <label className="label">Create A New Programme</label>
                  <div className="control">
                    <input
                      className="input"
                      name="name"
                      placeholder="eg: Shred programme"
                      onChange={this.handleChange}
                    />
                  </div>
                  {this.state.errors.name && <div className="help is-danger">{this.state.errors.name}</div>}
                </div>


                <button className="button is-primary">Go</button>
              </form>

              <hr />
              <div className="subtitle">Results</div>





            </div>
          </div>
        </div>
      </section>
    )
  }
}

export default UserHome
