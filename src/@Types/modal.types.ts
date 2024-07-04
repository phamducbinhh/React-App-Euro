export interface modalProps {
  isSuccess: boolean
  isLogin: boolean
  isOutofTime: boolean
  message: string
  isVerifyEmail: boolean
}

export interface ModalType {
  isOpenModalRules: boolean
  isOpenModalAuth: boolean
  isOpenModalPickTeam: boolean
  isOpenModalSubmit: boolean
  isOpenModalRound: boolean
  isOpenModalRanking: boolean
  isOpenModalMinigame: boolean
  isOpenModalEnergy: boolean
  isOpenModalPrize: boolean
  modalProps: modalProps
}
