import React, {useState, useEffect} from 'react'
import {useDispatch } from 'react-redux'
import './App.css'
import authServices from './appwrite/auth'
import { login, logout } from './Store/authSlice'
import Header from './Components/Header/Header'
import Footer from './Components/Footer/Footer'
import {Outlet} from "react-router-dom"

function App() {
  // console.log(process.env.REACT_APP_APPWRITE_URL)
  //this is for the create-react-app not for vite created react app for this below syntax is used

  // console.log(import.meta.env.VITE_APPWRITE_URL)


  // we need 2 states 
  const [loading, setLoading] = useState(true)
  const dispatch = useDispatch()

  useEffect(()=>{
    authServices.getCurrentUser()
    .then((userData)=>{
      if(userData){
        dispatch(login({userData}))
      }else{
        dispatch(logout())
      }
    })
    .finally(()=> setLoading(false))
  } , [])


  return !loading?(
    <div>

      <Header/>
        <main>
          <Outlet/>
        </main>
      <Footer/>

    </div>
  ): null

}

export default App
