import { Navigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { fetchUserByInputs, loginState, clearLoginState } from '../features/loginSlice.js'

export default function SignIn() {
  const dispatch = useDispatch()
  const { register, handleSubmit } = useForm()

  const { isFetching, hasError, errorMessage, isLogged } = useSelector(loginState)

  function onSubmit(data) {
    dispatch(fetchUserByInputs(data))
  }

  useEffect(() => {
    if (hasError) {
      console.log(errorMessage)
      dispatch(clearLoginState())
    }
  }, [])

  return (
    <main className="main bg-dark">
      {isLogged && <Navigate to="/profile" replace={true} />}
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit(onSubmit)} method="POST">
          <div className="input-wrapper">
            <label htmlFor="email">Email</label>
            <input
              required
              id="email"
              type="text"
              name="email"
              autoComplete="email"
              placeholder="your@email.com"
              {...register('email', { required: true })}
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              required
              id="password"
              type="password"
              name="password"
              placeholder="password"
              autoComplete="current-password"
              {...register('password', { required: true })}
            />
          </div>
          <div className="input-remember">
            <label htmlFor="remember-me">Remember me</label>
            <input type="checkbox" name="rememberMe" {...register('rememberMe')} value="true" />
          </div>
          {isFetching ? <button disabled>Fetching</button> : <button type="submit">Sign In</button>}
        </form>
      </section>
    </main>
  )
}
