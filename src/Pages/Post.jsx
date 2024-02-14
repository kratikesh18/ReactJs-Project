import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getFilePreview, getPost } from "../Appwrite/AppwriteConf";
import parse from "html-react-parser";

function Post() {
  const [postData, setPostData] = useState(null);
  const { slug } = useParams();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getPost(slug).then((post) => setPostData(post));
    setLoading(false);
  }, [slug]);

  //   const post = {
  //     title: "Test 2",
  //     status: "active",
  //     featuredimg: "658f20562d4964cc06c1",
  //     userId: "658c6d9f49656c1282fc",
  //     author: "admin",
  //     subPara: "subpara test2",
  //     content: "this is the content for the test 2 ",
  //     CreatedDate: null,
  //     $id: "test-2",
  //     $createdAt: "2023-12-29T19:39:03.287+00:00",
  //     $updatedAt: "2024-01-11T12:20:16.916+00:00",
  //     $permissions: [
  //       'read("user:658c6d9f49656c1282fc")',
  //       'update("user:658c6d9f49656c1282fc")',
  //       'delete("user:658c6d9f49656c1282fc")',
  //     ],
  //     $databaseId: "65833dc533024d76d80f",
  //     $collectionId: "65833fc66c50cc0e0b56",
  //   };
  const dateRegex = /(\d{4}-\d{2}-\d{2})/;

  if (loading) {
    return <div>Loading</div>;
  }
  return (
    postData && (
      <div className="w-[90%] mx-auto mt-10">
        <div>
          <img
            className="rounded-md shadow-md w-full h-full"
            src={getFilePreview(postData?.featuredimg)}
            alt=""
          />

          <div className="flex justify-between p-3">
            <h2 className="text-xl font-semibold    ">{postData?.title}</h2>
            <span>{postData?.$createdAt.match(dateRegex)[0]}</span>
          </div>
          <span>by {postData?.author}</span>
          <div>{parse(postData?.content)}</div>
        </div>
      </div>
    )
  );
}

export default Post;
