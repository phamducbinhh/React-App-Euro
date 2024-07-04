import { SET_ERROR, SET_ERROR_ALL, SET_ERROR_TEAM, SET_IS_SUBMIT, SET_TEAM_ID, SET_KEY } from './action'

interface State {
  isError: boolean
  isErrorAll: boolean
  isErrorTeam: boolean
  isSubmit: boolean
  team_id: number | null
  keySlected: string | null | undefined
}

const initialState: State = {
  isError: false,
  isErrorTeam: false,
  isSubmit: false,
  keySlected: null,
  team_id: null,
  isErrorAll: false
}

const reducer = (state: typeof initialState, action: { type: string; payload?: any }): State => {
  switch (action.type) {
    case SET_TEAM_ID:
      return { ...state, team_id: action.payload }
    case SET_KEY:
      return { ...state, keySlected: action.payload }
    case SET_ERROR:
      return { ...state, isError: action.payload }
    case SET_ERROR_ALL:
      return { ...state, isErrorAll: action.payload }
    case SET_ERROR_TEAM:
      return { ...state, isErrorTeam: action.payload }
    case SET_IS_SUBMIT:
      return { ...state, isSubmit: action.payload }
    default:
      return state
  }
}

export { initialState, reducer }
