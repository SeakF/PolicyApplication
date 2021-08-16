import React, { useContext, useState, useEffect } from 'react'
import { auth } from '../firebase'

const AuthContext = React.createContext()

export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({ children }) {

    const [currentUser, setCurrentUser] = useState()
    const [loading, setLoading] = useState(true)

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
            .then(() => fetch(process.env.REACT_APP_AUTH, { 
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({name: "Agnieszka"})})
                        .then(res => res.json())
                        .then(res => document.cookie = `token=${res.accessToken}`)
                        .catch(err => console.log(err))
            )
            .catch(() => console.log('auth error'))
    }

    function logout() {
        return auth.signOut()
    }

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged(user =>{ 
            setCurrentUser(user)
            setLoading(false)
        })
        
        return unsubscribe
    }, [])



    const value = {
        currentUser,
        login,
        logout
    }

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    )
}
