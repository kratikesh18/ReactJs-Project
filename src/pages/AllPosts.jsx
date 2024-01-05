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
    <div className="flex justify-center items-center my-4  ">
    <Container className="w-[92%] justify-center bg-[#e7e7e7] flex-wrap py-8  drop-shadow-lg   ">
      {posts.map((post) => (
        <div key={post.$id}
        className=""
        >
          <PostCard {...post} />
        </div>
      ))}
    </Container>
  </div>
  )
}

export default AllPosts