const conf = {
    // rewrite all the .eve values here but the imported format 
    appwriteUrl : String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId : String(import.meta.env.VITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_DATABASE_ID),
    appwriteCollectionId: String(import.meta.env.VITE_COLLECTION_ID),
    appwriteBucketId: String(import.meta.env.VITE_BUCKET_ID),
    tinyMCEapiKey : String(import.meta.env.VITE_TINYMCE_API_KEY)
}

export default conf;