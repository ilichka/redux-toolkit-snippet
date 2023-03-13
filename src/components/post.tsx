import React, {useEffect, useState} from 'react';
import {postApi} from "../services/postService";
import PostItem from "./postItem";
import {IPost} from "../models/posts";

const Post = () => {
    const [limit, setLimit] = useState(10)
    const {data: posts, error, isLoading} = postApi.useFetchAllPostsQuery(limit)
    const [createPost, {}] = postApi.useCreatePostMutation()
    const [updatePost, {}] = postApi.useUpdatePostMutation()
    const [deletePost, {}] = postApi.useDeletePostMutation()

    useEffect(()=>{
       /* setTimeout(()=>{
            setLimit(3)
        },2000)*/
    },[])

    const handleCreatePost = async () => {
        const title = prompt()
        await createPost({title, body: title} as IPost)
    }

    const handleRemove = async (post: IPost) => {
        await deletePost(post)
    }

    const handleUpdate = async (post: IPost) => {
        await updatePost(post)
    }
    return (
        <div>
            <button onClick={handleCreatePost}>Add post</button>
            {isLoading && <h1>Идёт загрузка...</h1>}
            {error && <h1>eRROR...</h1>}
            {posts && posts.map(post=> <PostItem remove={handleRemove} update={handleUpdate} post={post}/>)}
        </div>
    );
};

export default Post;