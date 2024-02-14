import React, { useState, useEffect } from "react";
import { getAllPosts } from "../Appwrite/AppwriteConf";
import { Loader, PostCard } from "../Components";
import { useSelector } from "react-redux";
function AllPost() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const authStatus = useSelector((state) => state.AuthSlice.status);
  useEffect(() => {
    setLoading(true);
    getAllPosts().then((postData) => setPosts(postData.documents));
    setLoading(false);
  }, []);

  // const post = {
  //   title: "Test1",
  //   status: "active",
  //   featuredimg: "658f200a95c5f98fbce7",
  //   userId: "658c6d9f49656c1282fc",
  //   author: "admin",
  //   subPara: "subpara test1",
  //   content: "this si content for the test1",
  //   CreatedDate: null,
  //   $id: "test1",
  //   $createdAt: "2023-12-29T19:37:47.706+00:00",
  //   $updatedAt: "2024-01-11T12:19:33.791+00:00",
  //   $permissions: [
  //     'read("user:658c6d9f49656c1282fc")',
  //     'update("user:658c6d9f49656c1282fc")',
  //     'delete("user:658c6d9f49656c1282fc")',
  //   ],
  //   $databaseId: "65833dc533024d76d80f",
  //   $collectionId: "65833fc66c50cc0e0b56",
  // };

  if (!authStatus) {
    return <div>Login First</div>;
  }

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col items-center justify-center mt-14 gap-3 ">
      {posts?.map((post) => (
        <PostCard post={post} key={post.$createdAt} />
      ))}
    </div>
  );
}

export default AllPost;
