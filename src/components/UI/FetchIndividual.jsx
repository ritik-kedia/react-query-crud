import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { fetchIndividualPost } from '../../API/api'
import { NavLink, useParams } from 'react-router-dom'

function FetchIndividual() {

    const { id } = useParams();

    const { data, isPending, isError, error } = useQuery({
        queryKey: ["/post", id], //useState
        queryFn: () => fetchIndividualPost(id), //useEffect
    })

    // conditional rendering based on loading, error and posts data

    if (isPending) return <p className='text-white text-5xl font-semibold m-10'>Loading....</p>
    if (isError) return <p className='text-white text-5xl font-semibold m-10'> Error: {error.message || "Something went wrong!"} </p>

    return (
        <>
            <div>
                <ul className='text-white my-10'>
                    <li key={data.id} className='border-l-2 bg-slate-950 w-1/2 mx-auto p-3 m-2'>
                        <p className='text-center text-yellow-600 font-bold'>Post Id Number-{data.id}</p>
                        <p className='my-2'>Id : {data.id}</p>
                        <p><span className='text-yellow-400 font-bold'>Title</span> :- {data.title}</p>
                        <p className='my-2'><span className='text-yellow-400 font-bold'>Body</span> :-{data.body}</p>
                        <NavLink to={"/rq"}>
                            <div className='bg-green-700 p-[0.4rem] w-[90px] mx-auto text-center rounded-md'>
                                <button>Go Back</button>
                            </div>
                        </NavLink>
                    </li>
                </ul>
            </div>
        </>
    )
}

export default FetchIndividual