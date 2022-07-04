import { Navigate } from 'react-router-dom'
import { loginState, clearState } from '../features/loginSlice'
import { useDispatch, useSelector } from 'react-redux'
import { userState } from '../features/userSlice'
import { fetchUserData } from '../features/userSlice'
import { useEffect } from 'react'

export default function Profile() {
  const dispatch = useDispatch()

  const { isFetching, isError, errorMessage, firstname, lastname } = useSelector(userState)

  useEffect(() => {
    // if (isError) {
    //   console.log(errorMessage)
    //   dispatch(clearState())
    // }
    const token = localStorage.getItem('token')
    dispatch(
      fetchUserData({
        token,
      })
    )
  }, [isError, dispatch, errorMessage])

  return (
    <main className="main bg-dark">
      <div className="header">
        <h1>
          Welcome back
          <br />
          {firstname + ' ' + lastname}!
        </h1>
        <button className="edit-button">Edit Name</button>
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </main>
  )
}
