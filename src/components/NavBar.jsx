import Link from 'next/link'
import React from 'react'

const NavBar = () => {
    return (

        <header className="text-gray-600 body-font bg-gray-900">
            <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
                <Link href={'/'} className="flex title-font font-medium items-center text-white mb-4 md:mb-0">
                    <span className="ml-3 text-xl">XchangeN</span>
                </Link>
                <nav className="md:ml-auto md:mr-auto flex flex-wrap items-right text-base text-white justify-center">
                    <Link href='/' className="mr-5 hover:text-gray-900">Home</Link>
                    <Link href='/login' className="mr-5 hover:text-gray-900">Login</Link>
                    <Link href='/signup' className="mr-5 hover:text-gray-900">SignUp</Link>
                    <Link href='/contact' className="mr-5 hover:text-gray-900">Contact</Link>
                    <Link href='/profile' className="mr-5 hover:text-gray-900">Profile</Link>
                    <Link href='/exchange' className="mr-5 hover:text-gray-900">Exchange</Link>
                    <Link href='/aboutus' className="mr-5 hover:text-gray-900">About Us</Link>
                    <Link href='/messages' className="mr-5 hover:text-gray-900">Messages</Link>
                </nav>

            </div>
        </header>


    )
}

export default NavBar