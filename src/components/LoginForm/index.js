import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {userId: '', pin: '', errorMsg: '', loginError: false}

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  submitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  submitError = errorMsg => {
    this.setState({errorMsg, loginError: true})
  }

  submitForm = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const userDetails = {
      user_id: userId,
      pin,
    }

    const url = `https://apis.ccbp.in/ebank/login`

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok === true) {
      console.log(data)
      this.submitSuccess(data.jwt_token)
    } else {
      this.submitError(data.error_msg)
    }
  }

  render() {
    const {errorMsg, loginError} = this.state
    const token = Cookies.get('access')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="app-container">
        <div className="login-container">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png"
            alt="website login"
            className="login-image"
          />
          <form className="form-container" onSubmit={this.submitForm}>
            <h1 className="form-heading">Welcome Back!</h1>
            <div className="input-container">
              <label htmlFor="id" className="label">
                User ID
              </label>
              <input
                type="text"
                id="id"
                className="input"
                placeholder="Enter User ID"
                onChange={this.onChangeUserId}
              />
            </div>
            <div className="input-container">
              <label htmlFor="pin" className="label">
                PIN
              </label>
              <input
                type="password"
                id="pin"
                className="input"
                placeholder="Enter PIN"
                onChange={this.onChangePin}
              />
            </div>
            <button type="submit" className="login-button">
              Login
            </button>
            {loginError && <p className="error">{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
