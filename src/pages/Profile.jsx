import { clearUserState, editUserInfo } from '../features/userSlice'
import { useDispatch, useSelector } from 'react-redux'
import { loginState } from '../features/loginSlice'
import { fetchUserData, userState } from '../features/userSlice'
import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import EditUserData from '../components/EditUserData'

export default function Profile() {
  const dispatch = useDispatch()

  const { isFetching, hasError, errorMessage, firstname, lastname, toEdit } = useSelector(userState)
  const { isLogged, token } = useSelector(loginState)

  useEffect(() => {
    if (hasError) {
      console.log(errorMessage)
      dispatch(clearUserState())
    }

    dispatch(
      fetchUserData({
        token,
      })
    )
  }, [toEdit])

  function showEditInput(e) {
    e.preventDefault()
    dispatch(editUserInfo())
  }

  return (
    <main className="main bg-dark">
      {(!isLogged || hasError) && <Navigate to="/signin" replace={true} />}
      <div className="header">
        <h1>
          Welcome back
          <br />
          {isFetching ? 'Dear customer' : firstname + ' ' + lastname}!
        </h1>
        {toEdit ? (
          <EditUserData />
        ) : (
          <button className="edit-button" onClick={showEditInput}>
            Edit Name
          </button>
        )}
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
