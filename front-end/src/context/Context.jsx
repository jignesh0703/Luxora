import { createContext, useCallback, useEffect, useState } from "react";
import axios from 'axios'

export const StoreContext = createContext(null)

const ContextProvider = ({ children }) => {

    const [userdata, setuserdata] = useState(null)
    const [trackuserdata, settrackuserdata] = useState(false)
    const apiURL = ' http://localhost:3000'

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

    const StoreData = {
        apiURL,
        trackuserdata,
        settrackuserdata,
        userdata,
    }

    return (
        <StoreContext.Provider value={StoreData}>
            {children}
        </StoreContext.Provider>
    )

}

export default ContextProvider