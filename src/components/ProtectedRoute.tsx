import React from 'react'
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../store/authStore'

interface ProtectedRouteProps {
  element: React.ReactNode
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { user } = useAuthStore()

  // If the user is not logged in, redirect to the login/profile page
  if (!user) {
    return <Navigate to="/profile" replace />
  }

  return <>{element}</>
}

export default ProtectedRoute
