import { useInfiniteQuery } from '@tanstack/react-query'
import React, { useEffect } from 'react'
import { fetchUsers } from '../API/api'

function InfiniteScroll() {

    const { data, hasNextPage, fetchNextPage, status, isFetchingNextPage } = useInfiniteQuery({
        queryKey: ['users'],
        queryFn: fetchUsers,
        getNextPageParam: (lastPage, allPages) => {
            console.log("Lastpage", lastPage, allPages);

            if (lastPage && lastPage.length === 10) {
                return allPages.length + 1;
            } else {
                return undefined;
            }
        },

    })
    console.log(data);

    const handleScroll = () => {
        const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1;
        if (bottom && hasNextPage) {
            fetchNextPage();
        }
    }

    useEffect(
        () => {
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
        }, [hasNextPage]
    );

    if (status === "loading") return <div>Loading....</div>;
    if (status === "error") return <div>Error fetching data</div>;

    return (
        <>
            <div>
                <div className='md:text-4xl text-3xl text-center text-white my-10'>
                    <h1>Infinite Scroll with React Query V5</h1>
                </div>

                {
                    data?.pages?.map((pages, index) => {
                        return (<ul className='bg-slate-800' key={index}>
                            {pages.map((user) => {
                                return (<li className='border p-2 text-white flex justify-start items-center gap-5' key={user.id}>
                                    <img src={user.avatar_url} alt={user.login} width={70} height={60} />
                                    <div className='text-xl'>{user.login}</div>
                                </li>)
                            })}
                        </ul>)
                    })
                }
                {isFetchingNextPage && <div>Loading More...</div>}

            </div>
        </>
    )
}

export default InfiniteScroll