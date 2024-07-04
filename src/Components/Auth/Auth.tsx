import React, { Suspense } from 'react'
import AuththenticationLayout from './Layout'
import LoadingComponent from '../Loading'
import { APP_CONSTANST } from '~/Configs/app'
import Login from './Login'
import Register from './Register'
import { useAuth } from '~/Context/AuthContext'

const Auth: React.FC = () => {
  const { currentComponent } = useAuth();

  const activeComponent = () => {
    const components = {
      [APP_CONSTANST.LOGIN_KEY]: Login,
      [APP_CONSTANST.REGISTER_KEY]: Register
    }
    const Component = components[currentComponent]
    return <Component />
  }

  return (
    <AuththenticationLayout>
      <Suspense fallback={<LoadingComponent />}>{activeComponent()}</Suspense>
    </AuththenticationLayout>
  )
}

export default Auth
