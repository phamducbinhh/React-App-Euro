import { redirectConfig } from '~/Configs/endPoint'
export const redirectToProfilePage = (path: string, redirec = true): void => {
  const redirectLink = redirec ? `?redirect_link=${encodeURIComponent(window.location.href)}` : ''
  const profileUrl = `${redirectConfig.Profile}/${path}${redirectLink}`
  window.location.replace(profileUrl)
}

export const redirectToNewPage = (path: string): void => {
  window.open(`${redirectConfig.News}/${path}`, '_blank')
}
