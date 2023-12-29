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

    const userData = useSelector((state) => state.auth.useData);

    const isAuthor = post && userData ? post.userId == userData.$id : true;

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
            <Container className="flex justify-center items-center ">
                <div className="flex flex-col justify-center items-center w-[85%] overflow-hidden  ">
                    <img
                        className="h-[25rem] w-[50rem] object-contain "
                        src={dbService.getFilePreview(post.featuredimg)}
                        alt={post.title}
                    />

                    {isAuthor && (
                        <div className="flex gap-4 mt-4">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button>Edit</Button>
                            </Link>
                            <Button onClick={deletePost}>Delete</Button>
                        </div>
                    )}
                    <div>
                        <h1>{post.title}</h1>
                    </div>
                    <div> {parse(post.content)} </div>
                </div>
            </Container>
        </div>
    ) : null;
}
