import { APP_API_ENDPOINT } from '~/Configs/endPoint'
import { apiAuthServiceInstance } from './'
import { LoginCredentials } from '~/@Types/user.type'

class ApiAuthService {
  public Login({ body }: { body: LoginCredentials }): Promise<any> {
    return apiAuthServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.LOGIN,
      config: { method: 'POST', body, cors: true }
    })
  }

  public Register({ body }: { body: any }): Promise<any> {
    return apiAuthServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.REGISTER,
      config: { method: 'POST', body, cors: true }
    })
  }

  public LoginGoogle({ body }: { body: any }): Promise<any> {
    return apiAuthServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.LOGIN_GOOGLE,
      config: { method: 'POST', body, cors: true }
    })
  }

  public LoginFacebook({ body }: { body: any }): Promise<any> {
    return apiAuthServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.LOGIN_FACEBOOK,
      config: { method: 'POST', body, cors: true }
    })
  }

  public VerifyPassword({ body }: { body: any }): Promise<any> {
    return apiAuthServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.FORGOT_PASSWORD,
      config: { method: 'POST', body, cors: true }
    })
  }

  public ResetPassword({ body }: { body: any }): Promise<any> {
    return apiAuthServiceInstance.Http({
      path: APP_API_ENDPOINT.AUTH.RESET_PASSWORD,
      config: { method: 'POST', body, cors: true }
    })
  }
}

export default new ApiAuthService()
