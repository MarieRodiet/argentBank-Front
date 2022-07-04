import logo from './../assets/img/argentBankLogo.png'
import { Link } from 'react-router-dom'
import { loginState } from '../features/loginSlice.js'
import { useSelector, useDispatch } from 'react-redux'
import { clearLoginState, clearToken } from './../features/loginSlice.js'
import { clearUserState } from '../features/userSlice'
import { userState } from '../features/userSlice'

export default function Nav() {
  const { isLogged, keepToken } = useSelector(loginState)
  const { firstname } = useSelector(userState)
  //if isLogged, get the user to add instead of Tony
  const dispatch = useDispatch()

  function handleLogout() {
    dispatch(clearLoginState())
    dispatch(clearUserState())
    keepToken && dispatch(clearToken())
  }

  return (
    <nav className="main-nav">
      <Link className="main-nav-logo" to="/">
        <img className="main-nav-logo-image" src={logo} alt="Argent Bank Logo" />
        <h1 className="sr-only">Argent Bank</h1>
      </Link>
      {isLogged && firstname ? (
        <div>
          <Link className="main-nav-item" to="/profile">
            <i className="fa fa-user-circle"></i>
            {firstname}
          </Link>
          <Link className="main-nav-item" to="/" onClick={handleLogout}>
            <i className="fa fa-sign-out"></i>
            Sign Out
          </Link>
        </div>
      ) : (
        <div>
          <Link className="main-nav-item" to="/signin">
            <i className="fa fa-user-circle"></i>
            Sign In
          </Link>
        </div>
      )}
    </nav>
  )
}
