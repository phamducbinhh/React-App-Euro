import ApiUserService from './user'
import ApiBaseService from './api'
import ApiAuthService from './auth'
import { API_CONFIGS } from '~/Configs/endPoint'
import { ApiClient } from './fetch'

const createApiClientInstance = (host: string, prefix: string): ApiClient => {
  return new ApiClient(host, prefix)
}

const apiUserServiceInstance = createApiClientInstance(
  API_CONFIGS.host_profile as string,
  API_CONFIGS.user_prefix as string
)
const apiAuthServiceInstance = createApiClientInstance(
  API_CONFIGS.host_profile as string,
  API_CONFIGS.auth_prefix as string
)

const apiBaseServiceInstance = createApiClientInstance(API_CONFIGS.host as string, '')
const apiSpaceServiceInstance = createApiClientInstance(API_CONFIGS.host_space as string, '')

export {
  apiUserServiceInstance,
  apiBaseServiceInstance,
  apiSpaceServiceInstance,
  apiAuthServiceInstance,
  ApiUserService,
  ApiBaseService,
  ApiAuthService
}
