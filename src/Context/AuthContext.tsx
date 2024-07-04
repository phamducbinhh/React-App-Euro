import { ReactNode, createContext, useContext, useState } from 'react'
import { APP_CONSTANST } from '~/Configs/app'

type AuthContextType = {
  currentComponent: 'login' | 'register'
  setCurrentComponent: React.Dispatch<React.SetStateAction<'login' | 'register'>>
  resetComponent: () => void
  isAuthenticated: boolean
  isLoading: boolean
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentComponent, setCurrentComponent] = useState<'login' | 'register'>(APP_CONSTANST.LOGIN_KEY)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const resetComponent = () => setCurrentComponent(APP_CONSTANST.LOGIN_KEY)

  const value: AuthContextType = {
    currentComponent,
    setCurrentComponent,
    resetComponent,
    isAuthenticated,
    isLoading,
    setIsLoading,
    setIsAuthenticated
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within AuthProvider')
  }
  return context
}

export { AuthProvider, useAuth }
