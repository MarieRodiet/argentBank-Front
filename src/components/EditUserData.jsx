import { useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { fetchEditUserData } from './../features/userSlice.js'

export default function EditUserData({ firstname, lastname }) {
  const { register, handleSubmit, reset } = useForm()
  const dispatch = useDispatch()

  function onSubmit(data) {
    dispatch(fetchEditUserData(data))
  }
  return (
    <div>
      <h1>Edit Info</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="">
          <label htmlFor="firstname">Firstname</label>
          <input
            required
            id="firstname"
            type="text"
            name="firstname"
            autoComplete="firstname"
            placeholder={firstname}
            {...register('firstname')}
          />
          <label htmlFor="lastname">Lastname</label>
          <input
            required
            id="lastname"
            type="text"
            name="lastname"
            placeholder={lastname}
            autoComplete="lastname"
            {...register('lastname')}
          />
        </div>
        <div className="">
          <button type="submit" value="save">
            Save
          </button>
          <input
            type="button"
            value="Cancel"
            onClick={() => reset({ firstname: firstname, lastname: lastname })}
          />
        </div>
      </form>
    </div>
  )
}
