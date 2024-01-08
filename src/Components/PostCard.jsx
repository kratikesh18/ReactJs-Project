import React from 'react'
import dbService from '../appwrite/config'
import {Link} from 'react-router-dom'


function PostCard({
    $id,
    title, 
    featuredimg
}) {
  return (

    <Link to={`/post/${$id}`} className='flex justify-center'>
        <div className='flex w-[80%] flex-col  md:justify-around items-center py-2 bg-gray-400/40 text-black/90 h-[15rem] md:w-[15rem]   border-black border shadow-lg rounded-md'>
          
            <div className='flex justify-center  overflow-hidden w-full '>
                <img src= {dbService.getFilePreview(featuredimg)} 
                className='rounded-md w-[90%] object-center aspect-auto'
                alt={title}
                loading='lazy'
                />
            </div>  

            <h2 className="text-xl font-bold ">{title}</h2>
            <p className='text-center'>Lorem, ipsum dolor sit amet consectetur </p>
        </div>
    </Link>
  )
}

export default PostCard