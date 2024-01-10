import React from 'react'
import dbService from '../appwrite/config'
import {Link} from 'react-router-dom'


function PostCard({
    $id,
    title, 
    featuredimg,
    subPara
}) {
  return (

    <Link to={`/post/${$id}`} >
        <div className='h-[20rem] w-[24rem] md:w-[20rem] p-4 flex flex-col justify-between rounded-md bg-gray-300  border border-black'>
          
            <div className='overflow-hidden w-[100%] h-[65%] shadow-sm shadow-black rounded-md'>

                <img src= {dbService.getFilePreview(featuredimg)} 
                className='w-full h-full '
                alt={title}
                loading='lazy'
                />

            </div>  
            <div className='text-center'>
            <h2 className="text-xl font-bold">{title}</h2>
            <p className="">{subPara}</p>
            </div>
        </div>
    </Link>
  )
}

export default PostCard