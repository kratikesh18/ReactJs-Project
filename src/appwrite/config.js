import { Client, Databases, ID, Storage, Query } from "appwrite";
import {useSelector} from 'react-redux'
import conf from "../Confo/conf";



export class DBservice{
    // this is having client and its database with bucket
    client = new Client();
    databases;
    bucket;


    //creating the constructor 
    constructor(){
        this.client
        .setEndpoint(conf.appwriteUrl)
        .setProject(conf.appwriteProjectId)
        // now creating its database 
        this.databases = new Databases(this.client)
        // creating the bucket 
        this.bucket = new Storage(this.client)

    }

    //and its some database operations 
    async createPost({title , slug , content , featuredimg , status , userId ,author} ){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,  
                    content,
                    featuredimg, 
                    status,
                    userId,
                    author
                }
            )            
        } catch (error) {
            console.log("Error Occured while Creating the post" , error)
        }
    }
    
    async updatePost(slug, {title, content, featuredimg,status}) {
        try{
            return await  this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredimg,
                    status
                }
            )
        }   
        catch(error){
                console.log("Error Occured while updating document " , error )
        }     
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
                
            )
        } catch (error) {
            console.log("Error Occured while fetching post ", error);
            return false
        }
    }

    async deletePost(slug){
        try {
            return await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log("Error Occured while deleting post ", error);      
            return false
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]){
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log("Error Occured while Fetching all posts " ,error)
            return false;
        }
    }

    async uploadFile(file){
        try {
            return await this.bucket.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log("Error Occured while Uploading the document " , error);
            return false
        }
    }

    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }

    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {
            console.log("Error Occured while Deleting the document " , error);    
            return false;
        }
    }

}



// creating the instance and exporting it defaultly 
const dbService = new DBservice();
export default dbService;   