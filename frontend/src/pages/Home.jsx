import React from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

function Home() {
    return (
        <div className="min-h-screen flex flex-col">
            {/* Navbar */}
            
            <Header/>

            {/* Hero Section */}
            <main
                className="flex-grow flex items-center justify-center bg-cover bg-center bg-no-repeat text-white"
                style={{
                    backgroundImage: `url('/home1.png')`, // Replace with your image URL
                }}
            >
                <div className="bg-opacity-50 p-6 rounded-lg text-center mx-4 sm:mx-8 md:mx-auto md:max-w-2xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6 text-gray-600">
                        Welcome to <span className="text-yellow-900">RideX</span>
                    </h2>
                    <p className="text-lg md:text-xl mb-8 text-black">
                        Your trusted partner for quick and safe rides. Whether you're a rider or a captain, start your journey with us today.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                        <Link
                            to={'/login-user'}
                            className="px-6 py-3 bg-yellow-400 text-gray-800 font-medium rounded-lg hover:bg-yellow-500 transition"
                        >
                            Book a Ride
                        </Link>
                        <Link
                            to={"/login-captain"}
                            className="px-6 py-3 bg-white text-indigo-600 font-medium rounded-lg hover:bg-gray-100 transition"
                        >
                            Join as Captain
                        </Link>
                    </div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-gray-800 text-gray-300 py-4">
                <div className="container mx-auto text-center">
                    <p>© 2024 RideX. All rights reserved.</p>
                </div>
            </footer>
        </div>
    )
}

export default Home
