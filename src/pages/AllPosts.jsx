import React, {useState, useEffect} from 'react'

import {Container, PostCard} from '../Components'
import dbService from '../appwrite/config'



function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(()=>{

    }, [])

    dbService.getPosts([]).then((posts) =>{
        if(posts ){
            setPosts(posts.documents)
        }
    })

  return (
    <div className='flex justify-center'>
        <Container className=' flex justify-center w-[90%] bg-black/10'>
            {
                posts.map((post)=>(
                    <div
                    className='flex '  
                    key={post.$id}>
                        <PostCard {...post}/>
                    </div>
                ))
            }
        </Container>
    </div>
  )
}

export default AllPosts