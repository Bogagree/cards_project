import {Dispatch} from "redux";
import {authAPI, UserType} from "../../api/cards-api";
import {ActionsType, AppThunkType} from "../../app/store";

const initialState: initialStateType = {
  isLogged: false,
  user: {
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
}

export const authReducer = (state = initialState, action: AuthActionType) => {
  switch (action.type) {
    case "LOGIN":
      return {...state, user: {...action.userData}, isLogged: true}
    case 'CHANGE-USER':
      return {
        ...state, user: {...state.user, name: action.name}
      }
    default:
      return state
  }
};


const loginAC = (userData: UserType) => ({type: 'LOGIN', userData} as const)
export const changeUserAC = (name: string) => ({
  type: 'CHANGE-USER', name
} as const)

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

export const logoutTC = () => async (dispatch: Dispatch<ActionsType>) => {
  try {
    const res = await authAPI.logout()
    console.log(res)
  } catch (e: any) {
    const error = e.response
      ? e.response.data.error
      : (e.message + ', more details in the console');
  }
}


export const changeUserTC = (name: string) => async (dispatch: Dispatch<ActionsType>) => {
  try {
    const res = await authAPI.updateUser(name)
    dispatch(changeUserAC(res.data.updatedUser.name))
  } catch (e: any) {
    const error = e.response
      ? e.response.data.error
      : (e.message + ', more details in the console');
  }
}

export type AuthActionType = ReturnType<typeof loginAC> | ReturnType<typeof changeUserAC>

type initialStateType = {
  isLogged: boolean
  user: UserType
}

export type RegistrationDataType = {
  email: string
  password: string
}