import axios from 'axios';
import React, { useEffect, useState } from 'react'


function FetchOld() {

    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    const getPostData = async () => {
        try {
            const response = await axios.get("https://jsonplaceholder.typicode.com/posts");
            console.log(response);
            if (response.status === 200) {
                setPosts(response.data) 
                setIsLoading(false); 
            } else {
                [];
            }
        } catch (error) {
            console.log(error);
            setIsError(true); 
            setIsLoading(false);  

        }
    }

    useEffect(
        () => {
            getPostData();
        }, []
    )

    // conditional rendering based on loading, error and posts data

    if (isLoading) return <p className='text-white text-5xl font-semibold m-10'>Loading....</p>
    if (isError) return <p className='text-white text-5xl font-semibold m-10'>Something went wrong</p>

    return (
        <>
            <div>
                <ul className='text-white my-3'>
                    {posts?.map(
                        (d, i) => {
                            return (
                                <li key={i} className='border-l-2 my-3 bg-slate-900 w-3/4 mx-auto p-3'>
                                    <p className='my-2'>{d.id}.</p>
                                    <p><span className='text-yellow-400 font-bold'>Title</span> :- {d.title}</p>
                                    <p className='my-2'><span className='text-yellow-400 font-bold'>Body</span> :-{d.body}</p>
                                </li>
                            )
                        }
                    )}
                </ul>
            </div>
        </>
    )
}

export default FetchOld