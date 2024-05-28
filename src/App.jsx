import { useEffect, useState } from 'react'
import './App.css'
import Users from './components/Users'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import UserForm from './components/UserForm'
import { useDispatch } from 'react-redux'
import { getAllUsers } from './redux/userSlice'

const router = createBrowserRouter([
  {
    path:'/',
    element:<Users />
  },
  {
    path:'adduser',
    element: <UserForm />
  }
]);




function App() {

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getAllUsers())
  },[])
  return (
      <RouterProvider router={router} />
  )
}

export default App
