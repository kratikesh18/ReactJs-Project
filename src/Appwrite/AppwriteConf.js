import { Client, Databases, ID, Storage, Query } from "appwrite";
import conf from "../Confs/conf";

const client = new Client()
  .setEndpoint(conf.appwriteUrl) // Your API Endpoint
  .setProject(conf.appwriteProjectId); // Your project ID

const databases = new Databases(client);
const bucket = new Storage(client);

const createPost = async ({
  title,
  subpara,
  slug,
  content,
  featuredImg,
  status,
  userId,
  author,
}) => {
  try {
    return await databases.createDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      slug,
      { title, author, subpara, content, featuredImg, userId, status }
    );
  } catch (error) {
    console.log("Error while creating post ", error.message);
  }
};

const updatePost = async ({
  slug,
  title,
  content,
  featuredImg,
  status,
  subpara,
}) => {
  try {
    return await databases.updateDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      slug,
      { title, subpara, content, featuredImg, status }
    );
  } catch (error) {
    console.log("Error while updating the post ", error.message);
  }
};

const getPost = async (slug) => {
  try {
    return await databases.getDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      slug
    );
  } catch (error) {
    console.log("Error while getting the post", error.message);
    return false;
  }
};

const deletePost = async (slug) => {
  try {
    return await databases.deleteDocument(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      slug
    );
  } catch (error) {
    console.log("Error occured while deleting the post ", error);
    return false;
  }
};
const getAllPosts = async (queries = [Query.equal("status", "active")]) => {
  try {
    return await databases.listDocuments(
      conf.appwriteDatabaseId,
      conf.appwriteCollectionId,
      queries
    );
  } catch (error) {
    console.log("Error while getting all posts ", error.message);
    return false;
  }
};
const uploadFile = async (file) => {
  try {
    return await bucket.createFile(conf.appwriteBucketId, ID.unique(), file);
  } catch (error) {
    console.log("Error while uploading the file ", error.message);
    return false;
  }
};

const getFilePreview =  (fileId) => {
  return  bucket.getFilePreview(conf.appwriteBucketId, fileId);
};

const deleteFile = async (fileId) => {
  try {
    return await bucket.deleteFile(conf.appwriteBucketId, fileId);
  } catch (error) {
    console.log("Error while Deleting the File ", error.message);
  }
};

export {
  createPost,
  updatePost,
  getPost,
  deletePost,
  getAllPosts,
  uploadFile,
  getFilePreview,
  deleteFile,
};
