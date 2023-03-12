import React, {useEffect, useState} from 'react';
import {postApi} from "../services/postService";
import PostItem from "./postItem";

const Post = () => {
    const [limit, setLimit] = useState(10)
    const {data: posts, error, isLoading} = postApi.useFetchAllPostsQuery(limit)

    useEffect(()=>{
        setTimeout(()=>{
            setLimit(3)
        },2000)
    },[])
    return (
        <div>
            {isLoading && <h1>Идёт загрузка...</h1>}
            {error && <h1>eRROR...</h1>}
            {posts && posts.map(post=> <PostItem post={post}/>)}
        </div>
    );
};

export default Post;