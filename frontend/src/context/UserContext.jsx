import {createContext, useState} from "react"

export const userContext = createContext(null)

const UserContextProvider = ({children}) => {

    const url = `https://cerbookingonline.onrender.com`

    const [user, setuser] = useState(null)
    const [distance, setdistance] = useState("")
    const [time, settime] = useState("")
    const [fare, setfare] = useState({})
    const [showVehicle, setshowVehicle] = useState(false)
    const [vehicle, setvehicle] = useState("")
    const [confirm, setconfirm] = useState(false)
    const [findcaptian, setfindCaptian] = useState(false)
    const [ride, setride] = useState({})
    const [accept, setaccept] = useState(false)
    const [rideCaptain, setrideCaptain] = useState(null)
    const [showStart, setshowStart] = useState(false)
    const [picup, setpicup] = useState(true)
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

    const [fromData, setfromData] = useState({
        pic : "",
        dist : ""
    })

    const [picLocation, setpicLocation] = useState({})
    const [distLocation, setdistLocation] = useState({})

    const selecetVehicle = (vehicle) =>{
        setvehicle(vehicle)
        setshowVehicle(false)
        setconfirm(true)
    }

    const [login, setlogin] = useState(false)
    const [sign, setsign] = useState(false)
    const [upload, setupload] = useState(false)

    return (
        <userContext.Provider value={{url, distance, setdistance, time, settime, fare, setfare, showVehicle, setshowVehicle, selecetVehicle, confirm, setconfirm, vehicle, setvehicle, fromData, setfromData, findcaptian, setfindCaptian, ride, setride, user, setuser, picLocation, setpicLocation, distLocation, setdistLocation, accept, setaccept, rideCaptain, setrideCaptain, showStart, setshowStart, picup, setpicup, viewportWidth, setViewportWidth, login, setlogin, sign, setsign, upload, setupload}}>
            {children}
        </userContext.Provider>
    )
}


export default UserContextProvider
