import React, {  useEffect, useState } from "react";
import dbService from "../appwrite/config";
import { Container, Greet, PostCard } from "../Components";
import {useSelector} from 'react-redux'

function Home() {
  const [posts, setPosts] = useState([]);
  const userData = useSelector((state) => state.auth.userData);
  
  useEffect(() => {
    dbService.getPosts().then((posts) => {
      if (posts) {
        setPosts(posts.documents);
      }
    });
  }, []);

  if (posts.length === 0) {
    return (
      <div>
        <Container  className="bg-[#e7e7e7]">
          <div className="h-[20rem] w-full  flex flex-col gap-[2rem] justify-center items-center">
              <h1 className="text-2xl font-bold ">Seems like you are not Logged in.! </h1>
              <p className="font-semibold">Login to read all articles</p>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div className="flex justify-center items-center my-4 flex-col py-8  w-[92%] drop-shadow-lg mx-auto   bg-[#e7e7e7] ">
        <Greet  aboutPage={"Here is some fresh updates for you"}/>
      <Container className=" w-full justify-center flex-wrap     ">
        {posts.map((post) => (
          <div key={post.$id}
          className=""
          >
            <PostCard {...post} />
          </div>
        ))}
      </Container>
    </div>
  );
}

export default Home;
