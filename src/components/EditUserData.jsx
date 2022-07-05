import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { fetchEditUserData, userState, removeEdit } from './../features/userSlice.js'
import { useSelector } from 'react-redux'
import { loginState } from '../features/loginSlice.js'

export default function EditUserData() {
  const { register, handleSubmit } = useForm()
  const dispatch = useDispatch()
  const { firstname, lastname } = useSelector(userState)
  const {token} = useSelector(loginState)

  function onSubmit(data) {
    dispatch(fetchEditUserData({ ...data, token: token }))
  }

  return (
    <div className="edit-info-container">
      <h1 className="edit-info-container-title">Edit Info</h1>
      <form className="edit-info-container-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="edit-info-container-form-inputs">
          <label className="hidden-label" htmlFor="firstname">
            Firstname
          </label>
          <input
            className="edit-info-inputs"
            required
            id="firstname"
            type="text"
            name="firstname"
            autoComplete="firstname"
            placeholder={firstname}
            {...register('firstname')}
          />
          <label className="hidden-label" htmlFor="lastname">
            Lastname
          </label>
          <input
            className="edit-info-inputs"
            required
            id="lastname"
            type="text"
            name="lastname"
            placeholder={lastname}
            autoComplete="lastname"
            {...register('lastname')}
          />
        </div>
        <div className="edit-info-buttons-container">
          <button className="edit-info-buttons-container-btn" type="submit" value="save">
            Save
          </button>
          <input
            className="edit-info-buttons-container-btn"
            type="button"
            value="Cancel"
            onClick={() => dispatch(removeEdit())}
          />
        </div>
      </form>
    </div>
  )
}
