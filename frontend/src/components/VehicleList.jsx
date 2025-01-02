import React, { useContext } from 'react'
import { userContext } from '../context/UserContext'

function VehicleList(props) {
  const {selecetVehicle} = useContext(userContext)
  return (
    <div className='w-full flex justify-between border bg-white border-gray-300 px-2 sm:px-4 2xl:px-8 py-2 sm:py-4 rounded-lg mt-3 sm:mt-5 items-center cursor-pointer hover:shadow-lg transition duration-200 shadow-lg' onClick={()=> selecetVehicle(props.vehicle)}>
       <div className='h-16'>
        <img src={props.image} className='h-full object-cover object-center' alt="image" />
       </div>
       <div className=''>
        <div className='text-lg font-semibold'>{props.dist}</div>
        <div className='text-sm'>{props.time}</div>
       </div>
       <div>
        <span className='text-lg font-semibold mr-3'>₹ {Math.floor(props.fare)}</span>
       </div>
    </div>
  )
}

export default VehicleList
