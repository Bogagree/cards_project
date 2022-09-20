import { Dispatch } from "redux";
import {authAPI, UserType} from "../../api/cards-api";
import {AppThunkType} from "../../app/store";

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
  } catch (error: any) {
    alert('LOGIN : ' + error.response.data.error)
  }
}
export const authMeTC = (): AppThunkType => async dispatch => {
  try {
    const res = await authAPI.authMe()
    dispatch(loginAC(res))
  } catch (error: any) {
    alert('AUTH_ME : ' + error.response.data.error)
  }
}

export const logoutTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.logout()
    console.log(res)
  } catch (e) {

  }
}

export const registrationTC = (data: RegistrationDataType) => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.registration(data)
    console.log(res)
  } catch (e) {

  }
}

export const pingTC = () => async (dispatch: Dispatch) => {
  try {
    const res = await authAPI.ping()
    authAPI.sendPingData()
  } catch (e) {

  }
}

export const sendPingDataTC = () => async (dispatch: Dispatch) => {
  try {
    const res2 = await authAPI.sendPingData()
    console.log(res2.data)
  } catch (e) {

  }
}

export type AuthActionType = ReturnType<typeof loginAC>

type initialStateType = {
  isLogged: boolean
} & UserType

export type RegistrationDataType = {
    email: string
    password: string
}