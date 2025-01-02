import React from 'react'
import { Link } from 'react-router-dom'

function Header({caplogout, data, hendelImage}) {
    return (
        <header className="bg-white shadow w-full">
            <div className="container mx-auto flex justify-between items-center p-4">
                <h1 className="text-2xl font-bold text-indigo-600">RideX</h1>
                <div className="flex items-center gap-4"> <span className="h-8 w-8 rounded-full overflow-hidden" onClick={hendelImage}>
              <img
                src={data?.ProfileImage || data?.profileImage || "/user.png"}
                alt=""
                className="h-full rounded-full border object-cover object-center"
              />
            </span><span className="text-xl font-semibold">{data?.fullname}</span><span className="h-8" onClick={caplogout}><img src="/log-out.png" alt="" className="h-full"/></span></div>
            </div>
        </header>
    )
}

export default Header
