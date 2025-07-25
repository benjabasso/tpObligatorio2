import	{createContext, useState, useEffect, useContext} from 'react'
import { auth } from '../config/firebase'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut} from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'








const AuthContext = createContext()
const useAuth = () => useContext(AuthContext)


const AuthProvider = ({children}) => {
    const [user, setUser] = useState()

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user)=>{
            setUser(user)
        })
        return () => unsubscribe()
        }, [])

    //login
    const login = (email, password) => {
        signInWithEmailAndPassword(auth, email, password)
    }

    //register
    const register = (email, password) => {
        createUserWithEmailAndPassword(auth, email, password)
    }

    //logout
    const logout = () => signOut(auth)

    return (
        <AuthContext.Provider value={{login, register, user, logout}}> 
            {children}
        </AuthContext.Provider>
    )

}


export { AuthContext, AuthProvider, useAuth}