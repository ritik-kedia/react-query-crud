import React, { useState } from 'react'
import { createPost, deletePost, fetchPosts, updatePost } from '../API/api';
import { keepPreviousData, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { NavLink } from 'react-router-dom';


function FetchRQ() {

    const [PageNumber, setPageNumber] = useState(0);

    const [title, setTitle] = useState('');
    const [body, setBody] = useState('');

    const getPostData = async (PageNumber) => {
        try {
            const response = await fetchPosts(PageNumber);
            console.log(response);
            if (response.status === 200) {
                return response.data;
            } else {
                return [];
            }
        } catch (error) {
            console.log(error);


        }
    }

    const queryClient = useQueryClient();

    const { data, isLoading, isError, error } = useQuery({
        queryKey: ["posts", PageNumber], //useState
        queryFn: () => getPostData(PageNumber),  // useEffect
        // gcTime: 1000
        // staleTime: 10000
        // refetchInterval: 1000,
        // refetchIntervalInBackground: true
        placeholderData: keepPreviousData,
    })

    // mutation function to delete the post

    const deleteMutation = useMutation({
        mutationFn: (id) => deletePost(id),
        onSuccess: (data, id) => {
            // console.log(data, id);
            // alert(`post Delete`)

            queryClient.setQueryData(["posts", PageNumber], (curElem) => {
                return curElem?.filter((post) => post.id !== id)
            })
        }

    })

    // mutation function to update the post

    const updateMutation = useMutation({
        mutationFn: (id) => updatePost(id),
        onSuccess: (apidata, postId) => {

            console.log(apidata, postId);

            queryClient.setQueryData(["posts", PageNumber], (postData) => {
                return postData?.map(
                    (curPost) => {
                        return curPost.id == postId ? { ...curPost, title: apidata.data.title, body: apidata.data.body } : curPost;
                    }
                )
            })
        }

    })

    // mutation function to create the post

    const createMutation = useMutation({
        mutationFn: (newPost) => createPost(newPost),
        onSuccess: (newPostData) => {

            console.log("New post created:", newPostData);

            queryClient.setQueryData(['posts', PageNumber], (oldData) => {
                return [newPostData.data, ...oldData]; 
            })
        }

    })



    const handleSubmit = (e) => {
        e.preventDefault();

        if (!title || !body) {
            alert('Please enter both title and body');
            return;
        }

        createMutation.mutate({ title, body });

        setTitle('');
        setBody('');
    };




    // conditional rendering based on loading, error and posts data

    if (isLoading) return <p className='text-white text-5xl font-semibold m-10'>Loading....</p>
    if (isError) return <p className='text-white text-5xl font-semibold m-10'> Error: {error.message || "Something went wrong!"} </p>


    return (
        <>
            <div className="mt-5 md:p-0 p-4 rounded-lg shadow-md max-w-md mx-auto">
                <h2 className="text-2xl text-white text-center font-bold mb-5">Create a New Post</h2>
                <form className='flex justify-center items-center gap-3' onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="title" className="block text-white">Title</label>
                        <input
                            type="text"
                            id="title"
                            className="mt-1 block w-full p-3  rounded-md"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="body" className="block text-white">Body</label>
                        <textarea
                            id="body"
                            className="mt-1 block w-full rounded-md"
                            value={body}
                            onChange={(e) => setBody(e.target.value)}
                            required
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white mt-3 px-6 py-3 rounded-md hover:bg-blue-600"
                    >
                        {createMutation.isLoading ? 'Creating...' : 'Add'}
                    </button>
                </form>
            </div>

            <div>
                <ul className='text-white grid grid-cols-1 mt-6'>
                    {data?.map(
                        (d, i) => {
                            return (
                                <li key={i} className='border-l-2 bg-slate-900 mx-auto md:w-3/4 my-2 p-2'>
                                    <NavLink to={`/rq/${d.id}`}>
                                        <p className='my-2'>{d.id}.</p>
                                        <p><span className='text-yellow-400 font-bold'>Title</span> :- {d.title}</p>
                                        <p className='my-2'><span className='text-yellow-400 font-bold'>Body</span> :-{d.body}</p>
                                    </NavLink>
                                    <button onClick={() => deleteMutation.mutate(d.id)} className='bg-red-600 px-2 py-1 rounded-md my-1 mx-2'>Delete</button>
                                    <button onClick={() => updateMutation.mutate(d.id)} className='bg-green-600 px-2 py-1 rounded-md my-1 mx-2'>Update</button>
                                </li>
                            )
                        }
                    )}
                </ul>
                <div className=' my-5 flex justify-center items-center gap-5'>
                    <button disabled={PageNumber === 0 ? true : false} onClick={() => { setPageNumber((pre) => pre - 3) }} className='bg-blue-400 hover:bg-blue-600 text-white px-3 py-1 rounded-md'>Prev</button>
                    <h2 className='text-yellow-400'>{(PageNumber / 3) + 1}</h2>
                    <button onClick={() => { setPageNumber((pre) => pre + 3) }} className='bg-blue-400 px-3 py-1 hover:bg-blue-600 text-white rounded-md'>Next</button>
                </div>
            </div >
        </>
    )
}

export default FetchRQ