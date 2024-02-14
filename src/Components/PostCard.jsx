import React from "react";
import { getFilePreview } from "../Appwrite/AppwriteConf.js";
import { Link } from "react-router-dom";

function PostCard({ post }) {
  const dateRegex = /(\d{4}-\d{2}-\d{2})/;

  return (
    <Link
      to={`/post/${post.$id}`}
      className="h-[50vh] w-[90%] md:h-[15rem] md:w-[79%] md:flex  bg-slate-400/20 rounded-md "
    >
      <div className="h-[70%] w-[99%] md:h-full md:w-2/3 mx-auto  ">
        <img
          className="p-4 rounded-md object-fill h-full w-full md:object-cover"
          src={getFilePreview(post.featuredimg)}
          loading="lazy"
        />
      </div>

      <div className="md:w-1/2 flex flex-col py-5 md:gap-3">
        <div className="flex justify-between px-3">
          <h3 className="truncate text-lg font-bold">{post.title}</h3>
          <span className="md:hidden">
            {post.$createdAt.match(dateRegex)[0]}
          </span>
        </div>

        <div className="px-3">
          <p className="text-sm font-semibold tracking-wide truncate ">
            {post.subPara}
          </p>
          <span className="italic">by {post.author}</span>
        </div>
        <div className="hidden md:block">
          <span className="font-light px-3 ">{post.$createdAt.match(dateRegex)[0]}</span>
        </div>
      </div>
    </Link>
  );
}

export default PostCard;
