import React from 'react'

function Home() {
    return (
        <>
            <div className='grid md:grid-cols-2 grid-cols-1 md:m-20'>
                <h1 className='text-center font-bold text-yellow-500 md:mt-32 mt-20 text-3xl md:text-4xl'>
                    Welcome To  React_Query
                </h1>
                <div className=' pt-10 md:pr-6'>
                    <img src="/home.png" alt="" />
                </div>
            </div>
        </>
    )
}

export default Home