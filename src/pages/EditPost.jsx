import React, {useEffect ,useState} from 'react'
import {Container, PostForm} from '../Components'
import dbService from '../appwrite/config'
import {useParams,useNavigate } from 'react-router-dom'

function EditPost() {
    const [post, setPosts] = useState(null)
    const {slug} = useParams()
    const navigate = useNavigate();

    useEffect(()=>{
        if(slug){
            dbService.getPost(slug).then((post)=>{
                if(post) { 
                    setPosts(post)
                }
            })
        }else{
            navigate('/')
        }
    } , [slug, navigate] )

    return post?(
        <div>
            <Container>
                <PostForm post={post}/>
            </Container>
        </div>
    ):null
}

export default EditPost