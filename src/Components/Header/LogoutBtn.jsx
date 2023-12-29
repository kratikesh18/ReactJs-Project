import React from 'react'
import { useDispatch} from 'react-redux'
import authServices from '../../appwrite/auth'
import {logout} from '../../Store/authSlice'

function LogoutBtn(
{  ...props}, 
  className=""
) {
    const dispatch = useDispatch()

    const logoutHandler =  ()=>{
        authServices.logout().then(()=>{
            dispatch(logout())
        })
    }
  return (
    <button 
    className="px-6 py-2 hover:bg-black/30 rounded-full"
    onClick={logoutHandler}>Logout</button>
  )
}

export default LogoutBtn