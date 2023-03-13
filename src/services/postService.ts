import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {IPost} from "../models/posts";


export const postApi = createApi({
    reducerPath: 'postAPI',
    baseQuery: fetchBaseQuery({baseUrl: /*'https://jsonplaceholder.typicode.com/'*/'http://localhost:5000/'}),
    tagTypes: ['Post'],
    endpoints: (build) => ({
        fetchAllPosts: build.query<IPost[], number>({
            query: (limit= 5) => ({
                url: '/posts',
                method: 'GET',
                params: {
                    _limit: limit
                }
            }),
            providesTags: ['Post']
        }),
        createPost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/posts`,
                method: 'POST',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        updatePost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'PUT',
                body: post
            }),
            invalidatesTags: ['Post']
        }),
        deletePost: build.mutation<IPost, IPost>({
            query: (post) => ({
                url: `/posts/${post.id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Post']
        })
    })
})