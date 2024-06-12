import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addAllUsers, addEditUser } from '../redux/userSlice';
import back from '../assets/left-arrow.png'
import { useNavigate } from 'react-router-dom';
import del from '../assets/delete.png'
import edit from '../assets/pencil.png'
import { axiosInstance } from '../axiosInstance';

function Users() {
    const {users} = useSelector(state => state.users);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const onEdit = (id) => {
        const user = users?.find((item) => item.id === id)
        dispatch(addEditUser(user));
        navigate("/adduser")
    }

    const onDelete = async(id) => {
        try {
            const response = await axiosInstance.delete(`delete/${id}`);
            const updateUsers = await response.data;
            
            dispatch(addAllUsers(updateUsers))
        } catch (error) {
            console.log('error', error)
        }
    }

    const onBack = () => {
        dispatch(addEditUser(null))
     navigate("/adduser")
    }

  return (
    <div style={{width:"100%"}}>
        <div className='header'>
            <img src={back} alt='back' onClick={onBack}/>
            <p>User Details</p>
        </div>
        <table className='users'>
            <thead>
            <tr>
                    <th>Sl No</th>
                    <th>User Name</th>
                    <th>Mobile No</th>
                    <th>Email</th>
                    <th colSpan={2}></th>
            </tr>
            </thead>
            <tbody>{
                users?.map((item) => (
                    <tr key={item.id}>
                    <td>{item.id}</td>
                    <td>{item.name}</td>
                    <td>{item.mobile}</td>
                    <td>{item.email}</td>
                    <td><img alt='edit' src={edit} onClick={() => onEdit(item.id)} /></td>
                    <td><img alt="delete" src={del} onClick={() => onDelete(item.id)} /></td>
                </tr>
                ))
            }</tbody>
        </table>
    </div>
  )
}

export default Users