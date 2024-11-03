import React, { createContext, useCallback, useContext, useEffect, useReducer, useState } from 'react'
import { getAuth, signOut } from 'firebase/auth'

const Auth = createContext()

const initialState = { isAuthenticated: false, user: {} }

const reducer = (state, { type, payload }) => {
    switch (type) {
        case "SET_LOGGED_IN":
            return { isAuthenticated: true, user: payload.user }
        case "SET_PROFILE":
            return { ...state, user: payload.user }
        case "SET_LOGGED_OUT":
            return initialState
        default: return state
    }
}

export default function AuthContext({ children }) {

    const [state, dispatch] = useReducer(reducer, initialState)
    const [isAppLoading, setIsAppLoading] = useState(true)

    const readProfile = useCallback(() => {
        setTimeout(() => {
            setIsAppLoading(false)
        }, 500);
    }, [])
    useEffect(() => { readProfile() }, [readProfile])

    const handleLogout = async() => {
        dispatch({ type: "SET_LOGGED_OUT" })
        try {
          const auth = getAuth();
          await signOut(auth);
          // console.log(auth.Password)
          // console.log(auth.email)
        //   navigate("/auth/login")

        } catch (error) {
          console.error('Error logging out:', error);
        }

    }

    return (
        <Auth.Provider value={{ ...state, dispatch, isAppLoading, setIsAppLoading, handleLogout }}>
            {children}
        </Auth.Provider>
    )
}

export const useAuthContext = () => useContext(Auth)