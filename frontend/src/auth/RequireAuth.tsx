import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './AuthProvider'

function RequireAuth(
    { children }: { children: React.ReactNode }
) {
    const auth = useAuth()
    const loc = useLocation()
    if (auth.loading) return <div>Loading...</div>
    if (!auth.token) {
        return <Navigate to="/login" state={{ from: loc }} replace />
    }

    return children
}

export default RequireAuth