import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'

function Header() {

    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };


    return (
        <>
            <header className='shadow-2xl bg-slate-950'>
                <div className='flex justify-between items-center p-5 ml-5 font-bold text-xl text-white'>
                    <NavLink to={"/"}>React Query App</NavLink>

                    {/* Mobile Menu */}
                    <button
                        className="text-white md:hidden block"
                        onClick={toggleMenu}
                    >

                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
                        </svg>
                    </button>

                    {/* Menu for larger screens */}
                    <ul className='hidden md:flex justify-between items-center gap-6 me-5'>
                        <li className='hover:text-purple-600'>
                            <NavLink to={"/"}>Home</NavLink>
                        </li>
                        <li className='hover:text-purple-600'>
                            <NavLink to={"/trad"}>FetchOld</NavLink>
                        </li>
                        <li className='hover:text-purple-600'>
                            <NavLink to={"/rq"}>FetchRQ</NavLink>
                        </li>
                    </ul>
                </div>

                {/* Mobile Menu -Toggle */}
                {isOpen && (
                    <div className='md:hidden'>
                        <ul className='flex flex-col items-start gap-4 p-4 text-white bg-slate-900'>
                            <li className='hover:text-purple-600'>
                                <NavLink to={"/"} onClick={toggleMenu}>Home</NavLink>
                            </li>
                            <li className='hover:text-purple-600'>
                                <NavLink to={"/trad"} onClick={toggleMenu}>FetchOld</NavLink>
                            </li>
                            <li className='hover:text-purple-600'>
                                <NavLink to={"/rq"} onClick={toggleMenu}>FetchRQ</NavLink>
                            </li>
                        </ul>
                    </div>
                )}
            </header>
        </>
    )
}

export default Header