import React, {useState, useEffect} from 'react'

import {Container, Greet, PostCard} from '../Components'
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
    <div className="flex justify-center items-center my-4 flex-col py-8  w-[92%] drop-shadow-lg mx-auto   bg-[#e7e7e7] ">
        <Greet  aboutPage={"Here are all posts for you"}/>
      <Container className=" w-full justify-center flex-wrap">
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