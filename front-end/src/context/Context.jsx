import { createContext } from "react";

export const StoreContext = createContext(null)

const ContextProvider = ({ children }) => {

    const apiURL = 'http://localhost:3000'

    const StoreData = {
        apiURL,
    }

    return (
        <StoreContext.Provider value={StoreData}>
            {children}
        </StoreContext.Provider>
    )

}

export default ContextProvider