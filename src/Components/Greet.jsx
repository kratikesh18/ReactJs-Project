import React from 'react'

function Greet({
    userName
}) {
  return (
    <div className=' text-center'>
        <h1 className='text-lg font-medium'>Welcome <span className='font-bold underline'>{userName}</span> ...!</h1>
        <p className="font-normal text-lg">Here is the fresh feed for you ...</p>
    </div>
  )
}

export default Greet