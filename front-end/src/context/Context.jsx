import { createContext, useCallback, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null)

const ContextProvider = ({ children }) => {

    const [userdata, setuserdata] = useState(null)
    const [trackuserdata, settrackuserdata] = useState(false)
    const apiURL = 'http://localhost:3000'

    const FetchUserData = useCallback(async () => {
        try {
            const response = await axios.get(`${apiURL}/api/user/getdata`, {
                withCredentials: true
            })
            setuserdata(response.data)
        } catch (error) {
            setuserdata(null)
        }
    }, [])

    useEffect(() => {
        FetchUserData()
    }, [trackuserdata])

    const [Place_Orders, setPlace_Orders] = useState(null)

    const StoreData = {
        apiURL,
        trackuserdata,
        settrackuserdata,
        userdata,
        Place_Orders,
        setPlace_Orders
    }

    return (
        <StoreContext.Provider value={StoreData}>
            {children}
        </StoreContext.Provider>
    )

}

export default ContextProvider