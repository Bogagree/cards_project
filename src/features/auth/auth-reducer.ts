import {authAPI, UserType} from "../../api/cards-api";
import {AppThunkType} from "../../app/store";

export type AuthActionType = ReturnType<typeof loginAC>

type initialStateType = {
  isLogged: boolean
} & UserType

const initialState: initialStateType = {
  isLogged: false,
  avatar: '',
  created: '',
  email: '',
  isAdmin: false,
  name: '',
  publicCardPacksCount: 0,
  rememberMe: false,
  token: '',
  tokenDeathTime: 0,
  updated: '',
  verified: false,
  __v: 0,
  _id: '',
}

export const authReducer = (state = initialState, action: AuthActionType) => {
  switch (action.type) {
    case "LOGIN": return {...state, ...action.userData, isLogged: true}
    default:
      return state
  }
};

const loginAC = (userData: UserType) => ({type: 'LOGIN', userData})
export const loginTC = (email: string, password: string, rememberMe: boolean): AppThunkType => async dispatch => {
  try {
    const res = await authAPI.login(email, password, rememberMe)
    dispatch(loginAC(res))
  } catch (e) {

  }
}
