import React, { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

interface AuthCtx {
    token: string | null,
    user: User | null,
    loading: boolean,
    login: (t: string, u?: User) => void,
    logout: () => void,
}

interface User {
    id: number,
    username: string
}

const AuthContext = createContext<AuthCtx | undefined>(undefined)

export function AuthProvider(
    { children }: { children: React.ReactNode }
) {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const t = localStorage.getItem('token')
        const u = localStorage.getItem('user')
        if (t) {
            setToken(t)
            axios.defaults.headers.common['Authorization'] = `Bearer ${t}`
        }
        if (u) {
            try {
                setUser(JSON.parse(u))
            } catch {
                localStorage.removeItem('user')
            }
        }
        setLoading(false)
    }, [])

    function login(t: string, u?: User): void {
        setToken(t)
        localStorage.setItem('token', t)

        axios.defaults.headers.common['Authorization'] = `Bearer ${t}`

        if (u) {
            setUser(u)
            localStorage.setItem('user', JSON.stringify(u))
        }
    }

    function logout(): void {
        setToken(null)
        setUser(null)
        delete axios.defaults.headers.common['Authorization']
        localStorage.removeItem('token')
        localStorage.removeItem('user')
    }

    return <AuthContext.Provider value={{
        token,
        user,
        loading,
        login,
        logout,
    }}>{ children }</AuthContext.Provider>
}

export function useAuth() {
    const ctx = useContext(AuthContext)
    if (!ctx) {
        throw new Error('useAuth inside AuthProvider')
    }
    return ctx
}