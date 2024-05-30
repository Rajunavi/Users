import { useDispatch, useSelector } from 'react-redux';
import { addAllUsers, addEditUser } from '../redux/userSlice';
import back from '../assets/left-arrow.png'
import { useNavigate } from 'react-router-dom';
import del from '../assets/delete.png'
import edit from '../assets/pencil.png'
import { axiosInstanse } from '../axiosInstanse';

function Users() {
    // const [users, setUsers] = useState([]);

    const {users} = useSelector(state => state.users);
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const onEdit = (id) => {
        const user = users?.find((item) => item.id === id)
        dispatch(addEditUser(user));
        navigate("/adduser")
    }

    const onDelete = async(id) => {
        // const index = users?.findIndex((item) => item.id === id);
        //         const updateUsers = [...users?.slice(0, index), ...users?.slice(index + 1)]

        try {
            const response = await axiosInstanse.delete(`delete/${id}`);
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
            <img src={back} alt='img' onClick={onBack}/>
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
                    <td><img src={edit} onClick={() => onEdit(item.id)} /></td>
                    <td><img src={del} onClick={() => onDelete(item.id)} /></td>
                </tr>
                ))
            }</tbody>
        </table>
    </div>
  )
}

export default Users