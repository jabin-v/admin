import React from 'react'
import { useSelector } from 'react-redux'
import Sidebar from '../../components/sidebar/Sidebar'
import { selectAllUsers } from '../../features/users/userApiSlice'
import UsersList from '../../features/users/UsersList'
import "./style.css"

const Users = () => {

  // const users=useSelector(selectAllUsers);

  return (
    <div className='list'>
    <Sidebar/>
    <div className='listContainer'>
       <UsersList/>
    </div>
     </div>
  )
}

export default Users