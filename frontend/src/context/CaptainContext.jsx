import { createContext, useContext, useState} from "react"

export const captainContext = createContext(null)

const CaptainContextProvider = ({children}) => {

    const url = `https://cerbookingonline.onrender.com`

    const [captain, setcaptain] = useState(null)
    const [showRequest, setshowRequest] = useState(false)
    const [ride, setride] = useState(null)
    const [showOtppage, setshowOtppage] = useState(false)
    const [complet, setcomplet] = useState(false)
    const [viewportWidth, setViewportWidth] = useState(window.innerWidth)
    const [showCaptain, setshowCaptain] = useState(true)
    const [rideUser, setrideUser] = useState(null)
    const [picLocation, setpicLocation] = useState({})
    const [distLocation, setdistLocation] = useState({})
    const [anotherRide, setanotherRide] = useState(null)
    const [anotherRideUser, setanotherRideUser] = useState(null)
    const [capLogin, setcaplogin] = useState(false)
    const [capsing, setcapsing] = useState(false)
    const [upload, setupload] = useState(false)

    

    return (
        <captainContext.Provider value={{url, captain, setcaptain, showRequest, setshowRequest, ride, setride, showOtppage, setshowOtppage, complet, setcomplet, showCaptain, setshowCaptain, viewportWidth, setViewportWidth, rideUser, setrideUser, distLocation, setdistLocation, picLocation, setpicLocation, anotherRide, setanotherRide, anotherRideUser, setanotherRideUser, capLogin, setcaplogin, capsing, setcapsing, upload, setupload}}>
            {children}
        </captainContext.Provider>
    )
}

export default CaptainContextProvider
