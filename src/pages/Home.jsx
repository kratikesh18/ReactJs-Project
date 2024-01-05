import React, {  useEffect, useState } from "react";
import dbService from "../appwrite/config";
import { Container, PostCard } from "../Components";

function Home() {
  const [posts, setPosts] = useState([]);

  
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
  );
}

export default Home;
