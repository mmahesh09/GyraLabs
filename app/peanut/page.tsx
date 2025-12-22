import React from 'react'
import Home from './home'
import Navbar from '@/components/Navbar'

const Page = () => {
    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />
            <Home />
        </div>
    )
}

export default Page