import React from 'react'
import {useSelector} from 'react-redux'
function Greet({
    aboutPage
}) {

  
  const userData = useSelector((state) => state.auth.userData)

    return (
      <div className=' text-center'>
          <h1 className='text-lg font-medium'>Welcome <span className='font-bold underline'>{userData.name}</span> ...!</h1>
          <p className="font-normal text-lg">{aboutPage}</p>
      </div>
    )
  }

export default Greet