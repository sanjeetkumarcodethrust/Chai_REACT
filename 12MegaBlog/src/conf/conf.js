const conf={
    appwriteUrl:String(import.meta.env.VITE__APPWRITE_URL),
    appwriteProjectId:String(import.meta.env.VITE__PROJECT_ID),
    appwriteDatabaseId:String(import.meta.env.VITE__DATABASE_ID),
    appwriteCollectionId:String(import.meta.env.VITE__COLLECTION_ID),
    appwriteBuckedId:String(import.meta.env.VITE__BUCKED_ID)
}




export default conf