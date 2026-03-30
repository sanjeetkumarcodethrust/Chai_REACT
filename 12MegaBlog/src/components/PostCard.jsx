import React from 'react'
import appwriteService from "../appwrite/config"
import {Link} from 'react-router-dom'

function PostCard({$id, title, featuredImage}) {
  return (
    <Link to={`/post/${$id}`}>
        <div className='w-full bg-gray-100 rounded-xl p-4'>
            <div className='flex justify-center mb-4'>
                {featuredImage ? (
                    <img 
                        src={appwriteService.getFilePreview(featuredImage)} 
                        alt={title}
                        className='rounded-xl w-full h-48 object-cover'
                        onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                        }}
                    />
                ) : (
                    <div className='w-full h-48 bg-gray-300 rounded-xl flex items-center justify-center'>
                        <span className='text-gray-500 text-lg'>No Image</span>
                    </div>
                )}
            </div>
            <h2 className='text-xl font-bold'>{title}</h2>
        </div>
    </Link>
  )
}


export default PostCard