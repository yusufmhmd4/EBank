import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

const Home = props => {
  const token = Cookies.get('jwt_token')
  console.log(token)
  if (token === undefined) {
    return <Redirect to="/ebank/login" />
  }

  const removeAccess = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/ebank/login')
  }

  return (
    <div className="apps-container">
      <nav className="nav-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png"
          className="logo"
          alt="website logo"
        />
        <button type="button" className="log-out-button" onClick={removeAccess}>
          Logout
        </button>
      </nav>
      <div className="content-container">
        <h1 className="content-heading">Your Flexibility, Our Excellence</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png"
          className="card"
          alt="digital card"
        />
      </div>
    </div>
  )
}
export default Home
