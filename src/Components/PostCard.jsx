import React from 'react'
import dbService from '../appwrite/config'
import {Link} from 'react-router-dom'


function PostCard({
    $id,
    title, 
    featuredimg
}) {
  return (

    <Link to={`/post/${$id}`}>
        <div className='flex flex-col justify-around items-center py-2 bg-gray-400/40 text-black/90 h-[15rem] w-[15rem]   border-black border shadow-lg rounded-md'>
          
            <div className='flex justify-center h-40 overflow-hidden w-full '>
                <img src= {dbService.getFilePreview(featuredimg)} 
                className='rounded-md w-[90%] object-center'
                alt={title}
                loading='lazy'/>
            </div>

            <h2 className="text-xl font-bold ">{title}</h2>
            <p className='text-center'>Lorem, ipsum dolor sit amet consectetur </p>
        </div>
    </Link>
  )
}

export default PostCard