import { APP_API_ENDPOINT } from '~/Configs/endPoint'
import { apiUserServiceInstance } from './'

class ApiUserService {
  public VerifyToken(): Promise<any> {
    return apiUserServiceInstance.Http({
      path: APP_API_ENDPOINT.USER.VERIFY_TOKEN,
      config: { method: 'GET', cors: true }
    })
  }

  public VerifyUser(): Promise<any> {
    return apiUserServiceInstance.Http({
      path: APP_API_ENDPOINT.USER.VERIFY_USER,
      config: { method: 'GET', cors: true }
    })
  }

  public VerifyLogout(): Promise<any> {
    return apiUserServiceInstance.Http({
      path: APP_API_ENDPOINT.USER.LOG_OUT,
      config: { method: 'POST', cors: true }
    })
  }
  public GetBalanceEnergy(): Promise<any> {
    return apiUserServiceInstance.Http({
      path: APP_API_ENDPOINT.USER.ENERGY,
      config: { method: 'GET', cors: true }
    })
  }
}

export default new ApiUserService()
