import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { addEditUser, bannerAction } from '../redux/userSlice';

function Banner({message, btnText, reset}) {

    const navigate = useNavigate();
    const dispatch = useDispatch()

    const onClickHandler = () => {
        dispatch(bannerAction(false));
        navigate('/',{replace:true})
        dispatch(addEditUser(null));
        reset()
    }
  return (
    <div className='banner'>
        <p>{message}</p>
        <button onClick={onClickHandler}>{btnText}</button>
    </div>
  )
}

export default Banner