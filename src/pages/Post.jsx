import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import dbService from "../appwrite/config";
import { Button, Container } from "../Components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId == userData.$id :false;
    const userName = userData.name;
    const isAdmin = post && userData ? userName === "Kartikesh":false;

    useEffect(() => {
        if (slug) {
            dbService.getPost(slug).then((post) => {
                if (post) setPost(post);
                else navigate("/");
            });
        } else {
            navigate("/");
        }
    }, [slug, navigate]);

    const deletePost = () => {
        dbService.deletePost(post.$id).then((status) => {
            if (status) {
                dbService.deleteFile(post.featuredimg);
                navigate("/");
            }
        });
    };

    
    return post ? (
        <div>
            <Container className="flex justify-center items-center  ">
                <div className="flex flex-col justify-center items-center w-[85%] overflow-hidden  gap-4  ">
                    <div className="rounded-md shadow-2xl overflow-hidden">
                    <img
                        className="h-[15rem] w-full  shadow-black/60"

                        src={dbService.getFilePreview(post.featuredimg)}

                        alt={post.title}
                        />
                    </div>
                    

                    <div className="w-[90%]">
                        
                        <div>
                            <h1 className="text-xl font-bold ">{post.title}</h1>
                            <p className="px-1 font-semibold text-gray-600">By, <span className="italic font-bold">{post.author}</span></p>
                            <p className="px-1 font-semibold text-gray-600">at, <span className="italic font-bold">{post.CreatedDate}</span></p>
                        </div>

                        <div className=" browser-css block"> 
                            {parse(post.content)} 
                        </div>
                        
                    </div>            

                    {(isAuthor || isAdmin )&&  (
                        <div className="flex flex-col gap-[0.2rem]"> 
                            <h4>Hey {userData.name} do you want   </h4> 
                        <div className="flex gap-4 ">

                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="bg-purple-800 px-5 rounded-md">Edit</Button>
                            </Link>

                            <Button className="rounded-md bg-red-800"  onClick={deletePost}>Delete</Button>
                        </div>
                    </div>
                    )}
                    <div className=" text-sm font-extralight">CurrentUser is : {userName}</div>
                </div>
            </Container>
               {/* <div className=" browser-css  "> 
               {parse(post.content)} 
           </div> */}
        </div>
    ) : null;
}
