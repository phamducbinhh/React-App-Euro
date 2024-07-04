import { createSlice } from '@reduxjs/toolkit'
import { ModalType } from '~/@Types/modal.types'
const initialState: ModalType = {
  isOpenModalRules: false,
  isOpenModalAuth: false,
  isOpenModalPickTeam: false,
  isOpenModalSubmit: false,
  isOpenModalRound: false,
  isOpenModalRanking: false,
  isOpenModalEnergy: false,
  isOpenModalPrize: false,
  isOpenModalMinigame: false,
  modalProps: {
    isSuccess: false,
    isLogin: false,
    isOutofTime: false,
    message: '',
    isVerifyEmail: false
  }
}
const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    openModalAuth: (state) => {
      state.isOpenModalAuth = !state.isOpenModalAuth
    },
    openModalRound: (state) => {
      state.isOpenModalRound = !state.isOpenModalRound
    },
    openModalRanking: (state) => {
      state.isOpenModalRanking = !state.isOpenModalRanking
    },
    openModalMiniGame: (state) => {
      state.isOpenModalMinigame = !state.isOpenModalMinigame
    },
    openModal: (state) => {
      state.isOpenModalRules = !state.isOpenModalRules
    },
    openModalEnergy: (state) => {
      state.isOpenModalEnergy = !state.isOpenModalEnergy
    },
    openModalPrize: (state) => {
      state.isOpenModalPrize = !state.isOpenModalPrize
    },
    OpenSubmit: (state, action) => {
      state.isOpenModalSubmit = !state.isOpenModalSubmit
      state.modalProps = action.payload.modalProps
    },
    openModalPickTeam: (state) => {
      state.isOpenModalPickTeam = !state.isOpenModalPickTeam
    },
    closeModalPickTeam: (state) => {
      state.isOpenModalPickTeam = false
    },
    closeModal: (state) => {
      state.isOpenModalRules = false
    },
    closeModalAuth: (state) => {
      state.isOpenModalAuth = false
    },
    closeModalRound: (state) => {
      state.isOpenModalRound = false
    },
    closeModalSubmit: (state) => {
      state.isOpenModalSubmit = false
      state.modalProps = {
        isSuccess: false,
        isLogin: false,
        isOutofTime: false,
        message: '',
        isVerifyEmail: false
      }
    },
    closeModalRanking: (state) => {
      state.isOpenModalRanking = false
    },
    closeModalMinigame: (state) => {
      state.isOpenModalMinigame = false
    },

    closeModalEnergy: (state) => {
      state.isOpenModalEnergy = false
    },
    closeModalPrize: (state) => {
      state.isOpenModalPrize = false
    }
  }
})

export const {
  openModal,
  closeModal,
  openModalPickTeam,
  closeModalPickTeam,
  closeModalSubmit,
  OpenSubmit,
  closeModalRound,
  closeModalAuth,
  openModalRound,
  closeModalRanking,
  openModalRanking,
  openModalEnergy,
  closeModalEnergy,
  openModalPrize,
  openModalMiniGame,
  openModalAuth,
  closeModalPrize,
  closeModalMinigame,
} = modalSlice.actions
export default modalSlice.reducer
