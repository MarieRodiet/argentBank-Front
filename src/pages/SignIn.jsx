import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import useFetch from '../api/useFetch'
import { useSelector, useDispatch } from 'react-redux'
import {} from '../features/login'
import { loginURL } from './../utils/apiURL'

export default function SignIn() {
  const initialState = {
    username: '',
    password: '',
    rememberMe: false,
  }
  const [inputValues, setInputValues] = useState(initialState)

  const handleInputChange = (e) => {
    const target = e.target
    const value = target.type === 'checkbox' ? target.checked : target.value
    const name = target.name
    setInputValues({ ...inputValues, [name]: value })
  }
  //try to make fetch call
  //store token response in store
  //store user info in store
  //store isLogged in to true
  //redirect to Profile
  //catch error is null
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputValues)
    try {
    } catch {}
  }
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      email: 'tony@stark.com',
      password: 'password123',
    }),
  }
  const { data, isLoading, hasError } = useFetch(loginURL, requestOptions)
  const dispatch = useDispatch()

  return (
    <main className="main bg-dark">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={inputValues.username || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={inputValues.password || ''}
              onChange={handleInputChange}
            />
          </div>
          <div className="input-remember">
            <label htmlFor="remember-me">Remember me</label>
            <input type="checkbox" value={inputValues.rememberMe || false} name="rememberMe" />
          </div>
          <Link to="/profile" className="sign-in-button">
            <button type="submit">Sign In</button>
          </Link>
        </form>
      </section>
    </main>
  )
}
