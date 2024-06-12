import React from 'react'
import { useForm } from 'react-hook-form'
import Banner from './Banner';
import { useDispatch, useSelector } from 'react-redux';
import { addAllUsers, bannerAction } from '../redux/userSlice';
import { axiosInstance } from '../axiosInstance';

function UserForm() {
    const { banner, editUser } = useSelector(state => state.users);
    const { register, handleSubmit, formState:{errors}, reset} = useForm({
        defaultValues: editUser ? editUser :{
            name:"",
            mobile:"",
            email:"" 
        }
    });
    const dispatch = useDispatch()

    const onSubmit = async (values) => {
        try {
            if(editUser){
              const response = await axiosInstance.put(`update/${editUser.id}`, values);
              const updateUsers = await response.data;
                dispatch(addAllUsers(updateUsers))
                dispatch(bannerAction("User Updated Successfully"));
            } else {
                const response = await axiosInstance.post('/adduser', values)
                const result = await response.data;
                dispatch(addAllUsers(result))
                dispatch(bannerAction("User Added Successfully"));
            }
            
        } catch (error) {
            console.log('error', error)
        } 
        
    }
  return (
    <>
    {banner.length > 0 && <Banner message={banner} btnText="Show" reset={reset}/>}
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className='box'>
        <label htmlFor='name'>Username:</label>
        <input
          type="text"
          id='name'
          {...register("name", { required: "Field shouldn't be blank"})}
        />
        {errors.name && <span>{errors.name.message}</span>}
      </div>
      <div className='box'>
        <label htmlFor='mobile'>Mobile:</label>
        <input
          id="mobile"
          type="text"
          {...register("mobile",{
            required: 'Mobile number is required',
            pattern: {
              value: /^[6-9]\d{9}$/,
              message: 'Mobile number is invalid, it should be 10 digits'
            }
          })}
        />
        {errors.mobile && <span>{errors.mobile.message}</span>}
      </div>
      <div className='box'>
        <label htmlFor='email'>Email:</label>
        <input
        id='email'
          type="email"
          {...register("email",{
            required: 'Email is required',
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: 'Email is invalid'
            }
          })}
        />
        {errors.email && <span>{errors.email.message}</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
    </>
  )
}

export default UserForm